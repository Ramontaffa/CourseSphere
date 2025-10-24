"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  lessonSchema,
  LessonFormData,
} from "@/lib/schemas/LessonSchema";
import { useCreateLesson } from "@/hooks/Mutations/useCreateLesson";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/molecules/Form/InputField/InputField";
import { SelectInput } from "@/components/molecules/Form/SelectInput/SelectInput";
import { Button } from "@atoms/Button/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@atoms/Form/form";

interface LessonFormProps {
  courseId: string;
  onClose: () => void;
}

export function LessonForm({ courseId, onClose }: LessonFormProps) {
  const { isCreating, createLesson } = useCreateLesson(courseId);

  const methods = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      status: "draft",
      video_url: "",
      publish_date: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function onSubmit(data: LessonFormData) {
    try {
      await createLesson(data);
      onClose();
    } catch (error) {
      console.error("Erro ao criar aula:", error);
      toast.error("Erro ao criar aula");
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <InputField
          label="Título da Aula"
          register={register("title")}
          error={errors.title}
          placeholder="Ex: Introdução ao SWR"
        />

        <div className="flex flex-row gap-4">
          <FormField
            control={control}
            name="status"
            render={({ field, fieldState }) => (
              <FormItem className="grid gap-2 w-full">
          <FormLabel>Status</FormLabel>
          <SelectInput
            value={field.value}
            onValueChange={field.onChange}
            options={[
              { value: "draft", label: "Rascunho" },
              { value: "published", label: "Publicada" },
              { value: "archived", label: "Arquivada" },
            ]}
            error={fieldState.error?.message}
          />
          <FormMessage />
              </FormItem>
            )}
          />

          <InputField
            className="w-full flex-1"
            label="Data de Publicação"
            register={register("publish_date")}
            error={errors.publish_date}
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <InputField
          label="URL do Vídeo"
          register={register("video_url")}
          error={errors.video_url}
          placeholder="https://www.youtube.com/watch?v=..."
        />

        <Button
          type="submit"
          className="w-full mt-4 bg-main-dark-blue hover:bg-main-dark-blue-hover"
          disabled={isCreating}
          aria-busy={isCreating}
        >
          {isCreating ? "A criar..." : "Criar Aula"}
        </Button>
      </form>
    </FormProvider>
  );
}
