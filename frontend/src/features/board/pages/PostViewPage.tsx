import Button from "@/components/base/Button";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import PageContainer from "@/components/pages/PageContainer";
import { useNavigate, useParams } from "react-router-dom";
import CommentItem from "../components/CommentItem";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";
import { Comment } from "@/models/Board";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "@/api";
import Suspense from "@/components/suspense/Suspense";
import Skeleton from "@/components/base/Skeleton";
import TextViewer from "@/components/editor/TextViewer";
import CommentPanel from "../panels/CommentPanel";
import Spinner from "@/components/base/Spinner";

export default function PostViewPage() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const authContext = useStore(authStore);
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data: post, isLoading } = useQuery(["fetchPostById", id], () =>
    api.board.fetchPostById(Number(id))
  );

  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => api.board.deletePost(id),
    onSuccess: () => {
      navigate(-1);
    },
  });

  const handleGoCategory = () => {
    navigate(
      `/circles/${post?.category.circle.id}?category=${post?.category.id}`
    );
  };

  const handleDeletePost = () => {
    deletePost(post.id);
  };

  return (
    <PageContainer>
      <div className="flex mb-2 relative">
        <Button variant={"primary"} onClick={handleGoBack} className="absolute">
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
        {authContext.user.email === post?.createdBy?.email ? (
          <Button
            onClick={handleDeletePost}
            variant={"third"}
            className="bg-red-400 hover:bg-red-500 text-white w-20 absolute right-0"
          >
            <Suspense isLoading={isDeleting} fallback={<Spinner size="24px" />}>
              <Icon icon="delete" />
              삭제
            </Suspense>
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2]">
        <div className="p-4 bg-gray-100 rounded-lg min-h-[300px]">
          <span className="text-3xl text-blue-500">
            <Suspense
              isLoading={isLoading}
              fallback={<Skeleton className="w-full h-10 rounded-lg" />}
            >
              {post?.title}
            </Suspense>
          </span>
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
              {post?.createdAt}
            </Suspense>
          </div>
          <div className="w-full h-[2px] bg-gray-200 rounded-full my-2" />
          <Suspense
            isLoading={isLoading}
            fallback={[...Array(6)].map((i, index) => (
              <Skeleton className="w-full h-6 mt-2 rounded" key={index} />
            ))}
          >
            <TextViewer html={post?.content ?? ""} />
          </Suspense>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 my-4">
          <div className="h-px w-full bg-gray-200" />
          <div className="flex gap-1 whitespace-nowrap text-gray-400">
            <Icon icon="comment" />
            <Suspense
              isLoading={isLoading}
              fallback={<Skeleton className="w-10 h-5 rounded" />}
            >
              {post?.comments}개
            </Suspense>
          </div>
          <div className="h-px w-full bg-gray-200" />
        </div>
        <div className="mt-1">
          <CommentPanel postId={Number(id)} />
        </div>
      </div>
    </PageContainer>
  );
}
