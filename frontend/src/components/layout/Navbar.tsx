'use client';

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user } = useAuth();

  const Logout = () => {
    // Implement logout functionality here
    console.log("User logged out");
  };

  return (
    <nav className="flex w-full items-center justify-between border-b bg-white p-4 shadow-sm dark:bg-gray-800">
      <h1 className="text-xl font-bold">CourseSphere</h1>
      <div className="flex items-center gap-4">
        <p>{user ? user.name : "Usuário"}</p>
        <Button variant="outline" onClick={Logout}>Logout</Button>
      </div>
    </nav>
  );
}