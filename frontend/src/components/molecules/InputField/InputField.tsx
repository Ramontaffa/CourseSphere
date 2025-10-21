import { Input } from "@atoms/Input/input";
import { Label } from "@atoms/Label/label";
import { ErrorMessage } from "@atoms/ErrorMessage/errorMessage";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

interface InputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
}

export function InputField({
  label,
  error,
  register,
  type = "text",
  placeholder,
  icon,
  className,
}: InputFieldProps) {
  const inputId = register.name;

  return (
    <div className="grid gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        {icon && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          >
            {icon}
          </div>
        )}
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={`${icon ? "pr-10" : ""} ${className}`}
          {...register}
          aria-invalid={!!error}
        />
      </div>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}