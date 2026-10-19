import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CARVEX — Technology, refined.",
  description:
    "Landing Pages, Business Intelligence e Automacao para empresas que querem crescer com tecnologia.",
  openGraph: {
    title: "CARVEX — Technology, refined.",
    description:
      "Landing Pages, Business Intelligence e Automacao para empresas que querem crescer com tecnologia.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0A0618",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/*
          Inter Tight (mesma familia dos outros sites CARVEX).
          Carregada por link em vez de next/font para nao depender de
          acesso ao Google Fonts durante o build.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-[17px] leading-relaxed">{children}</body>
    </html>
  );
}
