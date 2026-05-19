import { FormEvent, type ChangeEvent, useEffect, useState } from "react";
import { ImageUp, Moon, Save, Sun } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Input } from "../components/ui/Input";
import { useToast } from "../components/ui/Toast";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { BusinessModuleKey, BusinessSettings } from "../types";

const moduleLabels: Record<BusinessModuleKey, string> = {
  customers: "العملاء",
  products: "المنتجات والخدمات",
  orders: "الطلبات والحجوزات",
  invoices: "الفواتير",
  expenses: "المصروفات",
  reports: "التقارير",
  modes: "أوضاع العرض",
};

const currencyOptions = [
  { label: "جنيه مصري", value: "ج.م" },
  { label: "ريال سعودي", value: "ر.س" },
  { label: "درهم إماراتي", value: "د.إ" },
  { label: "دولار", value: "$" },
];

export function SettingsPage(): JSX.Element {
  const settings = useFlexOpsStore((state) => state.settings);
  const theme = useFlexOpsStore((state) => state.theme);
  const setTheme = useFlexOpsStore((state) => state.setTheme);
  const setSettings = useFlexOpsStore((state) => state.setSettings);
  const { notify } = useToast();
  const [form, setForm] = useState<BusinessSettings>(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSettings(form);
    notify("تم حفظ الإعدادات وتطبيقها على الواجهة");
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        logoMode: "uploaded",
        logoDataUrl: String(reader.result),
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageContainer title="الإعدادات" description="تخصيص واجهة نسخة العرض، المصطلحات، الموديولات، والهوية الأساسية للنشاط.">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="المظهر" description="اختيار الوضع الفاتح أو الداكن محفوظ في localStorage ويطبق على النظام بالكامل." />
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              variant={theme === "light" ? "primary" : "outline"}
              icon={<Sun size={18} />}
              onClick={() => setTheme("light")}
            >
              الوضع الفاتح
            </Button>
            <Button
              variant={theme === "dark" ? "primary" : "outline"}
              icon={<Moon size={18} />}
              onClick={() => setTheme("dark")}
            >
              الوضع الداكن
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="بيانات النشاط" description="تظهر هذه البيانات في الهيدر والفاتورة." />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="اسم النشاط التجاري" value={form.businessName} onChange={(event) => setForm((current) => ({ ...current, businessName: event.target.value }))} />
            <Input label="نوع النشاط" value={form.businessType} onChange={(event) => setForm((current) => ({ ...current, businessType: event.target.value }))} />
            <Input label="رقم واتساب" value={form.whatsapp} onChange={(event) => setForm((current) => ({ ...current, whatsapp: event.target.value }))} />
            <Dropdown
              label="العملة"
              value={form.currency}
              onChange={(value) => setForm((current) => ({ ...current, currency: value }))}
              options={currencyOptions}
            />
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader title="الهوية البصرية" description="اللون الأساسي والشعار المستخدمان في الواجهة والفاتورة." />
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">اللون الأساسي</span>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(event) => setForm((current) => ({ ...current, primaryColor: event.target.value }))}
                    className="h-11 w-16 cursor-pointer rounded-2xl border border-slate-200 bg-white p-1"
                  />
                  <Input value={form.primaryColor} onChange={(event) => setForm((current) => ({ ...current, primaryColor: event.target.value }))} />
                </div>
              </label>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-bold text-slate-700">الشعار</p>
                <div className="flex flex-wrap items-center gap-4">
                  {form.logoMode === "uploaded" && form.logoDataUrl ? (
                    <img src={form.logoDataUrl} alt="الشعار المرفوع" className="h-16 w-16 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white">FO</div>
                  )}
                  <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-ink transition hover:border-primary hover:text-primary">
                    <ImageUp size={17} />
                    رفع لوجو وهمي
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                  <Button variant="ghost" onClick={() => setForm((current) => ({ ...current, logoMode: "placeholder", logoDataUrl: undefined }))}>
                    Placeholder
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="المصطلحات" description="تغيير أسماء الكيانات لتناسب نشاط العميل." />
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="Customer Label"
                value={form.labels.customer}
                onChange={(event) => setForm((current) => ({ ...current, labels: { ...current.labels, customer: event.target.value } }))}
              />
              <Input
                label="Order Label"
                value={form.labels.order}
                onChange={(event) => setForm((current) => ({ ...current, labels: { ...current.labels, order: event.target.value } }))}
              />
              <Input
                label="Product Label"
                value={form.labels.product}
                onChange={(event) => setForm((current) => ({ ...current, labels: { ...current.labels, product: event.target.value } }))}
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["عميل", "مريض", "عضو", "طالب"].map((label) => (
                <Button key={label} variant="outline" onClick={() => setForm((current) => ({ ...current, labels: { ...current.labels, customer: label } }))}>
                  {label}
                </Button>
              ))}
              {["طلب", "حجز", "اشتراك", "خدمة"].map((label) => (
                <Button key={label} variant="outline" onClick={() => setForm((current) => ({ ...current, labels: { ...current.labels, order: label } }))}>
                  {label}
                </Button>
              ))}
              {["منتج", "خدمة", "باكدج", "صنف"].map((label) => (
                <Button key={label} variant="outline" onClick={() => setForm((current) => ({ ...current, labels: { ...current.labels, product: label } }))}>
                  {label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="الموديولات" description="إظهار أو إخفاء أقسام النظام من القائمة الجانبية داخل نسخة العرض." />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {(Object.keys(moduleLabels) as BusinessModuleKey[]).map((moduleKey) => (
              <label key={moduleKey} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <span className="font-bold text-ink">{moduleLabels[moduleKey]}</span>
                <input
                  type="checkbox"
                  checked={form.enabledModules[moduleKey]}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      enabledModules: {
                        ...current.enabledModules,
                        [moduleKey]: event.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 accent-[var(--primary-color)]"
                />
              </label>
            ))}
          </div>
        </Card>

        <div className="sticky bottom-4 z-10 flex justify-end rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-soft backdrop-blur no-print">
          <Button type="submit" size="lg" icon={<Save size={18} />}>
            حفظ الإعدادات
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
