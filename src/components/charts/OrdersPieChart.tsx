import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Order } from "../../types";

interface OrdersPieChartProps {
  orders: Order[];
}

const colors = ["#0f766e", "#2563eb", "#f59e0b", "#ef4444", "#7c3aed"];

export function OrdersPieChart({ orders }: OrdersPieChartProps): JSX.Element {
  const data = Object.values(
    orders.reduce<Record<string, { name: string; value: number }>>((acc, order) => {
      acc[order.status] = acc[order.status] ?? { name: order.status, value: 0 };
      acc[order.status].value += 1;
      return acc;
    }, {}),
  );

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
            {data.map((item, index) => (
              <Cell key={item.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-8 flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <span key={item.name} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
