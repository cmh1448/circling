import Card from "@/components/base/Card";
import Icon from "@/components/base/Icon";
import { Circle } from "@/models/Circle";

export interface CardItemProps {
  circle: Circle;
}

export default function CircleItem(props: CardItemProps) {
  return (
    <Card className=" w-fit flex flex-col shadow px-6 gap-1">
      <span className=" text-lg font-bold text-blue-600">
        {props.circle.name}
      </span>
      <span className=" text-gray-500">{props.circle.description}</span>
      <span className="text-gray-500 text-sm justify-end flex items-center gap-1">
        <Icon icon="people" className="text-[16px]" fill />
        {props.circle.members}명
      </span>
    </Card>
  );
}
