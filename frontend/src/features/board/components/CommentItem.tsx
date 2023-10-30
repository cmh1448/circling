import Button from "@/components/base/Button";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import Spinner from "@/components/base/Spinner";
import TextViewer from "@/components/editor/TextViewer";
import Suspense from "@/components/suspense/Suspense";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { Comment } from "@models/Board.ts";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  className?: string;
  isOpened?: boolean;
  isWriter?: boolean;

  onReplyClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  isDeleteLoading?: boolean;
}

export default function CommentItem({
  comment,
  depth = 0,
  className,
  onReplyClick,
  onEditClick,
  onDeleteClick,
  isOpened = false,
  isWriter = false,
  isDeleteLoading = false,
}: CommentItemProps) {
  return (
    <div className="flex relative">
      <div style={{ width: depth * 20 }} />
      <div
        className={`py-4 px-4 bg-gray-100 flex w-full rounded-lg active:scale-[0.96] transition-all cursor-pointer ${
          isOpened && isWriter && !comment.isDeleted ? "mr-10" : "mr-0"
        } ${className}`}
        onClick={onReplyClick}
      >
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex gap-1 items-center">
              <Icon icon="person" fill className="text-[20px]" />
              {comment.createdBy.nickName}
            </div>
            <Divider variant="dot" className="!bg-gray-400" />
            {elapsedStringOf(parseLocalDateTime(comment.createdAt))}
          </div>
          <span className="ml-1">
            {comment.isDeleted ? (
              <span className="text-gray-400">삭제된 댓글입니다.</span>
            ) : (
              <TextViewer html={comment.content ?? ""} />
            )}
          </span>
        </div>
      </div>
      <div className="absolute right-0 top-2">
        {isOpened && isWriter && !comment.isDeleted ? (
          <>
            <Button sizeType="small" variant="secondary" onClick={onEditClick}>
              <Icon icon="edit" />
            </Button>
            <Button
              sizeType="small"
              variant="secondary"
              onClick={onDeleteClick}
              className="bg-red-400 hover:bg-red-500 mt-2"
            >
              <Suspense
                isLoading={isDeleteLoading}
                fallback={<Spinner size="24px" />}
              >
                <Icon icon="delete" />
              </Suspense>
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
