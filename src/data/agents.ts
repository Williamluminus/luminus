// ============================
// AIOS Agents - Chat Dashboard Data
// ============================

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  description: string;
  color: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  agentId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  agentId: string;
  title: string;
  lastMessage: string;
  lastMessageAt: string;
  messages: ChatMessage[];
}

// All 12 AIOS agents
export const agents: Agent[] = [
  {
    id: "dev",
    name: "Dex",
    role: "Developer",
    emoji: "💻",
    description: "Implementação de código, debugging, refatoração e boas práticas de desenvolvimento.",
    color: "bg-blue-500",
    skills: ["TypeScript", "React", "Node.js", "SQL", "Testing"],
  },
  {
    id: "qa",
    name: "QA Scout",
    role: "Quality Assurance",
    emoji: "🔍",
    description: "Testes, revisão de código e validação de qualidade.",
    color: "bg-green-500",
    skills: ["Testes Unitários", "E2E", "Code Review", "Bug Tracking"],
  },
  {
    id: "architect",
    name: "Arch Master",
    role: "Arquiteto de Software",
    emoji: "🏗️",
    description: "Decisões de arquitetura, design de sistema e padrões técnicos.",
    color: "bg-purple-500",
    skills: ["System Design", "Microservices", "Clean Architecture", "DDD"],
  },
  {
    id: "pm",
    name: "PM Lead",
    role: "Gerente de Projeto",
    emoji: "📊",
    description: "Planejamento de projeto, gestão de stakeholders e cronogramas.",
    color: "bg-orange-500",
    skills: ["Roadmap", "Sprints", "Stakeholders", "Métricas"],
  },
  {
    id: "po",
    name: "PO Master",
    role: "Product Owner",
    emoji: "🎯",
    description: "Criação de stories, definição de requisitos e priorização de backlog.",
    color: "bg-red-500",
    skills: ["User Stories", "Backlog", "Requisitos", "Priorização"],
  },
  {
    id: "devops",
    name: "DevOps Guardian",
    role: "Engenheiro DevOps",
    emoji: "🔧",
    description: "Infraestrutura, deploys, CI/CD e monitoramento.",
    color: "bg-cyan-500",
    skills: ["Docker", "CI/CD", "AWS", "Kubernetes", "Monitoring"],
  },
  {
    id: "data-engineer",
    name: "Data Sage",
    role: "Engenheiro de Dados",
    emoji: "📈",
    description: "Pipelines de dados, ETL, analytics e modelagem de dados.",
    color: "bg-emerald-500",
    skills: ["ETL", "SQL", "Data Pipeline", "Analytics", "Modelagem"],
  },
  {
    id: "analyst",
    name: "Analyst Pro",
    role: "Analista de Negócios",
    emoji: "📋",
    description: "Análise de negócios, brainstorming e discovery.",
    color: "bg-amber-500",
    skills: ["Análise", "Discovery", "Brainstorming", "Documentação"],
  },
  {
    id: "sm",
    name: "Scrum Master",
    role: "Scrum Master",
    emoji: "⚡",
    description: "Gestão de sprints, cerimônias ágeis e fluxo de trabalho.",
    color: "bg-yellow-500",
    skills: ["Scrum", "Kanban", "Retrospectivas", "Daily"],
  },
  {
    id: "ux-design-expert",
    name: "UX Expert",
    role: "UX/UI Designer",
    emoji: "🎨",
    description: "Design de interface, padrões UX e design system.",
    color: "bg-pink-500",
    skills: ["UI Design", "UX Research", "Prototyping", "Design System"],
  },
  {
    id: "aios-master",
    name: "AIOS Master",
    role: "Framework Lead",
    emoji: "👑",
    description: "Conhecimento do framework AIOS, orquestração de agentes.",
    color: "bg-indigo-500",
    skills: ["AIOS", "Orquestração", "Workflows", "Configuração"],
  },
  {
    id: "squad-creator",
    name: "Squad Creator",
    role: "Meta-Agent",
    emoji: "⚙️",
    description: "Cria e gerencia squads de agentes para tarefas complexas.",
    color: "bg-slate-500",
    skills: ["Team Building", "Squads", "Delegação", "Coordenação"],
  },
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    agentId: "dev",
    title: "Implementar autenticação JWT",
    lastMessage: "Pronto! Implementei o middleware de autenticação com refresh token.",
    lastMessageAt: "2026-02-19T14:30:00",
    messages: [
      {
        id: "msg-1",
        agentId: "dev",
        role: "user",
        content: "Preciso implementar autenticação JWT no nosso projeto Next.js. Pode me ajudar?",
        timestamp: "2026-02-19T14:00:00",
      },
      {
        id: "msg-2",
        agentId: "dev",
        role: "assistant",
        content: "Claro! Para implementar autenticação JWT no Next.js, vamos precisar de:\n\n1. **Biblioteca jsonwebtoken** para gerar e verificar tokens\n2. **Middleware** para proteger rotas da API\n3. **Refresh Token** para manter sessões seguras\n4. **Cookies HttpOnly** para armazenamento seguro\n\nVou criar a estrutura passo a passo. Quer que eu comece pelo middleware ou pela rota de login?",
        timestamp: "2026-02-19T14:05:00",
      },
      {
        id: "msg-3",
        agentId: "dev",
        role: "user",
        content: "Comece pelo middleware, por favor.",
        timestamp: "2026-02-19T14:10:00",
      },
      {
        id: "msg-4",
        agentId: "dev",
        role: "assistant",
        content: "Pronto! Implementei o middleware de autenticação com refresh token. Ele verifica o token JWT em cada requisição protegida e renova automaticamente quando está perto de expirar. Aqui está a estrutura:\n\n```typescript\n// middleware.ts\nimport { NextResponse } from 'next/server'\nimport { verifyToken } from '@/lib/auth'\n\nexport function middleware(request) {\n  const token = request.cookies.get('auth-token')\n  if (!token) {\n    return NextResponse.redirect('/login')\n  }\n  const payload = verifyToken(token.value)\n  if (!payload) {\n    return NextResponse.redirect('/login')\n  }\n  return NextResponse.next()\n}\n```\n\nQuer que eu crie a rota de login agora?",
        timestamp: "2026-02-19T14:30:00",
      },
    ],
  },
  {
    id: "conv-2",
    agentId: "architect",
    title: "Arquitetura de microserviços",
    lastMessage: "Recomendo separar em 3 serviços: Auth, Catalog e Orders.",
    lastMessageAt: "2026-02-19T10:45:00",
    messages: [
      {
        id: "msg-5",
        agentId: "architect",
        role: "user",
        content: "Estamos pensando em migrar o monolito para microserviços. Qual seria a melhor abordagem?",
        timestamp: "2026-02-19T10:00:00",
      },
      {
        id: "msg-6",
        agentId: "architect",
        role: "assistant",
        content: "Recomendo separar em 3 serviços: Auth, Catalog e Orders. Essa divisão segue os bounded contexts do domínio e minimiza acoplamento. Podemos usar o padrão Strangler Fig para migrar gradualmente sem downtime.",
        timestamp: "2026-02-19T10:45:00",
      },
    ],
  },
  {
    id: "conv-3",
    agentId: "ux-design-expert",
    title: "Design system do dashboard",
    lastMessage: "Criei tokens de cor, tipografia e espaçamento para o design system.",
    lastMessageAt: "2026-02-18T16:20:00",
    messages: [
      {
        id: "msg-7",
        agentId: "ux-design-expert",
        role: "user",
        content: "Preciso criar um design system consistente para o dashboard Luminus.",
        timestamp: "2026-02-18T15:00:00",
      },
      {
        id: "msg-8",
        agentId: "ux-design-expert",
        role: "assistant",
        content: "Criei tokens de cor, tipografia e espaçamento para o design system. A paleta principal usa azul (#2563eb) como cor de ação, com variações para estados hover, active e disabled. Tipografia baseada em Inter com 4 escalas: display, heading, body e caption.",
        timestamp: "2026-02-18T16:20:00",
      },
    ],
  },
  {
    id: "conv-4",
    agentId: "qa",
    title: "Plano de testes E2E",
    lastMessage: "Mapeei 24 cenários críticos para testes E2E com Playwright.",
    lastMessageAt: "2026-02-18T11:00:00",
    messages: [
      {
        id: "msg-9",
        agentId: "qa",
        role: "user",
        content: "Quais cenários são prioritários para testes E2E do checkout?",
        timestamp: "2026-02-18T10:00:00",
      },
      {
        id: "msg-10",
        agentId: "qa",
        role: "assistant",
        content: "Mapeei 24 cenários críticos para testes E2E com Playwright. Os 5 mais prioritários são:\n\n1. Fluxo completo de compra (happy path)\n2. Validação de estoque durante checkout\n3. Processamento de pagamento com cartão\n4. Aplicação de cupom de desconto\n5. Fallback em caso de erro no gateway de pagamento\n\nCada cenário inclui assertions para dados do pedido, email de confirmação e atualização de estoque.",
        timestamp: "2026-02-18T11:00:00",
      },
    ],
  },
  {
    id: "conv-5",
    agentId: "devops",
    title: "Pipeline CI/CD com GitHub Actions",
    lastMessage: "Pipeline configurado com stages de lint, test, build e deploy.",
    lastMessageAt: "2026-02-17T15:30:00",
    messages: [
      {
        id: "msg-11",
        agentId: "devops",
        role: "user",
        content: "Preciso configurar CI/CD para deploy automático na Vercel.",
        timestamp: "2026-02-17T14:00:00",
      },
      {
        id: "msg-12",
        agentId: "devops",
        role: "assistant",
        content: "Pipeline configurado com stages de lint, test, build e deploy. O workflow roda em PRs para validação e faz deploy automático em merge para main. Includes cache de node_modules para builds mais rápidos.",
        timestamp: "2026-02-17T15:30:00",
      },
    ],
  },
];
