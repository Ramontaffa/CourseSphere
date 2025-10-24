import { Button } from "@atoms/Button/button";
import { CourseList } from "@organisms/CourseList/CourseList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col justify-start w-full">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h1 className="text-4xl font-bold">Seus Cursos</h1>
        <Link href="/course/create">
          <Button className="text-main-dark-green bg-white border border-main-dark-green hover:bg-main-dark-green-hover hover:text-white font-semibold">
            <Plus /> Criar curso
          </Button>
        </Link>
      </div>
      <div className="mt-8 w-full">
        <CourseList />
      </div>
    </main>
  );
}
