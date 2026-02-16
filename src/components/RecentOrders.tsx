"use client";

import Link from "next/link";
import { orders } from "@/data/mock";
import { formatCurrency, formatDateTime, getStatusColor, getStatusLabel } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function RecentOrders() {
  const recentOrders = orders.slice(0, 6);

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Pedidos Recentes
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">Últimos pedidos recebidos</p>
        </div>
        <Link
          href="/dashboard/orders"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          Ver todos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium text-gray-900">{order.id}</td>
                <td>{order.customer}</td>
                <td className="text-gray-500">
                  {formatDateTime(order.date)}
                </td>
                <td className="font-medium">{formatCurrency(order.total)}</td>
                <td>
                  <span className={`badge ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
