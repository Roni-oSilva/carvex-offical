export type Service = {
  id: string;
  shortName: string;
  title: string;
  description: string;
  deliverables: string[];
  leadTime: string;
  visual: "landing" | "dashboard" | "workflow" | "none";
  whatsappMessage: string;
  active: boolean;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  active: boolean;
};

export type ToolGroup = {
  id: string;
  area: string;
  items: string[];
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type IdentifyOption = {
  id: string;
  label: string;
  whatsappMessage: string;
};

export type SiteData = {
  brand: { name: string; slogan: string; logoUrl: string };
  theme: { primary: string; background: string; text: string; accent: string };
  hero: {
    label: string;
    title: string;
    description: string;
    reinforcement: string;
    primaryCta: string;
    secondaryCta: string;
  };
  symptoms: { title: string; items: string[] };
  services: { title: string; description: string; items: Service[] };
  tools: { title: string; description: string; groups: ToolGroup[] };
  process: { title: string; description: string; steps: ProcessStep[] };
  audience: {
    title: string;
    fits: { label: string; items: string[] };
    doesNotFit: { label: string; items: string[] };
  };
  faq: { title: string; items: Faq[] };
  identify: { title: string; description: string; options: IdentifyOption[] };
  contact: {
    title: string;
    description: string;
    whatsapp: string;
    whatsappLabel: string;
    email: string;
    instagram: string;
    defaultMessage: string;
  };
  footer: { text: string; copyright: string };
};
