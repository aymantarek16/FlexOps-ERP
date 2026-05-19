import type { BusinessMode, BusinessModeId, BusinessSettings, EnabledModules } from "../types";

export const businessModes: BusinessMode[] = [
  {
    id: "clinic",
    name: "عيادة",
    title: "Clinic Mode",
    description: "مناسب للعيادات والمراكز الطبية مع مصطلحات المرضى والحجوزات والخدمات الطبية.",
    businessName: "عيادة النخبة",
    businessType: "عيادة طبية",
    whatsapp: "201001234567",
    primaryColor: "#0f766e",
    labels: {
      customer: "مريض",
      order: "حجز",
      product: "خدمة طبية",
    },
    accent: "منظومة طبية جاهزة للعرض",
  },
  {
    id: "gym",
    name: "جيم",
    title: "Gym Mode",
    description: "مناسب للنوادي الرياضية ومراكز اللياقة مع الأعضاء والاشتراكات والباقات.",
    businessName: "FlexFit Club",
    businessType: "نادي رياضي",
    whatsapp: "201002468135",
    primaryColor: "#2563eb",
    labels: {
      customer: "عضو",
      order: "اشتراك",
      product: "باقة",
    },
    accent: "إدارة عضويات وباقات",
  },
  {
    id: "restaurant",
    name: "مطعم",
    title: "Restaurant Mode",
    description: "مناسب للمطاعم والكافيهات مع الطلبات والأصناف والمبيعات اليومية.",
    businessName: "مطعم دار الطعم",
    businessType: "مطعم وكافيه",
    whatsapp: "201003579246",
    primaryColor: "#b45309",
    labels: {
      customer: "عميل",
      order: "طلب",
      product: "صنف",
    },
    accent: "طلبات ومبيعات يومية",
  },
  {
    id: "retail",
    name: "محل تجاري",
    title: "Retail Mode",
    description: "مناسب للمحلات والمعارض مع المخزون والفواتير والعملاء.",
    businessName: "متجر المدينة",
    businessType: "محل تجاري",
    whatsapp: "201004681357",
    primaryColor: "#7c3aed",
    labels: {
      customer: "عميل",
      order: "طلب",
      product: "منتج",
    },
    accent: "مبيعات ومخزون وفواتير",
  },
  {
    id: "services",
    name: "شركة خدمات",
    title: "Services Mode",
    description: "مناسب لشركات الصيانة والخدمات والاستشارات وإدارة فرق التنفيذ.",
    businessName: "FlexOps Services",
    businessType: "شركة خدمات",
    whatsapp: "201005792468",
    primaryColor: "#0e7490",
    labels: {
      customer: "عميل",
      order: "خدمة",
      product: "خدمة",
    },
    accent: "تشغيل مرن للخدمات والفرق",
  },
];

export const defaultEnabledModules: EnabledModules = {
  customers: true,
  products: true,
  orders: true,
  invoices: true,
  expenses: true,
  reports: true,
  modes: true,
};

export const getBusinessMode = (modeId: BusinessModeId): BusinessMode =>
  businessModes.find((mode) => mode.id === modeId) ?? businessModes[4];

export const createSettingsFromMode = (modeId: BusinessModeId): BusinessSettings => {
  const mode = getBusinessMode(modeId);

  return {
    businessName: mode.businessName,
    businessType: mode.businessType,
    whatsapp: mode.whatsapp,
    currency: "ج.م",
    primaryColor: mode.primaryColor,
    labels: mode.labels,
    enabledModules: defaultEnabledModules,
    logoMode: "placeholder",
  };
};
