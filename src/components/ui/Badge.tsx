import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info" | "purple";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
  info: "bg-cyan-50 text-cyan-700",
  purple: "bg-violet-50 text-violet-700",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps): JSX.Element {
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold", toneClasses[tone], className)}>
      {children}
    </span>
  );
}

export const getStatusTone = (status: string): BadgeTone => {
  if (["نشط", "مدفوعة", "مكتمل"].includes(status)) return "success";
  if (["قيد التنفيذ", "جزئية", "جديد"].includes(status)) return "info";
  if (["متأخر", "غير مدفوعة"].includes(status)) return "warning";
  if (["ملغي", "غير نشط", "متوقف"].includes(status)) return "danger";
  return "neutral";
};
