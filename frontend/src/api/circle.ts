import { Circle, Follower } from "@/models/Circle";
import axios from "./axios";

export const fetchAllCircleList = async () => {
  return (await axios.get("/api/circles")).data as Circle[];
};

export const fetchFollowingCircles = async () => {
  return (await axios.get("/api/circles/my/followed")).data as Follower[];
};

export const fetchCircleById = async (id: number) => {
  return (await axios.get(`/api/circles/${id}`)).data as Circle;
};

export const followCircle = async (id: number) => {
  return (await axios.post(`/api/circles/${id}/follow`)) as Follower;
};

export const unfollowCircle = async (id: number) => {
  (await axios.post(`/api/circles/${id}/unfollow`)) as Follower;
};
