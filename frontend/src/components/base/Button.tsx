import { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "third";
  sizeType?: "big" | "normal" | "small";
  children: ReactNode;
  className?: string;

  onClick?: () => void;
}

const styles = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-blue-300 hover:bg-blue-400 text-white",
  third: "bg-slate-100 hover:bg-slate-200 text-blue-500 ",
};

const sizes = {
  big: "p-3",
  normal: "p-2",
  small: "p-1",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", sizeType = "normal" } = props;

  const getStyles = () => {
    return styles[variant];
  };

  const getSizeStyles = () => {
    return sizes[sizeType];
  };

  return (
    <button
      className={`rounded-lg flex items-center justify-center transition-all active:scale-90 select-none ${getStyles()} ${getSizeStyles()} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
