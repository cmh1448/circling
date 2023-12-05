import { Notification } from "@/models/Notification";
import { createStore } from "zustand";
import { AuthContext } from "./authStore";
import { EventSourcePolyfill } from "event-source-polyfill";

export interface NotiContext {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;

  eventSource: EventSource | null;
  setEventSource: (eventSource: EventSource) => void;
  closeEventSource: () => void;
  startListen: (authContext: AuthContext) => void;

  toShows: Notification[];
  pushToShow: (notification: Notification) => void;
  popToShow: () => void;
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
    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
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
            console.log("new notification", data);
            set((state) => ({
              notifications: [...state.notifications, data],
              toShows: [...state.toShows, data],
            }));
          }
        }
      };

      set({ eventSource });
    },

    toShows: [],
    pushToShow: (notification) => {
      set((state) => ({
        toShows: [...state.toShows, notification],
      }));
    },
    popToShow: () => {
      set((state) => ({
        toShows: state.toShows.slice(1),
      }));
    },
  };
});
