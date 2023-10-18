import Divider from "@/components/base/Divider";
import Icon from "@/components/base/Icon";
import { useNavigate } from "react-router-dom";

export interface PostListItemProps {
  onClick?: () => void;
}

export default function PostListItem(props: PostListItemProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" onClick={props.onClick}>
      <div className="py-2 px-4 flex flex-col hover:bg-gray-100 transition-all cursor-pointer rounded-lg active:scale-[0.98]">
        <span className="text-lg flex gap-2 ">
          <span className=" line-clamp-1">
            글 제목입니다. 이렇게 길게 작성하는 경우도 당연히 있겠죠
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <Icon icon="comment" className=" text-[20px]" />8
          </span>
        </span>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 break-keep">10분전</span>
          <Divider variant="dot" />
          <span className=" text-gray-500 break-keep">천명현</span>
        </div>
      </div>
      <div className=" w-full h-[1px] bg-gray-100 mx-4" />
    </div>
  );
}
