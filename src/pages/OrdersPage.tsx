import { RefreshCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge, getStatusTone } from "../components/ui/Badge";
import { Card, CardHeader } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Input } from "../components/ui/Input";
import { Table } from "../components/ui/Table";
import { useToast } from "../components/ui/Toast";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { OrderStatus } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

const orderStatuses: OrderStatus[] = ["جديد", "قيد التنفيذ", "مكتمل", "ملغي", "متأخر"];
const orderStatusOptions = orderStatuses.map((status) => ({ label: status, value: status }));

export function OrdersPage(): JSX.Element {
  const { orders } = useDemoData();
  const settings = useFlexOpsStore((state) => state.settings);
  const updateOrderStatus = useFlexOpsStore((state) => state.updateOrderStatus);
  const { notify } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch = [order.orderNumber, order.customerName, order.owner, order.type].some((value) =>
          value.toLowerCase().includes(search.toLowerCase()),
        );
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [orders, search, statusFilter],
  );

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    notify("تم تحديث حالة الطلب وحفظها محليًا");
  };

  return (
    <PageContainer
      title="الطلبات والحجوزات"
      description="تتبع الطلبات والحجوزات والخدمات والاشتراكات، مع حفظ تغيير الحالة في localStorage."
    >
      <Card>
        <CardHeader
          title={`جدول ${settings.labels.order}ات`}
          description="بحث وفلترة وتغيير حالة الطلب مباشرة من الجدول."
          action={<span className="inline-flex items-center gap-2 rounded-2xl bg-primary-soft px-4 py-2 text-sm font-bold text-primary"><RefreshCcw size={16} />محفوظ تلقائيًا</span>}
        />
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <Input placeholder="ابحث برقم الطلب أو العميل أو المسؤول" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={17} />} />
          <Dropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: "كل الحالات", value: "all" },
              ...orderStatusOptions,
            ]}
          />
        </div>
        <Table headers={["رقم الطلب", settings.labels.customer, "النوع", "التاريخ", "المسؤول", "الحالة", "الإجمالي", "المدفوع", "المتبقي"]}>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-black text-primary">{order.orderNumber}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{order.customerName}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge>{order.type}</Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(order.date)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{order.owner}</td>
              <td className="min-w-44 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Badge tone={getStatusTone(order.status)}>{order.status}</Badge>
                  <Dropdown
                    className="min-w-36"
                    buttonClassName="h-9 rounded-xl px-3"
                    value={order.status}
                    onChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    options={orderStatusOptions}
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{formatCurrency(order.total, settings.currency)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-emerald-700">{formatCurrency(order.paid, settings.currency)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-rose-700">{formatCurrency(order.remaining, settings.currency)}</td>
            </tr>
          ))}
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-10 text-center text-sm font-bold text-slate-400">
                لا توجد طلبات مطابقة.
              </td>
            </tr>
          ) : null}
        </Table>
      </Card>
    </PageContainer>
  );
}
