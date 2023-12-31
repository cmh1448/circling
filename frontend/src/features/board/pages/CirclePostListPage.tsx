import BoardTab from "../components/BoardTab";
import PostListItem from "../components/PostListItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ActionButton from "@/components/base/ActionButton";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { adjustCurrentNavBar } from "@/hooks/uiHook";
import { useQuery } from "react-query";
import api from "@/api";
import { Category } from "@/models/Board";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";
import { Pageable } from "@/models/Pagination";
import Fallback from "@/components/fallback/fallback";
import Pagination from "@/components/pagination/Pagination";
import { useMemo, useState } from "react";
import Button from "@/components/base/Button";

export default function CirclePostListPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClickPost = (id: number) => {
    navigate(`/circles/board/posts/${id}`);
  };
  const handleNewPost = () => {
    navigate(`/circles/${id}/board/posts/new`);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [currentPageable, setCurrentPageable] = useState<Pageable>(
    Pageable.of(10, 1)
  );

  /* Server Side */
  const { data: categories, isLoading: isCategoryLoading } = useQuery(
    ["fetchCategoriesByCircle", id],
    () => api.board.fetchCategoriesByCircleId(Number(id))
  );

  const { data: circlePosts, isLoading: isCirclePostsLoading } = useQuery(
    ["fetchPostsByCircle", id, currentPageable],
    () => api.board.fetchPostsByCircle(Number(id), currentPageable)
  );

  const { data: categoryPosts, isLoading: isCategoryPostsLoading } = useQuery(
    ["fetchPostsByCategory", categoryId],
    () => api.board.fetchPostsByCategory(Number(categoryId!), currentPageable),
    {
      enabled: !!categoryId,
    }
  );

  /* Functions */
  const handleCategoryChanged = (selected: Category | undefined) => {
    setCurrentPageable(Pageable.of(10, 1));
    setSearchParams(
      { category: selected?.id.toString() ?? "" },
      {
        replace: true,
      }
    );
  };

  adjustCurrentNavBar(Number(id));

  return (
    <PageContainer>
      <Suspense
        isLoading={isCategoryLoading}
        fallback={
          <div className="flex gap-2 items-center">
            {[...Array(3)].map(() => (
              <Skeleton className="w-20 h-10 rounded-full" />
            ))}
          </div>
        }
      >
        <BoardTab
          selectedDefault={
            categories?.filter((it) => it.id === Number(categoryId))[0]
          }
          selectedChange={handleCategoryChanged}
          categories={categories ?? []}
        />
      </Suspense>
      <div className="mt-4 flex flex-col">
        <Suspense
          isLoading={
            !!categoryId ? isCategoryPostsLoading : isCirclePostsLoading
          }
          fallback={[...Array(10)].map(() => (
            <Skeleton className="w-full h-14 mt-2 rounded-lg" />
          ))}
        >
          <Fallback
            when={
              !!categoryId
                ? categoryPosts?.content.length === 0
                : circlePosts?.content.length === 0
            }
            message="아무 게시물도 없어요"
          >
            {(!!categoryId
              ? categoryPosts?.content
              : circlePosts?.content
            )?.map((it) => (
              <PostListItem
                post={it}
                onClick={() => handleClickPost(it.id)}
                key={it.id}
              />
            ))}
          </Fallback>
        </Suspense>
      </div>
      <div>
        <Suspense
          isLoading={isCirclePostsLoading || isCategoryPostsLoading}
          fallback={
            <div className="flex gap-2 justify-center mt-2">
              {[...Array(5)].map((i, index) => (
                <Skeleton
                  key={index}
                  className="w-12 aspect-square rounded-lg"
                />
              ))}
            </div>
          }
        >
          <Pagination
            currentPage={!!categoryId ? categoryPosts : circlePosts}
            onPageMove={(pageable) => setCurrentPageable(pageable)}
          />
        </Suspense>
      </div>
      <ActionButton onClick={handleNewPost}>
        <Icon icon="edit" className="text-white text-4xl" />
      </ActionButton>
    </PageContainer>
  );
}
