import { Circle } from "./Circle";
import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  content?: string;
  comments?: number;
  category: Category;

  createdBy: User;
  lastModifiedBy: User;
  createdAt: string;
  lastModifiedAt: string;
}

export interface Category {
  id: number;
  title: string;
  priority?: number;
  circle: Circle;
}

export interface Comment {
  content: string;

  createdBy: User;
  lastModifiedBy: User;
  createdAt: string;
  lastModifiedAt: string;
}
