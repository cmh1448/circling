import { Circle } from "@/models/Circle";
import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import api from "@/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CircleLogo from "@/features/explore/components/CircleLogo";

export interface RegisterCircleItemProps {
  circle: Circle;

  onRegister: () => void;
}

export default function RegisterCircleItem(props: RegisterCircleItemProps) {
  const handleClick = () => {
    props.onRegister();
  };

  return (
    <div className=" bg-gray-100 rounded-lg p-4 md:flex md:justify-between">
      <div className="flex items-center gap-4">
        <CircleLogo className="!w-16" />
        <div className="flex flex-col">
          <span className=" text-blue-500 text-lg font-bold flex gap-2">
            {props.circle.name}
            <span className="text-gray-400 flex items-center text-sm">
              <Icon icon="person" className="text-[16px]" fill />
              {props.circle.members}
            </span>
            <span className="text-gray-400 flex items-center text-sm">
              <Icon icon="people" className="text-[16px]" fill />
              {props.circle.followers}
            </span>
          </span>
          <div className="flex flex-col">
            <span className="text-gray-500">{props.circle.description}</span>
          </div>
        </div>
      </div>
      <Button
        className={`w-full h-10 mt-3 md:w-24 md:h-10 !bg-gray-200 hover:!bg-gray-300 gap-1`}
        variant="third"
        onClick={handleClick}
      >
        <Icon icon="check" className="text-[16px]" />
        신청하기
      </Button>
    </div>
  );
}
