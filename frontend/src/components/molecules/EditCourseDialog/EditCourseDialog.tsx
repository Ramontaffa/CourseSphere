import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/atoms/Dialog/dialog";
import { Button } from "@/components/atoms/Button/button";
import { Course } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseFormData } from "@/lib/schemas/CourseSchema";
import { InputField } from "@molecules/InputField/InputField";
import { TextAreaField } from "@molecules/TextAreaField/textAreaField";
import { Pencil } from "lucide-react";

interface EditCourseDialogProps {
  course: Course;
  onEdit: (id: string, data: Partial<Course>) => void | Promise<void>;
}

export function EditCourseDialog({ course, onEdit }: EditCourseDialogProps) {
  const [open, setOpen] = useState(false);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: course.name || "",
      description: course.description || "",
      start_date: course.start_date
        ? new Date(course.start_date).toISOString().split("T")[0]
        : "",
      end_date: course.end_date
        ? new Date(course.end_date).toISOString().split("T")[0]
        : "",
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: CourseFormData) {
    const patch: Partial<Course> = {
      name: data.name,
      description: data.description,
      start_date: new Date(data.start_date + "T00:00:00"),
      end_date: new Date(data.end_date + "T00:00:00"),
    };

    try {
      await onEdit(course.id, patch);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao editar curso:", error);
      alert("Erro ao editar curso!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white bg-main-orange hover:bg-main-orange-hover hover:text-white transition border-none shadow-none"
          variant="outline"
        >
          <Pencil size={16} /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Editar Curso</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <InputField
              label="Nome"
              register={methods.register("name")}
              error={methods.formState.errors.name}
            />

            <TextAreaField
              label="Descrição"
              register={methods.register("description")}
              error={methods.formState.errors.description}
            />

            <div className="grid grid-cols-2 gap-2">
              <InputField
                label="Data de Início"
                type="date"
                register={methods.register("start_date")}
                error={methods.formState.errors.start_date}
              />
              <InputField
                label="Data de Término"
                type="date"
                register={methods.register("end_date")}
                error={methods.formState.errors.end_date}
              />
            </div>

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
