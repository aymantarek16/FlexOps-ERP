import { Edit3, Plus, Search, Trash2, UserRoundPlus, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge, getStatusTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Table } from "../components/ui/Table";
import { useToast } from "../components/ui/Toast";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { Customer, CustomerStatus, CustomerType } from "../types";
import { formatCurrency, formatDate, generateId } from "../utils/format";

interface CustomerFormState {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  type: CustomerType;
  status: CustomerStatus;
  totalTransactions: string;
  lastInteraction: string;
}

const initialCustomerForm: CustomerFormState = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  type: "فرد",
  status: "نشط",
  totalTransactions: "0",
  lastInteraction: "2026-05-19",
};

const typeOptions = [
  { label: "كل الأنواع", value: "all" },
  { label: "فرد", value: "فرد" },
  { label: "شركة", value: "شركة" },
];

const statusOptions = [
  { label: "كل الحالات", value: "all" },
  { label: "نشط", value: "نشط" },
  { label: "غير نشط", value: "غير نشط" },
];

const customerTypeOptions = typeOptions.filter((option) => option.value !== "all");
const customerStatusOptions = statusOptions.filter((option) => option.value !== "all");

const createFormFromCustomer = (customer: Customer): CustomerFormState => ({
  name: customer.name,
  phone: customer.phone,
  whatsapp: customer.whatsapp,
  email: customer.email,
  type: customer.type,
  status: customer.status,
  totalTransactions: String(customer.totalTransactions),
  lastInteraction: customer.lastInteraction,
});

