import { Navigation } from "@/models/Navigation";
import DrawerItem from "./DrawerItem";
import Drawer, { DrawerProps } from "../base/Drawer";
import { useEffect } from "react";
import { useStore } from "zustand";
import { notificationStore } from "@/stores/notiStore";
import api from "@/api";

export interface NaviagtionDrawerProps extends DrawerProps {
  navigations: Navigation[];
  selected?: Navigation;
  onSelected?: (selected: Navigation) => void;
}

export default function NavigationDrawer({
  onSelected,
  ...props
}: Omit<NaviagtionDrawerProps, "children">) {
  return (
    <Drawer {...props}>
      <div className="flex flex-col gap-2 items-end">
        {props.navigations.map((nav) => (
          <DrawerItem
            key={nav.path}
            navigation={nav}
            isSelected={props.selected === nav}
            onSelect={onSelected}
          />
        ))}
      </div>
    </Drawer>
  );
}
