import { useState } from "react";
import Icon from "./Icon";

export interface InputProps {
  icon?: string;
  placeholder?: string;
  type?: "text" | "password";
  error?: boolean;
  value?: string;

  onInput?: (val: string) => void;
  onEntered?: () => void;

  className?: string;
}

export default function Input(props: InputProps) {
  const {
    icon,
    placeholder,
    type = "text",
    error = false,
    onInput,
    onEntered,
  } = props;

  const [focused, setFocused] = useState(false);

  const getIconColor = (): string => {
    if (error) return "text-red-500";
    if (focused) return "text-blue-500";
    return "text-gray-500";
  };

  const getBorderColor = (): string => {
    if (error) return "border-red-500";
    if (focused) return "border-blue-500";
    return "border-transparent";
  };

  return (
    <div
      style={{ willChange: "border-color, color" }}
      className={`bg-gray-200 rounded-lg p-2 gap-2 flex items-center border-2 transition-colors ${getBorderColor()} ${
        props.className
      }`}
    >
      {icon ? <Icon icon={icon} fill className={getIconColor()} /> : null}

      <input
        type={type}
        className="bg-transparent w-full h-full text-gray-900"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={props.value}
        onInput={(e) => onInput && onInput(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEntered && !e.nativeEvent.isComposing)
            onEntered();
        }}
      />
    </div>
  );
}
