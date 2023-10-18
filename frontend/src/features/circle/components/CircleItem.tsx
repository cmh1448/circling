import { Circle } from "@/models/Circle";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { uiStore } from "@/stores/uiStore";

export interface CircleItemProps {
  circle: Circle;
}

export default function CircleItem(props: CircleItemProps) {
  const navigate = useNavigate();
  const handleClickCircle = (circleId: number) => {
    navigate(`/circles/${circleId}`);
  };

  return (
    <div className=" bg-gray-100 p-2 rounded-lg">
      <div className="flex items-center">
        <div
          onClick={() => handleClickCircle(props.circle.id)}
          className="text-lg font-bold bg-transparent w-full hover:bg-gray-200 active:scale-[0.98] p-1 rounded-lg transition-all cursor-pointer select-none"
        >
          {props.circle.name}
        </div>
      </div>
      <div className="flex flex-col mt-2">
        {[1, 2, 3, 4, 5].map(() => {
          return <PostItem />;
        })}
      </div>
    </div>
  );
}
