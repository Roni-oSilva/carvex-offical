export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  whatsappMessage: string;
  /** Qual visual acompanha o servico no scroll. */
  visual: "landing" | "dashboard" | "workflow" | "none";
  active: boolean;
  order: number;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  active: boolean;
  order: number;
};

export type IdentifyOption = {
  id: string;
  label: string;
  whatsappMessage: string;
};

export type Pillar = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type SiteData = {
  brand: { name: string; slogan: string; logoUrl: string; faviconUrl: string };
  theme: { primary: string; background: string; text: string; accent: string };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    blackHole: boolean;
  };
  services: { title: string; description: string; items: Service[] };
  process: { title: string; description: string; steps: ProcessStep[] };
  impact: { line1: string; line2: string; description: string; imageUrl: string; active: boolean };
  about: { title: string; description: string; pillars: Pillar[] };
  cta: { title: string; description: string; buttonText: string };
  contact: {
    title: string;
    whatsapp: string;
    email: string;
    instagram: string;
    defaultMessage: string;
  };
  story: { line1: string; line2: string };
  identify: { title: string; options: IdentifyOption[] };
  footer: { text: string; copyright: string };
  /** Liga e desliga secoes inteiras do index. */
  visibility: {
    story: boolean;
    services: boolean;
    process: boolean;
    impact: boolean;
    about: boolean;
    identify: boolean;
    cta: boolean;
    contact: boolean;
  };
};
