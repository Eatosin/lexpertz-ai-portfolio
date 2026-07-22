"use client";

import { Label } from "@/components/ui/label";

export type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

/**
 * FormField — wraps a control with a label, hint, and accessible error
 * message using `aria-describedby`. Plays nicely with react-hook-form's
 * Controller render prop.
 */
export function FormField({ id, label, hint, error, children }: FormFieldProps) {
  const descriptorId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = error
    ? errorId
    : hint
    ? descriptorId
    : undefined;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div
        id={descriptorId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
      >
        {children}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptorId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
