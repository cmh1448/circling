import { Notification } from "@/models/Notification";
import Button from "../base/Button";
import Icon from "../base/Icon";

interface NotificationItemProps {
  noti: Notification;
}

export default function NotificationItem(props: NotificationItemProps) {
  return (
    <div
      className="w-full bg-white p-3 shadow rounded-lg active:scale-95 transition-all"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div className=" flex">
        <span className="text-xl font-bold">{props.noti.title}</span>
        <div className="flex-1" />
      </div>
      <div className=" text-gray-500">{props.noti.content}</div>
    </div>
  );
}
