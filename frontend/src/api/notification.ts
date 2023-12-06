import { Notification } from "@/models/Notification";
import axios from "./axios";

export const fetchNotifications = async () => {
  const response = await axios.get(`/api/notifications/my`);
  return response.data as Notification[];
};

export const deleteNotification = async (id: string) => {
  await axios.delete(`/api/notifications/${id}`);
};

export const deleteMyNotifications = async () => {
  await axios.delete(`/api/notifications/my`);
};
