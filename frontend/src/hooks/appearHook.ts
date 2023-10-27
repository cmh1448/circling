import { MutableRefObject, useEffect, useState } from "react";

export const useIsVisible = (ref: MutableRefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState<"visible" | "hidden">("visible");

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible("visible");
    } else {
      setIsVisible("hidden");
    }
  });

  useEffect(() => {
    ref.current && observer.observe(ref.current);
    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  });

  return isVisible;
};
