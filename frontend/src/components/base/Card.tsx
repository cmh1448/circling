import { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, ...attrs }: CardProps) {
  return (
    <div {...attrs} className={`p-4 rounded-md bg-gray-100 ${attrs.className}`}>
      {children}
    </div>
  );
}
