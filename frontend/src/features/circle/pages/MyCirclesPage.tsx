import PageContainer from "@/components/pages/PageContainer";
import CircleItem from "../components/CircleItem";
import { useQuery } from "react-query";
import api from "@/api";
import Skeleton from "@/components/base/Skeleton";
import Fallback from "@/components/fallback/fallback";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import { useEffect, useMemo } from "react";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";
import ManagingCircleItem from "../components/ManagingCircleItem";
import { useNavigate } from "react-router-dom";
import Suspense from "@/components/suspense/Suspense";

export default function MyCirclesPage() {
  const authContext = useStore(authStore);

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

  const managingCircle = useMemo(() => {
    if (!followingCircles) return undefined;

    const merged = [];
    merged.push(...followingCircles);
    if (myCircle) merged.push(myCircle);

    return merged
      ?.sort((a, b) => b.circle.id - a.circle.id)
      ?.filter((it) => it.circle.leader.email === authContext.user.email);
  }, [followingCircles, myCircle]);

  return (
    <PageContainer>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center">
        {/* <Icon icon="groups" /> */}
        내가 관리하는 동아리
      </div>
      <div className=" overflow-x-auto apply-scrollbar">
        <div className="flex gap-4 mt-2 w-fit pb-2">
          <Suspense
            isLoading={followingLoading}
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
                <ManagingCircleItem circle={it.circle} />
              ))}
            </Fallback>
          </Suspense>
        </div>
      </div>

      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center mt-4">
        {/* <Icon icon="groups" /> */}
        내가 회원인 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2 w-fullx`x">
        <Suspense
          isLoading={myCircleLoading}
          fallback={
            <>
              <Skeleton className="w-full h-32 rounded-lg" />
            </>
          }
        >
          <Fallback
            when={myCircle === undefined}
            message="내가 회원인 동아리가 없어요"
            actionPanel={
              <>
                <Button variant="third">동아리 가입하기</Button>
              </>
            }
          >
            <CircleItem circle={myCircle?.circle} />
          </Fallback>
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
    </PageContainer>
  );
}
