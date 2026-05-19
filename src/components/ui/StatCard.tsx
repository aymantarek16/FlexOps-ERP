import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface StatCardProps {
  title: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: "primary" | "emerald" | "amber" | "rose" | "cyan" | "violet";
}

const toneClasses = {
  primary: "bg-primary-soft text-primary",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
  cyan: "bg-cyan-50 text-cyan-700",
  violet: "bg-violet-50 text-violet-700",
};

export function StatCard({ title, value, helper, icon: Icon, tone = "primary" }: StatCardProps): JSX.Element {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-black text-ink">{value}</p>
          {helper ? <p className="mt-2 text-xs font-semibold text-slate-400">{helper}</p> : null}
        </div>
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", toneClasses[tone])}>
          <Icon size={22} />
        </span>
      </div>
    </section>
  );
}
