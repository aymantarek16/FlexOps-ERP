import { NavLink } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { businessModes } from "../../data/businessModes";
import { useFlexOpsStore } from "../../store/useFlexOpsStore";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { navigationItems, quickMetrics } from "./navigation";

export function Sidebar(): JSX.Element {
  const settings = useFlexOpsStore((state) => state.settings);
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const logout = useFlexOpsStore((state) => state.logout);
  const activeMode = businessModes.find((mode) => mode.id === selectedMode);

  const visibleItems = navigationItems.filter((item) => !item.module || settings.enabledModules[item.module]);

  return (
    <aside className="fixed inset-y-0 right-0 z-30 hidden w-72 border-l border-slate-200/80 bg-white/92 p-4 shadow-soft backdrop-blur-xl lg:flex lg:flex-col no-print">
      <div className="mb-6 rounded-2xl border border-primary/15 bg-gradient-to-l from-primary-soft to-white p-3 shadow-card dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-card">
            <Building2 size={23} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-base font-black text-ink">FlexOps ERP</p>
            
            </div>
            <p className="mt-1 truncate text-xs font-bold text-slate-500">نظام إدارة الأعمال الذكي</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition",
                isActive
                  ? "bg-primary-soft text-primary shadow-sm dark:bg-primary/10 dark:text-cyan-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "absolute inset-y-2 right-0 w-1 rounded-full transition",
                    isActive ? "bg-primary opacity-100 dark:bg-cyan-300" : "bg-transparent opacity-0",
                  )}
                />
                <item.icon className={cn("transition", isActive ? "text-primary dark:text-cyan-300" : "text-slate-500 group-hover:text-primary dark:text-slate-400")} size={18} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-bold text-slate-500">الوضع الحالي</p>
        <p className="mt-1 text-sm font-black text-ink">{activeMode?.name}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{activeMode?.accent}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {quickMetrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-3 text-center text-[11px] font-bold text-slate-500">
              <metric.icon className="mx-auto mb-1 text-primary" size={16} />
              {metric.label}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={logout}
        className="group mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:shadow-card focus:outline-none focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-rose-100 group-hover:text-rose-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-rose-400/15 dark:group-hover:text-rose-200">
            <LogOut size={17} />
          </span>
        تسجيل خروج
        </span>
    
      </button>
    </aside>
  );
}
