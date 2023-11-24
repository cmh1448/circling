import { LastChatMessage } from "@/models/Chat";
import axios from "./axios";

export const fetchLastChatMessages = async () => {
  const response = await axios.get(`/api/chat/logs/last`);
  return response.data as LastChatMessage[];
};
