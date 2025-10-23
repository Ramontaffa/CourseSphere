import { z } from "zod";

const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "A data deve estar no formato AAAA-MM-DD.",
});

export const lessonSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: "O título deve ter no mínimo 3 caracteres." }),

    status: z.enum(["draft", "published", "archived"], {
      error: "O status é obrigatório.",
    }),
    
    video_url: z
      .string()
      .min(1, { message: "A URL do vídeo é obrigatória." })
      .url({ message: "Por favor, insira uma URL válida." }),

    publish_date: dateStringSchema
  });

export type LessonFormInput = z.input<typeof lessonSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;