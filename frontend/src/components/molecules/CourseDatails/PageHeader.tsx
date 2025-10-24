"use client";

import { EditCourseDialog } from "@molecules/EditCourseDialog/EditCourseDialog";
import { useCourseMutations } from '@/hooks/Mutations/useCourseMutations';
import { useRouter } from 'next/navigation';
import { Course } from "@/types";
import PageTitle from "../PageTitle/PageTitle";
import { DeleteDialog } from "@molecules/DeleteDialog/DeleteDialog";

export type PageHeaderProps = {
  course: Course;
  isCreator: boolean;
};

function formatDate(dateInput: string | Date) {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "Data inválida";
  return date.toLocaleDateString("pt-BR");
}

export function PageHeader({ course, isCreator }: PageHeaderProps) {
  const { updateCourse, deleteCourse } = useCourseMutations();
    const router = useRouter();

  return (
    <section className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageTitle title={course.name} />
        {isCreator && (
          <div className="flex flex-row gap-4">
            <EditCourseDialog course={course} onEdit={updateCourse} />
              <DeleteDialog
                id={course.id}
                onDelete={async (id) => {
                  await deleteCourse(id);
                  router.replace('/');
                }}
                header={true}
              />
          </div>
        )}
      </div>

      <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

      <div className="flex gap-4 text-sm">
        <span>Início: {formatDate(course.start_date)}</span>
        <span>Término: {formatDate(course.end_date)}</span>
      </div>
    </section>
  );
}
