import Icon from "@/components/base/Icon";
import { Circle } from "@/models/Circle";
import { useNavigate } from "react-router-dom";

interface ManagingCircleItemProps {
  circle: Circle;
}

export default function ManagingCircleItem(props: ManagingCircleItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/circles/${props.circle.id}/manage`);
  };

  return (
    <div
      onClick={handleClick}
      className="aspect-square w-40 p-2 bg-gray-200 rounded-lg flex items-center justify-center select-none hover:bg-gray-300 cursor-pointer transition-all active:scale-95"
    >
      <div className="overflow-hidden items-center flex flex-col gap-2">
        <span className="overflow-ellipsis line-clamp-1 text-lg">
          {props.circle.name}
        </span>
        <Icon icon="settings" className="text-gray-500" fill />
      </div>
    </div>
  );
}
