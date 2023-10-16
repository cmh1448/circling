import { Circle } from "@/models/Circle";
import axios from "./axios";

export const fetchAllCircleList = async () => {
  return (await axios.get("/api/circles")).data as Circle[];
};
