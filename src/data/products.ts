import type { ProductService } from "../types";

export const products: ProductService[] = [
  { id: "clinic-prod-1", modeId: "clinic", name: "كشف باطنة", type: "خدمة", price: 450, category: "كشف", status: "نشط" },
  { id: "clinic-prod-2", modeId: "clinic", name: "متابعة شهرية", type: "اشتراك", price: 1200, category: "متابعة", status: "نشط" },
  { id: "clinic-prod-3", modeId: "clinic", name: "تحاليل أساسية", type: "خدمة", price: 850, category: "تحاليل", status: "نشط" },
  { id: "clinic-prod-4", modeId: "clinic", name: "جلسة علاج طبيعي", type: "خدمة", price: 600, category: "علاج طبيعي", status: "متوقف" },
  { id: "gym-prod-1", modeId: "gym", name: "باقة شهرية", type: "اشتراك", price: 900, category: "عضويات", status: "نشط" },
  { id: "gym-prod-2", modeId: "gym", name: "باقة 3 شهور", type: "اشتراك", price: 2400, category: "عضويات", status: "نشط" },
  { id: "gym-prod-3", modeId: "gym", name: "جلسة مدرب شخصي", type: "خدمة", price: 350, category: "تدريب", status: "نشط" },
  { id: "gym-prod-4", modeId: "gym", name: "مكمل بروتين", type: "منتج", price: 1850, category: "منتجات", status: "نشط", stock: 12 },
  { id: "restaurant-prod-1", modeId: "restaurant", name: "وجبة مشاوي", type: "منتج", price: 320, category: "أطباق رئيسية", status: "نشط", stock: 35 },
  { id: "restaurant-prod-2", modeId: "restaurant", name: "بوكس عائلي", type: "منتج", price: 950, category: "عروض", status: "نشط", stock: 18 },
  { id: "restaurant-prod-3", modeId: "restaurant", name: "خدمة كاترينج", type: "خدمة", price: 4500, category: "مناسبات", status: "نشط" },
  { id: "restaurant-prod-4", modeId: "restaurant", name: "مشروبات باردة", type: "منتج", price: 55, category: "مشروبات", status: "متوقف", stock: 0 },
  { id: "retail-prod-1", modeId: "retail", name: "سماعة لاسلكية", type: "منتج", price: 1450, category: "إلكترونيات", status: "نشط", stock: 9 },
  { id: "retail-prod-2", modeId: "retail", name: "حقيبة لابتوب", type: "منتج", price: 780, category: "اكسسوارات", status: "نشط", stock: 24 },
  { id: "retail-prod-3", modeId: "retail", name: "ضمان ممتد", type: "خدمة", price: 350, category: "خدمات", status: "نشط" },
  { id: "retail-prod-4", modeId: "retail", name: "باكدج مكتب منزلي", type: "منتج", price: 6900, category: "باكدجات", status: "نشط", stock: 3 },
  { id: "services-prod-1", modeId: "services", name: "زيارة صيانة دورية", type: "خدمة", price: 1250, category: "صيانة", status: "نشط" },
  { id: "services-prod-2", modeId: "services", name: "عقد دعم شهري", type: "اشتراك", price: 8500, category: "عقود", status: "نشط" },
  { id: "services-prod-3", modeId: "services", name: "تركيب نظام مراقبة", type: "خدمة", price: 14500, category: "تركيبات", status: "نشط" },
  { id: "services-prod-4", modeId: "services", name: "قطع غيار طوارئ", type: "منتج", price: 950, category: "مخزون", status: "نشط", stock: 6 },
];
