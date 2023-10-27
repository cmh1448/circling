import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import TextViewer from "@/components/editor/TextViewer";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { Comment } from "@models/Board.ts";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  className?: string;

  onClick?: () => void;
}

export default function CommentItem({
  comment,
  depth = 0,
  className,
  onClick,
}: CommentItemProps) {
  return (
    <div className="flex" onClick={onClick}>
      <div style={{ width: depth * 20 }} />
      <div
        className={`py-4 px-4 bg-gray-100 rounded-lg flex flex-col gap-2 flex-1 active:scale-[0.96] transition-all cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2 text-gray-400">
          <div className="flex gap-1 items-center">
            <Icon icon="person" fill className="text-[20px]" />
            {comment.createdBy.nickName}
          </div>
          <Divider variant="dot" className="!bg-gray-400" />
          {elapsedStringOf(parseLocalDateTime(comment.createdAt))}
        </div>
        <span className="ml-1">
          <TextViewer html={comment.content ?? ""} />
        </span>
      </div>
    </div>
  );
}
