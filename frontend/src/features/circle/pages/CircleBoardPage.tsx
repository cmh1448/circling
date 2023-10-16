import PageContainer from "@/components/pages/PageContainer";
import { uiStore } from "@/stores/uiStore";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function CircleBoardPage() {
  const uiContext = useStore(uiStore);

  useEffect(() => {
    uiContext.setNavigation({
      icon: "strategy",
      title: "동아리 이름",
    });

    return () => {
      uiContext.setNavigation(undefined);
    }
  }, []);

  return <PageContainer>CircleBoardPage</PageContainer>;
}
