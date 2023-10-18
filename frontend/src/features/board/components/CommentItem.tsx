import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import { Comment } from "@models/Board.ts";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className={`p-4 bg-gray-100 rounded-lg flex flex-col gap-2`}>
      <div className="flex items-center gap-2 text-gray-400">
        <div className="flex gap-1 items-center">
          <Icon icon="person" fill className="text-[20px]" />
          {comment.createdBy.nickName}
        </div>
        <Divider variant="dot" className="!bg-gray-400" />
        10분전
      </div>
      <span className="ml-1">댓글 내용입니다.</span>
    </div>
  );
}
