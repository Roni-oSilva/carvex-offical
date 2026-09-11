import { Splash } from "@/components/Splash";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Complexity } from "@/components/Complexity";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Impact } from "@/components/Impact";
import { About } from "@/components/About";
import { Identify } from "@/components/Identify";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSiteData } from "@/lib/conteudo";
import { hexToRgbTriplet } from "@/lib/utils";

export default function IndexPage() {
  const data = getSiteData();
  const v = data.visibility;

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
        {/* impacto -> problema -> solucao -> servicos -> metodo -> marca -> contato */}
        <Hero data={data} />
        {v.story && <Complexity data={data} />}
        {v.services && <Services data={data} />}
        {v.process && <Process data={data} />}
        {v.impact && <Impact data={data} />}
        {v.about && <About data={data} />}
        {v.identify && <Identify data={data} />}
        {v.cta && <CTA data={data} />}
        {v.contact && <Contact data={data} />}
      </main>
      <Footer data={data} />
      <FloatingWhatsApp data={data} />
    </div>
  );
}
