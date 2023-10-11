import { Circle } from "@/models/Circle";
import PostItem from "./PostItem";

export interface CircleItemProps {
  circle: Circle;
}

export default function CircleItem() {
  return (
    <div className=" bg-gray-100 p-2 rounded-lg">
      <div className="flex items-center">
        <div className="text-lg font-bold bg-transparent w-full hover:bg-gray-200 active:scale-[0.98] p-1 rounded-lg transition-all cursor-pointer select-none">
          음악 동아리
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
