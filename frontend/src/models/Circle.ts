import { User } from "./User";

export interface Circle {
  id: number;
  name: string;
  description: string;
  members?: number;
  followers?: number;
  leader?: User;
}

export interface Follower {
  circle: Circle;

  type: "MEMBER" | "FOLLOWER";
}

export interface Register {
  id: number;
  circle: Circle;
  message?: string;
  createdBy: User;
  createdAt: string;
  lastModifiedBy: User;
  lastModifiedAt: string;
}
