"use client";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { User } from "@/types";
import { useSWRConfig } from "swr";

type RandomUser = {
  login: { uuid: string; password?: string };
  name: { title: string; first: string; last: string };
  email: string;
};

export function useCreateInstructor() {
  const [isCreating, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  // Create and add a new instructor (random user)
  const createAndAddUser = async (
    randomUser: RandomUser,
    addInstructorCallback: (userId: string) => Promise<void>
  ) => {
    setIsLoading(true);
    try {
      const fullName = `${randomUser.name.first} ${randomUser.name.last}`;

      const newUserPayload: Partial<User> = {
        id: randomUser.login.uuid ?? `${Date.now()}`,
        name: fullName,
        email: randomUser.email,
      };

      const response = await api.post<User>("/users", newUserPayload);
      const createdUser = response.data;

      try {
        await mutate(
          "/users",
          (users: User[] | undefined) => {
            if (!users) return [createdUser];
            if (users.some((u) => String(u.id) === String(createdUser.id)))
              return users;
            return [...users, createdUser];
          },
          false
        );
      } catch (mutErr) {
        console.error("Failed to mutate /users cache:", mutErr);
      }

      await addInstructorCallback(createdUser.id);
    } catch (error) {
      toast.error("Falha ao criar novo instrutor.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAndAddUser,
    isCreating,
  };
}
