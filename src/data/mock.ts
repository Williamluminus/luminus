// ============================
// MOCK DATA - E-commerce Dashboard
// ============================

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
  status: "active" | "inactive" | "out_of_stock";
  image: string;
  sales: number;
}

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  items: number;
  paymentMethod: string;
  trackingCode?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joinDate: string;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastRestock: string;
  supplier: string;
  unitCost: number;
  status: "in_stock" | "low" | "out_of_stock";
}

// KPI Data
export const kpiData = {
  totalRevenue: 287450.0,
  revenueGrowth: 12.5,
  totalOrders: 1284,
  ordersGrowth: 8.3,
  totalCustomers: 3847,
  customersGrowth: 15.2,
  avgTicket: 223.87,
  ticketGrowth: -2.1,
  conversionRate: 3.8,
  conversionGrowth: 0.5,
  pendingOrders: 47,
  productsLowStock: 12,
  monthlyExpenses: 89430.0,
};

// Monthly Sales Data (last 12 months)
export const monthlySalesData = [
  { month: "Mar", revenue: 185000, orders: 890, expenses: 72000 },
  { month: "Abr", revenue: 198000, orders: 945, expenses: 75000 },
  { month: "Mai", revenue: 210000, orders: 1020, expenses: 78000 },
  { month: "Jun", revenue: 195000, orders: 960, expenses: 74000 },
  { month: "Jul", revenue: 225000, orders: 1100, expenses: 82000 },
  { month: "Ago", revenue: 240000, orders: 1150, expenses: 85000 },
  { month: "Set", revenue: 235000, orders: 1130, expenses: 83000 },
  { month: "Out", revenue: 255000, orders: 1200, expenses: 87000 },
  { month: "Nov", revenue: 310000, orders: 1450, expenses: 95000 },
  { month: "Dez", revenue: 380000, orders: 1800, expenses: 110000 },
  { month: "Jan", revenue: 260000, orders: 1250, expenses: 88000 },
  { month: "Fev", revenue: 287450, orders: 1284, expenses: 89430 },
];

// Sales by Category
export const categoryData = [
  { name: "Eletrônicos", value: 98500, percentage: 34.3 },
  { name: "Moda", value: 65200, percentage: 22.7 },
  { name: "Casa & Jardim", value: 48300, percentage: 16.8 },
  { name: "Esportes", value: 38900, percentage: 13.5 },
  { name: "Beleza", value: 21550, percentage: 7.5 },
  { name: "Outros", value: 15000, percentage: 5.2 },
];

// Products
export const products: Product[] = [
  { id: "P001", name: "Smartphone Galaxy S24", category: "Eletrônicos", price: 4299.0, cost: 2800.0, stock: 45, minStock: 10, sku: "ELE-001", status: "active", image: "/products/phone.jpg", sales: 234 },
  { id: "P002", name: "Notebook Dell Inspiron 15", category: "Eletrônicos", price: 3599.0, cost: 2400.0, stock: 23, minStock: 5, sku: "ELE-002", status: "active", image: "/products/notebook.jpg", sales: 167 },
  { id: "P003", name: "Fone Bluetooth JBL Tune", category: "Eletrônicos", price: 299.0, cost: 120.0, stock: 120, minStock: 30, sku: "ELE-003", status: "active", image: "/products/headphone.jpg", sales: 512 },
  { id: "P004", name: "Camiseta Polo Ralph Lauren", category: "Moda", price: 189.0, cost: 65.0, stock: 85, minStock: 20, sku: "MOD-001", status: "active", image: "/products/shirt.jpg", sales: 389 },
  { id: "P005", name: "Tênis Nike Air Max", category: "Esportes", price: 599.0, cost: 280.0, stock: 34, minStock: 15, sku: "ESP-001", status: "active", image: "/products/shoe.jpg", sales: 278 },
  { id: "P006", name: "Smartwatch Apple Watch SE", category: "Eletrônicos", price: 2499.0, cost: 1600.0, stock: 3, minStock: 8, sku: "ELE-004", status: "active", image: "/products/watch.jpg", sales: 156 },
  { id: "P007", name: "Conjunto de Panelas Tramontina", category: "Casa & Jardim", price: 459.0, cost: 200.0, stock: 0, minStock: 10, sku: "CAS-001", status: "out_of_stock", image: "/products/pans.jpg", sales: 198 },
  { id: "P008", name: "Perfume Dolce & Gabbana", category: "Beleza", price: 389.0, cost: 150.0, stock: 56, minStock: 15, sku: "BEL-001", status: "active", image: "/products/perfume.jpg", sales: 143 },
  { id: "P009", name: "Mesa de Escritório", category: "Casa & Jardim", price: 799.0, cost: 350.0, stock: 12, minStock: 5, sku: "CAS-002", status: "active", image: "/products/desk.jpg", sales: 87 },
  { id: "P010", name: "Bola de Futebol Adidas", category: "Esportes", price: 149.0, cost: 55.0, stock: 200, minStock: 50, sku: "ESP-002", status: "active", image: "/products/ball.jpg", sales: 445 },
  { id: "P011", name: "Câmera Canon EOS", category: "Eletrônicos", price: 5899.0, cost: 3800.0, stock: 8, minStock: 3, sku: "ELE-005", status: "active", image: "/products/camera.jpg", sales: 45 },
  { id: "P012", name: "Vestido Zara Floral", category: "Moda", price: 259.0, cost: 90.0, stock: 0, minStock: 15, sku: "MOD-002", status: "out_of_stock", image: "/products/dress.jpg", sales: 312 },
];

