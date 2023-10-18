import { User } from "./User";

export interface Post {
  title: string;
  content: string;

  createdBy: User;
  lastModifiedBy: User;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Comment {
  content: string;

  createdBy: User;
  lastModifiedBy: User;
  createdAt: string;
  lastModifiedAt: string;
}
