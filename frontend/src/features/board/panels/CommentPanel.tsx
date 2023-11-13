import api from "@/api";
import Skeleton from "@/components/base/Skeleton";
import Suspense from "@/components/suspense/Suspense";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CommentItem from "../components/CommentItem";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Comment, CommentRequest } from "@/models/Board";
import CommentInput from "../components/CommentInput";
import { CSSTransition } from "react-transition-group";
import { useStore } from "zustand";
import { authStore } from "@/stores/authStore";

interface CommentPanelProps {
  postId: number;
}

interface CommentDepth {
  comment: Comment;
  depth: number;
}

interface ReplyRequest {
  parentId: number;
  content: string;
}

const computeFlattenCommentsWithDepth = (
  originalArray: CommentDepth[],
  comment: Comment,
  depth: number
) => {
  originalArray.push({ comment: comment, depth: depth });
  comment.children?.forEach((it) =>
    computeFlattenCommentsWithDepth(originalArray, it, depth + 1)
  );
};

export default function CommentPanel({ postId }: CommentPanelProps) {
  const queryClient = useQueryClient();
  const authContext = useStore(authStore);

  /* Server Side */
  const { data: comments, isLoading: isCommentLoading } = useQuery(
    ["fetchCommentsByPost", postId],
    () => api.board.fetchCommentsByPost(postId)
  );

  const { mutate: uploadComment, isLoading: isUploadingComment } = useMutation({
    mutationFn: (content: string) =>
      api.board.uploadComment(postId, { content: content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCommentsByPost", postId]);
    },
  });

  const { mutate: uploadReply, isLoading: isUploadingReply } = useMutation({
    mutationFn: (req: ReplyRequest) =>
      api.board.uploadReply(req.parentId, { content: req.content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCommentsByPost", postId]);
      setSelectedComment(undefined);
    },
  });

  const { mutate: deleteReply, isLoading: isDeletingReply } = useMutation({
    mutationFn: (id: number) => api.board.deleteReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCommentsByPost", postId]);
      setSelectedComment(undefined);
    },
  });

  interface EditRequest {
    id: number;
    content: string;
  }

  const { mutate: editReply, isLoading: isEditing } = useMutation({
    mutationFn: (req: EditRequest) =>
      api.board.editReply(req.id, { content: req.content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCommentsByPost", postId]);
      setSelectedComment(undefined);
    },
  });

  /* Properties */
  const flattenComments = useMemo(() => {
    const commentDepths: CommentDepth[] = [];
    comments?.forEach((it) =>
      computeFlattenCommentsWithDepth(commentDepths, it, 0)
    );
    return commentDepths;
  }, [comments]);

  const [selectedComment, setSelectedComment] = useState<number | undefined>(
    undefined
  );

  const [mode, setMode] = useState<"reply" | "edit">("reply");

  /* Life Cycles */
  useEffect(() => {
    setMode("reply");
  }, [selectedComment]);

  const handleCommentClick = (index: number) => {
    if (selectedComment == index) setSelectedComment(undefined);
    else setSelectedComment(index);
  };
  /* Functions */
  const handleUploadComment = (value: string) => {
    uploadComment(value);
  };

  const handleUploadReply = (value: string, parent: number) => {
    uploadReply({ parentId: parent, content: value });
  };

  const handleEditComment = (value: string) => {
    editReply({
      id: flattenComments[selectedComment!].comment.id,
      content: value,
    });
  };

  const uploadOrEdit = (value: string) => {
    if (mode === "reply")
      handleUploadReply(value, flattenComments[selectedComment!].comment.id);
    else handleEditComment(value);
  };

  return (
    <div className="flex flex-col gap-2 pb-[300px]">
      <Suspense
        isLoading={isCommentLoading}
        fallback={[...Array(10)].map((i, index) => (
          <Skeleton className="w-full h-20 rounded-lg" key={index} />
        ))}
      >
        {flattenComments.map((it, index) => (
          <div className="flex flex-col gap-2" key={it.comment.id}>
            <CommentItem
              comment={it.comment}
              depth={it.depth}
              onReplyClick={() => handleCommentClick(index)}
              onDeleteClick={() => deleteReply(it.comment.id)}
              onEditClick={() => setMode("edit")}
              isWriter={it.comment.createdBy.email === authContext.user.email}
              isOpened={selectedComment === index}
              isDeleteLoading={isDeletingReply}
              className={`transition-transform ${
                index > selectedComment! ? "translate-y-[230px]" : ""
              }`}
            />
            <div className="relative">
              <div className="absolute w-full overflow-hidden">
                <CSSTransition
                  classNames="slide"
                  timeout={300}
                  in={selectedComment === index}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className="h-[230px]">
                    <CommentInput
                      key={index}
                      mode={mode}
                      text={mode === "reply" ? "대댓글 작성" : "댓글 수정"}
                      isUploading={isUploadingReply || isEditing}
                      onUpload={(val) => uploadOrEdit(val)}
                    />
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
      <div
        className={`transition-transform ${
          selectedComment !== undefined ? "translate-y-[230px]" : ""
        }`}
      >
        <CommentInput
          text="댓글 작성"
          onUpload={handleUploadComment}
          isUploading={isUploadingComment}
        />
      </div>
    </div>
  );
}
