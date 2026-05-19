import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends PropsWithChildren {
  className?: string;
}

interface CardHeaderProps extends PropsWithChildren {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps): JSX.Element {
  return (
    <section className={cn("rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card", className)}>
      {children}
    </section>
  );
}

export function CardHeader({ title, description, action, children, className }: CardHeaderProps): JSX.Element {
  return (
    <div className={cn("mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div>
        {title ? <h2 className="text-lg font-bold text-ink">{title}</h2> : null}
        {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
