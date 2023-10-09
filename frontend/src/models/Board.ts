import { User } from "./User";

export interface Post {
  title: string;
  content: string;

  createdBy: User;
  lastModifiedBy: User;
  createdAt: string;
  lastModifiedAt: string;
}