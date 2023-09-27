import Icon from "../base/Icon";
import { Navigation } from "@/models/Navigation";
import DrawerItem from "./DrawerItem";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
export interface DrawerProps {
  navigations: Navigation[];
  selected?: Navigation;
  opened?: boolean;

  onSelected?: (selected: Navigation) => void;
  onClosed: () => void;
}

export default function Drawer(props: DrawerProps) {
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
          className="absolute top-0 left-0 backdrop-blur w-full h-full z-10 bg-white/30"
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
          classNames="slide"
          mountOnEnter
          unmountOnExit
        >
          <div
            className="absolute top-0 left-0 w-full p-4  h-full z-20"
            onClick={() => props.onClosed()}
          >
            <div className="flex justify-end">
              <Icon
                icon="close"
                className="active:scale-90 cursor-pointer select-none"
                onClick={() => props.onClosed()}
              />
            </div>
            <div className="py-4 gap-4 flex flex-col items-end px-8">
              {props.navigations.map((nav) => (
                <DrawerItem
                  key={nav.path}
                  navigation={nav}
                  isSelected={props.selected === nav}
                  onSelect={props.onSelected}
                />
              ))}
            </div>
          </div>
        </CSSTransition>
      </div>
    </>,
    document.querySelector("#root") as HTMLElement
  );
}
