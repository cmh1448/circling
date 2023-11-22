import PageContainer from "@/components/pages/PageContainer";
import CircleItem from "../components/CircleItem";
import { useQuery } from "react-query";
import api from "@/api";
import Skeleton from "@/components/base/Skeleton";
import Fallback from "@/components/fallback/fallback";
import Button from "@/components/base/Button";
import { useMemo, useState } from "react";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";
import ManagingCircleItem from "../components/ManagingCircleItem";
import Suspense from "@/components/suspense/Suspense";
import CircleRegisterDialog from "../dialogs/CircleRegisterDialog";
import Card from "@/components/base/Card";

export default function MyCirclesPage() {
  const authContext = useStore(authStore);

  /* Server Side */
  const { data: followingCircles, isLoading: followingLoading } = useQuery(
    ["fetchFollowingCircles"],
    () => api.circle.fetchFollowingCircles()
  );

  const { data: myCircle, isLoading: myCircleLoading } = useQuery(
    ["fetchMyMemberedCircle"],
    () => api.circle.fetchMyMemberedCircle(),
    {
      retry: (failureCount, error: any) => {
        if (error?.codeName === "GLOBAL_NOT_FOUND") return false;
        return failureCount < 3;
      },
    }
  );

  const { data: circles, isLoading: isManagingCircleLoading } = useQuery(
    ["fetchManagingCircles"],
    () => api.circle.fetchManagigCircles()
  );

  const {
    data: myRegister,
    isLoading: myRegisterLoading,
    isError: isRegisterError,
  } = useQuery(["fetchMyRegister"], () => api.circle.fetchMyRegister(), {
    retry: (failureCount, error: any) => {
      if (error?.codeName === "GLOBAL_NOT_FOUND") return false;
      return failureCount < 3;
    },
  });

  /* Properties */
  const managingCircle = useMemo(() => {
    return circles?.filter(
      (it) => it.leader?.email === authContext.user?.email
    );
  }, [circles]);

  const [isRegisterOpened, setIsRegisterOpened] = useState(false);

  return (
    <PageContainer>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center">
        {/* <Icon icon="groups" /> */}
        내가 관리하는 동아리
      </div>
      <div className=" overflow-x-auto apply-scrollbar">
        <div className="flex gap-4 mt-2 w-fit pb-2">
          <Suspense
            isLoading={isManagingCircleLoading}
            fallback={
              <>
                {[...Array(5)].map(() => (
                  <Skeleton className=" h-40 aspect-square rounded-lg" />
                ))}
              </>
            }
          >
            <Fallback
              when={managingCircle?.length === 0}
              message="내가 관리하는 동아리가 없어요"
            >
              {managingCircle?.map((it) => (
                <ManagingCircleItem circle={it} />
              ))}
            </Fallback>
          </Suspense>
        </div>
      </div>

      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center mt-4">
        {/* <Icon icon="groups" /> */}
        <Suspense
          isLoading={myCircleLoading || (myRegisterLoading && isRegisterError)}
          fallback={
            <>
              <Skeleton className="w-32 h-10 rounded-lg" />
            </>
          }
        >
          {myRegister ? <>내 가입 신청서</> : <>내가 회원인 동아리</>}
        </Suspense>
      </div>
      <div className="flex flex-col gap-4 mt-2 w-fullx`x">
        <Suspense
          isLoading={myCircleLoading || (myRegisterLoading && isRegisterError)}
          fallback={
            <>
              <Skeleton className="w-full h-32 rounded-lg" />
            </>
          }
        >
          {myRegister ? (
            <Card className="gap-4 flex items-center">
              <span className="text-lg flex items-center justify-center font-bold gap-2 text-blue-500">
                {myRegister.circle.name}
              </span>
              <div className="flex-1" />
              <span className="text-xl text-white p-2 bg-blue-500 rounded-lg">
                승인 대기중
              </span>
            </Card>
          ) : (
            <Fallback
              when={myCircle === undefined}
              message="내가 회원인 동아리가 없어요"
              actionPanel={
                <>
                  <Button
                    variant="third"
                    onClick={() => setIsRegisterOpened(true)}
                  >
                    동아리 가입하기
                  </Button>
                </>
              }
            >
              <CircleItem circle={myCircle?.circle} />
            </Fallback>
          )}
        </Suspense>
      </div>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center mt-8">
        {/* <Icon icon="groups" /> */}
        내가 팔로우한 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {followingLoading ? (
          [...Array(3)].map(() => (
            <Skeleton className="w-full h-32 rounded-lg" />
          ))
        ) : (
          <Fallback
            when={followingCircles?.length === 0}
            message="아무 동아리도 팔로우하지 않았어요"
          >
            {followingCircles?.map((it) => (
              <CircleItem circle={it.circle} />
            ))}
          </Fallback>
        )}
      </div>
      <CircleRegisterDialog
        onClosed={() => {
          setIsRegisterOpened(false);
        }}
        opened={isRegisterOpened}
      />
    </PageContainer>
  );
}
