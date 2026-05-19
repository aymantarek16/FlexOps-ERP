import { Menu, Moon, Sun } from "lucide-react";
import { useFlexOpsStore } from "../../store/useFlexOpsStore";
import { Button } from "../ui/Button";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { NotificationsMenu } from "./NotificationsMenu";

interface HeaderProps {
  onOpenMenu: () => void;
}

export function Header({ onOpenMenu }: HeaderProps): JSX.Element {
  const settings = useFlexOpsStore((state) => state.settings);
  const theme = useFlexOpsStore((state) => state.theme);
  const toggleTheme = useFlexOpsStore((state) => state.toggleTheme);
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/86 backdrop-blur-xl no-print">
      <div className="flex min-h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button className="lg:hidden" variant="ghost" size="icon" icon={<Menu size={20} />} onClick={onOpenMenu} aria-label="فتح القائمة" />

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-primary">نظام إدارة الأعمال الذكي</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="truncate text-lg font-black text-ink sm:text-xl">{settings.businessName}</h1>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{settings.businessType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5" dir="ltr">
          <a
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/15"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            dir="rtl"
          >
            <WhatsAppIcon size={18} />
            <span className="hidden sm:inline">واتساب</span>
          </a>

          <NotificationsMenu />

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-3.5 text-sm font-black text-slate-700 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary-soft hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10 dark:hover:text-cyan-200"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
          >
            <ThemeIcon size={17} />
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