// Orders
export const orders: Order[] = [
  { id: "ORD-2401", customer: "Maria Silva", customerEmail: "maria@email.com", date: "2026-02-16T14:30:00", total: 4598.00, status: "pending", items: 2, paymentMethod: "Cartão de Crédito" },
  { id: "ORD-2400", customer: "João Santos", customerEmail: "joao@email.com", date: "2026-02-16T12:15:00", total: 299.00, status: "processing", items: 1, paymentMethod: "PIX" },
  { id: "ORD-2399", customer: "Ana Oliveira", customerEmail: "ana@email.com", date: "2026-02-16T10:45:00", total: 1287.00, status: "processing", items: 3, paymentMethod: "Cartão de Crédito" },
  { id: "ORD-2398", customer: "Pedro Lima", customerEmail: "pedro@email.com", date: "2026-02-15T18:20:00", total: 599.00, status: "shipped", items: 1, paymentMethod: "PIX", trackingCode: "BR123456789" },
  { id: "ORD-2397", customer: "Camila Souza", customerEmail: "camila@email.com", date: "2026-02-15T16:00:00", total: 2948.00, status: "shipped", items: 4, paymentMethod: "Boleto", trackingCode: "BR987654321" },
  { id: "ORD-2396", customer: "Lucas Ferreira", customerEmail: "lucas@email.com", date: "2026-02-15T14:30:00", total: 789.00, status: "delivered", items: 2, paymentMethod: "Cartão de Crédito" },
  { id: "ORD-2395", customer: "Beatriz Costa", customerEmail: "beatriz@email.com", date: "2026-02-14T20:10:00", total: 4299.00, status: "delivered", items: 1, paymentMethod: "PIX" },
  { id: "ORD-2394", customer: "Rafael Almeida", customerEmail: "rafael@email.com", date: "2026-02-14T15:45:00", total: 338.00, status: "delivered", items: 2, paymentMethod: "Cartão de Débito" },
  { id: "ORD-2393", customer: "Juliana Ribeiro", customerEmail: "juliana@email.com", date: "2026-02-14T11:30:00", total: 5899.00, status: "cancelled", items: 1, paymentMethod: "Cartão de Crédito" },
  { id: "ORD-2392", customer: "Fernando Martins", customerEmail: "fernando@email.com", date: "2026-02-13T09:20:00", total: 1198.00, status: "refunded", items: 2, paymentMethod: "PIX" },
  { id: "ORD-2391", customer: "Isabela Gomes", customerEmail: "isabela@email.com", date: "2026-02-13T08:00:00", total: 459.00, status: "delivered", items: 1, paymentMethod: "Boleto" },
  { id: "ORD-2390", customer: "Carlos Mendes", customerEmail: "carlos@email.com", date: "2026-02-12T17:45:00", total: 748.00, status: "delivered", items: 3, paymentMethod: "Cartão de Crédito" },
];

