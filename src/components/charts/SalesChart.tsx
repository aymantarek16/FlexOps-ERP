import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "../../types";
import { formatCurrency } from "../../utils/format";

interface SalesChartProps {
  data: TrendPoint[];
  currency: string;
}

export function SalesChart({ data, currency }: SalesChartProps): JSX.Element {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
          <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} labelStyle={{ color: "#172033" }} />
          <Area type="monotone" dataKey="sales" stroke="var(--primary-color)" strokeWidth={3} fill="url(#salesGradient)" name="المبيعات" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
