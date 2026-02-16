import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    delivered: "bg-green-100 text-green-800",
    active: "bg-green-100 text-green-800",
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    refunded: "bg-red-100 text-red-800",
    overdue: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
    low: "bg-orange-100 text-orange-800",
    out_of_stock: "bg-red-100 text-red-800",
    in_stock: "bg-green-100 text-green-800",
  };
  return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    completed: "Concluído",
    delivered: "Entregue",
    active: "Ativo",
    paid: "Pago",
    pending: "Pendente",
    processing: "Processando",
    shipped: "Enviado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    overdue: "Atrasado",
    inactive: "Inativo",
    low: "Baixo",
    out_of_stock: "Sem Estoque",
    in_stock: "Em Estoque",
  };
  return labels[status.toLowerCase()] || status;
}
