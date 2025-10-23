'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import { CourseFormData } from '@/lib/schemas/CourseSchema';

export function useCreateCourse() {
  const [isCreating, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Create a new course
  const createCourse = async (data: CourseFormData) => {
    if (!user) {
      toast.error('Você precisa de estar logado para criar um curso.');
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    try {
      const payload = {
        ...data,
        creator_id: user.id,
        instructors: [user.id],
      };

      // Create course, update cache, and navigate to home
      await api.post('/courses', payload);
      await mutate('/courses'); 
      toast.success('Curso criado com sucesso!');
      await router.push('/');
    } catch (error) {
      toast.error('Não foi possível criar o curso. Tente novamente.');
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isCreating,
    createCourse,
  };
}