'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, CourseFormData } from '@/lib/schemas/CourseSchema';
import { useCreateCourse } from '@/hooks/useCreateCourse'; 
import { InputField } from '@molecules/InputField/InputField';
import { Button } from '@atoms/Button/button';
import { TextAreaField } from '@molecules/TextAreaField/textAreaField';
import ArrowBack from '@/components/atoms/ArrowBack/ArrowBack';
import { useRouter } from 'next/navigation';

export function CourseForm() {
  const { isCreating, createCourse } = useCreateCourse();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    }
  });

  async function onSubmit(data: CourseFormData) {
    try {
      await createCourse(data);
    } catch (error) {
      console.error("Falha na submissão do formulário:", error);
    }
  }

  return (
    <div className="w-full max-w-5xl"> 
      {/* Header */}
      <div className="grid gap-2 text-start mb-6">
        <div className='flex gap-2 items-center'>
          <ArrowBack onClick={() => {router.back()}}/>
          <h1 className="text-4xl font-bold">Criar Novo Curso</h1>
        </div>

        <p className="text-md text-muted-foreground">
          Preencha os detalhes abaixo para começar.
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <InputField
          label="Nome do Curso"
          register={register('name')}
          error={errors.name}
          placeholder="Ex: React Avançado com Next.js"
        />

        <TextAreaField
          label="Descrição"
          register={register('description')}
          error={errors.description}
          placeholder="Descreva o seu curso..."
          rows={4}
        />

        <InputField
          label="Data de Início"
          register={register('start_date')}
          error={errors.start_date}
          type="date"
        />

        <InputField
          label="Data de Término"
          register={register('end_date')}
          error={errors.end_date}
          type="date"
        />

        <Button
          type="submit"
          className="w-full bg-main-dark-blue hover:bg-main-dark-blue-hover"
          disabled={isCreating}
          aria-busy={isCreating}
        >
          {isCreating ? 'A criar...' : 'Criar Curso'}
        </Button>
      </form>
    </div>
  );
}