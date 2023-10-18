import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useScrollContext } from "@components/pages/PageContainer.tsx";
import { useScrollDirection } from "@/hooks/scrollHook.ts";

export interface ActionButtonProps {
  children?: ReactNode;

  className?: string;
  show?: boolean;
}

export default function ActionButton(props: ActionButtonProps) {
  const { show = true } = props;

  const scrollRef = useScrollContext();
  const scrollDirection = useScrollDirection(scrollRef);

  return createPortal(
    <CSSTransition
      timeout={300}
      in={show}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`absolute bottom-10 right-10 aspect-square active:shadow-none active:scale-[0.98] transition-all rounded-full min-w-[70px] cursor-pointer shadow-lg bg-blue-500 z-10 flex items-center justify-center ${props.className}`}
        style={{
          scale: scrollDirection === "down" ? "0" : "1",
        }}
      >
        {props.children}
      </div>
    </CSSTransition>,
    document.querySelector("#root") as HTMLElement,
  );
}
