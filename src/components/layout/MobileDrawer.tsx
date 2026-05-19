import { Building2, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFlexOpsStore } from "../../store/useFlexOpsStore";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { navigationItems } from "./navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps): JSX.Element | null {
  const settings = useFlexOpsStore((state) => state.settings);
  const visibleItems = navigationItems.filter((item) => !item.module || settings.enabledModules[item.module]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden no-print">
      <button type="button" className="absolute inset-0 bg-slate-950/45" aria-label="إغلاق القائمة" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-[min(86vw,320px)] flex-col bg-white p-4 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-card">
              <Building2 size={21} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-black text-ink">FlexOps ERP</p>
              <p className="truncate text-xs font-semibold text-slate-500">نظام إدارة الأعمال الذكي</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" icon={<X size={18} />} onClick={onClose} aria-label="إغلاق القائمة" />
        </div>

        <nav className="space-y-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
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
      </aside>
    </div>
  );
}
