import { z } from "zod";

const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "A data deve estar no formato AAAA-MM-DD.",
});

export const courseSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome do curso deve ter no mínimo 3 caracteres." }),

    description: z
      .string()
      .max(500, { message: "A descrição não pode ter mais de 500 caracteres." })
      .optional(),

      start_date: dateStringSchema,

    end_date: dateStringSchema,
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "A data de término deve ser posterior à data de início.",
    path: ["end_date"],
  });

export type CourseFormData = z.infer<typeof courseSchema>;
