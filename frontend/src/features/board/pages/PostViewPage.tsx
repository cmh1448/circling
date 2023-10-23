import Button from "@/components/base/Button";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { useNavigate, useParams } from "react-router-dom";
import CommentItem from "../components/CommentItem";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";
import { Comment } from "@/models/Board";
import { useQuery } from "react-query";
import api from "@/api";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { DateTime } from "luxon";

export default function PostViewPage() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const authContext = useStore(authStore);
  const { id } = useParams();

  const { data: post, isLoading } = useQuery(["fetchPostById", id], () =>
    api.board.fetchPostById(Number(id))
  );

  const dummyComment: Comment = {
    content: "Test Content",
    createdAt: new Date().toISOString(),
    createdBy: authContext.user!,
    lastModifiedAt: new Date().toISOString(),
    lastModifiedBy: authContext.user!,
  };

  const handleGoCategory = () => {
    navigate(
      `/circles/${post?.category.circle.id}?category=${post?.category.id}`
    );
  };

  return (
    <PageContainer>
      <div className="flex mb-2">
        <Button variant={"primary"} onClick={handleGoBack}>
          <Icon icon="arrow_back" />
          뒤로가기
        </Button>
        <div className="flex-1" />

        <div
          onClick={handleGoCategory}
          className="text-2xl flex-col relative font-bold select-none text-gray-700 rounded-lg hover:bg-gray-100 flex items-center p-1 cursor-pointer active:scale-[0.98] transition-all"
        >
          <Suspense
            isLoading={isLoading}
            fallback={<Skeleton className="w-28 h-8 rounded-lg" />}
          >
            {post?.category.title}
          </Suspense>
        </div>

        <div className="flex-1" />
        <Button variant={"third"}>
          <Icon icon="link" />
          링크 복사
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-4 bg-gray-100 rounded-lg">
          <span className="text-3xl text-blue-500">{post?.title}</span>
          <div className="w-full h-[2px] bg-gray-200 rounded-full my-2" />
          <div className="flex items-center gap-2 text-gray-400">
            <Suspense
              isLoading={isLoading}
              fallback={<Skeleton className="w-12 h-4 rounded" />}
            >
              {post?.createdBy.nickName}
            </Suspense>
            <Divider variant="dot" className="!bg-gray-400" />
            <Suspense
              isLoading={isLoading}
              fallback={<Skeleton className="w-12 h-4 rounded" />}
            >
              {elapsedStringOf(
                parseLocalDateTime(post?.createdAt) ?? DateTime.now()
              )}
            </Suspense>
          </div>
        </div>
        <div className="px-4 py-8 bg-gray-100 rounded-lg">
          <Suspense
            isLoading={isLoading}
            fallback={[...Array(6)].map(() => (
              <Skeleton className="w-full h-6 mt-2 rounded" />
            ))}
          >
            {post?.content}
          </Suspense>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 my-4">
          <div className="h-px w-full bg-gray-200" />
          <div className="flex gap-1 whitespace-nowrap text-gray-400">
            <Icon icon="comment" />
            {post?.comments ?? 0}개
          </div>
          <div className="h-px w-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {[...Array(10)].map((it) => (
            <CommentItem key={it} comment={dummyComment} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
