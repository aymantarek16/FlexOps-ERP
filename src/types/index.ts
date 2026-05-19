export type BusinessModeId = "clinic" | "gym" | "restaurant" | "retail" | "services";
export type ThemeMode = "light" | "dark";

export type BusinessModuleKey =
  | "customers"
  | "products"
  | "orders"
  | "invoices"
  | "expenses"
  | "reports"
  | "modes";

export type CustomerType = "فرد" | "شركة";
export type CustomerStatus = "نشط" | "غير نشط";
export type ProductType = "منتج" | "خدمة" | "اشتراك";
export type ProductStatus = "نشط" | "متوقف";
export type OrderType = "طلب" | "حجز" | "خدمة" | "اشتراك";
export type OrderStatus = "جديد" | "قيد التنفيذ" | "مكتمل" | "ملغي" | "متأخر";
export type InvoiceStatus = "مدفوعة" | "جزئية" | "غير مدفوعة";
export type ExpenseCategory =
  | "إيجار"
  | "مرتبات"
  | "إعلانات"
  | "خامات"
  | "شحن"
  | "صيانة"
  | "أخرى";

export interface BusinessLabels {
  customer: string;
  order: string;
  product: string;
}

export interface BusinessMode {
  id: BusinessModeId;
  name: string;
  title: string;
  description: string;
  businessName: string;
  businessType: string;
  whatsapp: string;
  primaryColor: string;
  labels: BusinessLabels;
  accent: string;
}

export interface EnabledModules {
  customers: boolean;
  products: boolean;
  orders: boolean;
  invoices: boolean;
  expenses: boolean;
  reports: boolean;
  modes: boolean;
}

export interface BusinessSettings {
  businessName: string;
  businessType: string;
  whatsapp: string;
  currency: string;
  primaryColor: string;
  labels: BusinessLabels;
  enabledModules: EnabledModules;
  logoMode: "placeholder" | "uploaded";
  logoDataUrl?: string;
}

export interface Customer {
  id: string;
  modeId: BusinessModeId;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  type: CustomerType;
  status: CustomerStatus;
  totalTransactions: number;
  lastInteraction: string;
}

export interface ProductService {
  id: string;
  modeId: BusinessModeId;
  name: string;
  type: ProductType;
  price: number;
  category: string;
  status: ProductStatus;
  stock?: number;
}

export interface Order {
  id: string;
  modeId: BusinessModeId;
  orderNumber: string;
  customerName: string;
  type: OrderType;
  date: string;
  owner: string;
  status: OrderStatus;
  total: number;
  paid: number;
  remaining: number;
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  modeId: BusinessModeId;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  date: string;
  total: number;
  paid: number;
  remaining: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export interface Expense {
  id: string;
  modeId: BusinessModeId;
  category: ExpenseCategory;
  description: string;
  date: string;
  amount: number;
  paymentMethod: string;
}

export interface TrendPoint {
  month: string;
  sales: number;
  expenses?: number;
}

export interface NamedValue {
  name: string;
  value: number;
}

export interface ReportData {
  salesTrend: TrendPoint[];
  expensesTrend: TrendPoint[];
  revenueVsExpenses: TrendPoint[];
  topCustomers: NamedValue[];
  topProducts: NamedValue[];
  alerts: string[];
}
