import { useState, type SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { Building2, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { businessModes } from "../../data/businessModes";
import { useFlexOpsStore } from "../../store/useFlexOpsStore";
import { cn } from "../../utils/cn";
import { navigationItems, quickMetrics } from "./navigation";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps): JSX.Element {
  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(null);
  const settings = useFlexOpsStore((state) => state.settings);
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const logout = useFlexOpsStore((state) => state.logout);
  const activeMode = businessModes.find((mode) => mode.id === selectedMode);

  const visibleItems = navigationItems.filter((item) => !item.module || settings.enabledModules[item.module]);
  const showTooltip = (label: string, event: SyntheticEvent<HTMLElement>): void => {
    if (!isCollapsed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({ label, top: rect.top + rect.height / 2 });
  };
  const hideTooltip = (): void => setTooltip(null);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-30 hidden border-l border-slate-200/80 bg-white/92 shadow-soft backdrop-blur-xl transition-[width] duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/92 lg:flex lg:flex-col no-print",
        isCollapsed ? "w-24" : "w-72",
      )}
    >
      <div className={cn("sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4", isCollapsed && "sidebar-scroll-collapsed px-3")}>
        <div className={cn("mb-6 rounded-2xl border border-primary/15 bg-gradient-to-l from-primary-soft to-white p-3 shadow-card transition-all duration-300 dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-900", isCollapsed && "mb-5 border-transparent bg-none bg-primary/10 px-2 shadow-none dark:bg-slate-900")}>
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-card">
              <Building2 size={23} />
            </span>
            <div className={cn("min-w-0 flex-1 overflow-hidden transition-all duration-300", isCollapsed ? "w-0 flex-none opacity-0" : "opacity-100")}>
              <div className="flex items-center gap-2">
                <p className="truncate text-base font-black text-ink">FlexOps ERP</p>
              </div>
              <p className="mt-1 truncate text-xs font-bold text-slate-500">نظام إدارة الأعمال الذكي</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onMouseEnter={(event) => showTooltip(item.label, event)}
              onMouseLeave={hideTooltip}
              onFocus={(event) => showTooltip(item.label, event)}
              onBlur={hideTooltip}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition",
                  isCollapsed && "mx-auto h-12 w-12 justify-center gap-0 rounded-2xl px-0 py-0",
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
                      isActive && !isCollapsed ? "bg-primary opacity-100 dark:bg-cyan-300" : "bg-transparent opacity-0",
                    )}
                  />
                  <item.icon className={cn("shrink-0 transition", isActive ? "text-primary dark:text-cyan-300" : "text-slate-500 group-hover:text-primary dark:text-slate-400")} size={18} />
                  <span className={cn("whitespace-nowrap transition-all duration-300", isCollapsed ? "hidden" : "opacity-100")}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {isCollapsed ? (
          <div className="mx-auto mt-6 flex w-12 flex-col items-center gap-2 rounded-3xl border border-slate-200/70 bg-slate-50/80 p-1.5 dark:border-slate-800 dark:bg-slate-900/60">
            {quickMetrics.map((metric) => (
              <div
                key={metric.label}
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:bg-slate-950"
                onMouseEnter={(event) => showTooltip(metric.label, event)}
                onMouseLeave={hideTooltip}
              >
                <metric.icon size={17} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-bold text-slate-500">الوضع الحالي</p>
            <p className="mt-1 text-sm font-black text-ink">{activeMode?.name}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{activeMode?.accent}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quickMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-white p-3 text-center text-[11px] font-bold text-slate-500 dark:bg-slate-950 dark:text-slate-400" title={metric.label}>
                  <metric.icon className="mx-auto mb-1 text-primary" size={16} />
                  {metric.label}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          onMouseEnter={(event) => showTooltip("تسجيل خروج", event)}
          onMouseLeave={hideTooltip}
          onFocus={(event) => showTooltip("تسجيل خروج", event)}
          onBlur={hideTooltip}
          className={cn(
            "group mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:shadow-card focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200",
            isCollapsed && "mx-auto h-12 w-12 justify-center rounded-2xl px-0 py-0",
          )}
        >
          <span className={cn("flex items-center gap-3", isCollapsed && "justify-center gap-0")}>
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-rose-100 group-hover:text-rose-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-rose-400/15 dark:group-hover:text-rose-200", isCollapsed && "bg-transparent dark:bg-transparent")}>
              <LogOut size={17} />
            </span>
            <span className={cn("whitespace-nowrap transition-all duration-300", isCollapsed ? "hidden" : "opacity-100")}>تسجيل خروج</span>
          </span>
        </button>
      </div>

      <div className="border-t border-slate-200/70 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? "فتح القائمة الجانبية" : "إغلاق القائمة الجانبية"}
          onMouseEnter={(event) => showTooltip(isCollapsed ? "فتح القائمة" : "إغلاق القائمة", event)}
          onMouseLeave={hideTooltip}
          onFocus={(event) => showTooltip(isCollapsed ? "فتح القائمة" : "إغلاق القائمة", event)}
          onBlur={hideTooltip}
          className={cn(
            "group flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft hover:text-primary hover:shadow-card focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-300/30 dark:hover:bg-primary/10 dark:hover:text-cyan-200",
          )}
        >
          {isCollapsed ? <ChevronsLeft className="transition duration-300 group-hover:-translate-x-0.5" size={20} /> : <ChevronsRight className="transition duration-300 group-hover:translate-x-0.5" size={20} />}
    
        </button>
      </div>
      {isCollapsed && tooltip ? (
        <div
          className="pointer-events-none fixed right-[4.35rem] z-[9999] -translate-y-1/2 rounded-xl border border-slate-900/5 bg-slate-950 px-3 py-2 text-xs font-black text-white opacity-100 shadow-[0_12px_34px_rgba(15,23,42,0.32)] dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_12px_34px_rgba(0,0,0,0.45)]"
          style={{ top: tooltip.top }}
        >
          <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-slate-950 dark:bg-white" />
          {tooltip.label}
        </div>
      ) : null}
    </aside>
  );
}
