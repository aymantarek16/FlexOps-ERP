import { CheckCircle2, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ToastTone = "success" | "info";

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren): JSX.Element {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = Date.now();
      setToasts((current) => [{ id, message, tone }, ...current].slice(0, 3));
      window.setTimeout(() => dismiss(id), 3200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed left-4 top-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3 no-print">
        {toasts.map((toast) => {
          const Icon = toast.tone === "success" ? CheckCircle2 : Info;

          return (
            <div
              key={toast.id}
              className={cn(
                "flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-soft",
                toast.tone === "success" ? "border-emerald-100" : "border-cyan-100",
              )}
            >
              <Icon className={toast.tone === "success" ? "text-emerald-600" : "text-cyan-600"} size={20} />
              <p className="flex-1 text-sm font-bold leading-6 text-ink">{toast.message}</p>
              <button type="button" className="text-slate-400 hover:text-slate-700" onClick={() => dismiss(toast.id)} aria-label="إغلاق التنبيه">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};
