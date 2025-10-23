import { useState, useMemo } from "react";
import useSWR from "swr";
import { Lesson } from "@/types";
import { api } from "@/lib/api";
import { useClientPagination } from "@/hooks/useClientPagination";

export interface UseFilteredPaginatedLessonsOptions {
  courseId: string;
  initialSearch?: string;
  initialStatus?: string;
  lessonsPerPage?: number;
}

export function useFilteredPaginatedLessons({
  courseId,
  initialSearch = "",
  initialStatus = "all",
  lessonsPerPage = 5,
}: UseFilteredPaginatedLessonsOptions) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState(initialStatus);

  const apiUrl = `/lessons?course_id=${courseId}`;
  const {
    data: lessons,
    error,
    isLoading,
    mutate,
  } = useSWR<Lesson[]>(apiUrl);

  const filteredLessons = useMemo(() => {
    if (!lessons) return [];
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedLessons,
  } = useClientPagination(filteredLessons, lessonsPerPage, 1);

  async function handleDeleteLesson(id: string | number) {
    try {
      await api.delete(`/lessons/${id}`);
      mutate();
    } catch (err) {
      alert("Erro ao excluir aula!");
    }
  }

  async function handleEditLesson(id: string | number, data: Partial<Lesson>) {
    try {
      await api.patch(`/lessons/${id}`, data);
      mutate();
      console.log("Lesson updated", id, data);
    } catch (err) {
      console.error("Erro ao editar aula!", err);
      alert("Erro ao editar aula!");
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    lessons: paginatedLessons,
    totalPages,
    isLoading,
    error,
    handleDeleteLesson,
    handleEditLesson,
  };
}
