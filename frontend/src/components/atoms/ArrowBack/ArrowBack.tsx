import { ArrowLeft } from "lucide-react";

export default function ArrowBack({ onClick }: { onClick?: () => void }) {
  return <ArrowLeft size={24} onClick={onClick} />;
}