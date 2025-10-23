"use client";

import { Button } from "@atoms/Button/button";
import { Course } from "@/types";
import PageTitle from "../PageTitle/PageTitle";

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
  return (
    <section className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageTitle title={course.name} />
        {isCreator && (
          <div className="flex flex-row gap-4">
            <Button className="bg-main-yellow hover:bg-main-yellow-hover hover:text-off-white text-off-white">Editar Curso</Button>
            <Button variant="destructive">Excluir Curso</Button>
          </div>
        )}
      </div>

      <p className="text-lg text-muted-foreground mb-4">
        {course.description}
      </p>

      <div className="flex gap-4 text-sm">
        <span>
          Início: {formatDate(course.start_date)}
        </span>
        <span>Término: {formatDate(course.end_date)}</span>
      </div>
    </section>
  );
}
