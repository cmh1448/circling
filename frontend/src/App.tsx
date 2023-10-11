import "./App.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { routes } from "./routers/routes.tsx";
import { useLocation, useRoutes } from "react-router-dom";
import { useStore } from "zustand";
import { authStore } from "./stores/authStore.ts";
import { Navigation } from "./models/Navigation.ts";
import NavigationBar from "./components/navigation/NavigationBar.tsx";

function App() {
  const authContext = useStore(authStore);
  const [activeRoutes, setActiveRoutes] = useState(routes.NotLogin);
  const location = useLocation();

  useEffect(() =>
    setActiveRoutes(
      authContext.isAuthenticated() ? routes.Login : routes.NotLogin
    )
  );

  const statefulRoutes = useRoutes(activeRoutes);

  const navigations: Navigation[] = [
    {
      title: "피드",
      icon: "feed",
      path: "/feeds",
    },
    {
      title: "내 동아리",
      icon: "book",
      path: "/my-circles",
    },
    {
      title: "동아리 찾기",
      icon: "explore",
      path: "/explore",
    },
    {
      title: "프로필",
      icon: "person",
      path: "/profile",
    },
  ];

  return (
    <>
      <div className={"h-full flex flex-col overflow-hidden"}>
        {authContext.isAuthenticated() ? (
          <NavigationBar navigations={navigations} />
        ) : null}
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={location.pathname}
            classNames={"scale"}
            timeout={300}
          >
            {statefulRoutes}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}

export default App;
