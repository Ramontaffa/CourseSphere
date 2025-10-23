import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Label } from '@atoms/Label/label';
import { Textarea } from '@atoms/Textarea/textarea';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export function TextAreaField({ 
  label, 
  register, 
  error, 
  className, 
  id, 
  ...props 
}: TextAreaFieldProps) {
  const fieldId = id || register.name;

  return (
    <div className={cn("grid w-full gap-2", className)}>
      <Label htmlFor={fieldId}>{label}</Label>
      <Textarea
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...register}
        {...props}
      />
      {error && (
        <p 
          id={`${fieldId}-error`} 
          className="text-sm text-destructive"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
