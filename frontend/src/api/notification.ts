import { Notification } from "@/models/Notification";
import axios from "./axios";

export const fetchNotifications = async () => {
  const response = await axios.get(`/api/notifications/my`);
  return response.data as Notification[];
};
