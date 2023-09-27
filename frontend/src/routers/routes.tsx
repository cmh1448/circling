import { RouteObject } from "react-router-dom";
import WelcomePage from "@features/welcome/pages/WelcomePage.tsx";
import LoginPage from "@/features/login/pages/LoginPage";
import FeedPage from "@/features/feed/pages/FeedPage";
import ExplorePage from "@/features/explore/pages/ExplorePage";

export type RouteContext = "NotLogin" | "Login";

export const routes: Record<RouteContext, RouteObject[]> = {
  Login: [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/feeds",
      element: <FeedPage />,
    },
    {
      path: "/explore",
      element: <ExplorePage />,
    },
  ],
  NotLogin: [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/*",
      element: <LoginPage />,
    },
  ],
};