// Customers
export const customers: Customer[] = [
  { id: "C001", name: "Maria Silva", email: "maria@email.com", phone: "(11) 98765-4321", city: "São Paulo", state: "SP", totalOrders: 15, totalSpent: 12450.00, lastOrder: "2026-02-16", status: "active", joinDate: "2024-03-15" },
  { id: "C002", name: "João Santos", email: "joao@email.com", phone: "(21) 97654-3210", city: "Rio de Janeiro", state: "RJ", totalOrders: 8, totalSpent: 5680.00, lastOrder: "2026-02-16", status: "active", joinDate: "2024-06-20" },
  { id: "C003", name: "Ana Oliveira", email: "ana@email.com", phone: "(31) 96543-2109", city: "Belo Horizonte", state: "MG", totalOrders: 22, totalSpent: 18900.00, lastOrder: "2026-02-16", status: "active", joinDate: "2023-11-10" },
  { id: "C004", name: "Pedro Lima", email: "pedro@email.com", phone: "(41) 95432-1098", city: "Curitiba", state: "PR", totalOrders: 5, totalSpent: 3200.00, lastOrder: "2026-02-15", status: "active", joinDate: "2025-01-08" },
  { id: "C005", name: "Camila Souza", email: "camila@email.com", phone: "(51) 94321-0987", city: "Porto Alegre", state: "RS", totalOrders: 12, totalSpent: 9870.00, lastOrder: "2026-02-15", status: "active", joinDate: "2024-04-22" },
  { id: "C006", name: "Lucas Ferreira", email: "lucas@email.com", phone: "(61) 93210-9876", city: "Brasília", state: "DF", totalOrders: 3, totalSpent: 1890.00, lastOrder: "2026-02-15", status: "active", joinDate: "2025-09-15" },
  { id: "C007", name: "Beatriz Costa", email: "beatriz@email.com", phone: "(71) 92109-8765", city: "Salvador", state: "BA", totalOrders: 18, totalSpent: 15430.00, lastOrder: "2026-02-14", status: "active", joinDate: "2024-01-05" },
  { id: "C008", name: "Rafael Almeida", email: "rafael@email.com", phone: "(81) 91098-7654", city: "Recife", state: "PE", totalOrders: 7, totalSpent: 4560.00, lastOrder: "2026-02-14", status: "active", joinDate: "2024-08-30" },
  { id: "C009", name: "Juliana Ribeiro", email: "juliana@email.com", phone: "(85) 90987-6543", city: "Fortaleza", state: "CE", totalOrders: 1, totalSpent: 5899.00, lastOrder: "2026-02-14", status: "inactive", joinDate: "2025-12-01" },
  { id: "C010", name: "Fernando Martins", email: "fernando@email.com", phone: "(62) 89876-5432", city: "Goiânia", state: "GO", totalOrders: 10, totalSpent: 7650.00, lastOrder: "2026-02-13", status: "active", joinDate: "2024-05-18" },
];

// Financial Transactions
export const transactions: Transaction[] = [
  { id: "T001", description: "Vendas Online - Loja Virtual", category: "Vendas", type: "income", amount: 45890.00, date: "2026-02-16", status: "paid" },
  { id: "T002", description: "Vendas Marketplace", category: "Vendas", type: "income", amount: 23450.00, date: "2026-02-15", status: "paid" },
  { id: "T003", description: "Fornecedor - Tech Distribuidora", category: "Fornecedores", type: "expense", amount: 35000.00, date: "2026-02-15", status: "paid" },
  { id: "T004", description: "Aluguel Galpão", category: "Operacional", type: "expense", amount: 8500.00, date: "2026-02-10", status: "paid" },
  { id: "T005", description: "Folha de Pagamento", category: "Pessoal", type: "expense", amount: 28000.00, date: "2026-02-05", status: "paid" },
  { id: "T006", description: "Vendas Loja Física", category: "Vendas", type: "income", amount: 18700.00, date: "2026-02-14", status: "paid" },
  { id: "T007", description: "Google Ads - Marketing", category: "Marketing", type: "expense", amount: 5200.00, date: "2026-02-12", status: "paid" },
  { id: "T008", description: "Frete Transportadora", category: "Logística", type: "expense", amount: 4800.00, date: "2026-02-11", status: "paid" },
  { id: "T009", description: "Vendas Online - Loja Virtual", category: "Vendas", type: "income", amount: 38900.00, date: "2026-02-13", status: "paid" },
  { id: "T010", description: "Fornecedor - ModaTex", category: "Fornecedores", type: "expense", amount: 12000.00, date: "2026-02-18", status: "pending" },
  { id: "T011", description: "Conta de Energia", category: "Operacional", type: "expense", amount: 2300.00, date: "2026-02-20", status: "pending" },
  { id: "T012", description: "Seguro Empresarial", category: "Operacional", type: "expense", amount: 1800.00, date: "2026-02-08", status: "overdue" },
  { id: "T013", description: "Vendas Atacado", category: "Vendas", type: "income", amount: 67500.00, date: "2026-02-10", status: "paid" },
  { id: "T014", description: "Manutenção Equipamentos", category: "Operacional", type: "expense", amount: 3500.00, date: "2026-02-09", status: "paid" },
  { id: "T015", description: "Instagram Ads", category: "Marketing", type: "expense", amount: 3200.00, date: "2026-02-07", status: "paid" },
];

