import { LoginResult, SignUpRequest, User } from "@/models/User";
import axios from "./axios";

export const signIn = async (email: string, password: string) => {
  const result = await axios.post("/api/auth/sign-in", { email, password });
  return result.data as LoginResult;
};

export const signUp = async (req: SignUpRequest) => {
  const result = await axios.post("/api/auth/sign-up", { ...req });
  return result.data as User;
};
