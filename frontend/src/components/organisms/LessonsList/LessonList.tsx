"use client";

import { Lesson } from "@/types";
import { Input } from "@atoms/Input/input";
import { SelectInput } from "@/components/molecules/SelectInput/SelectInput";
import { LessonCard } from "@molecules/LessonCard/LessonCard";
import { Skeleton } from "@atoms/Skeleton/skeleton";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useAuth } from "@/context/AuthContext";
import { useFilteredPaginatedLessons } from "@/hooks/Mutations/useFilteredPaginatedLessons";

export function LessonList({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    lessons,
    totalPages,
    isLoading,
    error,
    handleDeleteLesson,
    handleEditLesson,
  } = useFilteredPaginatedLessons({ courseId });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar aula por título..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1"
        />
        <SelectInput
          value={statusFilter}
          onValueChange={(value: string) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          options={[
            { value: "all", label: "Todos os Status" },
            { value: "published", label: "Publicadas" },
            { value: "draft", label: "Rascunho" },
            { value: "archived", label: "Arquivadas" },
          ]}
          disabled={isLoading}
          className="w-full max-w-[30%] lg:max-w-[40%]"
        />
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {error && <p className="text-destructive">Erro ao carregar as aulas.</p>}

      {!isLoading && !error && (
        <div className="space-y-2">
          {lessons.length === 0 ? (
            <div className="flex justify-center items-center p-4">
              <p>Nenhuma aula encontrada para estes filtros.</p>
            </div>
          ) : (
            lessons.map((lesson: Lesson) => (
              <LessonCard
                key={lesson.id}
                currentUserId={user ? String(user.id) : ""}
                lesson={lesson}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
              />
            ))
          )}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
