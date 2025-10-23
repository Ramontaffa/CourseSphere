import { useState } from 'react';
import { api } from '@/lib/api';
import { useSWRConfig } from 'swr';
import { toast } from 'react-hot-toast';
import { Course } from '@/types';
import { useRouter } from 'next/navigation';

export function useCourseMutations() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const updateCourse = async (id: string, data: Partial<Course>) => {
    setIsUpdating(true);
    try {
      await api.patch(`/courses/${id}`, data);
      await mutate('/courses');
      await mutate(`/courses/${id}`);
      toast.success('Curso atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar curso. Tente novamente.');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCourse = async (id: string | number) => {
    setIsDeleting(true);
    try {
      await api.delete(`/courses/${id}`);
      await mutate('/courses');
      toast.success('Curso excluído com sucesso');
    } catch (err) {
      toast.error('Erro ao excluir curso. Tente novamente.');
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isUpdating,
    isDeleting,
    updateCourse,
    deleteCourse,
  };
}
