import { Notification } from "@/models/Notification";

interface NotificationPopupItemProps {
  noti: Notification;
  progress: number;

  onClick?: () => void;
}

export default function NotificationPopupItem(
  props: NotificationPopupItemProps
) {
  return (
    <div
      className=" min-w-[300px] max-w-[40%] w-fit bg-white shadow-lg rounded-lg active:scale-95 transition-all select-none pointer-events-auto overflow-hidden"
      onClick={props.onClick}
    >
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
