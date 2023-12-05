import { createPortal } from "react-dom";
import Drawer, { DrawerProps } from "../base/Drawer";
import api from "@/api";
import { notificationStore } from "@/stores/notiStore";
import { useEffect } from "react";
import { useStore } from "zustand";
import { EventSourcePolyfill } from "event-source-polyfill";
import { authStore } from "@/stores/authStore";
import NotificationItem from "./NotificationItem";

interface NotificationDrawerProps extends DrawerProps {}

export default function NotificationDrawer(props: NotificationDrawerProps) {
  const notiContext = useStore(notificationStore);
  const authContext = useStore(authStore);

  useEffect(() => {
    console.log("NOTI", notiContext.notifications);
  }, [notiContext.notifications]);

  useEffect(() => {
    if (notiContext.notifications.length === 0 && !notiContext.eventSource) {
      api.notification.fetchNotifications().then((res) => {
        notiContext.setNotifications(res);
        notiContext.startListen(authContext);
      });
    }
  }, []);

  return (
    <Drawer {...props}>
      <div className="h-full">
        <div className="flex flex-col gap-2">
          {notiContext.notifications.map((noti) => {
            return <NotificationItem noti={noti} />;
          })}
        </div>
      </div>
    </Drawer>
  );
}