export function CustomersPage(): JSX.Element {
  const { customers } = useDemoData();
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const settings = useFlexOpsStore((state) => state.settings);
  const addCustomer = useFlexOpsStore((state) => state.addCustomer);
  const updateCustomer = useFlexOpsStore((state) => state.updateCustomer);
  const deleteCustomers = useFlexOpsStore((state) => state.deleteCustomers);
  const { notify } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [form, setForm] = useState<CustomerFormState>(initialCustomerForm);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const matchesSearch = [customer.name, customer.phone, customer.email].some((value) =>
          value.toLowerCase().includes(search.toLowerCase()),
        );
        const matchesType = typeFilter === "all" || customer.type === typeFilter;
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
      }),
    [customers, search, statusFilter, typeFilter],
  );

  const filteredCustomerIds = filteredCustomers.map((customer) => customer.id);
  const selectedCount = selectedCustomerIds.length;
  const isAllFilteredSelected =
    filteredCustomerIds.length > 0 && filteredCustomerIds.every((customerId) => selectedCustomerIds.includes(customerId));

  const openAddModal = () => {
    setEditingCustomer(null);
    setForm(initialCustomerForm);
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setForm(createFormFromCustomer(customer));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setForm(initialCustomerForm);
  };

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomerIds((current) =>
      current.includes(customerId) ? current.filter((id) => id !== customerId) : [...current, customerId],
    );
  };

  const toggleAllFilteredSelection = () => {
    setSelectedCustomerIds((current) => {
      if (isAllFilteredSelected) {
        return current.filter((customerId) => !filteredCustomerIds.includes(customerId));
      }

      return Array.from(new Set([...current, ...filteredCustomerIds]));
    });
  };

  const handleDeleteCustomers = (customerIds: string[]) => {
    if (customerIds.length === 0) return;

    deleteCustomers(customerIds);
    setSelectedCustomerIds((current) => current.filter((customerId) => !customerIds.includes(customerId)));
    notify(customerIds.length === 1 ? `تم حذف ${settings.labels.customer}` : `تم حذف ${customerIds.length} سجلات`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Customer = {
      id: editingCustomer?.id ?? generateId("customer"),
      modeId: editingCustomer?.modeId ?? selectedMode,
      name: form.name,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      email: form.email,
      type: form.type,
      status: form.status,
      totalTransactions: Number(form.totalTransactions),
      lastInteraction: form.lastInteraction,
    };

    if (editingCustomer) {
      updateCustomer(payload);
      notify(`تم تحديث بيانات ${settings.labels.customer}`);
    } else {
      addCustomer(payload);
      notify(`تم إضافة ${settings.labels.customer} جديد`);
    }

    closeModal();
  };

  return (
    <PageContainer
      title="العملاء"
      description={`إدارة بيانات ${settings.labels.customer}ين نسخة العرض، البحث، الفلترة، التعديل، الحذف، وتحديد أكثر من سجل.`}
      action={<Button icon={<Plus size={18} />} onClick={openAddModal}>إضافة {settings.labels.customer}</Button>}
    >
      <Card>
        <CardHeader title={`قائمة ${settings.labels.customer}ين`} description="جدول قابل للبحث والفلترة مع إجراءات فردية وجماعية." />
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px_200px]">
          <Input placeholder="ابحث بالاسم أو الهاتف أو البريد" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={17} />} />
          <Dropdown value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
          <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
        </div>

        {selectedCount > 0 ? (
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-black text-primary">تم تحديد {selectedCount} {settings.labels.customer}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Edit3 size={16} />}
                disabled={selectedCount !== 1}
                onClick={() => {
                  const customer = customers.find((item) => item.id === selectedCustomerIds[0]);
                  if (customer) openEditModal(customer);
                }}
              >
                تعديل المحدد
              </Button>
              <Button variant="danger" size="sm" icon={<Trash2 size={16} />} onClick={() => handleDeleteCustomers(selectedCustomerIds)}>
                حذف المحدد
              </Button>
              <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => setSelectedCustomerIds([])}>
                إلغاء التحديد
              </Button>
            </div>
          </div>
        ) : null}

        <Table headers={["", "الاسم", "الهاتف", "واتساب", "البريد", "النوع", "الحالة", "إجمالي التعاملات", "آخر تعامل", "إجراءات"]}>
          {filteredCustomers.map((customer) => {
            const isSelected = selectedCustomerIds.includes(customer.id);

            return (
              <tr key={customer.id} className={isSelected ? "bg-primary-soft" : "hover:bg-slate-50"}>
                <td className="w-12 whitespace-nowrap px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCustomerSelection(customer.id)}
                    aria-label={`تحديد ${customer.name}`}
                    className="h-5 w-5 rounded border-slate-300 accent-[var(--primary-color)]"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-black text-ink">{customer.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{customer.phone}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{customer.whatsapp}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{customer.email}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge tone="purple">{customer.type}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge tone={getStatusTone(customer.status)}>{customer.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{formatCurrency(customer.totalTransactions, settings.currency)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(customer.lastInteraction)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" icon={<Edit3 size={16} />} aria-label={`تعديل ${customer.name}`} onClick={() => openEditModal(customer)} />
                    <Button variant="ghost" size="icon" icon={<Trash2 size={16} />} aria-label={`حذف ${customer.name}`} onClick={() => handleDeleteCustomers([customer.id])} />
                  </div>
                </td>
              </tr>
            );
          })}
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-4 py-10 text-center text-sm font-bold text-slate-400">
                لا توجد نتائج مطابقة.
              </td>
            </tr>
          ) : null}
        </Table>

        {filteredCustomers.length > 0 ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-600">
              <input
                type="checkbox"
                checked={isAllFilteredSelected}
                onChange={toggleAllFilteredSelection}
                className="h-5 w-5 rounded border-slate-300 accent-[var(--primary-color)]"
              />
              تحديد كل النتائج المعروضة
            </label>
            <span className="text-xs font-bold text-slate-500">{filteredCustomers.length} نتيجة</span>
          </div>
        ) : null}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCustomer ? `تعديل ${settings.labels.customer}` : `إضافة ${settings.labels.customer}`}
        description={editingCustomer ? "عدّل بيانات السجل وسيتم حفظها محليًا." : "سجل وهمي محفوظ في localStorage."}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="الاسم" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
            <Input label="رقم الهاتف" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} required />
            <Input label="واتساب" value={form.whatsapp} onChange={(event) => setForm((current) => ({ ...current, whatsapp: event.target.value }))} />
            <Input label="البريد" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} required />
            <Dropdown
              label="النوع"
              value={form.type}
              onChange={(value) => setForm((current) => ({ ...current, type: value as CustomerType }))}
              options={customerTypeOptions}
            />
            <Dropdown
              label="الحالة"
              value={form.status}
              onChange={(value) => setForm((current) => ({ ...current, status: value as CustomerStatus }))}
              options={customerStatusOptions}
            />
            <Input label="إجمالي التعاملات" type="number" min="0" value={form.totalTransactions} onChange={(event) => setForm((current) => ({ ...current, totalTransactions: event.target.value }))} />
            <Input label="آخر تعامل" type="date" value={form.lastInteraction} onChange={(event) => setForm((current) => ({ ...current, lastInteraction: event.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={closeModal}>إلغاء</Button>
            <Button type="submit" icon={<UserRoundPlus size={17} />}>{editingCustomer ? "حفظ التعديل" : `حفظ ${settings.labels.customer}`}</Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
