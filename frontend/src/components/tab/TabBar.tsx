import Icon from "../base/Icon";
import TabBarItem from "./TabBarItem";

export interface TabItem {
  name: string;
  icon: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  selectedTab?: TabItem;
  onTabChange?: (index: TabItem) => void;
}

export default function TabBar(props: TabBarProps) {
  return (
    <div className="flex gap-2">
      {props.tabs.map((it, index) => {
        return (
          <TabBarItem
            onClick={() => props.onTabChange(it)}
            tab={it}
            selected={it.name === props.selectedTab?.name}
          />
        );
      })}
    </div>
  );
}
