import Card from "@/components/base/Card";
import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import TextViewer from "@/components/editor/TextViewer";
import { Post } from "@/models/Board";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

export interface FeedCardProps {
  post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/circles/board/posts/${post.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="flex flex-col gap-4 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      <div className="flex">
        <span className="flex gap-2 items-center">
          <span className="text-lg font-bold">{post.category.circle.name}</span>
          <Divider variant="dot" />
          <span className="text-gray-500">{post.category.title}</span>
        </span>
      </div>
      <div className="">
        <TextViewer html={post.content ?? ""} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-gray-500">
          <span className="flex items-center">{post.createdBy.nickName}</span>
          {elapsedStringOf(
            parseLocalDateTime(post.createdAt) ?? DateTime.now()
          )}
        </div>
        <div className="flex items-center text-gray-500 gap-1  rounded">
          <Icon icon="comment" className="text-[18px]" fill />9
        </div>
      </div>
    </Card>
  );
}
