'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@atoms/Dialog/dialog";
import { Button } from '@atoms/Button/button';
import { Skeleton } from '@atoms/Skeleton/skeleton';
import { Loader2, PlusCircle } from 'lucide-react';
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
          <PlusCircle className="h-4 w-4" />
            Instrutores Sugeridos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Instrutor(a) Sugerido</DialogTitle>
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
                className='bg-main-dark-green text-white hover:bg-main-dark-green-hover hover:text-off-white'
              >
                {isCreatingUser ? (
                  <span className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    <PlusCircle className="h-4 w-4" />
                  </span>
                )}
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