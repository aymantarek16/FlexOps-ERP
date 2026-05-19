import { AlertTriangle, Crown, PackageSearch, Receipt, TrendingUp, UsersRound } from "lucide-react";
import { ExpensesChart } from "../components/charts/ExpensesChart";
import { RevenueExpenseChart } from "../components/charts/RevenueExpenseChart";
import { SalesChart } from "../components/charts/SalesChart";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Card, CardHeader } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import { formatCurrency } from "../utils/format";

export function ReportsPage(): JSX.Element {
  const settings = useFlexOpsStore((state) => state.settings);
  const { customers, invoices, orders, products, report } = useDemoData();

  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const paidAmount = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const outstanding = invoices.reduce((sum, invoice) => sum + invoice.remaining, 0);
  const unfinishedOrders = orders.filter((order) => !["مكتمل", "ملغي"].includes(order.status));
  const lowStockProducts = products.filter((product) => typeof product.stock === "number" && product.stock <= 10);
  const alerts = [
    `${invoices.filter((invoice) => invoice.status !== "مدفوعة").length} فواتير تحتاج متابعة`,
    `${unfinishedOrders.length} طلبات لم تكتمل`,
    `${lowStockProducts.length} منتجات منخفضة الكمية`,
    ...report.alerts,
  ];

  return (
    <PageContainer title="التقارير" description="ملخص تنفيذي للمبيعات والمصروفات والعملاء والتنبيهات في وضع العرض الحالي.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="إجمالي الإيرادات" value={formatCurrency(totalSales, settings.currency)} icon={TrendingUp} />
        <StatCard title="المحصل" value={formatCurrency(paidAmount, settings.currency)} icon={Receipt} tone="emerald" />
        <StatCard title="المتبقي" value={formatCurrency(outstanding, settings.currency)} icon={AlertTriangle} tone="amber" />
        <StatCard title={`أفضل ${settings.labels.customer}ين`} value={String(customers.length)} icon={UsersRound} tone="cyan" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="رسم المبيعات" description="آخر 6 شهور حسب النشاط المحدد." />
          <SalesChart data={report.salesTrend} currency={settings.currency} />
        </Card>
        <Card>
          <CardHeader title="رسم المصروفات" description="اتجاه مصروفات التشغيل الشهرية." />
          <ExpensesChart data={report.expensesTrend} currency={settings.currency} />
        </Card>
      </div>

      <Card>
        <CardHeader title="مقارنة الإيرادات والمصروفات" description="آخر 3 شهور في عرض واحد." />
        <RevenueExpenseChart data={report.revenueVsExpenses} currency={settings.currency} />
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader title={`أفضل ${settings.labels.customer}ين`} />
          <div className="space-y-3">
            {report.topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-soft text-sm font-black text-primary">{index + 1}</span>
                  <span className="font-bold text-ink">{customer.name}</span>
                </div>
                <strong className="text-sm text-primary">{formatCurrency(customer.value, settings.currency)}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title={`أفضل ${settings.labels.product}ات`} />
          <div className="space-y-3">
            {report.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                    {index === 0 ? <Crown size={17} /> : <PackageSearch size={17} />}
                  </span>
                  <span className="font-bold text-ink">{product.name}</span>
                </div>
                <Badge tone="info">{product.value}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="تنبيهات" />
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-sm font-bold leading-6 text-amber-800">
                <AlertTriangle className="mt-0.5 shrink-0" size={17} />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
