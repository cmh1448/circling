import { Notification } from "@/models/Notification";
import api from "@/api";
import { notificationStore } from "@/stores/notiStore";
import { useStore } from "zustand";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { removeTags } from "@/utils/HTMLUtils";

interface NotificationItemProps {
  noti: Notification;
}

export default function NotificationItem(props: NotificationItemProps) {
  const notiContext = useStore(notificationStore);

  const textContent = useMemo(
    () => props.noti.content && removeTags(props.noti.content),
    [props.noti.content]
  );

  const navigate = useNavigate();

  const handleClick = () => {
    const removedNoti = notiContext.popNotification(props.noti.id);
    api.notification
      .deleteNotification(props.noti.id)
      .catch(() => notiContext.addNotification(removedNoti));

    if (props.noti.link) navigate(props.noti.link);
  };

  return (
    <div
      className="w-full bg-white p-3 shadow border border-gray-200 rounded-lg active:scale-95 transition-all"
      onClick={handleClick}
    >
      <div className=" flex">
        <span className="text-xl font-bold">{props.noti.title}</span>
        <div className="flex-1" />
      </div>
      <div className=" text-gray-500">{textContent}</div>
    </div>
  );
}
