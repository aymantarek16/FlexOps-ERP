import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: ReactNode;
}

export function Input({ label, hint, icon, className, id, ...props }: InputProps): JSX.Element {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      {label ? <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span> : null}
      <span className="relative block">
        {icon ? <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">{icon}</span> : null}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10",
            icon ? "pr-10" : "",
            className,
          )}
          {...props}
        />
      </span>
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}
