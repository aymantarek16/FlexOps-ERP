import { AlertTriangle, Bell, CheckCircle2, ClipboardList, FileWarning, PackageX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDemoData } from "../../hooks/useDemoData";
import { useFlexOpsStore } from "../../store/useFlexOpsStore";
import { cn } from "../../utils/cn";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  tone: "warning" | "danger" | "info" | "success";
  icon: typeof FileWarning;
}

const toneClasses: Record<NotificationItem["tone"], string> = {
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-400/12 dark:text-amber-300",
  danger: "bg-rose-50 text-rose-700 dark:bg-rose-400/12 dark:text-rose-300",
  info: "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/12 dark:text-cyan-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-300",
};

export function NotificationsMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const readNotificationIds = useFlexOpsStore((state) => state.readNotificationIds);
  const markNotificationRead = useFlexOpsStore((state) => state.markNotificationRead);
  const markNotificationUnread = useFlexOpsStore((state) => state.markNotificationUnread);
  const markAllNotificationsRead = useFlexOpsStore((state) => state.markAllNotificationsRead);
  const { invoices, orders, products } = useDemoData();

  const notifications = useMemo<NotificationItem[]>(() => {
    const unpaidInvoices = invoices.filter((invoice) => invoice.status !== "مدفوعة");
    const delayedOrders = orders.filter((order) => order.status === "متأخر");
    const runningOrders = orders.filter((order) => ["جديد", "قيد التنفيذ"].includes(order.status));
    const lowStock = products.filter((product) => typeof product.stock === "number" && product.stock <= 10);

    const items: NotificationItem[] = [];

    if (unpaidInvoices.length > 0) {
      items.push({
        id: `${selectedMode}:unpaid-invoices`,
        title: "فواتير تحتاج متابعة",
        description: `${unpaidInvoices.length} فاتورة جزئية أو غير مدفوعة`,
        tone: "warning",
        icon: FileWarning,
      });
    }

    if (delayedOrders.length > 0) {
      items.push({
        id: `${selectedMode}:delayed-orders`,
        title: "طلبات متأخرة",
        description: `${delayedOrders.length} طلب متأخر عن التنفيذ`,
        tone: "danger",
        icon: ClipboardList,
      });
    }

    if (lowStock.length > 0) {
      items.push({
        id: `${selectedMode}:low-stock`,
        title: "مخزون منخفض",
        description: `${lowStock.length} عنصر يحتاج مراجعة الكمية`,
        tone: "info",
        icon: PackageX,
      });
    }

    if (runningOrders.length > 0) {
      items.push({
        id: `${selectedMode}:running-orders`,
        title: "تشغيل نشط",
        description: `${runningOrders.length} طلب قيد المتابعة الآن`,
        tone: "success",
        icon: CheckCircle2,
      });
    }

    return items;
  }, [invoices, orders, products, selectedMode]);

  const notificationIds = notifications.map((notification) => notification.id);
  const unreadNotifications = notifications.filter((notification) => !readNotificationIds.includes(notification.id));
  const unreadCount = unreadNotifications.length;
  const hasUnread = unreadCount > 0;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative no-print" ref={wrapperRef} dir="rtl">
      <button
        type="button"
        aria-label={`الإشعارات: ${unreadCount} غير مقروء`}
        aria-expanded={isOpen}
        className={cn(
          "relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white text-slate-600 shadow-card transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary/10 dark:bg-slate-900 dark:text-slate-200",
          hasUnread
            ? "border-primary/40 text-primary dark:border-cyan-300/50 dark:text-cyan-200"
            : "border-slate-200 hover:border-primary hover:text-primary dark:border-slate-700 dark:hover:border-cyan-300 dark:hover:text-cyan-200",
          isOpen ? "border-primary text-primary dark:border-cyan-300 dark:text-cyan-200" : "",
        )}
        onClick={() => setIsOpen((current) => !current)}
      >
        {hasUnread ? <span className="absolute inset-1 rounded-xl bg-primary/8 dark:bg-cyan-300/10" /> : null}
        <Bell className={cn("relative", hasUnread ? "animate-pulse" : "")} size={19} />
        {hasUnread ? (
          <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4 dark:border-slate-700">
            <div>
              <p className="text-sm font-black text-ink">الإشعارات</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{unreadCount} غير مقروء من {notifications.length}</p>
            </div>
            <button
              type="button"
              disabled={unreadCount === 0}
              className="rounded-full bg-primary-soft px-3 py-1 text-xs font-black text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-cyan-200 dark:hover:bg-cyan-300 dark:hover:text-slate-950"
              onClick={() => markAllNotificationsRead(notificationIds)}
            >
              الكل مقروء
            </button>
          </div>

          <div className="max-h-96 space-y-2 overflow-y-auto p-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const isRead = readNotificationIds.includes(notification.id);

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border p-4 transition",
                      isRead
                        ? "border-transparent bg-slate-50/70 opacity-75 dark:bg-slate-800/45"
                        : "border-primary/20 bg-primary-soft dark:border-cyan-300/20 dark:bg-cyan-300/10",
                    )}
                  >
                    <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", toneClasses[notification.tone])}>
                      <notification.icon size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            {!isRead ? <span className="h-2 w-2 rounded-full bg-rose-600" /> : null}
                            <p className="truncate text-sm font-black text-ink">{notification.title}</p>
                          </div>
                          <p className="mt-1 text-sm font-bold leading-6 text-slate-500">{notification.description}</p>
                        </div>
                        <button
                          type="button"
                          className={cn(
                            "w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-black transition",
                            isRead
                              ? "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                              : "bg-white text-primary shadow-sm hover:bg-primary hover:text-white dark:bg-slate-900 dark:text-cyan-200 dark:hover:bg-cyan-300 dark:hover:text-slate-950",
                          )}
                          onClick={() => {
                            if (isRead) {
                              markNotificationUnread(notification.id);
                            } else {
                              markNotificationRead(notification.id);
                            }
                          }}
                        >
                          {isRead ? "غير مقروء" : "مقروء"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-800/60">
                <CheckCircle2 className="mx-auto text-emerald-600" size={24} />
                <p className="mt-2 text-sm font-black text-ink">لا توجد تنبيهات حاليًا</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 p-3 text-xs font-bold text-slate-500 dark:border-slate-700">
            <AlertTriangle size={14} />
            <span>حالة القراءة محفوظة في localStorage</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
