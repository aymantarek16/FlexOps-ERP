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
  const settings = useFlexOpsStore((state) => state.settings);
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const logout = useFlexOpsStore((state) => state.logout);
  const activeMode = businessModes.find((mode) => mode.id === selectedMode);

  const visibleItems = navigationItems.filter((item) => !item.module || settings.enabledModules[item.module]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-30 hidden border-l border-slate-200/80 bg-white/92 shadow-soft backdrop-blur-xl transition-[width] duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/92 lg:flex lg:flex-col no-print",
        isCollapsed ? "w-24" : "w-72",
      )}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.65)_transparent]">
        <div className={cn("mb-6 rounded-2xl border border-primary/15 bg-gradient-to-l from-primary-soft to-white p-3 shadow-card transition-all duration-300 dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-900", isCollapsed && "px-2")}>
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
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition",
                  isCollapsed && "justify-center px-0",
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
                  <item.icon className={cn("shrink-0 transition", isActive ? "text-primary dark:text-cyan-300" : "text-slate-500 group-hover:text-primary dark:text-slate-400")} size={18} />
                  <span className={cn("whitespace-nowrap transition-all duration-300", isCollapsed ? "w-0 translate-x-3 overflow-hidden opacity-0" : "opacity-100")}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={cn("mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60", isCollapsed && "p-3 text-center")}>
          <p className="text-xs font-bold text-slate-500">الوضع الحالي</p>
          <p className={cn("mt-1 text-sm font-black text-ink", isCollapsed && "sr-only")}>{activeMode?.name}</p>
          <p className={cn("mt-1 text-xs leading-5 text-slate-500", isCollapsed && "sr-only")}>{activeMode?.accent}</p>
          <div className={cn("mt-4 grid gap-2", isCollapsed ? "grid-cols-1" : "grid-cols-2")}>
            {quickMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-white p-3 text-center text-[11px] font-bold text-slate-500 dark:bg-slate-950 dark:text-slate-400" title={metric.label}>
                <metric.icon className="mx-auto mb-1 text-primary" size={16} />
                <span className={cn(isCollapsed && "sr-only")}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          title={isCollapsed ? "تسجيل خروج" : undefined}
          className={cn(
            "group mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:shadow-card focus:outline-none focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200",
            isCollapsed && "justify-center px-2",
          )}
        >
          <span className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-rose-100 group-hover:text-rose-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-rose-400/15 dark:group-hover:text-rose-200">
              <LogOut size={17} />
            </span>
            <span className={cn("whitespace-nowrap transition-all duration-300", isCollapsed ? "w-0 overflow-hidden opacity-0" : "opacity-100")}>تسجيل خروج</span>
          </span>
        </button>
      </div>

      <div className="border-t border-slate-200/70 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? "فتح القائمة الجانبية" : "إغلاق القائمة الجانبية"}
          className="group flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft hover:text-primary hover:shadow-card focus:outline-none focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-300/30 dark:hover:bg-primary/10 dark:hover:text-cyan-200"
        >
          {isCollapsed ? <ChevronsLeft className="transition duration-300 group-hover:-translate-x-0.5" size={20} /> : <ChevronsRight className="transition duration-300 group-hover:translate-x-0.5" size={20} />}
    
        </button>
      </div>
    </aside>
  );
}
