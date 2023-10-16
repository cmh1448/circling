import { Circle } from "@/models/Circle";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";

export interface CircleItemProps {
  circle: Circle;
}

export default function CircleItem() {
  const navigate = useNavigate();

  const handleClickCircle = (circleId: number) => {
    navigate(`/circles/${circleId}`);
  };

  return (
    <div className=" bg-gray-100 p-2 rounded-lg">
      <div className="flex items-center">
        <dsv
          onClick={() => handleClickCircle(1)}
          className="text-lg font-bold bg-transparent w-full hover:bg-gray-200 active:scale-[0.98] p-1 rounded-lg transition-all cursor-pointer select-none"
        >
          음악 동아리
        </dsv>
      </div>
      <div className="flex flex-col mt-2">
        {[1, 2, 3, 4, 5].map(() => {
          return <PostItem />;
        })}
      </div>
    </div>
  );
}
