import { Boxes, Edit3, PackagePlus, Plus, Search, Trash2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge, getStatusTone } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { useDemoData } from "../hooks/useDemoData";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import type { ProductService, ProductStatus, ProductType } from "../types";
import { formatCurrency, generateId } from "../utils/format";

interface ProductFormState {
  name: string;
  type: ProductType;
  price: string;
  category: string;
  status: ProductStatus;
  stock: string;
}

const initialProductForm: ProductFormState = {
  name: "",
  type: "خدمة",
  price: "0",
  category: "",
  status: "نشط",
  stock: "",
};

const productTypeOptions = [
  { label: "منتج", value: "منتج" },
  { label: "خدمة", value: "خدمة" },
  { label: "اشتراك", value: "اشتراك" },
];

const productStatusOptions = [
  { label: "نشط", value: "نشط" },
  { label: "متوقف", value: "متوقف" },
];

const createFormFromProduct = (product: ProductService): ProductFormState => ({
  name: product.name,
  type: product.type,
  price: String(product.price),
  category: product.category,
  status: product.status,
  stock: typeof product.stock === "number" ? String(product.stock) : "",
});

export function ProductsPage(): JSX.Element {
  const { products } = useDemoData();
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const settings = useFlexOpsStore((state) => state.settings);
  const addProduct = useFlexOpsStore((state) => state.addProduct);
  const updateProduct = useFlexOpsStore((state) => state.updateProduct);
  const deleteProducts = useFlexOpsStore((state) => state.deleteProducts);
  const { notify } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductService | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [form, setForm] = useState<ProductFormState>(initialProductForm);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = [product.name, product.category].some((value) => value.toLowerCase().includes(search.toLowerCase()));
        const matchesType = typeFilter === "all" || product.type === typeFilter;
        return matchesSearch && matchesType;
      }),
    [products, search, typeFilter],
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(initialProductForm);
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductService) => {
    setEditingProduct(product);
    setForm(createFormFromProduct(product));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setForm(initialProductForm);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (product: ProductService) => {
    deleteProducts([product.id]);
    notify(`تم حذف ${settings.labels.product}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: ProductService = {
      id: editingProduct?.id ?? generateId("product"),
      modeId: editingProduct?.modeId ?? selectedMode,
      name: form.name,
      type: form.type,
      price: Number(form.price),
      category: form.category,
      status: form.status,
      stock: form.type === "منتج" && form.stock ? Number(form.stock) : undefined,
    };

    if (editingProduct) {
      updateProduct(payload);
      notify(`تم تحديث ${settings.labels.product}`);
    } else {
      addProduct(payload);
      notify(`تم إضافة ${settings.labels.product} جديد`);
    }

    closeModal();
  };

  return (
    <PageContainer
      title="المنتجات والخدمات"
      description={`إدارة ${settings.labels.product}ات، الخدمات، الاشتراكات، والأسعار حسب وضع العرض الحالي.`}
      action={<Button icon={<Plus size={18} />} onClick={openAddModal}>إضافة عنصر</Button>}
    >
      <Card>
        <CardHeader title="العناصر المتاحة" description="كروت تشغيلية تعرض النوع والسعر والحالة والكمية إن وجدت." />
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px]">
          <Input placeholder="ابحث بالاسم أو التصنيف" value={search} onChange={(event) => setSearch(event.target.value)} icon={<Search size={17} />} />
          <Dropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: "كل الأنواع", value: "all" },
              ...productTypeOptions,
            ]}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article key={product.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Boxes size={22} />
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" icon={<Edit3 size={16} />} aria-label={`تعديل ${product.name}`} onClick={() => openEditModal(product)} />
                    <Button variant="ghost" size="icon" icon={<Trash2 size={16} />} aria-label={`حذف ${product.name}`} onClick={() => handleDeleteProduct(product)} />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-black text-ink">{product.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone={getStatusTone(product.status)}>{product.status}</Badge>
                  <Badge tone="info">{product.type}</Badge>
                  <Badge>{product.category}</Badge>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500">السعر</p>
                    <p className="mt-1 text-xl font-black text-primary">{formatCurrency(product.price, settings.currency)}</p>
                  </div>
                  {typeof product.stock === "number" ? (
                    <div className="rounded-2xl bg-white px-3 py-2 text-center">
                      <p className="text-xs font-bold text-slate-500">الكمية</p>
                      <p className="font-black text-ink">{product.stock}</p>
                    </div>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm font-bold text-slate-400 md:col-span-2 xl:col-span-3">
              لا توجد عناصر مطابقة.
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? "تعديل منتج أو خدمة" : "إضافة منتج أو خدمة"}
        description={editingProduct ? "عدّل بيانات العنصر وسيتم حفظها محليًا." : "العنصر يضاف إلى وضع العرض الحالي فقط."}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="اسم العنصر" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
          <div className="grid gap-4 md:grid-cols-2">
            <Dropdown
              label="النوع"
              value={form.type}
              onChange={(value) => setForm((current) => ({ ...current, type: value as ProductType }))}
              options={productTypeOptions}
            />
            <Input label="السعر" type="number" min="0" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
            <Input label="التصنيف" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} required />
            <Dropdown
              label="الحالة"
              value={form.status}
              onChange={(value) => setForm((current) => ({ ...current, status: value as ProductStatus }))}
              options={productStatusOptions}
            />
            <Input label="الكمية المتاحة" type="number" min="0" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={closeModal}>إلغاء</Button>
            <Button type="submit" icon={<PackagePlus size={17} />}>{editingProduct ? "حفظ التعديل" : "حفظ العنصر"}</Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
