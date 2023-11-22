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
import ManageCirclePage from "@/features/circle/pages/ManageCirclePage";
import ChatListPage from "@/features/chat/pages/ChatListPage";
import ChatPage from "@/features/chat/pages/ChatPage";

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
      path: "/circles/:circleId/manage",
      element: <ManageCirclePage />,
    },
    {
      path: "/activity",
      element: <MyActivity />,
    },
    {
      path: "/chat",
      element: <ChatListPage />,
    },
    {
      path: "/chat/:id",
      element: <ChatPage />,
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
