import { HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Section(props: SectionProps) {
  const { children, ...rest } = props;

  return (
    <div {...rest} className={`flex flex-col ${rest.className}`}>
      {children}
    </div>
  );
}
