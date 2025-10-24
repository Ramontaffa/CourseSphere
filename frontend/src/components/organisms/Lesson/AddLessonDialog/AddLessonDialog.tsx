'use client';

import { useState } from 'react';
import { LucidePlusCircle } from 'lucide-react';
import { Button } from '@atoms/Button/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@atoms/Dialog/dialog";
import { LessonForm } from '@/components/organisms/Lesson/LessonForm/LessonForm';

interface AddLessonDialogProps {
  courseId: string;
}

export function AddLessonDialog({ courseId }: AddLessonDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white bg-main-dark-green hover:bg-main-dark-green-hover hover:text-off-white"
        >
          <LucidePlusCircle className="mr-2 h-4 w-4" />
          Adicionar Nova Aula
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Aula</DialogTitle>
        </DialogHeader>

        <LessonForm 
          courseId={courseId} 
          onClose={() => setIsModalOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}