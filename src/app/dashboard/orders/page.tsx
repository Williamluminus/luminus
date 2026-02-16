"use client";

import { useState } from "react";
import { orders } from "@/data/mock";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";
import {
  Search,
  Filter,
  Eye,
  Truck,
  Download,
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter(
    (o) => o.status === "shipped" || o.status === "processing"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (o) => o.status === "cancelled" || o.status === "refunded"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Acompanhe e gerencie todos os pedidos
          </p>
        </div>
        <button className="btn-secondary">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pendentes</p>
              <p className="text-lg font-bold text-gray-900">
                {pendingOrders}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Em Transporte</p>
              <p className="text-lg font-bold text-gray-900">
                {shippedOrders}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Entregues</p>
              <p className="text-lg font-bold text-gray-900">
                {deliveredOrders}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cancelados</p>
              <p className="text-lg font-bold text-gray-900">
                {cancelledOrders}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID do pedido ou cliente..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="input w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
              <option value="refunded">Reembolsado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Rastreio</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium text-gray-900">{order.id}</td>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customerEmail}
                      </p>
                    </div>
                  </td>
                  <td className="text-gray-500">
                    {formatDateTime(order.date)}
                  </td>
                  <td>{order.items}</td>
                  <td className="font-medium">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="text-sm">{order.paymentMethod}</td>
                  <td>
                    {order.trackingCode ? (
                      <span className="font-mono text-xs text-blue-600">
                        {order.trackingCode}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </button>
                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50">
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {filtered.length} de {orders.length} pedidos
          </p>
        </div>
      </div>
    </div>
  );
}
