import { createStore } from "zustand";

export interface NavigationContext {
  icon: string;
  title: string;
}

export interface UIContext {
  navigation?: NavigationContext;

  setNavigation: (nav: NavigationContext | undefined) => void;
}

export const uiStore = createStore<UIContext>((set, get) => {
  return {
    setNavigation(nav) {
      set({
        navigation: nav,
      });
    },
  };
});
