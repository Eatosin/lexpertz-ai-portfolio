"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";

export type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

/**
 * FormField — wraps a control with its label, hint, and error message.
 *
 * The aria wiring has to land on the control itself, not on a wrapper: a
 * `<div aria-describedby>` is not a form field, so assistive tech ignored it
 * and read the error as unrelated text. The child is cloned with the
 * attributes so callers can keep passing a plain `<Input>`/`<select>`.
 */
export function FormField({ id, label, hint, error, children }: FormFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const control = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<Record<string, unknown>>,
        {
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
        }
      )
    : children;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {control}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
