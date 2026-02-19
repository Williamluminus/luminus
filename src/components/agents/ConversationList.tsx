"use client";

import { cn } from "@/lib/utils";
import { agents, type Conversation } from "@/data/agents";
import { Plus, MessageSquare, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const getAgent = (agentId: string) =>
    agents.find((a) => a.id === agentId);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) return "Agora";
    if (diffHours < 24) return `${Math.floor(diffHours)}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Futury Squad</h2>
            <p className="text-[10px] text-gray-400">AIOS Agents + Claude AI</p>
          </div>
          <button
            onClick={onNewConversation}
            className="btn-primary !px-3 !py-2"
            title="Nova conversa"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10 bg-gray-50 border-gray-200 text-sm"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <MessageSquare className="w-8 h-8 mb-2" />
            <p className="text-sm">
              {conversations.length === 0
                ? "Nenhuma conversa ainda"
                : "Nenhuma conversa encontrada"}
            </p>
            {conversations.length === 0 && (
              <p className="text-xs text-gray-300 mt-1">Clique em &quot;Nova&quot; para começar</p>
            )}
          </div>
        ) : (
          filtered.map((conversation) => {
            const agent = getAgent(conversation.agentId);
            const isActive = conversation.id === activeConversationId;

            return (
              <div
                key={conversation.id}
                className={cn(
                  "relative group",
                  isActive
                    ? "bg-primary-50 border-l-2 border-l-primary-600"
                    : "hover:bg-gray-100"
                )}
              >
                <button
                  onClick={() => onSelectConversation(conversation.id)}
                  className="w-full text-left px-4 py-3.5 border-b border-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm shrink-0",
                        agent?.color || "bg-gray-500"
                      )}
                    >
                      {agent?.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900 truncate pr-6">
                          {conversation.title}
                        </span>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {agent?.name} - {agent?.role}
                      </p>
                      {conversation.lastMessage && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {conversation.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </button>

                {/* Delete button */}
                {onDeleteConversation && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="absolute right-2 top-3 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Excluir conversa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
