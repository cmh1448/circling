import { ReactNode } from "react";

export interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
  return (
    <div className="w-full px-4 flex justify-center overflow-y-auto apply-scrollbar">
      <div className="w-full flex flex-col items-center">
        <div className="w-full pt-[50px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
          {props.children}
        </div>
        <div className="flex py-4 w-full justify-center text-gray-300 text-sm">
          Copyright (C) 2023 MJU 칠면조 팀 all rights reserved.
        </div>
      </div>
    </div>
  );
}
