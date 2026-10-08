"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import { LandingVisual } from "./visuals/LandingVisual";
import { DashboardVisual } from "./visuals/DashboardVisual";
import { WorkflowVisual } from "./visuals/WorkflowVisual";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Service, SiteData } from "@/lib/types";

/**
 * Cada servico ocupa uma faixa larga: de um lado o que e e o que chega
 * na sua mao, do outro um instrumento que se monta durante o scroll.
 */
export function Services({ data }: { data: SiteData }) {
  const items = data.services.items.filter((s) => s.active);
  if (!items.length) return null;

  return (
    <Station id="servicos" label="O que fazemos" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.services.title}</StationTitle>
      <p className="mt-6 max-w-[54ch] text-muted">{data.services.description}</p>

      <div className="mt-14 grid gap-16 lg:gap-24">
        {items.map((s, i) => (
          <ServiceRow key={s.id} service={s} data={data} index={i} />
        ))}
      </div>
    </Station>
  );
}

function ServiceRow({
  service,
  data,
  index,
}: {
  service: Service;
  data: SiteData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6 }}
      className="grid gap-9 border-t border-white/10 pt-9 lg:grid-cols-[1fr_.92fr] lg:gap-14"
    >
      <div>
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[.8rem] tracking-[.14em] text-brand">
            {service.shortName}
          </span>
          <span className="text-[.8rem] text-muted">
            normalmente {service.leadTime}
          </span>
        </div>

        <h3
          className="m-0 max-w-[17ch] text-[clamp(1.5rem,3.2vw,2.2rem)] font-semibold leading-[1.05] tracking-[-.03em]"
          style={{ fontVariationSettings: '"wdth" 102' }}
        >
          {service.title}
        </h3>

        <p className="mt-5 max-w-[46ch] text-[1rem] text-muted sm:text-[1.06rem]">
          {service.description}
        </p>

        <p className="mb-3 mt-9 text-[.82rem] tracking-[.1em] text-muted">
          O que chega na sua mão
        </p>
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-[.98rem] text-paper">
              <span
                aria-hidden
                className="mt-[.5em] h-1.5 w-1.5 flex-none rotate-45 bg-brand"
              />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={generateWhatsAppLink(data.contact.whatsapp, service.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-white/25 pb-1.5 text-[.98rem] transition-colors hover:border-brand"
          >
            Falar sobre {service.shortName}
            <span
              aria-hidden
              className="text-brand transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>

        </div>
      </div>

      {service.visual !== "none" && (
        <div className="lg:pt-2">
          <div className="rounded-xl border border-white/10 bg-gradient-to-b from-deep/60 to-ink p-3 sm:p-4">
            {service.visual === "landing" && <LandingVisual p={scrollYProgress} />}
            {service.visual === "dashboard" && <DashboardVisual p={scrollYProgress} />}
            {service.visual === "workflow" && <WorkflowVisual p={scrollYProgress} />}
          </div>
          <p className="mt-3 text-[.78rem] text-muted/70">
            Ilustração do tipo de entrega, não de um cliente real.
          </p>
        </div>
      )}
    </motion.div>
  );
}
