import Icon from "../base/Icon";
import { TabItem } from "./TabBar";

interface TabBarItemProps {
  tab: TabItem;
  selected: boolean;
  onClick?: () => void;
}

export default function TabBarItem(props: TabBarItemProps) {
  return (
    <div
      onClick={props.onClick}
      className={`px-4 py-2 cursor-pointer rounded transition-all bg-gray-200 text-xl select-none flex gap-1 items-center ${
        props.selected ? "!bg-blue-500 !text-white" : ""
      }`}
    >
      {props?.tab.icon ? <Icon icon={props.tab.icon} /> : null}
      {props.tab.name}
    </div>
  );
}
