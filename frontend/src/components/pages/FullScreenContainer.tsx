import {
  createContext,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useContext,
  useRef,
} from "react";

export interface FullScreenContainer extends HTMLAttributes<HTMLDivElement> {
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

export default function FullScreenContainer(props: FullScreenContainer) {
  const { children, ...attrs } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...attrs}
      className={`flex-1 flex flex-col overflow-hidden ${attrs.className}`}
    >
      <ScrollContext.Provider value={scrollRef}>
        <div
          className={`w-full px-4 flex justify-center overflow-y-scroll apply-scrollbar h-full`}
          ref={scrollRef}
        >
          <div className="w-full pt-[50px] md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col">
            {children}
          </div>
        </div>
      </ScrollContext.Provider>
    </div>
  );
}
