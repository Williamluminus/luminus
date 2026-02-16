"use client";

import {
  monthlySalesData,
  categoryData,
  paymentMethods,
  kpiData,
} from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Users,
  Download,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const profitData = monthlySalesData.map((m) => ({
  ...m,
  profit: m.revenue - m.expenses,
  margin: (((m.revenue - m.expenses) / m.revenue) * 100).toFixed(1),
}));

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-sm text-gray-500 mt-1">
            Análises detalhadas do desempenho do seu negócio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Fev 2025 - Fev 2026
            </span>
          </div>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Receita Anual
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(
              monthlySalesData.reduce((sum, m) => sum + m.revenue, 0)
            )}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{kpiData.revenueGrowth}% vs ano anterior
          </p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Pedidos no Ano
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(
              monthlySalesData.reduce((sum, m) => sum + m.orders, 0)
            )}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{kpiData.ordersGrowth}% vs ano anterior
          </p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Novos Clientes
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(kpiData.totalCustomers)}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{kpiData.customersGrowth}% vs ano anterior
          </p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Margem Média
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(
              profitData.reduce((sum, m) => sum + parseFloat(m.margin), 0) /
              profitData.length
            ).toFixed(1)}
            %
          </p>
          <p className="text-sm text-green-600 mt-1">Lucro sobre receita</p>
        </div>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-base font-semibold text-gray-900">
            Receita, Despesas e Lucro
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Evolução mensal dos indicadores financeiros
          </p>
        </div>
        <div className="card-body">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = {
                      revenue: "Receita",
                      expenses: "Despesas",
                      profit: "Lucro",
                    };
                    return [formatCurrency(value), labels[name] || name];
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend
                  formatter={(value) => {
                    const labels: Record<string, string> = {
                      revenue: "Receita",
                      expenses: "Despesas",
                      profit: "Lucro",
                    };
                    return labels[value] || value;
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
                <Bar
                  dataKey="expenses"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
                <Bar
                  dataKey="profit"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-gray-900">
              Tendência de Pedidos
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Quantidade mensal de pedidos
            </p>
          </div>
          <div className="card-body">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${formatNumber(value)} pedidos`,
                      "Pedidos",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-gray-900">
              Métodos de Pagamento
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Distribuição por forma de pagamento
            </p>
          </div>
          <div className="card-body">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentual"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {method.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {method.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
