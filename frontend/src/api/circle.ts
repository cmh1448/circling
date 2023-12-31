import { Circle, Follower, Register, RegisterRequest } from "@/models/Circle";
import axios from "./axios";
import { User } from "@/models/User";

export const fetchAllCircleList = async () => {
  return (await axios.get("/api/circles")).data as Circle[];
};

export const fetchManagigCircles = async () => {
  return (await axios.get("/api/circles/my/managing")).data as Circle[];
}

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

export const fetchMyRegister = async () => {
  const response = await axios.get(`/api/circles/registers/my`);
  return response.data as Register;
};

export const fetchToApproves = async () => {
  const response = await axios.get(`/api/circles/registers/approves`);
  return response.data as Register[];
};

export const fetchToApprovesByCircleId = async (id: number) => {
  const response = await axios.get(`/api/circles/${id}/registers/approves`);
  return response.data as Register[];
};

export const approveRegister = async (id: number) => {
  await axios.post(`/api/circles/registers/${id}/approve`);
};

export const fetchMyMemberedCircle = async () => {
  return (await axios.get("/api/circles/my/membered")).data as Follower;
};

export const fetchFollowersByCircle = async (id: number) => {
  return (await axios.get(`/api/circles/${id}/followers`)).data as User[];
};

export const fetchMembersByCircle = async (id: number) => {
  return (await axios.get(`/api/circles/${id}/members`)).data as User[];
};

export const deleteMember = async (circleId: number, email: string) => {
  await axios.delete(`/api/circles/${circleId}/members/${email}`);
};

export const registerToCircle = async (
  circleId: number,
  request: RegisterRequest
) => {
  return (await axios.post(
    `/api/circles/${circleId}/members/register`,
    request
  )) as Register;
};
