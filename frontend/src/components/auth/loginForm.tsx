"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schema";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Eye } from "lucide-react";

export function LoginComponent() {
  const { login, isLoading } = useAuth();

  const form = useForm<LoginFormData>({
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
      {/* title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-main-dark-blue">
          Faça seu login
        </h1>
      </div>

      {/* email and password fields */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size={18}
                      aria-hidden
                    />
                    <Input
                      className="loginInput"
                      placeholder="instrutor@email.com"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage role="alert" aria-live="polite" />
              </FormItem>
            )}
          />

          {/* password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="password"
                      className="loginInput pr-10"
                      placeholder="******"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </FormControl>
                <FormMessage role="alert" aria-live="polite" />
              </FormItem>
            )}
          />

          {/* submit button */}
          <Button
            type="submit"
            className="w-full mt-4 bg-main-dark-blue hover:bg-main-dark-blue-hover"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
