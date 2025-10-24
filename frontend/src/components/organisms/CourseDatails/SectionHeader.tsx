"use client";

import { ReactNode } from "react";

export type SectionHeaderProps = {
  title: string;
  showButton?: boolean;
  children?: ReactNode;
  className?: string;
};

export function SectionHeader({ title, showButton = true, children, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-start mb-4 ${className}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {showButton ? children : null}
    </div>
  );
}
