import { Splash } from "@/components/Splash";
import { Navbar } from "@/components/Navbar";
import { Rail } from "@/components/ui/rail";
import { Hero } from "@/components/Hero";
import { Symptoms } from "@/components/Symptoms";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Limits } from "@/components/Limits";
import { Tools } from "@/components/Tools";
import { Process } from "@/components/Process";
import { Audience } from "@/components/Audience";
import { Faq } from "@/components/Faq";
import { Identify } from "@/components/Identify";
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

      {/* clarao unico, atras da abertura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80svh]"
        style={{
          background:
            "radial-gradient(70% 55% at 22% 0%, rgb(var(--brand)/.16), transparent 70%)",
        }}
      />

      <main className="relative mx-auto max-w-shell px-[var(--pad)] pt-[72px]">
        {/* a espinha atravessa a pagina inteira: cada secao e uma estacao */}
        <Rail>
          <Hero data={data} />
          <Symptoms data={data} />
          <Services data={data} />
          <Pricing data={data} />
          <Tools data={data} />
          <Process data={data} />
          <Limits data={data} />
          <Audience data={data} />
          <Faq data={data} />
          <Identify data={data} />
          <Contact data={data} />
        </Rail>
      </main>

      <Footer data={data} />
      <FloatingWhatsApp data={data} />
    </div>
  );
}
