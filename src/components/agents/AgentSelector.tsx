"use client";

import { cn } from "@/lib/utils";
import { agents, type Agent } from "@/data/agents";
import { X, Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface AgentSelectorProps {
  onSelectAgent: (agent: Agent) => void;
  onClose: () => void;
}

export default function AgentSelector({
  onSelectAgent,
  onClose,
}: AgentSelectorProps) {
  const [search, setSearch] = useState("");

  const filtered = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-100">
              <Sparkles className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Escolha um Agente
              </h2>
              <p className="text-sm text-gray-500">
                Selecione o agente AIOS para iniciar uma conversa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar agente por nome ou função..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10 bg-gray-50"
              autoFocus
            />
          </div>
        </div>

        {/* Agent Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((agent) => (
              <button
                key={agent.id}
                onClick={() => onSelectAgent(agent)}
                className="text-left p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shrink-0",
                      agent.color
                    )}
                  >
                    {agent.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                      {agent.name}
                    </p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="badge bg-gray-100 text-gray-600 text-[10px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">Nenhum agente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
