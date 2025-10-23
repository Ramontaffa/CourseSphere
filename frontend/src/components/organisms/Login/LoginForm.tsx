"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/LoginSchema";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@atoms/Button/button";
import { User } from "lucide-react";
import Link from "next/link";
import { InputField } from "@molecules/InputField/InputField";
import { PasswordField } from "@molecules/PasswordField/PasswordField";

export function LoginComponent() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data);
    } catch (error) {
      console.error("Falha no submit do login:", error);
    }
  }

  return (
    <div className="w-full max-w-md space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-main-dark-blue">
          Faça seu login
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <InputField
          label="Email"
          register={register("email")}
          error={errors.email}
          type="email"
          placeholder="Usuário@email.com"
          icon={<User size={18} />}
          className="loginInput"
        />

        <PasswordField
          label="Senha"
          register={register("password")}
          error={errors.password}
          placeholder="******"
          className="loginInput"
        />

        <div className="mt-4 flex flex-col gap-2">
          <Button
            type="submit"
            className="flex-1 bg-main-dark-blue hover:bg-main-dark-blue-hover"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <Button asChild variant="outline" className="flex-1 border-main-dark-blue text-main-dark-blue">
            <Link href="/sign-up" className="text-sm">
              Registrar
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
