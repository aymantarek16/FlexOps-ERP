import { Edit3, Plus, ReceiptText, Trash2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { StatCard } from "../components/ui/StatCard";
import { Table } from "../components/ui/Table";
import { useToast } from "../components/ui/Toast";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { Expense, ExpenseCategory } from "../types";
import { formatCurrency, formatDate, generateId } from "../utils/format";

const categories: ExpenseCategory[] = ["إيجار", "مرتبات", "إعلانات", "خامات", "شحن", "صيانة", "أخرى"];

interface ExpenseFormState {
  category: ExpenseCategory;
  description: string;
  date: string;
  amount: string;
  paymentMethod: string;
}

const initialExpenseForm: ExpenseFormState = {
  category: "أخرى",
  description: "",
  date: "2026-05-19",
  amount: "0",
  paymentMethod: "كاش",
};

const categoryOptions = categories.map((category) => ({ label: category, value: category }));

const createFormFromExpense = (expense: Expense): ExpenseFormState => ({
  category: expense.category,
  description: expense.description,
  date: expense.date,
  amount: String(expense.amount),
  paymentMethod: expense.paymentMethod,
});

export function ExpensesPage(): JSX.Element {
  const { expenses } = useDemoData();
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const settings = useFlexOpsStore((state) => state.settings);
  const addExpense = useFlexOpsStore((state) => state.addExpense);
  const updateExpense = useFlexOpsStore((state) => state.updateExpense);
  const deleteExpenses = useFlexOpsStore((state) => state.deleteExpenses);
  const { notify } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [form, setForm] = useState<ExpenseFormState>(initialExpenseForm);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = useMemo(
    () =>
      categories.map((category) => ({
        category,
        total: expenses.filter((expense) => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0),
      })),
    [expenses],
  );
  const highestCategory = [...categoryTotals].sort((a, b) => b.total - a.total)[0];

  const openAddModal = () => {
    setEditingExpense(null);
    setForm(initialExpenseForm);
    setIsModalOpen(true);
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setForm(createFormFromExpense(expense));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingExpense(null);
    setForm(initialExpenseForm);
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (expense: Expense) => {
    deleteExpenses([expense.id]);
    notify("تم حذف المصروف");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Expense = {
      id: editingExpense?.id ?? generateId("expense"),
      modeId: editingExpense?.modeId ?? selectedMode,
      category: form.category,
      description: form.description,
      date: form.date,
      amount: Number(form.amount),
      paymentMethod: form.paymentMethod,
    };

    if (editingExpense) {
      updateExpense(payload);
      notify("تم تحديث المصروف");
    } else {
      addExpense(payload);
      notify("تم إضافة المصروف وحفظه محليًا");
    }

    closeModal();
  };

  return (
    <PageContainer
      title="المصروفات"
      description="متابعة مصروفات الشهر حسب التصنيف وطريقة الدفع."
      action={<Button icon={<Plus size={18} />} onClick={openAddModal}>إضافة مصروف</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="إجمالي المصروفات" value={formatCurrency(totalExpenses, settings.currency)} icon={ReceiptText} tone="rose" />
        <StatCard title="أعلى تصنيف" value={highestCategory?.category ?? "لا يوجد"} helper={formatCurrency(highestCategory?.total ?? 0, settings.currency)} icon={ReceiptText} tone="amber" />
        <StatCard title="عدد البنود" value={String(expenses.length)} helper="مصروفات مسجلة" icon={ReceiptText} tone="cyan" />
      </div>

      <Card>
        <CardHeader title="جدول المصروفات" description="بيانات وهمية قابلة للإضافة داخل المتصفح." />
        <Table headers={["التصنيف", "الوصف", "التاريخ", "المبلغ", "طريقة الدفع", "إجراءات"]}>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-black text-primary">{expense.category}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{expense.description}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(expense.date)}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-rose-700">{formatCurrency(expense.amount, settings.currency)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{expense.paymentMethod}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" icon={<Edit3 size={16} />} aria-label={`تعديل ${expense.description}`} onClick={() => openEditModal(expense)} />
                  <Button variant="ghost" size="icon" icon={<Trash2 size={16} />} aria-label={`حذف ${expense.description}`} onClick={() => handleDeleteExpense(expense)} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingExpense ? "تعديل مصروف" : "إضافة مصروف"}
        description={editingExpense ? "عدّل بيانات المصروف وسيتم حفظها محليًا." : "مصروف وهمي محفوظ في localStorage."}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Dropdown
              label="التصنيف"
              value={form.category}
              onChange={(value) => setForm((current) => ({ ...current, category: value as ExpenseCategory }))}
              options={categoryOptions}
            />
            <Input label="التاريخ" type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
            <Input label="الوصف" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required />
            <Input label="المبلغ" type="number" min="0" value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} />
            <Input label="طريقة الدفع" value={form.paymentMethod} onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={closeModal}>إلغاء</Button>
            <Button type="submit" icon={<ReceiptText size={17} />}>{editingExpense ? "حفظ التعديل" : "حفظ المصروف"}</Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
