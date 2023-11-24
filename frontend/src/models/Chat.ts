import { User } from "./User";

export interface LastChatMessage {
  content: string;
  timestamp: string;
  sender: User;
  receiver: User;
}

export interface Message {
  content: string;
  timestamp: string;
  sender: string;
  receiver: string;
}

export interface MessageRequest {
  receiver: string;
  content: string;
}

export interface AuthRequest {
  jwtToken: string;
}
