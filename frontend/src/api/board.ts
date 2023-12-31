import {
  Category,
  CategoryRequest,
  Comment,
  CommentRequest,
  Post,
  PostRequest,
} from "@/models/Board";
import axios from "./axios";
import { Page, Pageable } from "@/models/Pagination";

export const fetchCategoriesByCircleId = async (circleId: number) => {
  const response = await axios.get(`/api/circles/${circleId}/categories`);
  return response.data as Category[];
};

export const updateCategory = async (
  circleId: number,
  categoryId: number,
  request: CategoryRequest
) => {
  const response = await axios.patch(
    `/api/circles/${circleId}/categories/${categoryId}`,
    request
  );
  return response.data as Category;
};

export const createCategory = async (
  circleId: number,
  request: CategoryRequest
): Promise<Category> => {
  const response = await axios.post(
    `/api/circles/${circleId}/categories`,
    request
  );
  return response.data as Category;
};

export const fetchPostsByCircle = async (
  circleId: number,
  pageable: Pageable
) => {
  const response = await axios.get(
    `/api/circles/${circleId}/posts${pageable.toQueryString(true)}`
  );
  return response.data as Page<Post>;
};

export const fetchPostsByCategory = async (
  cateogryId: number,
  pageable: Pageable
) => {
  const response = await axios.get(
    `/api/categories/${cateogryId}/posts${pageable.toQueryString(true)}`
  );
  return response.data as Page<Post>;
};

export const fetchPostById = async (id: number) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data as Post;
};

export const uploadPost = async (categoryId: number, request: PostRequest) => {
  const response = await axios.post(
    `/api/categories/${categoryId}/posts`,
    request
  );
  return response.data as Post;
};

export const fetchFeedPosts = async (pageable: Pageable) => {
  const response = await axios.get(
    `/api/posts/feeds${pageable.toQueryString(true)}`
  );

  return response.data as Page<Post>;
};

export const fetchCommentsByPost = async (postId: number) => {
  const response = await axios.get(`/api/posts/${postId}/comments`);

  return response.data as Comment[];
};

export const uploadComment = async (postId: number, req: CommentRequest) => {
  const response = await axios.post(`/api/posts/${postId}/comments`, req);
  return response.data as Comment;
};

export const uploadReply = async (parentId: number, req: CommentRequest) => {
  const response = await axios.post(`/api/comments/${parentId}`, req);

  return response.data as Comment;
};

export const deleteReply = async (id: number) => {
  await axios.delete(`/api/comments/${id}`);
};

export const editReply = async (id: number, req: CommentRequest) => {
  const response = await axios.patch(`/api/comments/${id}`, req);

  return response.data as Comment;
};

export const deletePost = async (id: number) => {
  await axios.delete(`/api/posts/${id}`);
};

export const findMyPosts = async (
  sort: "createdAt" | "title" | "comments",
  reverse: boolean = false
) => {
  const response = await axios.get(`/api/posts/my`, {
    params: { sort, reverse },
  });
  return response.data as Post[];
};
