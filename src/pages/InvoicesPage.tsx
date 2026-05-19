import { Eye, Printer } from "lucide-react";
import { useState } from "react";
import { InvoicePreview } from "../components/invoice/InvoicePreview";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge, getStatusTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { Table } from "../components/ui/Table";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { Invoice } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

export function InvoicesPage(): JSX.Element {
  const { invoices } = useDemoData();
  const settings = useFlexOpsStore((state) => state.settings);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <PageContainer title="الفواتير" description="استعراض الفواتير، حالاتها، ومعاينة فاتورة عربية قابلة للطباعة.">
      <Card>
        <CardHeader title="جدول الفواتير" description="الفواتير المعروضة مرتبطة ببيانات نسخة العرض للوضع الحالي." />
        <Table headers={["رقم الفاتورة", settings.labels.customer, "التاريخ", "الإجمالي", "الحالة", "عرض"]}>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-black text-primary">{invoice.invoiceNumber}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{invoice.customerName}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(invoice.date)}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-ink">{formatCurrency(invoice.total, settings.currency)}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge tone={getStatusTone(invoice.status)}>{invoice.status}</Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <Button variant="outline" size="sm" icon={<Eye size={16} />} onClick={() => setSelectedInvoice(invoice)}>
                  عرض فاتورة
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Modal
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        title="معاينة الفاتورة"
        size="xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>إغلاق</Button>
            <Button icon={<Printer size={17} />} onClick={() => window.print()}>طباعة / Export</Button>
          </div>
        }
      >
        {selectedInvoice ? <InvoicePreview invoice={selectedInvoice} settings={settings} /> : null}
      </Modal>
    </PageContainer>
  );
}
