'use client';

import useSWR from 'swr';
import { User } from '@/types';
import { useMemo } from 'react';

export function useInstructors(instructorIds: string[]) {
  const shouldFetch = Array.isArray(instructorIds) && instructorIds.length > 0;
  
  const { data: allUsers, error, isLoading } = useSWR<User[]>(
    shouldFetch ? '/users' : null
  );

  const instructors = useMemo(() => {
    if (!allUsers || !shouldFetch) {
      return [];
    }
    
    const idSet = new Set(instructorIds); 
    
    return allUsers.filter(user => idSet.has(String(user.id))); 

  }, [allUsers, instructorIds, shouldFetch]);

  console.log("useInstructors received IDs:", instructorIds);
  console.log("useInstructors fetched all users:", allUsers);
  console.log("useInstructors filtered result:", instructors);

  return {
    instructors,
    error,
    isLoading,
  };
}