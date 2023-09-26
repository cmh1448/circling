import { HTMLAttributes } from "react";

const styles = {
  line: "w-px h-full",
  dot: "w-[4px] h-[4px] rounded-full",
};

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant: "line" | "dot";
}

export default function Divider({ variant = "line", className }: DividerProps) {
  const getStyles = () => {
    return styles[variant];
  };

  return <span className={`${getStyles()} bg-gray-500 ${className}`} />;
}
