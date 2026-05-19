import { customers as baseCustomers } from "../data/customers";
import { expenses as baseExpenses } from "../data/expenses";
import { invoices as baseInvoices } from "../data/invoices";
import { orders as baseOrders } from "../data/orders";
import { products as baseProducts } from "../data/products";
import { reports } from "../data/reports";
import { useFlexOpsStore } from "../store/useFlexOpsStore";

export const useDemoData = () => {
  const selectedMode = useFlexOpsStore((state) => state.selectedMode);
  const orderStatusOverrides = useFlexOpsStore((state) => state.orderStatusOverrides);
  const customerOverrides = useFlexOpsStore((state) => state.customerOverrides);
  const deletedCustomerIds = useFlexOpsStore((state) => state.deletedCustomerIds);
  const productOverrides = useFlexOpsStore((state) => state.productOverrides);
  const deletedProductIds = useFlexOpsStore((state) => state.deletedProductIds);
  const expenseOverrides = useFlexOpsStore((state) => state.expenseOverrides);
  const deletedExpenseIds = useFlexOpsStore((state) => state.deletedExpenseIds);
  const addedCustomers = useFlexOpsStore((state) => state.addedCustomers);
  const addedProducts = useFlexOpsStore((state) => state.addedProducts);
  const addedExpenses = useFlexOpsStore((state) => state.addedExpenses);

  const deletedCustomerSet = new Set(deletedCustomerIds);
  const applyCustomerOverride = (customer: typeof baseCustomers[number]) => customerOverrides[customer.id] ?? customer;
  const customers = [
    ...addedCustomers
      .filter((customer) => customer.modeId === selectedMode && !deletedCustomerSet.has(customer.id))
      .map(applyCustomerOverride),
    ...baseCustomers
      .filter((customer) => customer.modeId === selectedMode && !deletedCustomerSet.has(customer.id))
      .map(applyCustomerOverride),
  ];

  const deletedProductSet = new Set(deletedProductIds);
  const applyProductOverride = (product: typeof baseProducts[number]) => productOverrides[product.id] ?? product;
  const products = [
    ...addedProducts
      .filter((product) => product.modeId === selectedMode && !deletedProductSet.has(product.id))
      .map(applyProductOverride),
    ...baseProducts
      .filter((product) => product.modeId === selectedMode && !deletedProductSet.has(product.id))
      .map(applyProductOverride),
  ];

  const orders = baseOrders
    .filter((order) => order.modeId === selectedMode)
    .map((order) => ({
      ...order,
      status: orderStatusOverrides[order.id] ?? order.status,
    }));

  const invoices = baseInvoices.filter((invoice) => invoice.modeId === selectedMode);

  const deletedExpenseSet = new Set(deletedExpenseIds);
  const applyExpenseOverride = (expense: typeof baseExpenses[number]) => expenseOverrides[expense.id] ?? expense;
  const expenses = [
    ...addedExpenses
      .filter((expense) => expense.modeId === selectedMode && !deletedExpenseSet.has(expense.id))
      .map(applyExpenseOverride),
    ...baseExpenses
      .filter((expense) => expense.modeId === selectedMode && !deletedExpenseSet.has(expense.id))
      .map(applyExpenseOverride),
  ];

  return {
    customers,
    products,
    orders,
    invoices,
    expenses,
    report: reports[selectedMode],
  };
};
