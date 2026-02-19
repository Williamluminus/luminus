"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { agents, mockConversations, type Conversation, type ChatMessage, type Agent } from "@/data/agents";
import ConversationList from "@/components/agents/ConversationList";
import ChatMessageBubble from "@/components/agents/ChatMessageBubble";
import ChatInput from "@/components/agents/ChatInput";
import AgentSelector from "@/components/agents/AgentSelector";
import TypingIndicator from "@/components/agents/TypingIndicator";
import EmptyChat from "@/components/agents/EmptyChat";
import { cn } from "@/lib/utils";
import { Bot, PanelLeftClose, PanelLeft, Info } from "lucide-react";

// Simulated agent responses
const agentResponses: Record<string, string[]> = {
  dev: [
    "Analisando o código... Encontrei uma solução otimizada usando o padrão Strategy. Vou implementar passo a passo.",
    "Boa ideia! Vou criar o componente com TypeScript e adicionar os testes unitários. Me dá um momento.",
    "Fiz a refatoração usando Clean Code principles. O código ficou mais legível e testável.",
  ],
  qa: [
    "Identifiquei 3 cenários de edge case que precisam de cobertura. Vou detalhar cada um.",
    "Os testes E2E estão passando! Encontrei apenas um flaky test que precisa de ajuste no timeout.",
    "Realizei a code review e tenho 5 sugestões de melhoria para qualidade do código.",
  ],
  architect: [
    "Recomendo usar o padrão CQRS para essa feature. Separa responsabilidades e facilita scaling.",
    "A arquitetura hexagonal é ideal nesse caso. Vou criar o diagrama C4 para visualização.",
    "Analisei os trade-offs e recomendo PostgreSQL com cache em Redis para esse volume de dados.",
  ],
  pm: [
    "Criei o roadmap do Q1 com as prioridades alinhadas. As entregas estão distribuídas em 3 sprints.",
    "O relatório de status mostra 85% de conclusão do milestone. 2 tarefas estão bloqueadas.",
    "Agendei a retrospectiva e preparei os dados de velocity das últimas 5 sprints.",
  ],
  po: [
    "Escrevi 8 user stories com critérios de aceite detalhados. Estão priorizadas por valor de negócio.",
    "O backlog está refinado e pronto para a sprint planning. Temos capacity para 34 story points.",
    "Baseado no feedback dos usuários, sugiro pivotar a prioridade para melhorar a busca.",
  ],
  devops: [
    "Pipeline CI/CD configurado com 4 stages: lint, test, build e deploy. Deploy automático em staging.",
    "O container Docker está otimizado - reduzimos a imagem de 1.2GB para 180MB usando multi-stage.",
    "Alarmes configurados no CloudWatch. Você receberá alertas de CPU > 80% e latência > 500ms.",
  ],
  "data-engineer": [
    "O pipeline ETL está processando 2M registros/hora. Otimizei as queries com particionamento.",
    "Dashboard de analytics pronto! Métricas de conversão, retenção e LTV estão atualizando em real-time.",
    "Migração de dados concluída com validação de integridade. Zero registros perdidos.",
  ],
  analyst: [
    "A análise de mercado mostra oportunidade de 23% de crescimento no segmento mobile.",
    "Mapeei os fluxos atuais e identifiquei 4 gargalos no processo de checkout.",
    "O benchmark com concorrentes revela que nosso NPS está 15 pontos acima da média do setor.",
  ],
  sm: [
    "Sprint planning concluída! Time comprometeu com 32 story points em 8 items.",
    "Velocity média das últimas 5 sprints: 34 points. Estamos consistentes com desvio de apenas 8%.",
    "Identifiquei impedimentos no fluxo. Propondo um refinement extra para destravar o time.",
  ],
  "ux-design-expert": [
    "Wireframes do novo fluxo de checkout prontos. Reduzi de 5 para 3 etapas com progressive disclosure.",
    "Os testes de usabilidade mostraram taxa de conclusão de 92%. Usuários elogiaram a simplicidade.",
    "Design system atualizado com novos tokens e componentes. Documentação no Storybook está pronta.",
  ],
  "aios-master": [
    "O framework AIOS está configurado com 12 agentes ativos. Todos os workflows estão operacionais.",
    "Para essa tarefa, recomendo usar o workflow brownfield-fullstack com o team fullstack.",
    "Orchestração configurada! O squad será: Architect > PO > Dev > QA > DevOps, nessa ordem.",
  ],
  "squad-creator": [
    "Squad criado com 4 agentes: Architect, Dev, QA e DevOps. Workflow de desenvolvimento ativado.",
    "Recomendo o team IDE Minimal para essa tarefa: PO, SM, Dev e QA são suficientes.",
    "Squad de discovery montado: Analyst, PM e UX Expert vão fazer o assessment inicial.",
  ],
};

export default function AgentsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const activeAgent = activeConversation
    ? agents.find((a) => a.id === activeConversation.agentId)
    : null;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages.length, isTyping, scrollToBottom]);

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

  const handleSendMessage = (content: string) => {
    if (!activeConversationId || !activeConversation) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      agentId: activeConversation.agentId,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

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

    // Simulate agent typing
    setIsTyping(true);
    const delay = 1500 + Math.random() * 2000;

    setTimeout(() => {
      const responses = agentResponses[activeConversation.agentId] || agentResponses.dev;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        agentId: activeConversation.agentId,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                messages: [...c.messages, assistantMessage],
                lastMessage: randomResponse,
                lastMessageAt: assistantMessage.timestamp,
              }
            : c
        )
      );
      setIsTyping(false);
    }, delay);
  };

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
                  <p className="text-sm font-semibold text-gray-900">
                    {activeAgent.name}
                  </p>
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
                    Agentes AIOS
                  </p>
                  <p className="text-xs text-gray-500">
                    12 agentes disponíveis
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
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title="Informações do agente"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

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
                  <p className="text-sm text-gray-500 max-w-md mb-4">
                    {activeAgent.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {activeAgent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge bg-gray-100 text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-6">
                    Envie uma mensagem para iniciar a conversa
                  </p>
                </div>
              )}
              {activeConversation.messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && activeConversation && (
                <TypingIndicator agentId={activeConversation.agentId} />
              )}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
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
