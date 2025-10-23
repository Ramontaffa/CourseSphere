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


  return (
    <nav className="flex w-full items-center justify-between border-b p-4 shadow-sm bg-main-dark-blue">
      <h1 className="text-xl font-bold text-white">CourseSphere</h1>

      <AuthProfile userName={String(user?.name ?? '')} onLogout={Logout} />
    </nav>
  );
}