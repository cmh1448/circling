import { ReactNode, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { CSSTransition } from "react-transition-group";
import exp from "constants";
import { DropDownItem } from "@/models/DropDown";
import { useOnClickOutside } from "usehooks-ts";
export interface DropDownProps {
  items: DropDownItem[];
  selected?: DropDownItem;
  placeholder?: string;
  className?: string;

  onItemClick?: (val: DropDownItem) => void;
}

export default function DropDown({
  items,
  onItemClick,
  className,
  selected,
  placeholder = "클릭하여 선택",
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (selected: DropDownItem) => {
    onItemClick && onItemClick(selected);
  };

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  return (
    <div className="flex-none p-2">
      <button
        ref={ref}
        onClick={toggleExpanded}
        className={`${
          expanded ? "bg-slate-200" : ""
        } flex flex-row justify-between gap-2 p-2 text-gray-700 bg-slate-100 rounded-lg focus:outline-none ${className}`}
      >
        <span>
          {selected ? (
            selected.display
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </span>
        <Icon icon="expand_more" />
      </button>
      <CSSTransition
        timeout={300}
        in={expanded}
        classNames="fade"
        unmountOnExit
      >
        <div className="flex flex-col absolute z-10 bg-white min-w-[120px] rounded-lg shadow overflow-hidden">
          {items.map((it) => (
            <span
              onClick={() => handleItemClick(it)}
              className=" hover:bg-gray-100 transition-colors p-2 cursor-pointer"
            >
              {it.display}
            </span>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
