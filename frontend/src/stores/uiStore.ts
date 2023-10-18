import { Circle } from "@/models/Circle";
import { createStore } from "zustand";

export interface NavigationContext {
  icon: string;
  title: string;
}

export interface UIContext {
  navigation?: NavigationContext;
  isLoading: boolean;

  setNavigation: (nav: NavigationContext | undefined) => void;
  clearNavigation: () => void;
  setCurrentCircle: (circle: Circle | undefined) => void;
  setIsLoading: (val: boolean) => void;
}

export const uiStore = createStore<UIContext>((set, get) => {
  return {
    isLoading: false,
    setIsLoading(val) {
      set({
        isLoading: val,
      });
    },
    setNavigation(nav) {
      set({
        navigation: nav,
      });
    },
    clearNavigation() {
      set({
        navigation: undefined,
      });
    },
    setCurrentCircle(circle) {
      set({
        navigation: {
          title: circle?.name!,
          icon: "strategy",
        },
      });
    },
  };
});
