import { Notification } from "@/models/Notification";
import api from "@/api";
import { notificationStore } from "@/stores/notiStore";
import { useStore } from "zustand";

interface NotificationItemProps {
  noti: Notification;
}

export default function NotificationItem(props: NotificationItemProps) {
  const notiContext = useStore(notificationStore);

  const handleDelete = () => {
    const removedNoti = notiContext.popNotification(props.noti.id);
    api.notification
      .deleteNotification(props.noti.id)
      .catch(() => notiContext.addNotification(removedNoti));
  };

  return (
    <div
      className="w-full bg-white p-3 shadow rounded-lg active:scale-95 transition-all"
      onClick={handleDelete}
    >
      <div className=" flex">
        <span className="text-xl font-bold">{props.noti.title}</span>
        <div className="flex-1" />
      </div>
      <div className=" text-gray-500">{props.noti.content}</div>
    </div>
  );
}
