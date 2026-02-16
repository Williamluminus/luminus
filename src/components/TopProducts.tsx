"use client";

import { topProducts } from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopProducts() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-base font-semibold text-gray-900">
          Produtos Mais Vendidos
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">Top 5 por unidades vendidas</p>
      </div>
      <div className="card-body">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical" barSize={20}>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={130}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "sales"
                    ? `${formatNumber(value)} unidades`
                    : formatCurrency(value),
                  name === "sales" ? "Vendas" : "Receita",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
