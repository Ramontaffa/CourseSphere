import { z } from "zod";

export const courseSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome do curso deve ter no mínimo 3 caracteres.' }),
  
  description: z.string()
    .max(500, { message: 'A descrição não pode ter mais de 500 caracteres.' })
    .optional(),
  
  start_date: z.coerce.date({
    error: 'A data de início é obrigatória.',
  }),

  end_date: z.coerce.date({
    error: 'A data de término é obrigatória.',
  }),
})
.refine(data => data.end_date > data.start_date, {
  message: 'A data de término deve ser posterior à data de início.',
  path: ['end_date'],
});

export type CourseFormData = z.infer<typeof courseSchema>;