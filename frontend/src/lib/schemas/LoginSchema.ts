import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Por favor, insira um email válido." }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
