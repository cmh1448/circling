import {
  HTMLAttributes,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Scroll Context 생성
const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

export default function PageContainer(props: PageContainerProps) {
  const { children, ...attrs } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={scrollRef}>
      <div
        {...attrs}
        className={`w-full px-4 flex justify-center overflow-y-auto apply-scrollbar ${attrs.className}`}
        ref={scrollRef}
      >
        <div className="w-full flex flex-col items-center">
          <div className="w-full pt-[50px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
            {children}
          </div>
          <div className="flex py-4 w-full justify-center text-gray-300 text-sm">
            Copyright (C) 2023 MJU 칠면조 팀 all rights reserved.
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
