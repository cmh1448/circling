import Icon from "../base/Icon";
import { Navigation } from "@/models/Navigation";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

export interface DrawerProps {
  opened?: boolean;
  children: React.ReactNode;

  animation?: string;

  onClosed: () => void;
  className?: string;
}

export default function Drawer(props: DrawerProps) {
  const { animation = "slide" } = props;
  return createPortal(
    <>
      <CSSTransition
        timeout={300}
        in={props.opened}
        classNames="fade"
        mountOnEnter
        unmountOnExit
      >
        <div
          className={`absolute top-0 left-0 backdrop-blur w-full h-full z-50 bg-white/10 ${props.className}`}
          style={{
            pointerEvents: props.opened ? "all" : "none",
          }}
          onClick={() => props.onClosed()}
        />
      </CSSTransition>
      <div
        className="overflow-hidden absolute top-0 left-0 w-full h-full"
        style={{
          pointerEvents: props.opened ? "all" : "none",
        }}
      >
        <CSSTransition
          timeout={300}
          in={props.opened}
          classNames={animation}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="absolute top-0 left-0 w-full p-4  h-full z-50 flex flex-col"
            onClick={() => props.onClosed()}
          >
            <div className="flex justify-end">
              <Icon
                icon="close"
                className="active:scale-90 cursor-pointer select-none"
                onClick={() => props.onClosed()}
              />
            </div>
            <div className="py-4 px-8 overflow-y-auto flex-1 apply-scrollbar">
              {props.children}
            </div>
          </div>
        </CSSTransition>
      </div>
    </>,
    document.querySelector("#root") as HTMLElement
  );
}
