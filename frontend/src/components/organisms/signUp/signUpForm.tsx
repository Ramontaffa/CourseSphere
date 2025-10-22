"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/lib/schemas/SignUpSchema";
import { Button } from "@/components/atoms/Button/button";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { InputField } from "@molecules/InputField/InputField";
import { PasswordField } from "@molecules/PasswordField/PasswordField";
import { useAuth } from "@/context/AuthContext";

export function SignUpComponent() {
  const { signUp, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      toast.error("Falha ao criar conta. Tente novamente.");
      console.error("Sign-up failed", error);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="grid gap-2 text-center mb-6">
        <h1 className="text-2xl font-bold">Criar Conta</h1>
        <p className="text-sm text-muted-foreground">
          Insira os seus dados para se cadastrar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <InputField
          label="Nome"
          register={register("name")}
          error={errors.name}
          placeholder="Seu Nome"
        />

        <InputField
          label="Email"
          register={register("email")}
          error={errors.email}
          type="email"
          placeholder="Usuário@email.com"
        />

        <PasswordField
          label="Senha"
          register={register("password")}
          error={errors.password}
          placeholder="******"
        />

        <PasswordField
          label="Confirmar Senha"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="******"
        />

        <Button
          type="submit"
          className="w-full bg-main-dark-blue hover:bg-main-dark-blue-hover"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Já tem uma conta?
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline ml-1"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
}
