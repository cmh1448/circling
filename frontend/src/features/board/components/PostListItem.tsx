import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import { Post } from "@/models/Board";
import { elapsedStringOf, parseLocalDateTime } from "@/utils/DateUtils";
import { DateTime } from "luxon";

export interface PostListItemProps {
  onClick?: () => void;

  post: Post;
}

export default function PostListItem(props: PostListItemProps) {
  return (
    <div className="flex flex-col" onClick={props.onClick}>
      <div className="py-2 px-4 flex flex-col hover:bg-gray-100 transition-all cursor-pointer rounded-lg active:scale-[0.98]">
        <span className="text-lg flex gap-2 ">
          <span className=" line-clamp-1">{props.post.title}</span>
          <span className="flex items-center gap-1 text-gray-500">
            <Icon icon="comment" className=" text-[20px]" />
            {props.post.comments ?? 0}
          </span>
        </span>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 break-keep">
            {elapsedStringOf(
              parseLocalDateTime(props.post.createdAt) ?? DateTime.now()
            )}
          </span>
          <Divider variant="dot" />
          <span className=" text-gray-500 break-keep">
            {props.post.createdBy.nickName}
          </span>
        </div>
      </div>
      <div className=" w-full h-[1px] bg-gray-100 mx-4" />
    </div>
  );
}
