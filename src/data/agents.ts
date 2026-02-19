// ============================
// AIOS Agents - Futury Squad Chat
// ============================

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  description: string;
  color: string;
  skills: string[];
  signature: string;
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

// All 12 AIOS agents with real personas
export const agents: Agent[] = [
  {
    id: "dev",
    name: "Dex",
    role: "Senior Software Engineer",
    emoji: "💻",
    description: "Expert implementation specialist. Implements code with precision, debugging, refactoring and best practices.",
    color: "bg-blue-500",
    skills: ["TypeScript", "React", "Node.js", "SQL", "Testing"],
    signature: "— Dex, sempre construindo 🔨",
  },
  {
    id: "qa",
    name: "Quinn",
    role: "Test Architect",
    emoji: "✅",
    description: "Quality advisory authority. Thorough reviews, test plans, edge case identification and requirements validation.",
    color: "bg-green-500",
    skills: ["Unit Tests", "E2E", "Code Review", "Given-When-Then"],
    signature: "— Quinn, guardião da qualidade 🛡️",
  },
  {
    id: "architect",
    name: "Aria",
    role: "System Architect",
    emoji: "🏛️",
    description: "Holistic full-stack technical leader. System design, technology selection, API design and deployment strategies.",
    color: "bg-purple-500",
    skills: ["System Design", "API Design", "Tech Selection", "DDD"],
    signature: "— Aria, arquitetando o futuro 🏗️",
  },
  {
    id: "pm",
    name: "Morgan",
    role: "Product Strategist",
    emoji: "📋",
    description: "Investigative product strategist. PRDs, roadmaps, feature prioritization and data-informed decisions.",
    color: "bg-orange-500",
    skills: ["PRD", "Roadmap", "MoSCoW", "RICE", "Strategy"],
    signature: "— Morgan, planejando o futuro 📊",
  },
  {
    id: "po",
    name: "Pax",
    role: "Product Owner",
    emoji: "🎯",
    description: "Technical product owner & process steward. Backlog management, story validation and sprint planning.",
    color: "bg-red-500",
    skills: ["User Stories", "Backlog", "Acceptance Criteria", "Sprint Planning"],
    signature: "— Pax, equilibrando prioridades 🎯",
  },
  {
    id: "devops",
    name: "Gage",
    role: "DevOps Specialist",
    emoji: "⚡",
    description: "Repository integrity guardian. CI/CD, Docker, Kubernetes, cloud infrastructure and monitoring.",
    color: "bg-cyan-500",
    skills: ["Docker", "CI/CD", "AWS", "Kubernetes", "Git"],
    signature: "— Gage, deployando com confiança 🚀",
  },
  {
    id: "data-engineer",
    name: "Dara",
    role: "Database Architect",
    emoji: "📊",
    description: "Master database architect & reliability engineer. Schema design, ETL, query optimization and migrations.",
    color: "bg-emerald-500",
    skills: ["SQL", "ETL", "Schema Design", "Migrations", "Supabase"],
    signature: "— Dara, arquitetando dados 🗄️",
  },
  {
    id: "analyst",
    name: "Atlas",
    role: "Strategic Analyst",
    emoji: "🔍",
    description: "Insightful analyst & strategic ideation partner. Market research, competitive analysis and structured brainstorming.",
    color: "bg-amber-500",
    skills: ["Market Research", "Competitive Analysis", "Discovery", "Reports"],
    signature: "— Atlas, investigando a verdade 🔎",
  },
  {
    id: "sm",
    name: "River",
    role: "Scrum Master",
    emoji: "🌊",
    description: "Technical scrum master & story preparation specialist. Crystal-clear stories, sprint management and impediment removal.",
    color: "bg-yellow-500",
    skills: ["Scrum", "Stories", "Sprint Planning", "Facilitation"],
    signature: "— River, removendo obstáculos 🌊",
  },
  {
    id: "ux-design-expert",
    name: "Uma",
    role: "UX/UI Designer",
    emoji: "🎨",
    description: "UX/UI designer & design system architect. Atomic Design, user research, wireframes and accessible components.",
    color: "bg-pink-500",
    skills: ["UI Design", "UX Research", "Atomic Design", "Accessibility"],
    signature: "— Uma, desenhando com empatia 💝",
  },
  {
    id: "aios-master",
    name: "Orion",
    role: "Framework Orchestrator",
    emoji: "👑",
    description: "Master orchestrator & framework developer. Creates agents, workflows and orchestrates the entire AIOS system.",
    color: "bg-indigo-500",
    skills: ["AIOS", "Orchestration", "Workflows", "Agents"],
    signature: "— Orion, orquestrando o sistema 🎯",
  },
  {
    id: "squad-creator",
    name: "Craft",
    role: "Squad Architect",
    emoji: "🏗️",
    description: "Squad architect & builder. Creates structured squads, validates against schemas and manages agent distribution.",
    color: "bg-slate-500",
    skills: ["Team Building", "Squads", "Task Architecture", "Validation"],
    signature: "— Craft, sempre estruturando 🏗️",
  },
];

// Suggested prompts per agent
export const agentSuggestions: Record<string, string[]> = {
  dev: [
    "Crie um componente React de login com validação",
    "Refatore esse código para usar Clean Architecture",
    "Como implementar WebSocket com Next.js?",
  ],
  qa: [
    "Crie um plano de testes para o fluxo de checkout",
    "Quais edge cases devo testar nessa feature?",
    "Review esse código e sugira melhorias de qualidade",
  ],
  architect: [
    "Projete a arquitetura para um sistema de pagamentos",
    "Quais trade-offs entre REST e GraphQL pra esse caso?",
    "Como escalar esse monolito para microserviços?",
  ],
  pm: [
    "Crie um PRD para o sistema de notificações",
    "Priorize essas 5 features usando RICE",
    "Monte um roadmap trimestral para o produto",
  ],
  po: [
    "Escreva user stories para o módulo de cadastro",
    "Defina critérios de aceite para essa feature",
    "Organize o backlog por valor de negócio",
  ],
  devops: [
    "Configure CI/CD com GitHub Actions e Docker",
    "Como otimizar o Dockerfile para produção?",
    "Setup de monitoring com alertas de CPU e latência",
  ],
  "data-engineer": [
    "Projete o schema do banco para e-commerce",
    "Otimize essa query SQL que está lenta",
    "Crie um pipeline ETL para analytics",
  ],
  analyst: [
    "Faça uma análise competitiva do mercado de SaaS",
    "Quais métricas monitorar para Product-Market Fit?",
    "Brainstorming de features para retenção de usuários",
  ],
  sm: [
    "Crie a próxima user story do backlog",
    "Facilite a retrospectiva da sprint",
    "Identifique impedimentos no fluxo atual",
  ],
  "ux-design-expert": [
    "Audite o design system atual e sugira melhorias",
    "Crie wireframes para o fluxo de onboarding",
    "Quais princípios de acessibilidade aplicar aqui?",
  ],
  "aios-master": [
    "Configure o framework AIOS para esse projeto",
    "Qual workflow usar para essa feature?",
    "Orquestre o squad para essa entrega",
  ],
  "squad-creator": [
    "Monte um squad para desenvolvimento fullstack",
    "Qual a composição ideal para um MVP?",
    "Crie um squad de discovery com 3 agentes",
  ],
};

// Start with empty conversations - real conversations via Claude API
export const mockConversations: Conversation[] = [];
