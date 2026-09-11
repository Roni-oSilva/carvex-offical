"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LandingVisual } from "./visuals/LandingVisual";
import { DashboardVisual } from "./visuals/DashboardVisual";
import { WorkflowVisual } from "./visuals/WorkflowVisual";
import { Reveal } from "./Reveal";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Service, SiteData } from "@/lib/types";

/**
 * Tres blocos grandes, um por servico. Cada bloco tem seu proprio
 * progresso de scroll conduzindo o numero, o texto e o visual.
 */
export function Services({ data }: { data: SiteData }) {
  const items = data.services.items.filter((s) => s.active).sort((a, b) => a.order - b.order);
  if (!items.length) return null;

  return (
    <section id="servicos" className="relative">
      <div className="mx-auto max-w-shell px-[var(--pad)] pb-4 pt-[clamp(72px,12vw,140px)]">
        <Reveal>
          <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
            <span className="h-px w-6 flex-none bg-brand" />
            Servicos
          </p>
        </Reveal>
        <Reveal delay={0.09}>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2.3rem,7vw,5rem)] font-semibold leading-[.95] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-[48ch] text-muted">{data.services.description}</p>
        </Reveal>
      </div>

      {items.map((s) => (
        <ServiceBlock key={s.id} service={s} data={data} />
      ))}
    </section>
  );
}

function ServiceBlock({ service, data }: { service: Service; data: SiteData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // O bloco ganha destaque no centro e recua nas bordas.
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.35, 1, 1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.97, 1, 1, 0.97]);
  const numY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const numScale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.85, 1, 1, 0.9]);
  const glow = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.5, 0.5, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative border-t border-white/8 py-[clamp(64px,10vw,128px)]"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(760px,120vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle,rgb(var(--brand)/.22),rgb(var(--brand)/.05) 40%,transparent 65%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto grid max-w-shell items-center gap-10 px-[var(--pad)] lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.p
            style={{ y: numY, scale: numScale, fontVariationSettings: '"wdth" 118' }}
            className="m-0 mb-4 origin-left text-[clamp(3.5rem,11vw,8rem)] font-bold leading-none tracking-[-.05em] text-brand/85"
          >
            {service.number}
          </motion.p>

          <h3
            className="m-0 mb-5 text-[clamp(1.9rem,5vw,3.4rem)] font-semibold uppercase leading-[1] tracking-[-.03em]"
            style={{ fontVariationSettings: '"wdth" 108' }}
          >
            {service.title}
          </h3>

          <p className="m-0 mb-8 max-w-[42ch] text-[1.02rem] text-muted sm:text-[1.12rem]">
            {service.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 px-3 py-1.5 text-[.78rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={generateWhatsAppLink(data.contact.whatsapp, service.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-white/20 pb-1.5 text-[.98rem] transition-colors hover:border-brand"
          >
            Falar sobre {service.title.toLowerCase()}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
        </div>

        <div className="lg:pl-4">
          {service.visual === "landing" && <LandingVisual p={scrollYProgress} />}
          {service.visual === "dashboard" && <DashboardVisual p={scrollYProgress} />}
          {service.visual === "workflow" && <WorkflowVisual p={scrollYProgress} />}
        </div>
      </div>
    </motion.div>
  );
}
