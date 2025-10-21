"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/lib/schema";
import { Button } from "@/components/atoms/Button/button";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { InputField } from "@molecules/InputField/InputField";
import { PasswordField } from "@molecules/PasswordField/PasswordField";

export function SignUpComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
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
    setIsLoading(true);
    try {
      const checkEmail = await api.get(`/users?email=${data.email}`);
      if (checkEmail.data.length > 0) {
        toast.error("Este email já está a ser utilizado.");
        setError("email", {
          message: "Este email já está a ser utilizado.",
        });
        return;
      }

      const { confirmPassword, ...userData } = data;
      await api.post("/users", userData);

      toast.success("Conta criada com sucesso! Por favor, faça o login.");
      router.push("/login");
    } catch (error) {
      console.error("Falha no cadastro:", error);
      toast.error("Ocorreu um erro ao criar a sua conta.");
    } finally {
      setIsLoading(false);
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
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
}