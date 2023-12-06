import { useState } from "react";
import Icon from "../base/Icon";
import { useStore } from "zustand";
import { notificationStore } from "@/stores/notiStore";

interface NotificationButtonProps {
  onClick?: () => void;
}

export default function NotificationButton(props: NotificationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const notiContext = useStore(notificationStore);

  return (
    <div
      className="flex items-center cursor-pointer active:scale-90 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => props.onClick?.()}
    >
      <Icon className="transition-all" icon="notifications" fill={isHovered} />

      {notiContext.notifications.length !== 0 ? (
        <div className="absolute -top-1 -right-1 text-[11px] text-white bg-red-400 rounded-full w-4 flex items-center justify-center">
          {notiContext.notifications.length}
        </div>
      ) : null}
    </div>
  );
}
