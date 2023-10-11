import { Circle } from "@/models/Circle";
import CircleLogo from "./CircleLogo";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";

export interface ExplorerCircleItem {
  circle: Circle;
}

export default function ExplorerCircleItem(props: ExplorerCircleItem) {
  return (
    <div className=" bg-gray-100 rounded-lg p-4 md:flex md:justify-between">
      <div className="flex items-center gap-4">
        <CircleLogo />
        <div className="flex flex-col">
          <span className=" text-blue-500 text-lg font-bold">
            {props.circle.name}
          </span>
          <div className="flex flex-col">
            <span className="text-gray-500">{props.circle.description}</span>
            <span className=" text-sm text-gray-400 flex items-center cursor-pointer select-none">
              더 알아보기
              <Icon icon="arrow_right" />
            </span>
          </div>
        </div>
      </div>
      <Button className="w-full mt-3 md:w-fit md:aspect-square md:h-full">
        팔로우
      </Button>
    </div>
  );
}
