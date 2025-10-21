'use client';

import { useAuth } from "@/context/AuthContext";
import { AuthProfile } from "@molecules/AuthProfile/AuthProfile";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const Logout = async () => {
    try {
      logout();
    } catch (err) {
      console.error('Logout failed', err);
      router.replace('/login');
    }
  };

  const userName = user ? user.name : "Usuário";

  return (
    <nav className="flex w-full items-center justify-between border-b bg-white p-4 shadow-sm dark:bg-gray-800">
      <h1 className="text-xl font-bold">CourseSphere</h1>

      <AuthProfile userName={userName} onLogout={Logout} />
    </nav>
  );
}