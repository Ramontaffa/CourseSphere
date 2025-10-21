import { CourseCard } from "@/components/molecules/CourseCard/CourseCard";
import { CourseList } from "@organisms/CourseList/CourseList";

export default function Page() {
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Bem-vindo ao CourseSphere!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sua plataforma de gestão de cursos online colaborativa.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4">
        <CourseList />
      </div>  
    </main>
  );
}