import { createPortal } from "react-dom";
import NotificationPopupItem from "./NotificationPopupItem";
import { Notification } from "@/models/Notification";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import { notificationStore } from "@/stores/notiStore";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { removeTags } from "@/utils/HTMLUtils";

interface ShowItem {
  noti: Notification;
  progress: number;
}

export default function NotificationPopup() {
  const notiContext = useStore(notificationStore);
  const [showingItems, setShowingItems] = useState<ShowItem[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigate = useNavigate();

  //remove item when progress is 100
  //add each items' progress by 1 every 10ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShowingItems((prev) => {
        const newItems = prev.map((item) => ({
          ...item,
          progress: item.progress + 1,
        }));
        return newItems.filter((item) => item.progress < 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  //subscribe to notification store to add new notification
  useEffect(() => {
    console.log("subscribe");
    if (isSubscribed) return;

    notiContext.subscribeWhenNewNotification((noti) => {
      const enabled = notificationStore.getState().notiPopupEnabled;
      if (enabled) {
        setShowingItems((prev) => [
          ...prev,
          {
            noti,
            progress: 0,
          },
        ]);
      }
    });
    console.log("subscribed", notiContext.observers.length);
    setIsSubscribed(true);
  }, []);

  const handleClick = (noti: Notification) => {
    api.notification
      .deleteNotification(noti.id)
      .then(() => notiContext.refresh());
    setShowingItems((prev) => prev.filter((item) => item.noti.id !== noti.id));

    if (noti.link) {
      navigate(noti.link);
    }
  };
  return createPortal(
    <div className="absolute flex flex-col items-end z-40 right-0 top-0 w-80 h-screen py-14 px-6  pointer-events-none">
      {showingItems.map((item) => (
        <div className="mt-2" key={item.noti.id}>
          <NotificationPopupItem
            noti={item.noti}
            progress={item.progress}
            onClick={() => handleClick(item.noti)}
          />
        </div>
      ))}
    </div>,
    document.querySelector("#root") as HTMLElement
  );
}
