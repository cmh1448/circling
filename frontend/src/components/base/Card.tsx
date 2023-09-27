import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card(props: CardProps) {
  return (
    <div className={`p-4 rounded-md bg-gray-100 ${props.className}`}>
      {props.children}
    </div>
  );
}
