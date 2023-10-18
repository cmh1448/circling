import { authStore } from "@/stores/authStore";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.MODE !== "development" ? "/circling" : "",
});

instance.interceptors.request.use((req) => {
  const authContext = authStore.getState();
  if (authContext.isAuthenticated())
    req.headers.Authorization = `Bearer ${authContext.accessToken}`;

  return req;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default instance;
