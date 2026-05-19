import {
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BusinessModuleKey } from "../../types";

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  module?: BusinessModuleKey;
}

export const navigationItems: NavigationItem[] = [
  { label: "لوحة التحكم", path: "/", icon: LayoutDashboard },
  { label: "العملاء", path: "/customers", icon: UsersRound, module: "customers" },
  { label: "المنتجات والخدمات", path: "/products", icon: Boxes, module: "products" },
  { label: "الطلبات والحجوزات", path: "/orders", icon: ClipboardList, module: "orders" },
  { label: "الفواتير", path: "/invoices", icon: FileText, module: "invoices" },
  { label: "المصروفات", path: "/expenses", icon: WalletCards, module: "expenses" },
  { label: "التقارير", path: "/reports", icon: BarChart3, module: "reports" },
  { label: "أوضاع العرض", path: "/demo-modes", icon: Building2, module: "modes" },
  { label: "الإعدادات", path: "/settings", icon: Settings },
];

export const quickMetrics = [
  { label: "نسخة عرض", icon: CreditCard },
  { label: "تفاعلية", icon: LayoutDashboard },
];
