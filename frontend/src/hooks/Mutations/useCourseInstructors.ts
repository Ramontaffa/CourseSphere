"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

export function useCourseInstructors(courseId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const updateInstructors = async (updatedList: string[]) => {
    setIsLoading(true);
    try {
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
      } catch (error) {
        toast.error("Falha na atualização otimista dos instrutores.");
      }

      await api.patch(`/courses/${courseId}`, { instructors: updatedList });

      await mutate(`/courses/${courseId}`);
    } catch (error) {
      toast.error("Erro ao atualizar instrutores do curso.");
      throw error;
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

      await updateInstructors(updatedList);

      toast.success("Instrutor adicionado com sucesso!");
    } catch (err) {
      toast.error("Erro ao adicionar instrutor.");
    }
  };

  const removeInstructor = async (
    userIdToRemove: string,
    currentList: string[]
  ) => {
    const currentInstructors = Array.isArray(currentList) ? currentList : [];

    try {
      const updatedList = currentInstructors.filter(
        (id) => id !== userIdToRemove
      );
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