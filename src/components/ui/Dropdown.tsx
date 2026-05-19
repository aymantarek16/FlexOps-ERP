import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
}

export function Dropdown({ label, value, options, onChange, className, buttonClassName }: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {label ? <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span> : null}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-ink shadow-sm outline-none transition hover:border-primary/60 focus:border-primary focus:ring-4 focus:ring-primary/10",
          buttonClassName,
        )}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown className={cn("shrink-0 text-slate-500 transition", isOpen ? "rotate-180 text-primary" : "")} size={18} />
      </button>

      {isOpen ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-40 w-full min-w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-soft"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-bold transition",
                  isSelected ? "bg-primary-soft text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-ink",
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected ? <Check size={16} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
