import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "../../types";
import { formatCurrency } from "../../utils/format";

interface RevenueExpenseChartProps {
  data: TrendPoint[];
  currency: string;
}

export function RevenueExpenseChart({ data, currency }: RevenueExpenseChartProps): JSX.Element {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
          <Bar dataKey="expenses" name="المصروفات" fill="#f59e0b" radius={[10, 10, 0, 0]} />
          <Line type="monotone" dataKey="sales" name="الإيرادات" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
