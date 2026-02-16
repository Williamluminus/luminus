"use client";

import { useState } from "react";
import { inventory } from "@/data/mock";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";
import {
  Search,
  Filter,
  Download,
  Warehouse,
  AlertTriangle,
  PackageX,
  PackageCheck,
  RefreshCw,
} from "lucide-react";

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = inventory.filter((i) => {
    const matchSearch =
      i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalItems = inventory.reduce((sum, i) => sum + i.currentStock, 0);
  const inStock = inventory.filter((i) => i.status === "in_stock").length;
  const lowStock = inventory.filter((i) => i.status === "low").length;
  const outOfStock = inventory.filter(
    (i) => i.status === "out_of_stock"
  ).length;
  const totalValue = inventory.reduce(
    (sum, i) => sum + i.currentStock * i.unitCost,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estoque</h1>
          <p className="text-sm text-gray-500 mt-1">
            Controle de inventário e reposição
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Registrar Entrada
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Warehouse className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Itens</p>
              <p className="text-lg font-bold text-gray-900">
                {formatNumber(totalItems)}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <PackageCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Em Estoque</p>
              <p className="text-lg font-bold text-gray-900">{inStock}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Estoque Baixo</p>
              <p className="text-lg font-bold text-orange-600">{lowStock}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <PackageX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sem Estoque</p>
              <p className="text-lg font-bold text-red-600">{outOfStock}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Warehouse className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor Total</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="card border-orange-200 bg-orange-50/50">
          <div className="card-header border-orange-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-semibold text-orange-800">
                Alertas de Estoque
              </h3>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {inventory
              .filter(
                (i) => i.status === "low" || i.status === "out_of_stock"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-500">
                      SKU: {item.sku} | Fornecedor: {item.supplier}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {item.currentStock} / {item.minStock}
                      </p>
                      <p className="text-xs text-gray-500">Atual / Mínimo</p>
                    </div>
                    <span
                      className={`badge ${getStatusColor(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por produto, SKU ou fornecedor..."
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
              <option value="in_stock">Em Estoque</option>
              <option value="low">Estoque Baixo</option>
              <option value="out_of_stock">Sem Estoque</option>
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
                <th>Produto</th>
                <th>SKU</th>
                <th>Estoque Atual</th>
                <th>Mínimo</th>
                <th>Máximo</th>
                <th>Custo Unit.</th>
                <th>Valor Total</th>
                <th>Fornecedor</th>
                <th>Último Reabast.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium text-gray-900">
                    {item.productName}
                  </td>
                  <td className="font-mono text-xs">{item.sku}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          item.currentStock <= item.minStock
                            ? "text-red-600 font-bold"
                            : "font-medium"
                        }
                      >
                        {formatNumber(item.currentStock)}
                      </span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.currentStock === 0
                              ? "bg-red-500"
                              : item.currentStock <= item.minStock
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (item.currentStock / item.maxStock) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{formatNumber(item.minStock)}</td>
                  <td>{formatNumber(item.maxStock)}</td>
                  <td>{formatCurrency(item.unitCost)}</td>
                  <td className="font-medium">
                    {formatCurrency(item.currentStock * item.unitCost)}
                  </td>
                  <td className="text-sm">{item.supplier}</td>
                  <td className="text-gray-500">
                    {formatDate(item.lastRestock)}
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
