import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export const useScrollDirection = (
  ref: React.RefObject<HTMLElement>,
): ScrollDirection => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");
  const lastScrollTop = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollTop = ref.current.scrollTop;

        if (scrollTop > lastScrollTop.current) {
          setScrollDirection("down");
        } else if (scrollTop < lastScrollTop.current) {
          setScrollDirection("up");
        }

        lastScrollTop.current = scrollTop;
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [ref]);

  return scrollDirection;
};