// Inventory
export const inventory: InventoryItem[] = [
  { id: "I001", productName: "Smartphone Galaxy S24", sku: "ELE-001", currentStock: 45, minStock: 10, maxStock: 100, lastRestock: "2026-02-10", supplier: "Samsung Brasil", unitCost: 2800.00, status: "in_stock" },
  { id: "I002", productName: "Notebook Dell Inspiron 15", sku: "ELE-002", currentStock: 23, minStock: 5, maxStock: 50, lastRestock: "2026-02-05", supplier: "Dell Technologies", unitCost: 2400.00, status: "in_stock" },
  { id: "I003", productName: "Fone Bluetooth JBL Tune", sku: "ELE-003", currentStock: 120, minStock: 30, maxStock: 200, lastRestock: "2026-02-12", supplier: "Harman do Brasil", unitCost: 120.00, status: "in_stock" },
  { id: "I004", productName: "Camiseta Polo Ralph Lauren", sku: "MOD-001", currentStock: 85, minStock: 20, maxStock: 150, lastRestock: "2026-02-08", supplier: "ModaTex Distribuidora", unitCost: 65.00, status: "in_stock" },
  { id: "I005", productName: "Tênis Nike Air Max", sku: "ESP-001", currentStock: 34, minStock: 15, maxStock: 80, lastRestock: "2026-01-28", supplier: "Nike Brasil", unitCost: 280.00, status: "in_stock" },
  { id: "I006", productName: "Smartwatch Apple Watch SE", sku: "ELE-004", currentStock: 3, minStock: 8, maxStock: 30, lastRestock: "2026-01-15", supplier: "Apple Brasil", unitCost: 1600.00, status: "low" },
  { id: "I007", productName: "Conjunto de Panelas Tramontina", sku: "CAS-001", currentStock: 0, minStock: 10, maxStock: 40, lastRestock: "2026-01-10", supplier: "Tramontina S.A.", unitCost: 200.00, status: "out_of_stock" },
  { id: "I008", productName: "Perfume Dolce & Gabbana", sku: "BEL-001", currentStock: 56, minStock: 15, maxStock: 80, lastRestock: "2026-02-01", supplier: "Importadora Luxe", unitCost: 150.00, status: "in_stock" },
  { id: "I009", productName: "Mesa de Escritório", sku: "CAS-002", currentStock: 12, minStock: 5, maxStock: 25, lastRestock: "2026-01-20", supplier: "MoveisPlus", unitCost: 350.00, status: "in_stock" },
  { id: "I010", productName: "Bola de Futebol Adidas", sku: "ESP-002", currentStock: 200, minStock: 50, maxStock: 300, lastRestock: "2026-02-14", supplier: "Adidas Brasil", unitCost: 55.00, status: "in_stock" },
  { id: "I011", productName: "Câmera Canon EOS", sku: "ELE-005", currentStock: 8, minStock: 3, maxStock: 15, lastRestock: "2026-01-25", supplier: "Canon do Brasil", unitCost: 3800.00, status: "in_stock" },
  { id: "I012", productName: "Vestido Zara Floral", sku: "MOD-002", currentStock: 0, minStock: 15, maxStock: 60, lastRestock: "2025-12-20", supplier: "Zara Brasil", unitCost: 90.00, status: "out_of_stock" },
];

// Top Selling Products (for dashboard)
export const topProducts = [
  { name: "Fone Bluetooth JBL", sales: 512, revenue: 153088 },
  { name: "Bola Futebol Adidas", sales: 445, revenue: 66305 },
  { name: "Camiseta Polo RL", sales: 389, revenue: 73521 },
  { name: "Vestido Zara Floral", sales: 312, revenue: 80808 },
  { name: "Tênis Nike Air Max", sales: 278, revenue: 166522 },
];

// Daily Sales (last 7 days for sparkline)
export const dailySales = [
  { day: "Seg", value: 42300 },
  { day: "Ter", value: 38900 },
  { day: "Qua", value: 45100 },
  { day: "Qui", value: 41200 },
  { day: "Sex", value: 52800 },
  { day: "Sáb", value: 58400 },
  { day: "Dom", value: 35200 },
];

// Payment methods distribution
export const paymentMethods = [
  { name: "Cartão de Crédito", value: 45, color: "#3b82f6" },
  { name: "PIX", value: 32, color: "#10b981" },
  { name: "Boleto", value: 15, color: "#f59e0b" },
  { name: "Cartão de Débito", value: 8, color: "#8b5cf6" },
];
