import "./App.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { routes } from "./routers/routes.tsx";
import { useLocation, useRoutes } from "react-router-dom";

function App() {
  const [activeRoutes, setActiveRoutes] = useState(routes.NotLogin);
  const location = useLocation();

  const statefulRoutes = useRoutes(activeRoutes);

  return (
    <>
      <div className={"h-full flex flex-col overflow-hidden"}>
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
