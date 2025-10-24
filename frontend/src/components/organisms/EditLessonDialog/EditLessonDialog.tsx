import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/atoms/Dialog/dialog";
import { Button } from "@/components/atoms/Button/button";
import { Lesson } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  lessonSchema,
  LessonFormData,
} from "@/lib/schemas/LessonSchema";
import { InputField } from "@/components/molecules/Form/InputField/InputField";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/Form/form";
import { SelectInput } from "../../molecules/Form/SelectInput/SelectInput";
import { Pencil } from "lucide-react";

interface EditLessonDialogProps {
  lesson: Lesson;
  onEdit: (id: number, data: Partial<Lesson>) => void | Promise<void>;
}

export function EditLessonDialog({ lesson, onEdit }: EditLessonDialogProps) {
  const [open, setOpen] = useState(false);

  const methods = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson.title || "",
      status: lesson.status || "draft",
      video_url: lesson.video_url || "",
      // Normalize publish_date to YYYY-MM-DD so input[type=date] displays correctly
      publish_date: lesson.publish_date
        ? new Date(lesson.publish_date).toISOString().split("T")[0]
        : "",
    },
  });

  const { handleSubmit, control, watch } = methods;
  const watchedStatus = watch("status");

  async function onSubmit(data: LessonFormData) {
    const patch: Partial<Lesson> = {
      title: data.title,
      status: data.status,
      video_url: data.video_url,
      publish_date: data.publish_date
        ? new Date(data.publish_date + "T00:00:00")
        : undefined,
    };

    try {
      await onEdit(lesson.id, patch);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao editar aula:", error);
      alert("Erro ao editar aula!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-main-blue hover:bg-zinc-100 hover:text-main-dark-blue transition border-none shadow-none"
          variant="outline"
        >
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Editar Aula</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <InputField
              label="Título"
              register={methods.register("title")}
              error={methods.formState.errors.title}
            />
            <InputField
              label="URL do Vídeo"
              register={methods.register("video_url")}
              error={methods.formState.errors.video_url}
            />

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

            {watchedStatus === "published" && (
              <InputField
                label="Data de Publicação"
                type="date"
                register={methods.register("publish_date")}
                error={methods.formState.errors.publish_date}
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-main-dark-green text-white hover:bg-main-dark-green-hover"
              >
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
