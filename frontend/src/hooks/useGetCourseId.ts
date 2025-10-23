'use client';

import useSWR from 'swr';
import { Course } from '@/types';

export function useCourse(id: string | null) {
  const { data, error, isLoading } = useSWR<Course>(
    id ? `/courses/${id}` : null
  );

  return {
    course: data,
    error,
    isLoading,
  };
}