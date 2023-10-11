import { Navigation } from "@/models/Navigation";
import Logo from "../Logo";
import Icon from "../base/Icon";
import Drawer from "./Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface NavBarProps {
  navigations: Navigation[];
}

export default function NavigationBar(props: NavBarProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const curNav = () => {
    return props.navigations.find((it) =>
      location.pathname.startsWith(it.path!)
    );
  };

  const handleSelect = (selected: Navigation) => {
    if (selected.path) navigate(selected.path);
    setDrawerOpened(false);
  };

  return (
    <div className="w-full h-[50px] flex justify-center px-4 py-3 bg-transparent absolute top-0 left-0 backdrop-blur-lg z-40">
      <div className="w-full flex items-center">
        {curNav() ? (
          <div className="flex gap-1 items-center">
            {curNav()?.icon ? <Icon icon={curNav()?.icon!} /> : null}
            <span className="text-xl font-bold text-gray-800">
              {curNav()?.title}
            </span>
          </div>
        ) : (
          <Logo size="small" />
        )}

        <div className="flex-1" />
        <div className="flex gap-2 items-center text-gray-700">
          <Icon icon="notifications" />
          <Icon
            icon="menu"
            className="text-2xl active:scale-90 cursor-pointer select-none"
            onClick={() => setDrawerOpened(true)}
          />
        </div>
      </div>
      <Drawer
        navigations={props.navigations}
        selected={curNav()}
        onSelected={handleSelect}
        opened={drawerOpened}
        onClosed={() => setDrawerOpened(false)}
      />
    </div>
  );
}
