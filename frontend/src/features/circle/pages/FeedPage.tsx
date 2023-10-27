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
import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "@/hooks/appearHook";
import { all } from "axios";

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
    ({ pageParam = 1 }) => api.board.fetchFeedPosts(Pageable.of(4, pageParam)),
    {
      getNextPageParam: (lastPage, allPage) => {
        console.log("fetch next page");
        return lastPage.pageable.pageNumber + 2;
      },
    }
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
      {/* <CSSTransition
        classNames="fade"
        in={isFetching}
        timeout={150}
        unmountOnExit
      >
        <div className={`absolute ${absoluteCenter}`}>
          <Spinner size="20px" color="#3b82f6" />
        </div>
      </CSSTransition> */}
      <div
        className={`flex flex-col gap-4 transition-all ${
          isFetching ? "translate-y-[40px]" : ""
        } `}
      >
        {feeds?.pages
          .flatMap((p) => p.content)
          .map((it) => (
            <FeedCard post={it} />
          ))}
        <div></div>
        {feeds?.pages[feeds.pages.length - 1].last ? (
          <div
            ref={nextLoadingRef}
            style={{
              visibility: feeds?.pages[feeds.pages.length - 1].last
                ? "hidden"
                : "visible",
            }}
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
    </PageContainer>
  );
}
