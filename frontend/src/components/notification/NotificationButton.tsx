import { useState } from "react";
import Icon from "../base/Icon";

interface NotificationButtonProps {
  onClick?: () => void;
}

export default function NotificationButton(props: NotificationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer active:scale-90"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => props.onClick?.()}
    >
      <Icon className="transition-all" icon="notifications" fill={isHovered} />
    </div>
  );
}
