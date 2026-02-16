"use client";

import { useState } from "react";
import {
  Store,
  User,
  Bell,
  CreditCard,
  Truck,
  Shield,
  Mail,
  Globe,
  Save,
} from "lucide-react";

const tabs = [
  { id: "general", label: "Geral", icon: Store },
  { id: "profile", label: "Perfil", icon: User },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "payments", label: "Pagamentos", icon: CreditCard },
  { id: "shipping", label: "Frete", icon: Truck },
  { id: "security", label: "Segurança", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gerencie as configurações da sua loja
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Informações da Loja
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Dados básicos da sua empresa
                </p>
              </div>
              <div className="card-body space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nome da Loja
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Luminus Store"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="12.345.678/0001-90"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descrição
                  </label>
                  <textarea
                    className="input min-h-[80px] resize-none"
                    defaultValue="Loja online de produtos variados com as melhores marcas do mercado."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      className="input"
                      defaultValue="contato@luminus.com.br"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="input"
                      defaultValue="(11) 3456-7890"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    className="input"
                    defaultValue="https://www.luminus.com.br"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Endereço
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Av. Paulista, 1234 - Bela Vista"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CEP
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="01310-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Cidade
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="São Paulo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Estado
                    </label>
                    <select className="input" defaultValue="SP">
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PR">Paraná</option>
                      <option value="RS">Rio Grande do Sul</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Meu Perfil
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Informações da conta do administrador
                </p>
              </div>
              <div className="card-body space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">
                      Alterar Foto
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Administrador"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Cargo
                    </label>
                    <input
                      type="text"
                      className="input"
                      defaultValue="Gerente Geral"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    defaultValue="admin@luminus.com.br"
                  />
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar Perfil
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Notificações
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Configure suas preferências de notificação
                </p>
              </div>
              <div className="card-body space-y-4">
                {[
                  {
                    title: "Novos pedidos",
                    desc: "Receber notificação a cada novo pedido",
                    checked: true,
                  },
                  {
                    title: "Estoque baixo",
                    desc: "Alertas quando produtos atingem estoque mínimo",
                    checked: true,
                  },
                  {
                    title: "Novos clientes",
                    desc: "Notificar quando novos clientes se cadastrarem",
                    checked: false,
                  },
                  {
                    title: "Pagamentos recebidos",
                    desc: "Confirmação de pagamentos processados",
                    checked: true,
                  },
                  {
                    title: "Relatórios semanais",
                    desc: "Resumo semanal por email",
                    checked: true,
                  },
                  {
                    title: "Promoções e ofertas",
                    desc: "Notificações sobre campanhas ativas",
                    checked: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar Preferências
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Métodos de Pagamento
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Configure os meios de pagamento aceitos
                </p>
              </div>
              <div className="card-body space-y-4">
                {[
                  { name: "Cartão de Crédito", enabled: true, fee: "3.49%" },
                  { name: "Cartão de Débito", enabled: true, fee: "2.39%" },
                  { name: "PIX", enabled: true, fee: "0.99%" },
                  { name: "Boleto Bancário", enabled: true, fee: "R$ 3,49" },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Taxa: {method.fee}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={method.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Configurações de Frete
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Defina as opções de entrega
                </p>
              </div>
              <div className="card-body space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Frete Grátis acima de
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="R$ 199,90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prazo padrão de envio (dias úteis)
                  </label>
                  <input type="number" className="input" defaultValue="5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    CEP de origem
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="01310-100"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Transportadoras
                  </label>
                  {["Correios (PAC)", "Correios (Sedex)", "Jadlog", "Total Express"].map(
                    (carrier) => (
                      <div
                        key={carrier}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {carrier}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="btn-primary">
                    <Save className="w-4 h-4" />
                    Salvar Configurações
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">
                  Segurança
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Proteja sua conta e dados
                </p>
              </div>
              <div className="card-body space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Senha Atual
                  </label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Autenticação em duas etapas (2FA)
                    </p>
                    <p className="text-xs text-gray-500">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button className="btn-primary">
                    <Shield className="w-4 h-4" />
                    Atualizar Segurança
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
