import { Button } from "@atoms/Button/button";

interface AuthProfileProps {
  userName: string;
  onLogout: () => void;
}

export function AuthProfile({ userName, onLogout }: AuthProfileProps) {
  return (
    <div className="flex items-center gap-4">
      <p>{userName}</p>
      <Button variant="outline" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}