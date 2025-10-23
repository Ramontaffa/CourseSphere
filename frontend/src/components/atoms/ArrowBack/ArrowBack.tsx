import { ArrowLeft } from "lucide-react";

export default function ArrowBack({ onClick }: { onClick?: () => void }) {
  return (
    <div className="cursor-pointer">
      <ArrowLeft aria-label="Voltar" size={24} onClick={onClick} />
    </div>
  );
}