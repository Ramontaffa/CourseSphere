"use client";

import { useCourses } from "@/hooks/Querys/useCourses";
import { CourseCard } from "@/components/molecules/CourseCard/CourseCard";
import { Skeleton } from "@atoms/Skeleton/skeleton";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useClientPagination } from "@/hooks/Mutations/useClientPagination";

export function CourseList() {
  const { courses, isLoading, error } = useCourses();
  const COURSES_PER_PAGE = 6;
  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedCourses } =
    useClientPagination(courses, COURSES_PER_PAGE, 1);

  if (isLoading) {
    const placeholders = Array.from({ length: COURSES_PER_PAGE }).map(
      (_, i) => (
        <div key={i} className="border p-2 rounded-lg shadow">
          {/* ... (o Skeleto
          n está bom como está) ... */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-20 h-20 rounded" />
            <div className="flex-1">
              <Skeleton className="h-4 mb-2 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      )
    );
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 md:gap-6">
        {placeholders}
      </div>
    );
  }
  if (error) {
    return <div>Error loading courses: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap max-h-[70vh] overflow-y-auto overflow-hidden p-2 gap-4 md:gap-6">
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}