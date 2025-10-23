'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';

export function useCourseInstructors(courseId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const updateInstructors = async (updatedList: string[]) => {
    setIsLoading(true);
    try {
  console.log(`PATCH /courses/${courseId} with instructors:`, updatedList); 

  if (!Array.isArray(updatedList)) {
     console.error("updateInstructors received non-array:", updatedList);
     throw new Error("Invalid instructor list format");
  }

  try {
    await mutate(
      `/courses/${courseId}`,
      (currentData: any) => {
    if (!currentData) return { id: courseId, instructors: updatedList };
    return { ...currentData, instructors: updatedList };
      },
      false
    );
  } catch (optErr) {
    console.error('Optimistic mutate failed:', optErr);
  }

  await api.patch(`/courses/${courseId}`, { instructors: updatedList });

  await mutate(`/courses/${courseId}`);

    } catch (err) {
      console.error("Error in updateInstructors:", err);
      throw err; 
    } finally {
      setIsLoading(false);
    }
  };

  const addInstructor = async (newUserId: string, currentList: string[]) => {
     console.log("addInstructor called with:", { newUserId, currentList });

    const currentInstructors = Array.isArray(currentList) ? currentList : []; 
    
    if (currentInstructors.includes(newUserId)) {
      toast.error("Este instrutor já faz parte do curso.");
      return; 
    }
    
    try {
      const updatedList = [...currentInstructors, newUserId]; 

      console.log("addInstructor created updatedList:", updatedList);

      await updateInstructors(updatedList); 
      
      toast.success("Instrutor adicionado com sucesso!");
    } catch (err) {
      toast.error("Erro ao adicionar instrutor.");
    }
  };

  const removeInstructor = async (userIdToRemove: string, currentList: string[]) => {
    const currentInstructors = Array.isArray(currentList) ? currentList : []; 
    
    try {
      const updatedList = currentInstructors.filter(id => id !== userIdToRemove);
      console.log("removeInstructor created updatedList:", updatedList);
      await updateInstructors(updatedList);
      toast.success("Instrutor removido com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover instrutor.");
    }
  };

  return {
    isUpdating: isLoading,
    addInstructor,
    removeInstructor,
  };
}