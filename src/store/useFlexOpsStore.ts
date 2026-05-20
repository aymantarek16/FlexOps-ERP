import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSettingsFromMode } from "../data/businessModes";
import type {
  BusinessModeId,
  BusinessSettings,
  Customer,
  Expense,
  OrderStatus,
  ProductService,
  ThemeMode,
} from "../types";

interface FlexOpsState {
  isAuthenticated: boolean;
  isSidebarCollapsed: boolean;
  theme: ThemeMode;
  selectedMode: BusinessModeId;
  settings: BusinessSettings;
  orderStatusOverrides: Record<string, OrderStatus>;
  readNotificationIds: string[];
  customerOverrides: Record<string, Customer>;
  deletedCustomerIds: string[];
  productOverrides: Record<string, ProductService>;
  deletedProductIds: string[];
  expenseOverrides: Record<string, Expense>;
  deletedExpenseIds: string[];
  addedCustomers: Customer[];
  addedProducts: ProductService[];
  addedExpenses: Expense[];
  login: () => void;
  logout: () => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (isCollapsed: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setSettings: (settings: BusinessSettings) => void;
  applyBusinessMode: (modeId: BusinessModeId) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  markNotificationRead: (notificationId: string) => void;
  markNotificationUnread: (notificationId: string) => void;
  markAllNotificationsRead: (notificationIds: string[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomers: (customerIds: string[]) => void;
  addProduct: (product: ProductService) => void;
  updateProduct: (product: ProductService) => void;
  deleteProducts: (productIds: string[]) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpenses: (expenseIds: string[]) => void;
}

const defaultMode: BusinessModeId = "services";

export const useFlexOpsStore = create<FlexOpsState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isSidebarCollapsed: false,
      theme: "light",
      selectedMode: defaultMode,
      settings: createSettingsFromMode(defaultMode),
      orderStatusOverrides: {},
      readNotificationIds: [],
      customerOverrides: {},
      deletedCustomerIds: [],
      productOverrides: {},
      deletedProductIds: [],
      expenseOverrides: {},
      deletedExpenseIds: [],
      addedCustomers: [],
      addedProducts: [],
      addedExpenses: [],
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      toggleSidebarCollapsed: () =>
        set((state) => ({
          isSidebarCollapsed: !state.isSidebarCollapsed,
        })),
      setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),
      setSettings: (settings) => set({ settings }),
      applyBusinessMode: (modeId) =>
        set((state) => ({
          selectedMode: modeId,
          settings: {
            ...createSettingsFromMode(modeId),
            currency: state.settings.currency,
            logoMode: state.settings.logoMode,
            logoDataUrl: state.settings.logoDataUrl,
            enabledModules: state.settings.enabledModules,
          },
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orderStatusOverrides: {
            ...state.orderStatusOverrides,
            [orderId]: status,
          },
        })),
      markNotificationRead: (notificationId) =>
        set((state) => ({
          readNotificationIds: Array.from(new Set([...state.readNotificationIds, notificationId])),
        })),
      markNotificationUnread: (notificationId) =>
        set((state) => ({
          readNotificationIds: state.readNotificationIds.filter((id) => id !== notificationId),
        })),
      markAllNotificationsRead: (notificationIds) =>
        set((state) => ({
          readNotificationIds: Array.from(new Set([...state.readNotificationIds, ...notificationIds])),
        })),
      addCustomer: (customer) =>
        set((state) => ({
          addedCustomers: [customer, ...state.addedCustomers],
        })),
      updateCustomer: (customer) =>
        set((state) => ({
          addedCustomers: state.addedCustomers.map((item) => (item.id === customer.id ? customer : item)),
          customerOverrides: {
            ...state.customerOverrides,
            [customer.id]: customer,
          },
        })),
      deleteCustomers: (customerIds) =>
        set((state) => {
          const idsToDelete = new Set(customerIds);
          const customerOverrides = Object.fromEntries(
            Object.entries(state.customerOverrides).filter(([customerId]) => !idsToDelete.has(customerId)),
          );

          return {
            addedCustomers: state.addedCustomers.filter((customer) => !idsToDelete.has(customer.id)),
            customerOverrides,
            deletedCustomerIds: Array.from(new Set([...state.deletedCustomerIds, ...customerIds])),
          };
        }),
      addProduct: (product) =>
        set((state) => ({
          addedProducts: [product, ...state.addedProducts],
        })),
      updateProduct: (product) =>
        set((state) => ({
          addedProducts: state.addedProducts.map((item) => (item.id === product.id ? product : item)),
          productOverrides: {
            ...state.productOverrides,
            [product.id]: product,
          },
        })),
      deleteProducts: (productIds) =>
        set((state) => {
          const idsToDelete = new Set(productIds);
          const productOverrides = Object.fromEntries(
            Object.entries(state.productOverrides).filter(([productId]) => !idsToDelete.has(productId)),
          );

          return {
            addedProducts: state.addedProducts.filter((product) => !idsToDelete.has(product.id)),
            productOverrides,
            deletedProductIds: Array.from(new Set([...state.deletedProductIds, ...productIds])),
          };
        }),
      addExpense: (expense) =>
        set((state) => ({
          addedExpenses: [expense, ...state.addedExpenses],
        })),
      updateExpense: (expense) =>
        set((state) => ({
          addedExpenses: state.addedExpenses.map((item) => (item.id === expense.id ? expense : item)),
          expenseOverrides: {
            ...state.expenseOverrides,
            [expense.id]: expense,
          },
        })),
      deleteExpenses: (expenseIds) =>
        set((state) => {
          const idsToDelete = new Set(expenseIds);
          const expenseOverrides = Object.fromEntries(
            Object.entries(state.expenseOverrides).filter(([expenseId]) => !idsToDelete.has(expenseId)),
          );

          return {
            addedExpenses: state.addedExpenses.filter((expense) => !idsToDelete.has(expense.id)),
            expenseOverrides,
            deletedExpenseIds: Array.from(new Set([...state.deletedExpenseIds, ...expenseIds])),
          };
        }),
    }),
    {
      name: "flexops-erp-demo",
      version: 1,
    },
  ),
);
