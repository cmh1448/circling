import api from "@/api";
import { uiStore } from "@/stores/uiStore";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useStore } from "zustand";

export const adjustCurrentNavBar = (circleId: number) => {
  const uiContext = useStore(uiStore);
  const { data: currentCircle, isLoading } = useQuery(
    ["fetchCircleById", circleId],
    () => api.circle.fetchCircleById(circleId)
  );

  useEffect(() => {
    uiContext.setIsLoading(isLoading);
    uiContext.setCurrentCircle(currentCircle);
  }, [isLoading, currentCircle]);

  useEffect(() => {
    return () => {
      uiContext.clearNavigation();
    };
  }, []);
};
