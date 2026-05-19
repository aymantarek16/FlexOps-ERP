import { X } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "../../utils/cn";
import { Button } from "./Button";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

export function Modal({
  isOpen,
  title,
  description,
  onClose,
  footer,
  children,
  size = "md",
  className,
}: ModalProps): JSX.Element | null {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print-shell" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm no-print" aria-label="إغلاق النافذة" onClick={onClose} />
      <div className={cn("relative max-h-[92vh] w-full overflow-hidden rounded-2xl bg-white shadow-soft", sizeClasses[size], className)}>
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 no-print">
          <div>
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="إغلاق" icon={<X size={18} />} />
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
        {footer ? <div className="border-t border-slate-100 p-5 no-print">{footer}</div> : null}
      </div>
    </div>
  );
}
