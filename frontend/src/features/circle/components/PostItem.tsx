import Icon from "@/components/base/Icon";
import { Post } from "@/models/Board";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/circles/board/posts/${post.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex text-sm cursor-pointer text-gray-400 gap-2 items-center hover:bg-gray-200 active:scale-95 p-1 rounded-lg transition-all"
    >
      <Icon icon="article" className="text-sm" />
      <span className=" font-semibold flex items-center gap-3">
        <span className=" line-clamp-1">{post.title}</span>
        <span className="flex items-center gap-[2px]">
          <Icon icon="comment" className="text-sm" />
          {post.comments ?? 0}
        </span>
      </span>
      <span className="flex-1" />
      <span className="flex gap-1 items-center whitespace-nowrap">
        <Icon icon="schedule" className="text-sm" />
        {elapsedStringOf(parseLocalDateTime(post.createdAt))}
      </span>
    </div>
  );
}
