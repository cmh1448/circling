import { Circle } from "@/models/Circle";
import PostItem from "./PostItem";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";

export interface CircleItemProps {
  circle: Circle;
}

export default function CircleItem() {
  return (
    <div className=" bg-gray-100 p-2 rounded-lg">
      <div className="flex items-center">
        <div className=" text-lg font-bold">음악 동아리</div>
        <div className="flex-1" />
        <Button sizeType="small">
          <Icon icon="arrow_forward" />
        </Button>
      </div>
      <div className="flex flex-col mt-2">
        {[1, 2, 3, 4, 5].map((i) => {
          return <PostItem />;
        })}
      </div>
    </div>
  );
}
