export const formatCurrency = (value: number, currency = "ج.م"): string =>
  `${new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(value)} ${currency}`;

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(value);

export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("ar-EG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export const generateId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
