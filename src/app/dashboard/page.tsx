"use client";

import KPICard from "@/components/KPICard";
import SalesChart from "@/components/SalesChart";
import CategoryChart from "@/components/CategoryChart";
import RecentOrders from "@/components/RecentOrders";
import TopProducts from "@/components/TopProducts";
import { kpiData } from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  AlertTriangle,
  Package,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Geral</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visão geral do seu e-commerce - Fevereiro 2026
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Receita Total"
          value={formatCurrency(kpiData.totalRevenue)}
          change={kpiData.revenueGrowth}
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600"
        />
        <KPICard
          title="Total de Pedidos"
          value={formatNumber(kpiData.totalOrders)}
          change={kpiData.ordersGrowth}
          icon={ShoppingCart}
          iconColor="bg-blue-100 text-blue-600"
        />
        <KPICard
          title="Total de Clientes"
          value={formatNumber(kpiData.totalCustomers)}
          change={kpiData.customersGrowth}
          icon={Users}
          iconColor="bg-purple-100 text-purple-600"
        />
        <KPICard
          title="Ticket Médio"
          value={formatCurrency(kpiData.avgTicket)}
          change={kpiData.ticketGrowth}
          icon={CreditCard}
          iconColor="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Alerts */}
      {(kpiData.pendingOrders > 0 || kpiData.productsLowStock > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kpiData.pendingOrders > 0 && (
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  {kpiData.pendingOrders} pedidos pendentes
                </p>
                <p className="text-xs text-yellow-600">
                  Aguardando processamento
                </p>
              </div>
            </div>
          )}
          {kpiData.productsLowStock > 0 && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {kpiData.productsLowStock} produtos com estoque baixo
                </p>
                <p className="text-xs text-red-600">
                  Verifique o estoque imediatamente
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <CategoryChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}
