import type { Expense } from "../types";

export const expenses: Expense[] = [
  { id: "clinic-exp-1", modeId: "clinic", category: "إيجار", description: "إيجار مقر العيادة", date: "2026-05-01", amount: 18000, paymentMethod: "تحويل بنكي" },
  { id: "clinic-exp-2", modeId: "clinic", category: "مرتبات", description: "مرتبات التمريض والاستقبال", date: "2026-05-05", amount: 26500, paymentMethod: "كاش" },
  { id: "clinic-exp-3", modeId: "clinic", category: "خامات", description: "مستلزمات وتعقيم", date: "2026-05-11", amount: 7200, paymentMethod: "بطاقة" },
  { id: "clinic-exp-4", modeId: "clinic", category: "إعلانات", description: "حملة كشف مجاني", date: "2026-05-13", amount: 4800, paymentMethod: "بطاقة" },
  { id: "gym-exp-1", modeId: "gym", category: "إيجار", description: "إيجار النادي", date: "2026-05-01", amount: 32000, paymentMethod: "تحويل بنكي" },
  { id: "gym-exp-2", modeId: "gym", category: "مرتبات", description: "مرتبات المدربين", date: "2026-05-04", amount: 38000, paymentMethod: "تحويل بنكي" },
  { id: "gym-exp-3", modeId: "gym", category: "صيانة", description: "صيانة الأجهزة", date: "2026-05-09", amount: 6200, paymentMethod: "كاش" },
  { id: "gym-exp-4", modeId: "gym", category: "إعلانات", description: "حملة عروض الصيف", date: "2026-05-15", amount: 8500, paymentMethod: "بطاقة" },
  { id: "restaurant-exp-1", modeId: "restaurant", category: "إيجار", description: "إيجار الفرع", date: "2026-05-01", amount: 28000, paymentMethod: "تحويل بنكي" },
  { id: "restaurant-exp-2", modeId: "restaurant", category: "مرتبات", description: "مرتبات المطبخ والصالة", date: "2026-05-05", amount: 41000, paymentMethod: "تحويل بنكي" },
  { id: "restaurant-exp-3", modeId: "restaurant", category: "خامات", description: "توريدات خضار ولحوم", date: "2026-05-12", amount: 36500, paymentMethod: "كاش" },
  { id: "restaurant-exp-4", modeId: "restaurant", category: "شحن", description: "مصروفات الدليفري", date: "2026-05-16", amount: 3900, paymentMethod: "محفظة" },
  { id: "retail-exp-1", modeId: "retail", category: "إيجار", description: "إيجار المعرض", date: "2026-05-01", amount: 22000, paymentMethod: "تحويل بنكي" },
  { id: "retail-exp-2", modeId: "retail", category: "مرتبات", description: "مرتبات فريق البيع", date: "2026-05-05", amount: 24000, paymentMethod: "تحويل بنكي" },
  { id: "retail-exp-3", modeId: "retail", category: "شحن", description: "شحن طلبات العملاء", date: "2026-05-09", amount: 5400, paymentMethod: "كاش" },
  { id: "retail-exp-4", modeId: "retail", category: "إعلانات", description: "إعلانات منتجات جديدة", date: "2026-05-14", amount: 7600, paymentMethod: "بطاقة" },
  { id: "services-exp-1", modeId: "services", category: "مرتبات", description: "مرتبات فرق التشغيل", date: "2026-05-05", amount: 52000, paymentMethod: "تحويل بنكي" },
  { id: "services-exp-2", modeId: "services", category: "شحن", description: "انتقالات فرق الصيانة", date: "2026-05-08", amount: 6800, paymentMethod: "كاش" },
  { id: "services-exp-3", modeId: "services", category: "صيانة", description: "معدات وأدوات ميدانية", date: "2026-05-12", amount: 11300, paymentMethod: "بطاقة" },
  { id: "services-exp-4", modeId: "services", category: "إعلانات", description: "حملة عقود الشركات", date: "2026-05-15", amount: 9400, paymentMethod: "بطاقة" },
];
