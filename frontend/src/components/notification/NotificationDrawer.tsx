import { createPortal } from "react-dom";
import Drawer, { DrawerProps } from "../base/Drawer";
import api from "@/api";
import { notificationStore } from "@/stores/notiStore";
import { useEffect } from "react";
import { useStore } from "zustand";
import { EventSourcePolyfill } from "event-source-polyfill";
import { authStore } from "@/stores/authStore";
import NotificationItem from "./NotificationItem";
import Fallback from "../fallback/fallback";
import Suspense from "../suspense/Suspense";
import Skeleton from "../base/Skeleton";
import Button from "../base/Button";
import Icon from "../base/Icon";

interface NotificationDrawerProps extends DrawerProps {}

export default function NotificationDrawer(props: NotificationDrawerProps) {
  const notiContext = useStore(notificationStore);
  const authContext = useStore(authStore);

  useEffect(() => {
    if (notiContext.notifications.length === 0 && !notiContext.eventSource) {
      notiContext.resetAndListen(authContext);
    }
  }, []);

  return (
    <Drawer {...props}>
      <div className="flex flex-col gap-2">
        {/* 모두 지우기 버튼 */}
        <Button
          className="text-sm w-fit flex items-center justify-center self-end"
          onClick={() => {
            api.notification.deleteMyNotifications().then(() => {
              notiContext.refresh();
            });
          }}
        >
          <Icon icon="delete" className="text-[20px]" fill />
          지우기
        </Button>
        <div className="flex justify-end flex-col gap-2">
          <Suspense
            isLoading={notiContext.firstFetching}
            fallback={
              <>
                {[...Array(5)].map(() => (
                  <Skeleton className="w-full h-14 mt-1 rounded" />
                ))}
              </>
            }
          >
            <Fallback
              when={notiContext.notifications.length === 0}
              message="알림이 존재하지 않습니다."
              icon="notifications"
              className="!text-white"
            >
              {notiContext.notifications.map((noti) => {
                return <NotificationItem noti={noti} />;
              })}
            </Fallback>
          </Suspense>
        </div>
      </div>
    </Drawer>
  );
}
