import type { Invoice, BusinessSettings } from "../../types";
import { formatCurrency, formatDate } from "../../utils/format";

interface InvoicePreviewProps {
  invoice: Invoice;
  settings: BusinessSettings;
}

export function InvoicePreview({ invoice, settings }: InvoicePreviewProps): JSX.Element {
  return (
    <article className="print-target rounded-2xl border border-slate-200 bg-white p-6">
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          {settings.logoMode === "uploaded" && settings.logoDataUrl ? (
            <img src={settings.logoDataUrl} alt="شعار النشاط" className="h-14 w-14 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white">FO</div>
          )}
          <div>
            <h2 className="text-xl font-black text-ink">{settings.businessName}</h2>
            <p className="text-sm font-semibold text-slate-500">{settings.businessType}</p>
            <p className="text-sm font-semibold text-slate-500">واتساب: {settings.whatsapp}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm">
          <p className="font-black text-ink">فاتورة ضريبية مبسطة</p>
          <p className="mt-2 text-slate-500">رقم الفاتورة: {invoice.invoiceNumber}</p>
          <p className="mt-1 text-slate-500">التاريخ: {formatDate(invoice.date)}</p>
        </div>
      </header>

      <section className="grid gap-4 py-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">بيانات العميل</p>
          <p className="mt-2 text-base font-black text-ink">{invoice.customerName}</p>
          <p className="mt-1 text-sm text-slate-500">هاتف: {invoice.customerPhone}</p>
        </div>
        <div className="rounded-2xl bg-primary-soft p-4">
          <p className="text-xs font-bold text-primary">حالة الفاتورة</p>
          <p className="mt-2 text-base font-black text-primary">{invoice.status}</p>
          <p className="mt-1 text-sm text-slate-600">المتبقي: {formatCurrency(invoice.remaining, settings.currency)}</p>
        </div>
      </section>

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">البند</th>
              <th className="px-4 py-3">الكمية</th>
              <th className="px-4 py-3">السعر</th>
              <th className="px-4 py-3">الإجمالي</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-bold text-ink">{item.name}</td>
                <td className="px-4 py-3 text-slate-600">{item.quantity}</td>
                <td className="px-4 py-3 text-slate-600">{formatCurrency(item.price, settings.currency)}</td>
                <td className="px-4 py-3 font-bold text-ink">{formatCurrency(item.price * item.quantity, settings.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-5 flex justify-end">
        <div className="w-full max-w-sm space-y-3 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">الإجمالي</span>
            <strong className="text-ink">{formatCurrency(invoice.total, settings.currency)}</strong>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">المدفوع</span>
            <strong className="text-emerald-700">{formatCurrency(invoice.paid, settings.currency)}</strong>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
            <span className="font-black text-ink">المتبقي</span>
            <strong className="text-primary">{formatCurrency(invoice.remaining, settings.currency)}</strong>
          </div>
        </div>
      </footer>
    </article>
  );
}
