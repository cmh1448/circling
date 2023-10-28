import { ReactNode } from "react";

interface PaginationButtonProps {
  isEnabled?: boolean;
  children: ReactNode;

  onClick?: () => void;
}

export default function PaginationButton({
  isEnabled = false,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <div
      className={`bg-gray-100 aspect-square rounded-lg flex w-12 items-center justify-center active:scale-[0.94] transition-all cursor-pointer ${
        isEnabled ? "!bg-blue-100" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
