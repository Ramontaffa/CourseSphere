"use client";

import useSWR from "swr";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";
import { Course } from "@/types";

export function useCourses() {
  const { user, isHydrating } = useAuth();
  const shouldFetch = !isHydrating && user;
  const {
    data: allCourses,
    error,
    isLoading: isSWRLoading,
  } = useSWR<Course[]>(shouldFetch ? "/courses" : null);

  const courses = useMemo(() => {
    if (!allCourses || !user) return [];

    const userIdAsString = user.id;

    return allCourses.filter((course) => {
      const isCreator = course.creator_id === userIdAsString;
      const isInstructor = Array.isArray(course.instructors) && course.instructors.includes(userIdAsString);

      return isCreator || isInstructor;
    });
  }, [allCourses, user]);

  const isLoading = isHydrating || isSWRLoading;
  return {
    courses,
    error,
    isLoading,
  };
}
