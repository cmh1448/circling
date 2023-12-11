import { Notification } from "@/models/Notification";
import { removeTags } from "@/utils/HTMLUtils";
import { useMemo } from "react";

interface NotificationPopupItemProps {
  noti: Notification;
  progress: number;

  onClick?: () => void;
}

export default function NotificationPopupItem(
  props: NotificationPopupItemProps
) {
  const textContent = useMemo(
    () => props.noti.content && removeTags(props.noti.content),
    [props.noti.content]
  );

  return (
    <div
      className=" min-w-[300px] max-w-[40%] w-fit bg-white shadow-lg rounded-lg active:scale-95 transition-all select-none pointer-events-auto overflow-hidden"
      onClick={props.onClick}
    >
      <div className="p-3">
        <span className="text-xl font-bold">{props.noti.title}</span>
        <div className=" text-gray-500">{textContent}</div>
      </div>
      <div className="flex items-center ">
        <div className="h-1 w-full bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${props.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
