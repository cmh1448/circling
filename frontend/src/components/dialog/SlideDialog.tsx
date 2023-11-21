import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import Icon from "../base/Icon";

interface SlideDialogProps {
  opened: boolean;
  onClosed: () => void;

  children: React.ReactNode;
}

export default function SlideDlialog(props: SlideDialogProps) {
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
          className="absolute top-0 left-0 backdrop-blur w-full h-full z-50 bg-black/30"
          style={{
            pointerEvents: props.opened ? "all" : "none",
          }}
          onClick={() => props.onClosed()}
        />
      </CSSTransition>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          pointerEvents: props.opened ? "all" : "none",
        }}
      >
        <CSSTransition
          timeout={300}
          in={props.opened}
          classNames="popup"
          mountOnEnter
          unmountOnExit
        >
          <div className="absolute bottom-0 left-0 w-full h-[80%] z-50 flex flex-col justify-end items-center ">
            <div className="w-[calc(100%-30px)] bg-white rounded-t-lg shadow-2xl h-full overflow-y-auto apply-scrollbar px-3 py-2">
              {props.children}
            </div>
          </div>
        </CSSTransition>
      </div>
    </>,
    document.querySelector("#root") as HTMLElement
  );
}
