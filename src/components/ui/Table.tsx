import type { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface TableProps extends PropsWithChildren {
  headers: string[];
  className?: string;
}

export function Table({ headers, children, className }: TableProps): JSX.Element {
  return (
    <div className={cn("table-scroll overflow-x-auto rounded-2xl border border-slate-100", className)}>
      <table className="min-w-full divide-y divide-slate-100 text-right">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="whitespace-nowrap px-4 py-3 text-xs font-extrabold text-slate-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-sm">{children}</tbody>
      </table>
    </div>
  );
}
