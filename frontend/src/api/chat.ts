import { LastChatMessage, Message } from "@/models/Chat";
import axios from "./axios";

export const fetchLastChatMessages = async () => {
  const response = await axios.get(`/api/chat/logs/last`);
  return response.data as LastChatMessage[];
};

export const fetchChatMessages = async (target: string) => {
  const response = await axios.get(`/api/chat/logs/${target}/cached`);
  return response.data as Message[];
};
