import Image from "next/image";
import { SplashImage } from "@/assets";

export default function authLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="md:w-5/8 bg-gray-100 dark:bg-gray-800">
        <Image
          src={SplashImage}
          priority
          alt="CourseSphere Splash Image"
          className="object-cover w-full h-full"
        />
      </aside>
      
      <main className="w-full flex items-center justify-center min-h-screen md:w-3/8 p-8 bg-off-white dark:bg-gray-900">
        {children}
      </main>

    </div>
  );
}