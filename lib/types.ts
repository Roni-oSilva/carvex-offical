export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  whatsappMessage: string;
  active: boolean;
};

export type SiteData = {
  brand: { name: string; slogan: string; logoUrl: string };
  theme: { primary: string; background: string; text: string; accent: string };
  hero: {
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
    blackHole: boolean;
  };
  services: { title: string; description: string; items: Service[] };
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
