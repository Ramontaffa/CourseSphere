"use client";

import { Input } from "@/components/atoms/Input/input";
import { Label } from "@atoms/Label/label";
import { ErrorMessage } from "@atoms/ErrorMessage/errorMessage";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  label: string; 
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

export function PasswordField({
  label,
  register,
  error,
  placeholder = "******",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = register.name;

  return (
    <div className="grid gap-2">
      <Label htmlFor={inputId}>{label}</Label>

      <div className="relative">
        <Input
          id={inputId}
          type={showPassword ? "text" : "password"}
          className="loginInput pr-10 truncate"
          placeholder={placeholder}
          {...register}
          aria-invalid={!!error}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={showPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}