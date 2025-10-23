'use client';

import ArrowBack from "@atoms/ArrowBack/ArrowBack";
import { useRouter } from "next/navigation";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  return (
    <div className="flex justify-between items-center gap-4">
      <ArrowBack onClick={handleBack} />
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}