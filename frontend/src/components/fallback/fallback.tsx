import { ReactNode } from "react";
import Icon from "../base/Icon";

export interface FallBackProps {
  when: boolean;
  children?: ReactNode;
  actionPanel?: ReactNode;

  message?: string;
  icon?: string;
  className?: string;
}

export default function Fallback(props: FallBackProps) {
  const { message: text = "결과가 존재하지 않습니다.", icon = "mood_bad" } =
    props;
  return (
    <>
      {props.when ? (
        <div
          className={`w-full ${props.className} text-gray-400 flex flex-col items-center `}
        >
          {icon ? <Icon className="text-4xl" icon={icon} /> : null}
          <span className="text-xl">{text}</span>
          <div className="mt-2">{props.actionPanel}</div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
}
