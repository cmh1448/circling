import { RouteObject } from "react-router-dom";
import WelcomePage from "@features/welcome/pages/WelcomePage.tsx";
import LoginPage from "@/features/login/pages/LoginPage";
import FeedPage from "@/features/circle/pages/FeedPage";
import ExplorePage from "@/features/explore/pages/ExplorePage";
import MyCirclesPage from "@/features/circle/pages/MyCirclesPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import CircleBoardPage from "@/features/circle/pages/CircleBoardPage";
import RegisterPage from "@/features/login/pages/RegisterPage";

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
      path: "/my-circles",
      element: <MyCirclesPage />,
    },
    {
      path: "/explore",
      element: <ExplorePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/circles/:id",
      element: <CircleBoardPage />,
    },
  ],
  NotLogin: [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/*",
      element: <LoginPage />,
    },
  ],
};
