export type Service = {
  id: string;
  title: string;
  shortName: string;
  description: string;
  badges: string[];
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

export type IdentifyOption = {
  id: string;
  label: string;
  whatsappMessage: string;
};

export type SiteData = {
  brand: { name: string; slogan: string; logoUrl: string };
  theme: { primary: string; background: string; text: string; accent: string };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
    blackHole: boolean;
  };
  services: { title: string; description: string; items: Service[] };
  process: { title: string; description: string; steps: ProcessStep[] };
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
