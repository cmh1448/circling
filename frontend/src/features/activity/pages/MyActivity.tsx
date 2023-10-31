import api from "@/api";
import Button from "@/components/base/Button";
import Skeleton from "@/components/base/Skeleton";
import Fallback from "@/components/fallback/fallback";
import PageContainer from "@/components/pages/PageContainer";
import Suspense from "@/components/suspense/Suspense";
import PostListItem from "@/features/board/components/PostListItem";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function MyActivity() {
  const [currentSort, setCurrentSort] = useState<
    "createdAt" | "title" | "comments"
  >("createdAt");
  const [reverse, setReverse] = useState(false);

  const { data: posts, isLoading } = useQuery(
    ["fetchMyPosts", currentSort, reverse],
    () => api.board.findMyPosts(currentSort, reverse)
  );
  const sortOptions = ["createdAt", "title", "comments"];

  const changeSort = (sort: "createdAt" | "title" | "comments") => {
    setCurrentSort(sort);
  };
  const navigate = useNavigate();

  const handleClickPost = (id: number) => {
    navigate(`/circles/board/posts/${id}`);
  };
  return (
    <PageContainer>
      <div className="text-2xl font-bold">내가 쓴 게시물</div>
      <div className="flex gap-2">
        <Button
          variant={currentSort === "createdAt" ? "primary" : "third"}
          onClick={() => changeSort("createdAt")}
        >
          작성 시각
        </Button>
        <Button
          variant={currentSort === "title" ? "primary" : "third"}
          onClick={() => changeSort("title")}
        >
          제목
        </Button>
        <Button
          variant={currentSort === "comments" ? "primary" : "third"}
          onClick={() => changeSort("comments")}
        >
          댓글수
        </Button>
        <div className="flex-1" />
        <Button variant="secondary" onClick={() => setReverse(!reverse)}>
          {reverse ? "내림차순" : "오름차순"}
        </Button>
      </div>
      <Suspense
        isLoading={isLoading}
        fallback={[...Array(10)].map(() => (
          <Skeleton className="w-full h-14 mt-2 rounded-lg" />
        ))}
      >
        <Fallback when={posts?.length === 0} message="아무 게시물도 없어요">
          {posts?.map((it) => (
            <PostListItem
              post={it}
              onClick={() => handleClickPost(it.id)}
              key={it.id}
            />
          ))}
        </Fallback>
      </Suspense>
    </PageContainer>
  );
}
