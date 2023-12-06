import { Notification } from "@/models/Notification";

interface NotificationPopupItemProps {
  noti: Notification;
  progress: number;
}

export default function NotificationPopupItem(
  props: NotificationPopupItemProps
) {
  return (
    <div className="w-60 bg-white shadow-lg rounded-lg active:scale-95 transition-all select-none pointer-events-auto overflow-hidden">
      <div className="p-3">
        <span className="text-xl font-bold">{props.noti.title}</span>
        <div className=" text-gray-500">{props.noti.content}</div>
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
