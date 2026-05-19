import { Award, ClipboardList, FileWarning, Receipt, TrendingUp, UsersRound, WalletCards } from "lucide-react";
import { Badge, getStatusTone } from "../components/ui/Badge";
import { Card, CardHeader } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { Table } from "../components/ui/Table";
import { SalesChart } from "../components/charts/SalesChart";
import { OrdersPieChart } from "../components/charts/OrdersPieChart";
import { PageContainer } from "../components/layout/PageContainer";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import { formatCurrency, formatDate } from "../utils/format";

export function DashboardPage(): JSX.Element {
  const settings = useFlexOpsStore((state) => state.settings);
  const { customers, orders, invoices, expenses, report } = useDemoData();

  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const activeOrders = orders.filter((order) => !["مكتمل", "ملغي"].includes(order.status)).length;
  const unpaidInvoices = invoices.filter((invoice) => invoice.status !== "مدفوعة").length;
  const monthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalSales - monthlyExpenses;
  const latestOrders = orders.slice(0, 5);
  const topItems = report.topProducts;
  const totalTopItemRequests = topItems.reduce((sum, item) => sum + item.value, 0);
  const maxTopItemValue = Math.max(...topItems.map((item) => item.value), 1);

  return (
    <PageContainer
      title="لوحة التحكم"
      description="نظرة تنفيذية على أداء النشاط، المبيعات، الطلبات، الفواتير، والمصروفات."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="إجمالي المبيعات" value={formatCurrency(totalSales, settings.currency)} helper="حسب فواتير نسخة العرض" icon={WalletCards} />
        <StatCard title={`عدد ${settings.labels.customer}ين`} value={String(customers.length)} helper="نشط وغير نشط" icon={UsersRound} tone="cyan" />
        <StatCard title="الطلبات النشطة" value={String(activeOrders)} helper="جديد أو قيد التنفيذ أو متأخر" icon={ClipboardList} tone="amber" />
        <StatCard title="الفواتير غير المدفوعة" value={String(unpaidInvoices)} helper="جزئية وغير مدفوعة" icon={FileWarning} tone="rose" />
        <StatCard title="مصروفات الشهر" value={formatCurrency(monthlyExpenses, settings.currency)} helper="مصروفات مايو 2026" icon={Receipt} tone="violet" />
        <StatCard title="صافي الربح" value={formatCurrency(netProfit, settings.currency)} helper={netProfit >= 0 ? "هامش موجب" : "يحتاج مراجعة"} icon={TrendingUp} tone="emerald" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="مبيعات آخر 6 شهور" description="اتجاه الإيرادات حسب بيانات نسخة العرض الحالية." />
          <SalesChart data={report.salesTrend} currency={settings.currency} />
        </Card>
        <Card>
          <CardHeader title="توزيع الطلبات حسب الحالة" description="نسبة الحالات الحالية بعد أي تعديلات محفوظة." />
          <OrdersPieChart orders={orders} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader
            title="الأكثر طلبًا"
            description={`ترتيب أعلى ${settings.labels.product} حسب عدد الطلبات في نسخة العرض الحالية.`}
            action={<Badge tone="info">آخر 30 يوم</Badge>}
          />
          <div className="space-y-4">
            {topItems.map((item, index) => {
              const percentage = Math.round((item.value / maxTopItemValue) * 100);

              return (
                <div key={item.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800/45">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white shadow-soft">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-ink">{item.name}</p>
                        <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">عدد الطلبات المسجلة</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-primary shadow-sm dark:bg-slate-900">
                      {item.value} طلب
                    </span>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white dark:bg-slate-900">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary-soft p-4">
              <div className="flex items-center gap-2 text-xs font-black text-primary">
                <Award size={16} />
                <span>إجمالي الطلبات</span>
              </div>
              <p className="mt-2 text-2xl font-black text-ink">{totalTopItemRequests}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/45">
              <p className="text-xs font-black text-slate-500 dark:text-slate-400">العنصر الأعلى</p>
              <p className="mt-2 truncate text-base font-black text-ink">{topItems[0]?.name ?? "لا يوجد"}</p>
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="آخر الطلبات" description="أحدث العمليات المعروضة في النظام." />
          <Table headers={["رقم الطلب", settings.labels.customer, "التاريخ", "المسؤول", "الحالة", "الإجمالي"]}>
            {latestOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 font-black text-primary">{order.orderNumber}</td>
                <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{order.customerName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(order.date)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{order.owner}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge tone={getStatusTone(order.status)}>{order.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{formatCurrency(order.total, settings.currency)}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </PageContainer>
  );
}
