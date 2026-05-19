import type { Order } from "../types";

export const orders: Order[] = [
  { id: "clinic-order-1", modeId: "clinic", orderNumber: "CL-1021", customerName: "أحمد حسام", type: "حجز", date: "2026-05-18", owner: "د. ليلى", status: "قيد التنفيذ", total: 1450, paid: 900, remaining: 550 },
  { id: "clinic-order-2", modeId: "clinic", orderNumber: "CL-1020", customerName: "منى عبد الرحمن", type: "خدمة", date: "2026-05-17", owner: "د. سامح", status: "مكتمل", total: 850, paid: 850, remaining: 0 },
  { id: "clinic-order-3", modeId: "clinic", orderNumber: "CL-1019", customerName: "شركة الراية للتأمين", type: "طلب", date: "2026-05-14", owner: "إدارة التعاقدات", status: "متأخر", total: 9800, paid: 6000, remaining: 3800 },
  { id: "clinic-order-4", modeId: "clinic", orderNumber: "CL-1018", customerName: "سارة عادل", type: "حجز", date: "2026-05-11", owner: "الاستقبال", status: "ملغي", total: 450, paid: 0, remaining: 450 },
  { id: "gym-order-1", modeId: "gym", orderNumber: "GY-2218", customerName: "كريم سامي", type: "اشتراك", date: "2026-05-18", owner: "فريق العضويات", status: "جديد", total: 900, paid: 900, remaining: 0 },
  { id: "gym-order-2", modeId: "gym", orderNumber: "GY-2217", customerName: "نورا خالد", type: "اشتراك", date: "2026-05-15", owner: "مها", status: "قيد التنفيذ", total: 2400, paid: 1200, remaining: 1200 },
  { id: "gym-order-3", modeId: "gym", orderNumber: "GY-2216", customerName: "شركة إنرجي تيم", type: "خدمة", date: "2026-05-10", owner: "كابتن عمر", status: "مكتمل", total: 12000, paid: 12000, remaining: 0 },
  { id: "gym-order-4", modeId: "gym", orderNumber: "GY-2215", customerName: "بسمة محمود", type: "اشتراك", date: "2026-05-02", owner: "فريق العضويات", status: "متأخر", total: 900, paid: 300, remaining: 600 },
  { id: "restaurant-order-1", modeId: "restaurant", orderNumber: "RS-8741", customerName: "شركة سما للأحداث", type: "طلب", date: "2026-05-18", owner: "الشيف عماد", status: "قيد التنفيذ", total: 15400, paid: 8000, remaining: 7400 },
  { id: "restaurant-order-2", modeId: "restaurant", orderNumber: "RS-8740", customerName: "هبة يوسف", type: "طلب", date: "2026-05-17", owner: "الصالة", status: "مكتمل", total: 480, paid: 480, remaining: 0 },
  { id: "restaurant-order-3", modeId: "restaurant", orderNumber: "RS-8739", customerName: "مكتب أفق", type: "حجز", date: "2026-05-15", owner: "خدمة العملاء", status: "جديد", total: 3600, paid: 1000, remaining: 2600 },
  { id: "restaurant-order-4", modeId: "restaurant", orderNumber: "RS-8738", customerName: "علي فؤاد", type: "طلب", date: "2026-05-12", owner: "الدليفري", status: "ملغي", total: 320, paid: 0, remaining: 320 },
  { id: "retail-order-1", modeId: "retail", orderNumber: "RT-3301", customerName: "محمود فتحي", type: "طلب", date: "2026-05-18", owner: "فرع مدينة نصر", status: "قيد التنفيذ", total: 2230, paid: 1500, remaining: 730 },
  { id: "retail-order-2", modeId: "retail", orderNumber: "RT-3300", customerName: "شركة البيان للتوريدات", type: "طلب", date: "2026-05-14", owner: "المبيعات", status: "مكتمل", total: 18500, paid: 18500, remaining: 0 },
  { id: "retail-order-3", modeId: "retail", orderNumber: "RT-3299", customerName: "ريم أيمن", type: "خدمة", date: "2026-05-10", owner: "الدعم", status: "جديد", total: 350, paid: 0, remaining: 350 },
  { id: "retail-order-4", modeId: "retail", orderNumber: "RT-3298", customerName: "مؤسسة مدار", type: "طلب", date: "2026-04-28", owner: "المخزن", status: "متأخر", total: 6900, paid: 3000, remaining: 3900 },
  { id: "services-order-1", modeId: "services", orderNumber: "SV-5112", customerName: "شركة المدار العقارية", type: "خدمة", date: "2026-05-18", owner: "فريق الصيانة", status: "قيد التنفيذ", total: 14500, paid: 9000, remaining: 5500 },
  { id: "services-order-2", modeId: "services", orderNumber: "SV-5111", customerName: "مصنع الأمان", type: "اشتراك", date: "2026-05-12", owner: "مدير الحساب", status: "مكتمل", total: 8500, paid: 8500, remaining: 0 },
  { id: "services-order-3", modeId: "services", orderNumber: "SV-5110", customerName: "داليا نبيل", type: "خدمة", date: "2026-05-08", owner: "فريق التركيبات", status: "جديد", total: 1250, paid: 0, remaining: 1250 },
  { id: "services-order-4", modeId: "services", orderNumber: "SV-5109", customerName: "شركة رواد التقنية", type: "خدمة", date: "2026-04-30", owner: "الدعم الفني", status: "متأخر", total: 6200, paid: 3000, remaining: 3200 },
];
