"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Badge, Panel, Screen } from "./ui/panel";
import { LandingVisual } from "./visuals/LandingVisual";
import { DashboardVisual } from "./visuals/DashboardVisual";
import { WorkflowVisual } from "./visuals/WorkflowVisual";
import { Reveal } from "./Reveal";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Service, SiteData } from "@/lib/types";

/**
 * Cada servico e um painel-poster: titulo grande em cima, selos,
 * e a tela escura embaixo com o mockup que se monta durante o scroll.
 * Alternam azul e escuro para dar ritmo a pilha.
 */
export function Services({ data }: { data: SiteData }) {
  const items = data.services.items.filter((s) => s.active);
  if (!items.length) return null;

  return (
    <div id="servicos" className="px-[var(--pad)] pt-[clamp(56px,8vw,112px)]">
      <div className="mx-auto max-w-shell">
        <Reveal>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2rem,5.6vw,3.6rem)] font-bold leading-[.95] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 106' }}
          >
            {data.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[48ch] text-muted">{data.services.description}</p>
        </Reveal>

        <div className="mt-10 grid gap-[var(--pad)] lg:grid-cols-3">
          {items.map((s, i) => (
            <ServicePanel key={s.id} service={s} data={data} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicePanel({
  service,
  data,
  index,
}: {
  service: Service;
  data: SiteData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const azul = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Panel
        tone={azul ? "blue" : "dark"}
        glow={azul}
        className="flex h-full flex-col gap-7 p-6 sm:p-8"
      >
        <div>
          <p
            className={
              "m-0 mb-5 text-[.78rem] tracking-[.18em] " +
              (azul ? "text-white/65" : "text-muted")
            }
          >
            {service.shortName}
          </p>
          <h3
            className="m-0 text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-[.98] tracking-[-.035em]"
            style={{ fontVariationSettings: '"wdth" 104' }}
          >
            {service.title}
          </h3>
          <p
            className={
              "mt-4 max-w-[34ch] text-[.97rem] " + (azul ? "text-white/80" : "text-muted")
            }
          >
            {service.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {service.badges.map((b) => (
            <Badge key={b} tone={azul ? "onBlue" : "onDark"}>
              {b}
            </Badge>
          ))}
        </div>

        {service.visual !== "none" && (
          <Screen className="mt-auto">
            {service.visual === "landing" && <LandingVisual p={scrollYProgress} />}
            {service.visual === "dashboard" && <DashboardVisual p={scrollYProgress} />}
            {service.visual === "workflow" && <WorkflowVisual p={scrollYProgress} />}
          </Screen>
        )}

        <a
          href={generateWhatsAppLink(data.contact.whatsapp, service.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "group inline-flex items-center gap-2 self-start border-b pb-1.5 text-[.95rem] transition-colors " +
            (azul
              ? "border-white/35 text-white hover:border-white"
              : "border-white/20 text-paper hover:border-brand")
          }
        >
          Falar sobre isso
          <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
            →
          </span>
        </a>
      </Panel>
    </motion.div>
  );
}
