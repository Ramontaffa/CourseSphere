import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@atoms/Select/select";
import React from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export function SelectInput({
  value,
  onValueChange,
  options,
  label,
  disabled,
  error,
  className = "",
}: SelectInputProps) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-main-dark-blue mb-1">
          {label}
        </label>
      )}
      <ShadcnSelect value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options
              .filter(opt => opt.value !== "")
              .map(opt => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>
      {error && (
        <span className="text-xs text-destructive mt-1 block">{error}</span>
      )}
    </div>
  );
}
