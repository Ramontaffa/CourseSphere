import { CourseForm } from '@organisms/CourseForm/courseForm';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Criar Novo Curso | CourseSphere',
  description: 'Preencha os detalhes para criar um novo curso.',
};

export default function CreateCoursePage() {
  return (
    <div className="flex w-full justify-center py-8">
      <CourseForm />
    </div>
  );
}