"use client";

import { useCourse } from "@/hooks/useGetCourseId";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@atoms/Skeleton/skeleton";
import { Button } from "@atoms/Button/button";
import { PageHeader } from "@molecules/CourseDatails/PageHeader";
import { SectionHeader } from "@molecules/CourseDatails/SectionHeader";
import { useMemo } from "react";
import { LessonList } from "../LessonsList/LessonList";
import { AddLessonDialog } from "@/components/molecules/AddLessonDialog/AddLessonDialog";

export function CourseDetails({ courseId }: { courseId: string }) {
  const { user, isHydrating } = useAuth();
  const { course, error, isLoading: isCourseLoading } = useCourse(courseId);

  const { isCreator, isInstructor } = useMemo(() => {
    if (!user || !course) return { isCreator: false, isInstructor: false };

    const userIdStr = user.id;
    const isCreator = course.creator_id === userIdStr;
    const isInstructor =
      Array.isArray(course.instructors) &&
      course.instructors.map(String).includes(userIdStr);

    return { isCreator, isInstructor };
  }, [user, course]);

  if (isHydrating || isCourseLoading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <p className="text-destructive text-xl flex justify-center">
        Erro: Não foi possível carregar o curso.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* course details header */}
      <PageHeader course={course} isCreator={isCreator} />

      {/* instructors section */}
      <section className="mb-8">
        <SectionHeader title="Instrutores" showButton={isCreator}>
          <Button
            variant="outline"
            className="mb-4 text-white bg-main-dark-green hover:bg-main-dark-green-hover hover:text-off-white"
          >
            Adicionar Novo Instrutor
          </Button>
        </SectionHeader>

        <div className="rounded-lg border bg-card p-4">
          <p>A lista de instrutores aparecerá aqui.</p>
        </div>
      </section>

      {/* lessons section */}
      <section>
        <SectionHeader title="Aulas do Curso" showButton={isCreator || isInstructor}>
          <AddLessonDialog courseId={course.id} />
        </SectionHeader>

        <div className="rounded-lg border bg-card p-4">
          <LessonList courseId={course.id} />
        </div>
      </section>
    </div>
  );
}
