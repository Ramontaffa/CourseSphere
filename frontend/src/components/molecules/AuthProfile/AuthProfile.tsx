import { Button } from "@atoms/Button/button";
import { LogOut } from "lucide-react";

interface AuthProfileProps {
  userName: string;
  onLogout: () => void;
}

export function AuthProfile({ userName, onLogout }: AuthProfileProps) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-semibold hidden sm:block text-white">{userName}</p>
      <Button
        variant="outline"
        onClick={onLogout}
        className="text-main-dark-blue font-semibold border-none"
      >
        <LogOut />
        Sair
      </Button>
    </div>
  );
}