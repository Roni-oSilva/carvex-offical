import type { SiteData } from "./types";

/**
 * Conteudo padrao do INDEX.
 * Serve como fallback quando o Supabase ainda nao foi configurado
 * e como seed inicial do banco.
 */
export const defaultSiteData: SiteData = {
  brand: {
    name: "CARVEX",
    slogan: "Technology, refined.",
    logoUrl: "",
    faviconUrl: "",
  },
  theme: {
    primary: "#0868F7",
    background: "#02050A",
    text: "#FFFFFF",
    accent: "#9CA8BA",
  },
  hero: {
    title: "Transformamos ideias em tecnologia.",
    description:
      "Criamos experiencias digitais, inteligencia para seus dados e automacoes que fazem seu negocio avancar.",
    primaryCta: "Falar com a CARVEX",
    secondaryCta: "Conhecer a CARVEX",
    blackHole: true,
  },
  services: {
    title: "E aqui que entramos.",
    description: "Tres frentes, um objetivo: tirar o atrito do caminho.",
    items: [
      {
        id: "landing-pages",
        number: "01",
        title: "Landing Pages",
        description: "Experiencias digitais que transformam atencao em oportunidade.",
        icon: "Gem",
        visual: "landing" as const,
        tags: ["Design", "Conversao", "Performance"],
        whatsappMessage: "Ola, CARVEX! Tenho interesse em criar uma Landing Page.",
        active: true,
        order: 0,
      },
      {
        id: "business-intelligence",
        number: "02",
        title: "Business Intelligence",
        description: "Dados organizados para decisoes mais inteligentes.",
        icon: "BarChart3",
        visual: "dashboard" as const,
        tags: ["Dados", "Dashboards", "Indicadores"],
        whatsappMessage:
          "Ola, CARVEX! Tenho interesse em uma solucao de Business Intelligence.",
        active: true,
        order: 1,
      },
      {
        id: "automacao",
        number: "03",
        title: "Automacao",
        description: "Processos inteligentes que trabalham por voce.",
        icon: "Workflow",
        visual: "workflow" as const,
        tags: ["Automacao", "Integracoes", "IA"],
        whatsappMessage: "Ola, CARVEX! Tenho interesse em automacao.",
        active: true,
        order: 2,
      },
    ],
  },
  process: {
    title: "Da ideia ao resultado.",
    description: "Um metodo curto, sem etapas que nao entregam nada.",
    steps: [
      {
        id: "entender",
        number: "01",
        title: "Entender",
        description: "Escutamos o problema antes de propor a solucao.",
        active: true,
        order: 0,
      },
      {
        id: "projetar",
        number: "02",
        title: "Projetar",
        description: "Desenhamos o caminho mais curto ate o resultado.",
        active: true,
        order: 1,
      },
      {
        id: "construir",
        number: "03",
        title: "Construir",
        description: "Entregamos rapido, sem abrir mao do acabamento.",
        active: true,
        order: 2,
      },
      {
        id: "lapidar",
        number: "04",
        title: "Lapidar",
        description: "Refinamos ate restar so o que gera valor.",
        active: true,
        order: 3,
      },
    ],
  },
  impact: {
    line1: "Nao adicionamos complexidade.",
    line2: "Lapidamos.",
    description: "",
    imageUrl: "",
    active: true,
  },
  about: {
    title: "Tecnologia com proposito.",
    description:
      "Design, dados e automacao trabalhando juntos para transformar ideias em resultados.",
    pillars: [
      { id: "design", title: "Design", description: "Interfaces pensadas para pessoas.", icon: "Gem" },
      { id: "dados", title: "Dados", description: "Informacao transformada em clareza.", icon: "LineChart" },
      { id: "automacao", title: "Automacao", description: "Processos trabalhando por voce.", icon: "Workflow" },
    ],
  },
  cta: {
    title: "Vamos construir algo extraordinario?",
    description: "Conte-nos o que voce precisa.",
    buttonText: "Falar com a CARVEX",
  },
  contact: {
    title: "Fale direto com a gente.",
    whatsapp: "5591900000000",
    email: "contato@carvex.com.br",
    instagram: "carvex",
    defaultMessage: "Ola, CARVEX! Gostaria de conhecer os servicos.",
  },
  story: {
    line1: "Seu negocio gera complexidade.",
    line2: "A tecnologia certa transforma tudo.",
  },
  identify: {
    title: "O que esta travando seu negocio?",
    options: [
      {
        id: "presenca",
        label: "Preciso de uma presenca digital melhor.",
        whatsappMessage: "Ola, CARVEX! Preciso de uma presenca digital melhor.",
      },
      {
        id: "clareza",
        label: "Tenho dados, mas nao tenho clareza.",
        whatsappMessage: "Ola, CARVEX! Tenho dados, mas nao tenho clareza sobre eles.",
      },
      {
        id: "repetitivo",
        label: "Tenho processos repetitivos.",
        whatsappMessage: "Ola, CARVEX! Tenho processos repetitivos que quero automatizar.",
      },
      {
        id: "ideia",
        label: "Tenho uma ideia e nao sei por onde comecar.",
        whatsappMessage: "Ola, CARVEX! Tenho uma ideia e nao sei por onde comecar.",
      },
    ],
  },
  footer: {
    text: "Technology, refined.",
    copyright: "2026 CARVEX. Todos os direitos reservados.",
  },
  visibility: {
    story: true,
    services: true,
    process: true,
    impact: true,
    about: true,
    identify: true,
    cta: true,
    contact: true,
  },
};

/** Mescla o que veio do banco com o default, para nunca quebrar se faltar campo. */
export function mergeSiteData(partial: Partial<SiteData> | null | undefined): SiteData {
  if (!partial) return defaultSiteData;
  const d = defaultSiteData;
  return {
    brand: { ...d.brand, ...(partial.brand ?? {}) },
    theme: { ...d.theme, ...(partial.theme ?? {}) },
    hero: { ...d.hero, ...(partial.hero ?? {}) },
    services: {
      ...d.services,
      ...(partial.services ?? {}),
      items: partial.services?.items ?? d.services.items,
    },
    process: {
      ...d.process,
      ...(partial.process ?? {}),
      steps: partial.process?.steps ?? d.process.steps,
    },
    impact: { ...d.impact, ...(partial.impact ?? {}) },
    about: {
      ...d.about,
      ...(partial.about ?? {}),
      pillars: partial.about?.pillars ?? d.about.pillars,
    },
    cta: { ...d.cta, ...(partial.cta ?? {}) },
    story: { ...d.story, ...(partial.story ?? {}) },
    identify: {
      ...d.identify,
      ...(partial.identify ?? {}),
      options: partial.identify?.options ?? d.identify.options,
    },
    visibility: { ...d.visibility, ...(partial.visibility ?? {}) },
    contact: { ...d.contact, ...(partial.contact ?? {}) },
    footer: { ...d.footer, ...(partial.footer ?? {}) },
  };
}
