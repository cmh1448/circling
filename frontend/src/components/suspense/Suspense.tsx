import { ReactNode } from "react";

export interface SuspenseProps {
  children?: ReactNode;
  isLoading: boolean;
  fallback?: ReactNode;
}

export default function Suspense({
  children,
  isLoading,
  fallback,
}: SuspenseProps) {
  return <>{ isLoading ? fallback : children }</>;
}
