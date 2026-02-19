"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  agents,
  agentSuggestions,
  type Conversation,
  type ChatMessage,
  type Agent,
} from "@/data/agents";
import ConversationList from "@/components/agents/ConversationList";
import ChatMessageBubble from "@/components/agents/ChatMessageBubble";
import ChatInput from "@/components/agents/ChatInput";
import AgentSelector from "@/components/agents/AgentSelector";
import TypingIndicator from "@/components/agents/TypingIndicator";
import EmptyChat from "@/components/agents/EmptyChat";
import { cn } from "@/lib/utils";
import { Bot, PanelLeftClose, PanelLeft, Info, Zap, Trash2 } from "lucide-react";

export default function AgentsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAgentInfo, setShowAgentInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const activeAgent = activeConversation
    ? agents.find((a) => a.id === activeConversation.agentId)
    : null;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages.length, isStreaming, streamingContent, scrollToBottom]);

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("futury-squad-conversations");
    if (saved) {
      try {
        setConversations(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("futury-squad-conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleNewConversation = () => {
    setShowAgentSelector(true);
  };

  const handleSelectAgent = (agent: Agent) => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      agentId: agent.id,
      title: `Nova conversa com ${agent.name}`,
      lastMessage: "",
      lastMessageAt: new Date().toISOString(),
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setShowAgentSelector(false);
  };

  const handleDeleteConversation = (convId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== convId));
    if (activeConversationId === convId) {
      setActiveConversationId(null);
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId || !activeConversation) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      agentId: activeConversation.agentId,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Add user message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              lastMessage: content,
              lastMessageAt: userMessage.timestamp,
              title:
                c.messages.length === 0
                  ? content.slice(0, 50) + (content.length > 50 ? "..." : "")
                  : c.title,
            }
          : c
      )
    );

    // Build messages for API
    const currentConv = conversations.find((c) => c.id === activeConversationId);
    const apiMessages = [
      ...(currentConv?.messages || []).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user" as const, content },
    ];

    // Start streaming
    setIsStreaming(true);
    setStreamingContent("");

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          agentId: activeConversation.agentId,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                fullContent += `\n\n**Erro:** ${parsed.error}`;
                setStreamingContent(fullContent);
              } else if (parsed.text) {
                fullContent += parsed.text;
                setStreamingContent(fullContent);
              }
            } catch {
              // ignore parse errors in SSE
            }
          }
        }
      }

      // Add the complete assistant message
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        agentId: activeConversation.agentId,
        role: "assistant",
        content: fullContent,
        timestamp: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                messages: [...c.messages, assistantMessage],
                lastMessage: fullContent.slice(0, 100),
                lastMessageAt: assistantMessage.timestamp,
              }
            : c
        )
      );
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // User cancelled - save what we have
        if (streamingContent) {
          const partialMessage: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            agentId: activeConversation.agentId,
            role: "assistant",
            content: streamingContent + "\n\n*[Resposta interrompida]*",
            timestamp: new Date().toISOString(),
          };
          setConversations((prev) =>
            prev.map((c) =>
              c.id === activeConversationId
                ? {
                    ...c,
                    messages: [...c.messages, partialMessage],
                    lastMessage: "Resposta interrompida",
                    lastMessageAt: partialMessage.timestamp,
                  }
                : c
            )
          );
        }
      } else {
        // Add error message
        const errorMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          agentId: activeConversation.agentId,
          role: "assistant",
          content: `**Erro ao conectar com o agente.** Verifique se a ANTHROPIC_API_KEY está configurada no arquivo .env\n\nDetalhes: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
          timestamp: new Date().toISOString(),
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  messages: [...c.messages, errorMessage],
                  lastMessage: "Erro na conexão",
                  lastMessageAt: errorMessage.timestamp,
                }
              : c
          )
        );
      }
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
      abortControllerRef.current = null;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const suggestions = activeAgent ? agentSuggestions[activeAgent.id] || [] : [];

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Conversation Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 shrink-0",
          sidebarOpen ? "w-80" : "w-0"
        )}
      >
        {sidebarOpen && (
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title={sidebarOpen ? "Fechar painel" : "Abrir painel"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </button>

            {activeAgent ? (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm",
                    activeAgent.color
                  )}
                >
                  {activeAgent.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {activeAgent.name}
                    </p>
                    {isStreaming && (
                      <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        streaming
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{activeAgent.role}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Futury Squad
                  </p>
                  <p className="text-xs text-gray-500">
                    12 agentes AIOS com IA real
                  </p>
                </div>
              </div>
            )}
          </div>

          {activeAgent && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5">
                {activeAgent.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="badge bg-gray-100 text-gray-600 text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setShowAgentInfo(!showAgentInfo)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  showAgentInfo
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
                title="Informações do agente"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Agent Info Panel */}
        {showAgentInfo && activeAgent && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-start gap-3 max-w-2xl mx-auto">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shrink-0",
                  activeAgent.color
                )}
              >
                {activeAgent.emoji}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{activeAgent.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{activeAgent.role}</p>
                <p className="text-xs text-gray-600 mb-2">{activeAgent.description}</p>
                <div className="flex flex-wrap gap-1">
                  {activeAgent.skills.map((skill) => (
                    <span key={skill} className="badge bg-white text-gray-600 border border-gray-200 text-[10px]">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 italic">{activeAgent.signature}</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area or Empty State */}
        {activeConversation ? (
          <>
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              {activeConversation.messages.length === 0 && activeAgent && (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-4",
                      activeAgent.color
                    )}
                  >
                    {activeAgent.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {activeAgent.name}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md mb-2">
                    {activeAgent.description}
                  </p>
                  <p className="text-xs text-gray-400 italic mb-6">{activeAgent.signature}</p>

                  {/* Suggestion chips */}
                  {suggestions.length > 0 && (
                    <div className="w-full max-w-lg">
                      <div className="flex items-center gap-1.5 mb-3 justify-center">
                        <Zap className="w-3.5 h-3.5 text-primary-500" />
                        <p className="text-xs font-medium text-gray-500">Sugestões para começar</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 text-sm text-gray-700 hover:text-primary-700 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeConversation.messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
              ))}

              {/* Streaming message */}
              {isStreaming && streamingContent && (
                <ChatMessageBubble
                  message={{
                    id: "streaming",
                    agentId: activeConversation.agentId,
                    role: "assistant",
                    content: streamingContent,
                    timestamp: new Date().toISOString(),
                  }}
                  isStreaming
                />
              )}

              {/* Typing indicator before first token */}
              {isStreaming && !streamingContent && (
                <TypingIndicator agentId={activeConversation.agentId} />
              )}

              <div ref={messagesEndRef} />
            </div>
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isStreaming}
              isStreaming={isStreaming}
              onStopStreaming={handleStopStreaming}
              placeholder={`Falar com ${activeAgent?.name || "agente"}...`}
            />
          </>
        ) : (
          <EmptyChat onSelectAgent={handleSelectAgent} />
        )}
      </div>

      {/* Agent Selector Modal */}
      {showAgentSelector && (
        <AgentSelector
          onSelectAgent={handleSelectAgent}
          onClose={() => setShowAgentSelector(false)}
        />
      )}
    </div>
  );
}
