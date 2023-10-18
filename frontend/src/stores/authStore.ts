import api from "@/api";
import { User } from "@models/User";
import { AxiosError } from "axios";
import { DateTime } from "luxon";
import { createStore } from "zustand";

export interface AuthContext {
  user: User | null;
  accessToken: string | null;
  expireAt: string;
  isAuthenticated: () => boolean;

  login: (
    context: Omit<AuthContext, "isAuthenticated" | "login" | "logout">
  ) => void;

  logout: () => void;
}

const loadStoredContext = () => {
  const savedContext = JSON.parse(
    localStorage.getItem("AuthContext") ?? "{}"
  ) as AuthContext;

  return savedContext;
};

const updateSavedContext = (mapper: (context: AuthContext) => AuthContext) => {
  const current = loadStoredContext();
  const updated = mapper(current);

  localStorage.setItem("AuthContext", JSON.stringify(updated));
};

export const authStore = createStore<AuthContext>((set, get) => {
  const storedContext = loadStoredContext();

  return {
    user: storedContext?.user,
    accessToken: storedContext?.accessToken,
    expireAt: storedContext?.expireAt,
    isAuthenticated: () => isLogined(get()) ?? false,

    login: (context) => {
      set({
        user: context.user,
        accessToken: context.accessToken,
        expireAt: DateTime.fromFormat(
          context.expireAt,
          "yyyy-MM-dd HH:mm"
        ).toISO()!,
      });
    },

    logout: () => {
      set({
        user: undefined,
        accessToken: undefined,
        expireAt: undefined,
      });
    },
  };
});

const isLogined = (state: AuthContext) =>
  state.user && DateTime.fromISO(state.expireAt) > DateTime.now();

authStore.subscribe((val) => updateSavedContext(() => val));
