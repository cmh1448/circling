import { User } from "./User";

export interface LastChatMessage {
  content: string;
  timestamp: string;
  sender: User;
  receiver: User;
}
