import { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  if (!children) return null;

  return (
    <p role="alert" className="text-sm font-medium text-red-500">
      {children}
    </p>
  );
}