'use client';

import useSWR from 'swr';
import { Lesson } from '@/types';
import { api } from '@/lib/api';

type LessonFilters = {
  courseId: string;
  title?: string; 
  status?: string;
  _page?: number;
  _limit?: number;
};

function filterLessons(lessons: Lesson[], title?: string, status?: string): Lesson[] {
  let filtered = lessons;
  if (title) {
    filtered = filtered.filter(l => l.title && l.title.toLowerCase().includes(title.toLowerCase()));
  }
  if (status) {
    filtered = filtered.filter(l => l.status === status);
  }
  return filtered;
}

export function useLessons(filters: LessonFilters) {
  const params = new URLSearchParams();
  if (filters.courseId) params.append('course_id', filters.courseId);
  if (filters.title) params.append('title', filters.title);
  if (filters.status) params.append('status', filters.status);
  if (filters._page) params.append('_page', String(filters._page));
  if (filters._limit) params.append('_limit', String(filters._limit));

  const queryString = params.toString();

  const fetcher = async (url: string) => {
    const res = await api.get(url);
    if (res.headers['x-total-count']) {
      return {
        lessons: res.data as Lesson[],
        totalCount: parseInt(res.headers['x-total-count'], 10)
      };
    } else {
      const allRes = await api.get(`/lessons?course_id=${filters.courseId}`);
      const filtered: Lesson[] = filterLessons(allRes.data as Lesson[], filters.title, filters.status);
      const totalCount = filtered.length;
      const page = filters._page || 1;
      const limit = filters._limit || 5;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedLessons = filtered.slice(start, end);
      return {
        lessons: paginatedLessons,
        totalCount
      };
    }
  };

  const { data, error, isLoading } = useSWR(`/lessons?${queryString}`, fetcher);

  return {
    lessons: data?.lessons || [],
    totalCount: data?.totalCount || 0,
    error,
    isLoading,
  };
}