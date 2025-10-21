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

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
    email: z
      .string()
      .min(1, { message: "O email é obrigatório." })
      .email({ message: "Por favor, insira um email válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
    confirmPassword: z
      .string()
      .min(6, { message: "A confirmação da senha é obrigatória." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
