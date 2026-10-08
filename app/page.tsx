import { Splash } from "@/components/Splash";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
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
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <Services data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
      <FloatingWhatsApp data={data} />
    </div>
  );
}
