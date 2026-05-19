import type { BusinessModeId, ReportData } from "../types";

export const reports: Record<BusinessModeId, ReportData> = {
  clinic: {
    salesTrend: [
      { month: "ديسمبر", sales: 62000 },
      { month: "يناير", sales: 71000 },
      { month: "فبراير", sales: 68500 },
      { month: "مارس", sales: 76000 },
      { month: "أبريل", sales: 82200 },
      { month: "مايو", sales: 91400 },
    ],
    expensesTrend: [
      { month: "ديسمبر", sales: 0, expenses: 42000 },
      { month: "يناير", sales: 0, expenses: 46500 },
      { month: "فبراير", sales: 0, expenses: 43900 },
      { month: "مارس", sales: 0, expenses: 48200 },
      { month: "أبريل", sales: 0, expenses: 50100 },
      { month: "مايو", sales: 0, expenses: 56500 },
    ],
    revenueVsExpenses: [
      { month: "مارس", sales: 76000, expenses: 48200 },
      { month: "أبريل", sales: 82200, expenses: 50100 },
      { month: "مايو", sales: 91400, expenses: 56500 },
    ],
    topCustomers: [
      { name: "شركة الراية للتأمين", value: 34500 },
      { name: "أحمد حسام", value: 12800 },
      { name: "منى عبد الرحمن", value: 7600 },
    ],
    topProducts: [
      { name: "تحاليل أساسية", value: 18 },
      { name: "كشف باطنة", value: 14 },
      { name: "متابعة شهرية", value: 8 },
    ],
    alerts: ["فاتورتان جزئيتان تحتاجان متابعة", "حجز واحد ملغي هذا الأسبوع", "جلسات العلاج الطبيعي متوقفة مؤقتًا"],
  },
  gym: {
    salesTrend: [
      { month: "ديسمبر", sales: 78000 },
      { month: "يناير", sales: 93500 },
      { month: "فبراير", sales: 102000 },
      { month: "مارس", sales: 98800 },
      { month: "أبريل", sales: 116500 },
      { month: "مايو", sales: 124000 },
    ],
    expensesTrend: [
      { month: "ديسمبر", sales: 0, expenses: 58000 },
      { month: "يناير", sales: 0, expenses: 62100 },
      { month: "فبراير", sales: 0, expenses: 64800 },
      { month: "مارس", sales: 0, expenses: 66900 },
      { month: "أبريل", sales: 0, expenses: 70200 },
      { month: "مايو", sales: 0, expenses: 84700 },
    ],
    revenueVsExpenses: [
      { month: "مارس", sales: 98800, expenses: 66900 },
      { month: "أبريل", sales: 116500, expenses: 70200 },
      { month: "مايو", sales: 124000, expenses: 84700 },
    ],
    topCustomers: [
      { name: "شركة إنرجي تيم", value: 42000 },
      { name: "نورا خالد", value: 8800 },
      { name: "كريم سامي", value: 6200 },
    ],
    topProducts: [
      { name: "باقة 3 شهور", value: 22 },
      { name: "باقة شهرية", value: 19 },
      { name: "جلسة مدرب شخصي", value: 13 },
    ],
    alerts: ["عضوية واحدة متأخرة السداد", "مخزون مكمل البروتين أقل من 15 قطعة", "طلبات تدريب شخصي تحتاج جدولة"],
  },
  restaurant: {
    salesTrend: [
      { month: "ديسمبر", sales: 118000 },
      { month: "يناير", sales: 129000 },
      { month: "فبراير", sales: 134500 },
      { month: "مارس", sales: 141000 },
      { month: "أبريل", sales: 152600 },
      { month: "مايو", sales: 167500 },
    ],
    expensesTrend: [
      { month: "ديسمبر", sales: 0, expenses: 88000 },
      { month: "يناير", sales: 0, expenses: 92500 },
      { month: "فبراير", sales: 0, expenses: 94100 },
      { month: "مارس", sales: 0, expenses: 98500 },
      { month: "أبريل", sales: 0, expenses: 104800 },
      { month: "مايو", sales: 0, expenses: 109400 },
    ],
    revenueVsExpenses: [
      { month: "مارس", sales: 141000, expenses: 98500 },
      { month: "أبريل", sales: 152600, expenses: 104800 },
      { month: "مايو", sales: 167500, expenses: 109400 },
    ],
    topCustomers: [
      { name: "شركة سما للأحداث", value: 27600 },
      { name: "مكتب أفق", value: 15800 },
      { name: "هبة يوسف", value: 4200 },
    ],
    topProducts: [
      { name: "بوكس عائلي", value: 31 },
      { name: "وجبة مشاوي", value: 28 },
      { name: "خدمة كاترينج", value: 7 },
    ],
    alerts: ["فاتورة كاترينج كبيرة جزئية السداد", "مشروبات باردة متوقفة في القائمة", "طلب ملغي خلال آخر أسبوع"],
  },
  retail: {
    salesTrend: [
      { month: "ديسمبر", sales: 96000 },
      { month: "يناير", sales: 104000 },
      { month: "فبراير", sales: 99000 },
      { month: "مارس", sales: 113500 },
      { month: "أبريل", sales: 121000 },
      { month: "مايو", sales: 136800 },
    ],
    expensesTrend: [
      { month: "ديسمبر", sales: 0, expenses: 51000 },
      { month: "يناير", sales: 0, expenses: 55400 },
      { month: "فبراير", sales: 0, expenses: 53200 },
      { month: "مارس", sales: 0, expenses: 58700 },
      { month: "أبريل", sales: 0, expenses: 61200 },
      { month: "مايو", sales: 0, expenses: 59000 },
    ],
    revenueVsExpenses: [
      { month: "مارس", sales: 113500, expenses: 58700 },
      { month: "أبريل", sales: 121000, expenses: 61200 },
      { month: "مايو", sales: 136800, expenses: 59000 },
    ],
    topCustomers: [
      { name: "شركة البيان للتوريدات", value: 53200 },
      { name: "محمود فتحي", value: 10900 },
      { name: "مؤسسة مدار", value: 8700 },
    ],
    topProducts: [
      { name: "سماعة لاسلكية", value: 24 },
      { name: "حقيبة لابتوب", value: 19 },
      { name: "باكدج مكتب منزلي", value: 6 },
    ],
    alerts: ["باكدج مكتب منزلي منخفض الكمية", "فاتورة مؤسسة مدار غير مدفوعة", "طلب واحد متأخر من أبريل"],
  },
  services: {
    salesTrend: [
      { month: "ديسمبر", sales: 142000 },
      { month: "يناير", sales: 158000 },
      { month: "فبراير", sales: 151500 },
      { month: "مارس", sales: 166000 },
      { month: "أبريل", sales: 174200 },
      { month: "مايو", sales: 189500 },
    ],
    expensesTrend: [
      { month: "ديسمبر", sales: 0, expenses: 64000 },
      { month: "يناير", sales: 0, expenses: 69800 },
      { month: "فبراير", sales: 0, expenses: 71300 },
      { month: "مارس", sales: 0, expenses: 74200 },
      { month: "أبريل", sales: 0, expenses: 76300 },
      { month: "مايو", sales: 0, expenses: 79500 },
    ],
    revenueVsExpenses: [
      { month: "مارس", sales: 166000, expenses: 74200 },
      { month: "أبريل", sales: 174200, expenses: 76300 },
      { month: "مايو", sales: 189500, expenses: 79500 },
    ],
    topCustomers: [
      { name: "شركة المدار العقارية", value: 68400 },
      { name: "مصنع الأمان", value: 45200 },
      { name: "شركة رواد التقنية", value: 14800 },
    ],
    topProducts: [
      { name: "عقد دعم شهري", value: 14 },
      { name: "زيارة صيانة دورية", value: 12 },
      { name: "تركيب نظام مراقبة", value: 6 },
    ],
    alerts: ["فاتورة شركة رواد التقنية غير مدفوعة", "قطع الغيار منخفضة الكمية", "خدمة جديدة بدون دفعة مقدمة"],
  },
};
