import { ReactNode } from "react";

export interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
  return (
    <div className="w-full px-4 flex justify-center overflow-y-auto apply-scrollbar">
      <div className="w-full py-[50px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
        {props.children}
      </div>
    </div>
  );
}
