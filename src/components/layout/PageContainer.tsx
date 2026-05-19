import type { PropsWithChildren, ReactNode } from "react";

interface PageContainerProps extends PropsWithChildren {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageContainer({ title, description, action, children }: PageContainerProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-ink">{title}</h2>
          {description ? <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </div>
  );
}
