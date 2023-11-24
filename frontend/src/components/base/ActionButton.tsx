import { ReactNode } from "react";
import { useScrollContext } from "@components/pages/PageContainer.tsx";
import { useScrollDirection } from "@/hooks/scrollHook.ts";
import { createPortal } from "react-dom";

export interface ActionButtonProps {
  children?: ReactNode;

  className?: string;
  show?: boolean;

  onClick: () => void;
}

export default function ActionButton(props: ActionButtonProps) {
  const scrollRef = useScrollContext();
  const scrollDirection = useScrollDirection(scrollRef);

  return (
    <div
      onClick={props.onClick}
      className={`absolute bottom-10 right-5 md:right-10 aspect-square active:shadow-none 
      active:scale-[0.92] transition-all rounded-full min-w-[70px] cursor-pointer shadow-lg bg-blue-500 z-10 flex items-center justify-center ${props.className}`}
      style={{
        scale: scrollDirection === "down" ? "0" : "1",
      }}
    >
      {props.children}
    </div>
  );
}
