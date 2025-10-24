"use client";

import { SectionHeader } from "@/components/organisms/CourseDatails/SectionHeader";
import { DeleteDialog } from "@/components/organisms/DeleteDialog/DeleteDialog";
import { Skeleton } from "@atoms/Skeleton/skeleton";
import { useInstructors } from "@/hooks/Querys/useInstructors";
import { useCourseInstructors } from "@/hooks/Mutations/useCourseInstructors";
import { AddSuggestedInstructorDialog } from "@/components/molecules/Card/SuggestedInstructor/SuggestedInstructor";
import { User } from "@/types";

interface InstructorsSectionProps {
  courseId: string;
  instructors: string[];
  isCreator: boolean;
}

export function InstructorsSection({
  courseId,
  instructors: instructorIds,
  isCreator,
}: InstructorsSectionProps) {

  const {
    instructors: instructorUsers,
    isLoading,
    error
  } = useInstructors(instructorIds);

  const {
    isUpdating: isUpdatingCourse,
    addInstructor,
    removeInstructor
  } = useCourseInstructors(courseId);

  const getUserName = (user: User): string => {
    if (!user) return "Utilizador inválido";
    if (typeof user.name === 'string') {
      return user.name;
    }
    if (typeof user.name === 'object' &&
        user.name !== null &&
        'first' in user.name &&
        'last' in user.name) {
      return `${user.name.first} ${user.name.last}`;
    }
    return user.email || `User ${user.id}`;
  };

  return (
    <section className="mb-8">
      <SectionHeader title="Instrutores" showButton={isCreator}>
        <AddSuggestedInstructorDialog
          addInstructorCallback={(userId) => addInstructor(userId, instructorIds)}
          isUpdatingCourse={isUpdatingCourse}
        />
      </SectionHeader>

      <div className="rounded-lg border bg-card p-4">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        {error && <p className="text-destructive">Erro ao carregar instrutores.</p>}

        {!isLoading && !error && instructorUsers && instructorUsers.length > 0 ? (
          <ul className="space-y-2">
            {instructorUsers.map((user) => {
              if (!user) return null;

              return (
                <li key={user.id} className="flex justify-between items-center border-t first:border-t-0 pt-2 first:pt-0 overflow-auto gap-2">
                  <span>{getUserName(user)} ({user.email})</span>
                  {isCreator && (
                    <div className="flex items-center">
                      <DeleteDialog
                        id={String(user.id)}
                        onDelete={() => removeInstructor(String(user.id), instructorIds)}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          !isLoading && <p>Nenhum instrutor adicionado ainda.</p>
        )}
      </div>
    </section>
  );
}