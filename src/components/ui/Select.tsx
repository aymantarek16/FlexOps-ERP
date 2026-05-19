import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({ label, options, className, id, ...props }: SelectProps): JSX.Element {
  const selectId = id ?? props.name;

  return (
    <label className="block" htmlFor={selectId}>
      {label ? <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
