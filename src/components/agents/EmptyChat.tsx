"use client";

import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";
import { Bot, Sparkles } from "lucide-react";
import type { Agent } from "@/data/agents";

interface EmptyChatProps {
  onSelectAgent: (agent: Agent) => void;
}

export default function EmptyChat({ onSelectAgent }: EmptyChatProps) {
  const featuredAgents = agents.slice(0, 6);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="p-4 rounded-2xl bg-primary-100 mb-6">
        <Bot className="w-10 h-10 text-primary-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Agentes AIOS
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Converse com agentes especializados para ajudar no desenvolvimento,
        planejamento, design e muito mais.
      </p>

      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <p className="text-sm font-semibold text-gray-700">
            Iniciar conversa com:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredAgents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              className="text-left p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm",
                    agent.color
                  )}
                >
                  {agent.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                    {agent.name}
                  </p>
                  <p className="text-[11px] text-gray-500">{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">
                {agent.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
