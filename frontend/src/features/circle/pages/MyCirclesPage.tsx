import PageContainer from "@/components/pages/PageContainer";
import CircleItem from "../components/CircleItem";
import { useQuery } from "react-query";
import api from "@/api";
import Skeleton from "@/components/base/Skeleton";

export default function MyCirclesPage() {
  const { data: followingCircles, isLoading: followingLoading } = useQuery(
    ["fetchFollowingCircles"],
    () => api.circle.fetchFollowingCircles()
  );

  const getCircleItems = () => {
    if (followingCircles?.length)
      return followingCircles.map((it) => <CircleItem circle={it.circle} />);
    else
      return (
        <div className="flex justify-center text-gray-400 text-2xl">
          팔로우한 동아리가 존재하지 않습니다.
        </div>
      );
  };

  return (
    <PageContainer>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center">
        {/* <Icon icon="groups" /> */}
        내가 회원인 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-center text-gray-400 text-2xl">
          회원 가입한 동아리가 존재하지 않습니다.
        </div>
      </div>
      <div className=" text-2xl font-bold text-blue-500 flex gap-2 items-center mt-8">
        {/* <Icon icon="groups" /> */}
        내가 팔로우한 동아리
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {followingLoading
          ? [...Array(3)].map((it) => (
              <Skeleton className="w-full h-32 rounded-lg" />
            ))
          : getCircleItems()}
      </div>
    </PageContainer>
  );
}
