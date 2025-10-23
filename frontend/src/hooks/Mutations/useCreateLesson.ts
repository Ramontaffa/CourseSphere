'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { LessonFormData } from '@/lib/schemas/LessonSchema';
import { useSWRConfig } from 'swr';

export function useCreateLesson(courseId: string) {
  const [isCreating, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  // Create a new lesson
  const createLesson = async (data: LessonFormData) => {
    if (!user) {
      toast.error('Você não está autenticado.');
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    try {
      const payload = {
        ...data,
        course_id: courseId,
        creator_id: user.id,
      };

      // Create lesson and update cache
      await api.post('/lessons', payload);
      await mutate(
        (key) => typeof key === 'string' && key.startsWith(`/lessons?course_id=${courseId}`),
        undefined,
        { revalidate: true }
      );
      
      toast.success('Aula criada com sucesso!');
    
    } catch (error) {
      toast.error('Não foi possível criar a aula.');
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isCreating,
    createLesson,
  };
}