import { Splash } from "@/components/Splash";
import { Navbar } from "@/components/Navbar";
import { Background } from "@/components/Background";
import { ScrollBar } from "@/components/ScrollBar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSiteData } from "@/lib/conteudo";
import { hexToRgbTriplet } from "@/lib/utils";

export default function IndexPage() {
  const data = getSiteData();

  const themeVars = {
    "--brand": hexToRgbTriplet(data.theme.primary),
    "--ink": hexToRgbTriplet(data.theme.background),
    "--paper": hexToRgbTriplet(data.theme.text),
    "--muted": hexToRgbTriplet(data.theme.accent),
  } as React.CSSProperties;

  return (
    <div style={themeVars}>
      <Splash brandName={data.brand.name} logoUrl={data.brand.logoUrl} />
      <Background />
      <ScrollBar />
      <Navbar data={data} />

      <main>
        <Hero data={data} />
        <Marquee />
        <Services data={data} />
        <Process data={data} />
        <Cta data={data} />
      </main>

      <Footer data={data} />
      <FloatingWhatsApp data={data} />
    </div>
  );
}
