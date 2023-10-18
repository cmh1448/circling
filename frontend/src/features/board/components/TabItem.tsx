import { useMemo } from "react";

export interface TabItemProps {
  title: string;
  selected?: boolean;
  primary?: boolean;

  className?: string;

  onClick?: () => void;
}

const styles = {
  blue: {
    selected: "bg-blue-500 text-white",
    idle: "hover:bg-blue-500 text-blue-500 hover:text-white border-blue-500",
  },
  gray: {
    selected: "bg-gray-700 text-white",
    idle: "hover:bg-gray-700 text-gray-700 hover:text-white border-gray-700",
  },
};

export default function TabItem(props: TabItemProps) {
  const { selected = false } = props;

  return (
    <div
      className={`flex gap-1 border cursor-pointer select-none rounded-full p-2 ${
        selected
          ? props.primary
            ? styles.blue.selected
            : styles.gray.selected
          : null
      } transition-all ${props.primary ? styles.blue.idle : styles.gray.idle} ${
        props.className
      }`}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      {props.title}
    </div>
  );
}
