import PageContainer, {
  useScrollContext,
} from "@/components/pages/PageContainer";
import { authStore } from "@/stores/authStore";
import { useStore } from "zustand";
import FeedCard from "../components/FeedCard";
import { useInfiniteQuery, useQuery } from "react-query";
import api from "@/api";
import { Pageable } from "@/models/Pagination";
import Skeleton from "@/components/base/Skeleton";
import { CSSTransition } from "react-transition-group";
import Spinner from "@/components/base/Spinner";
import { css } from "@emotion/css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsVisible } from "@/hooks/appearHook";
import { all } from "axios";
import Fallback from "@/components/fallback/fallback";

const absoluteCenter = css`
  left: calc(50% - 10px);
`;

export default function FeedPage() {
  const authContext = useStore(authStore);

  const {
    data: feeds,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ["fetchFeedPosts"],
    ({ pageParam = 1 }) => api.board.fetchFeedPosts(Pageable.of(10, pageParam)),
    {
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.pageable.pageNumber + 2;
      },
    }
  );

  const flattenFeeds = useMemo(
    () => feeds?.pages.flatMap((p) => p.content),
    [feeds]
  );

  const [isLastPage, setIsLastPage] = useState(false);

  const nextLoadingRef = useRef<HTMLDivElement | null>(null);
  const isNextLoadingVisible = useIsVisible(nextLoadingRef);

  useEffect(() => {
    if (isNextLoadingVisible && !isLastPage) {
      fetchNextPage();
    }
  }, [isNextLoadingVisible]);

  useEffect(() => {
    if (feeds?.pages[feeds.pages.length - 1].last) setIsLastPage(true);
  }, [feeds]);
  return (
    <PageContainer className={`relative `}>
      <Fallback
        when={isLastPage && flattenFeeds?.length === 0}
        message="아직 아무런 피드가 없어요."
      >
        <div className={`flex flex-col gap-4 transition-all `}>
          {flattenFeeds?.map((it) => (
            <FeedCard key={it.id} post={it} />
          ))}
          {!isLastPage ? (
            <div
              ref={nextLoadingRef}
              className="flex justify-center items-center"
            >
              <Spinner color="#9ca3af" size="20px" />
            </div>
          ) : (
            <div className="flex justify-center text-gray-500">
              마지막 게시물 입니다.
            </div>
          )}
        </div>
      </Fallback>
    </PageContainer>
  );
}
