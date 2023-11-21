import Icon from "@/components/base/Icon";
import { Circle } from "@/models/Circle";

export interface CircleLogoProps {
  circle?: Circle;

  className?: string;
}

export default function CircleLogo(props: CircleLogoProps) {
  return (
    <div
      className={`aspect-square w-20 bg-gray-300 rounded-full flex items-center justify-center ${props.className}`}
    >
      <Icon icon="strategy" className="text-4xl text-gray-700" />
    </div>
  );
}
