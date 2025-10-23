'use client';
import useSWR from 'swr';

const externalFetcher = (url: string) => fetch(url).then(res => res.json());

export function useSuggestedInstructors(isOpen: boolean) {
  const { data, error, isLoading } = useSWR(
    isOpen ? 'https://randomuser.me/api/?results=5' : null,
    externalFetcher,
    { revalidateOnFocus: false }
  );

  return {
    suggestions: data?.results || [],
    error,
    isLoading,
  };
}