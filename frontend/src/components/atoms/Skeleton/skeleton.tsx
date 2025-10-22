"use client";

import * as React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      className={[
        "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export default Skeleton;
