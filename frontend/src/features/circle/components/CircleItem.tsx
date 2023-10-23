import { Circle } from "@/models/Circle";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { uiStore } from "@/stores/uiStore";
import { useQuery } from "react-query";
import api from "@/api";
import { Pageable } from "@/models/Pagination";
import Fallback from "@/components/fallback/fallback";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";
import Icon from "@/components/base/Icon";

export interface CircleItemProps {
  circle: Circle;
}

export default function CircleItem(props: CircleItemProps) {
  const navigate = useNavigate();
  const handleClickCircle = (circleId: number) => {
    navigate(`/circles/${circleId}`);
  };

  const { data: posts, isLoading } = useQuery(
    ["fetchPostsPreviewByCircle", props.circle.id],
    () => api.board.fetchPostsByCircle(props.circle.id, Pageable.of(5, 1))
  );

  return (
    <div className=" bg-gray-100 p-2 rounded-lg">
      <div className="flex items-center">
        <div
          onClick={() => handleClickCircle(props.circle.id)}
          className="text-lg font-bold bg-transparent w-full hover:bg-gray-200 active:scale-[0.98] p-1 rounded-lg transition-all cursor-pointer select-none flex items-center justify-between"
        >
          {props.circle.name}
          <Icon icon="arrow_right_alt" />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <Suspense
          isLoading={isLoading}
          fallback={[...Array(5)].map(() => (
            <Skeleton className="w-full h-5 mt-1 rounded" />
          ))}
        >
          <Fallback
            when={posts?.content.length === 0}
            message="현재 아무런 게시물이 없어요"
          >
            {posts?.content.map((it) => {
              return <PostItem post={it} />;
            })}
          </Fallback>
        </Suspense>
      </div>
    </div>
  );
}
