import PageContainer from "@/components/pages/PageContainer";
import CircleItem from "../components/CircleItem";
import { useQuery } from "react-query";
import api from "@/api";
import Skeleton from "@/components/base/Skeleton";
import Fallback from "@/components/fallback/fallback";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";

export default function MyCirclesPage() {
  const { data: followingCircles, isLoading: followingLoading } = useQuery(
    ["fetchFollowingCircles"],
    () => api.circle.fetchFollowingCircles()
  );

  const { data: myCircles, isLoading: myCirclesLoading } = useQuery(
    ["fetchMyMemberedCircle"],
    () => api.circle.fetchMyMemberedCircle()
  );

  return (
    <PageContainer>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center">
        {/* <Icon icon="groups" /> */}
        내가 회원인 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2 items-center">
        <Fallback
          when={true}
          icon="mood_bad"
          message="내가 소속된 동아리가 없어요"
        ></Fallback>
        <Button className="w-fit">
          <div className="flex gap-2 items-center">
            <span>동아리 가입하기</span>
          </div>
        </Button>
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
