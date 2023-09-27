import { Navigation } from "@/models/Navigation";
import Icon from "../base/Icon";

export interface DrawerItemProps {
  navigation: Navigation;
  isSelected?: boolean;

  onSelect?: (selected: Navigation) => void;
}

export default function DrawerItem(props: DrawerItemProps) {
  return (
    <div
      onClick={() => props.onSelect && props.onSelect(props.navigation)}
      className={`text-lg w-fit font-extrabold flex  gap-2 select-none active:scale-90 hover:scale-110 transition-all items-center cursor-pointer ${
        props.isSelected ? "text-blue-500 !text-2xl" : ""
      }`}
    >
      {props.navigation.icon ? (
        <Icon icon={props.navigation.icon} fill={props.isSelected} />
      ) : null}
      {props.navigation.title}
    </div>
  );
}
