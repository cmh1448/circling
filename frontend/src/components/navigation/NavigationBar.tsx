import { Navigation } from "@/models/Navigation";
import Logo from "../Logo";
import Icon from "../base/Icon";
import Drawer from "./Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "zustand";
import { uiStore } from "@/stores/uiStore";

export interface NavBarProps {
  navigations: Navigation[];
}

export default function NavigationBar(props: NavBarProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const uiContext = useStore(uiStore);

  const curNav = () => {
    return props.navigations.find((it) =>
      location.pathname.startsWith(it.path!)
    );
  };

  const handleSelect = (selected: Navigation) => {
    if (selected.path) navigate(selected.path);
    setDrawerOpened(false);
  };

  const navIcon = () => {
    if (curNav()) return curNav()?.icon;
    else return uiContext.navigation?.icon;
  };

  const navTitle = () => {
    if (curNav()) return curNav()?.title;
    else return uiContext.navigation?.title;
  };

  const navExist = () => curNav() || uiContext.navigation;

  return (
    <div className="w-full h-[50px] flex justify-center px-4 py-3 bg-transparent absolute top-0 left-0 backdrop-blur-lg z-40">
      <div className="w-full flex items-center">
        {navExist() ? (
          <div className="flex gap-1 items-center">
            <Icon icon={navIcon()!} />
            <span className="text-xl font-bold text-gray-800">
              {navTitle()}
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
