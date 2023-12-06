import { Notification } from "@/models/Notification";
import { createStore } from "zustand";
import { AuthContext } from "./authStore";
import { EventSourcePolyfill } from "event-source-polyfill";
import api from "@/api";

export interface NotiContext {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  popNotification: (id: string) => Notification;

  resetAndListen: (authContext: AuthContext) => void;
  refresh: () => void;

  firstFetching: boolean;

  eventSource: EventSource | null;
  setEventSource: (eventSource: EventSource) => void;
  closeEventSource: () => void;
  startListen: (authContext: AuthContext) => void;

  subscribeWhenNewNotification: (
    callback: (notification: Notification) => void
  ) => () => void;
  observers: ((notification: Notification) => void)[];
}

export const notificationStore = createStore<NotiContext>((set, get) => {
  return {
    notifications: [],
    setNotifications: (notifications) => {
      set({ notifications });
    },
    addNotification: (notification) => {
      set((state) => ({
        notifications: [...state.notifications, notification],
      }));
    },
    popNotification: (id) => {
      const notifications = get().notifications;
      const index = notifications.findIndex((n) => n.id === id);
      if (index === -1) {
        throw new Error("no such notification");
      }

      const notification = notifications[index];
      set((state) => ({
        notifications: [
          ...state.notifications.slice(0, index),
          ...state.notifications.slice(index + 1),
        ],
      }));

      return notification;
    },
    firstFetching: true,

    resetAndListen: (authContext) => {
      if (get().eventSource) {
        get().closeEventSource();
        set({ eventSource: null });
      }

      set({
        notifications: [],
        firstFetching: true,
      });

      api.notification.fetchNotifications().then((notifications) => {
        set({ notifications });
        get().startListen(authContext);
      });
    },

    refresh: () => {
      api.notification.fetchNotifications().then((notifications) => {
        set({ notifications });
      });
    },

    eventSource: null,
    setEventSource: (eventSource) => {
      set({ eventSource });
    },
    closeEventSource: () => {
      const eventSource = get().eventSource;
      if (eventSource) {
        eventSource.close();
      }
    },
    startListen: (authContext: AuthContext) => {
      const baseUrl = import.meta.env.MODE !== "development" ? "/circling" : "";
      const eventSource = new EventSourcePolyfill(
        baseUrl + "/api/notifications/connect",
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
          withCredentials: true,
        }
      );
      eventSource.onmessage = (e) => {
        if (!(e.data as string).startsWith("ERROR")) {
          const data = JSON.parse(e.data);

          // add to notifications if it is appropiate format
          if (data.content && data.title) {
            get().addNotification(data);

            // notify observers
            get().observers.forEach((observer) => {
              observer(data);
            });
          }
        }
      };

      set({ eventSource, firstFetching: false });
    },

    subscribeWhenNewNotification: (callback) => {
      const observers = get().observers;
      const index = observers.length;
      observers.push(callback);

      return () => {
        set((state) => ({
          observers: [
            ...state.observers.slice(0, index),
            ...state.observers.slice(index + 1),
          ],
        }));
      };
    },
    observers: [],
  };
});
