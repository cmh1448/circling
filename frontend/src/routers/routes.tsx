import { RouteObject } from "react-router-dom";
import WelcomePage from "@features/welcome/pages/WelcomePage.tsx";
import LoginPage from "@/features/login/pages/LoginPage";
import FeedPage from "@/features/circle/pages/FeedPage";
import ExplorePage from "@/features/explore/pages/ExplorePage";
import MyCirclesPage from "@/features/circle/pages/MyCirclesPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import CirclePostListPage from "@/features/board/pages/CirclePostListPage";
import RegisterPage from "@/features/login/pages/RegisterPage";
import PostViewPage from "@/features/board/pages/PostViewPage";
import NewPostPage from "@features/board/pages/NewPostPage.tsx";
import MyActivity from "@/features/activity/pages/MyActivity";

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
      element: <CirclePostListPage />,
    },
    {
      path: "/circles/board/posts/:id",
      element: <PostViewPage />,
    },
    {
      path: "/circles/:circleId/board/posts/new",
      element: <NewPostPage />,
    },
    {
      path: "/activity",
      element: <MyActivity />,
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
