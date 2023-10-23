import { Category, Post, PostRequest } from "@/models/Board";
import axios from "./axios";
import { Page, Pageable } from "@/models/Pagination";

export const fetchCategoriesByCircleId = async (circleId: number) => {
  const response = await axios.get(`/api/circles/${circleId}/categories`);
  return response.data as Category[];
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
