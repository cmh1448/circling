import { LastChatMessage, Message } from "@/models/Chat";
import axios from "./axios";
import { User } from "@/models/User";

export const fetchLastChatMessages = async () => {
  const response = await axios.get(`/api/chat/logs/last`);
  return response.data as LastChatMessage[];
};

export const fetchChatMessages = async (target: string) => {
  const response = await axios.get(`/api/chat/logs/${target}/cached`);
  return response.data as Message[];
};

export const fetchAvailableUsers = async () => {
  const response = await axios.get(`/api/chat/users/available`);
  return response.data as User[];
};
