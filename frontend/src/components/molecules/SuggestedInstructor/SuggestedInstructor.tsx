'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@atoms/Dialog/dialog";
import { Button } from '@atoms/Button/button';
import { Skeleton } from '@atoms/Skeleton/skeleton';
import { LucidePlusCircle } from 'lucide-react';
import { useSuggestedInstructors } from '@/hooks/Querys/useSuggestedInstructors';
import { useCreateInstructor } from '@/hooks/Mutations/useCreateInstructor';

interface AddSuggestedInstructorDialogProps {
  addInstructorCallback: (userId: string) => Promise<void>;
  isUpdatingCourse: boolean; 
}

interface RandomUser {
  login: { uuid: string; password?: string };
  name: { title: string; first: string; last: string };
  email: string;
}

export function AddSuggestedInstructorDialog({ 
  addInstructorCallback, 
  isUpdatingCourse 
}: AddSuggestedInstructorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { suggestions, isLoading: isLoadingSuggestions } = useSuggestedInstructors(isOpen);
  const { createAndAddUser, isCreating: isCreatingUser } = useCreateInstructor(); 

  const handleSelectInstructor = async (randomUser: RandomUser) => {
    await createAndAddUser(randomUser, addInstructorCallback);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white bg-main-dark-green hover:bg-main-dark-green-hover hover:text-off-white"
        >
          <LucidePlusCircle className="mr-2 h-4 w-4" />
          Adicionar Novo Instrutor (Sugestão)
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sugerir Novos Instrutores</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-60 overflow-y-auto py-4">
          {isLoadingSuggestions && (
             <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          )}
          {suggestions.map((user: RandomUser) => (
            <div key={user.login.uuid} className="flex items-center justify-between p-2 rounded-lg border">
              <span className="text-sm">{user.name.first} {user.name.last} ({user.email})</span>
              <Button 
                size="sm"
                onClick={() => handleSelectInstructor(user)}
                disabled={isCreatingUser || isUpdatingCourse} 
              >
                {isCreatingUser ? 'Salvando...' : 'Adicionar'}
              </Button>
            </div>
          ))}
          {!isLoadingSuggestions && suggestions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">Nenhuma sugestão encontrada.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}