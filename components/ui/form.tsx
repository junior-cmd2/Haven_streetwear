import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground";

export const inputClass =
  "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-sm transition placeholder:text-neutral-400 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 disabled:cursor-not-allowed disabled:bg-neutral-100";

export const textareaClass =
  "min-h-32 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-neutral-400 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";

export const selectClass = `${inputClass} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`;

export const errorClass = "mt-1.5 text-xs font-medium text-red-600";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={errorClass}>{message}</p>;
}

export function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />;
}
