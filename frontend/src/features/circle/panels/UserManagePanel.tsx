import api from "@/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import UserItem from "../components/UserItem";
import Fallback from "@/components/fallback/fallback";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";

export default function UserManagePanel() {
  const { circleId } = useParams();

  const { data: followers, isLoading: isFollowersLoading } = useQuery(
    ["fetchFollowersByCircleId", circleId],
    () => api.circle.fetchFollowersByCircle(Number(circleId))
  );

  const { data: members, isLoading: isMembersLoading } = useQuery(
    ["fetchMembersByCircleId", circleId],
    () => api.circle.fetchMembersByCircle(Number(circleId))
  );

  return (
    <div className="flex flex-col ">
      <span className="text-2xl font-bold">
        회원 목록 <span className="text-gray-500">{members?.length}</span>
      </span>
      <div className="flex flex-col gap-2">
        <Suspense
          isLoading={isMembersLoading}
          fallback={
            <>
              {[...Array(5)].map(() => (
                <Skeleton className="w-full h-14 rounded" />
              ))}
            </>
          }
        >
          <Fallback
            when={members?.length === 0}
            message="회원이 존재하지 않아요"
          >
            {members?.map((it) => {
              return (
                <UserItem circleId={Number(circleId)} user={it} deletable />
              );
            })}
          </Fallback>
        </Suspense>
      </div>
      <span className="text-2xl font-bold mt-4">
        팔로워 목록 <span className="text-gray-500">{followers?.length}</span>
      </span>
      <div className="flex flex-col gap-2">
        <Suspense
          isLoading={isFollowersLoading}
          fallback={
            <>
              {[...Array(5)].map(() => (
                <Skeleton className="w-full h-14 mt-1 rounded" />
              ))}
            </>
          }
        >
          <Fallback
            when={followers?.length === 0}
            message="팔로워가 존재하지 않아요"
          >
            {followers?.map((it) => {
              return <UserItem circleId={Number(circleId)} user={it} />;
            })}
          </Fallback>
        </Suspense>
      </div>
    </div>
  );
}
