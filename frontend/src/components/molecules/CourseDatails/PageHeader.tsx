"use client";

import { EditCourseDialog } from "@molecules/EditCourseDialog/EditCourseDialog";
import { api } from "@/lib/api";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
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
  async function handleEditCourse(id: string, data: Partial<Course>) {
    try {
      await api.patch(`/courses/${id}`, data);
      mutate(`/courses`);
      mutate(`/courses/${id}`);
      toast.success("Curso atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      toast.error("Erro ao atualizar curso. Tente novamente.");
      throw error;
    }
  }

  async function handleDeleteCourse(id: string | number) {
    try {
      await api.delete(`/courses/${id}`);
      mutate(`/courses`);
      mutate(`/courses/${id}`);
      toast.success("Curso excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      toast.error("Erro ao excluir curso. Tente novamente.");
      throw error;
    }
  }

  return (
    <section className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <PageTitle title={course.name} />
        {isCreator && (
          <div className="flex flex-row gap-4">
            <EditCourseDialog course={course} onEdit={handleEditCourse} />
            <DeleteDialog id={course.id} onDelete={handleDeleteCourse} header={true} />
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
