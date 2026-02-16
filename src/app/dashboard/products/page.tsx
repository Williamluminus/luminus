"use client";

import { useState } from "react";
import { products } from "@/data/mock";
import {
  formatCurrency,
  formatNumber,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Package,
  Download,
} from "lucide-react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.status === "out_of_stock").length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie seu catálogo de produtos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ativos</p>
              <p className="text-lg font-bold text-gray-900">
                {activeProducts}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sem Estoque</p>
              <p className="text-lg font-bold text-gray-900">{outOfStock}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor em Estoque</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(totalValue)}
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
              placeholder="Buscar por nome ou SKU..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="input w-auto"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Todas Categorias</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="input w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
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
                <th>Categoria</th>
                <th>Preço</th>
                <th>Custo</th>
                <th>Margem</th>
                <th>Estoque</th>
                <th>Vendas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const margin = (
                  ((product.price - product.cost) / product.price) *
                  100
                ).toFixed(1);
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs">{product.sku}</td>
                    <td>{product.category}</td>
                    <td className="font-medium">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="text-gray-500">
                      {formatCurrency(product.cost)}
                    </td>
                    <td>
                      <span className="text-green-600 font-medium">
                        {margin}%
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          product.stock <= product.minStock
                            ? "text-red-600 font-medium"
                            : ""
                        }
                      >
                        {formatNumber(product.stock)}
                      </span>
                    </td>
                    <td>{formatNumber(product.sales)}</td>
                    <td>
                      <span
                        className={`badge ${getStatusColor(product.status)}`}
                      >
                        {getStatusLabel(product.status)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {filtered.length} de {products.length} produtos
          </p>
        </div>
      </div>
    </div>
  );
}
