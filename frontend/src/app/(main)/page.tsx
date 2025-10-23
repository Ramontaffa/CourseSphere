import { Button } from "@atoms/Button/button";
import { CourseList } from "@organisms/CourseList/CourseList";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col justify-start w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">Seus Cursos</h1>
        <Link href="/create/course">
          <Button className="bg-main-dark-green text-white hover:bg-main-dark-green-hover focus:bg-main-dark-green-hover">
            Criar curso
          </Button>
        </Link>
      </div>
      <div className="mt-8 w-full">
        <CourseList />
      </div>
    </main>
  );
}
