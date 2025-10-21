import Image from "next/image";
import { SplashImage } from "@/assets";

export default function authLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <main className="w-full md:w-3/8 bg-gray-50 dark:bg-gray-900">
          {children}
      </main>

      <aside className="md:w-5/8 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Image
          src={SplashImage}
          alt="CourseSphere Splash Image"
          className="object-cover w-full h-full"
        />
      </aside>
    </div>
  );
}