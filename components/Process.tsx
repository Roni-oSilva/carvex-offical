"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Panel } from "./ui/panel";
import { Reveal } from "./Reveal";
import type { SiteData } from "@/lib/types";

/**
 * Painel escuro com a sequencia de trabalho. Os numeros se justificam
 * aqui porque o conteudo e mesmo uma ordem: uma etapa depende da anterior.
 * Desktop: trilho horizontal. Mobile: trilho vertical.
 */
export function Process({ data }: { data: SiteData }) {
  const steps = data.process.steps.filter((s) => s.active);
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  const reduce = useReducedMotion();

  if (!steps.length) return null;

  return (
    <div id="processo" className="px-[var(--pad)] pt-[var(--pad)]">
      <Panel className="mx-auto max-w-shell p-7 sm:p-10 lg:p-14">
        <Reveal>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2rem,5.6vw,3.6rem)] font-bold leading-[.95] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 106' }}
          >
            {data.process.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[46ch] text-muted">{data.process.description}</p>
        </Reveal>

        <div
          ref={ref}
          className="relative mt-12 grid gap-0 pl-7 lg:mt-16 lg:grid-cols-4 lg:gap-6 lg:pl-0"
        >
          {/* trilho */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10 lg:bottom-auto lg:right-0 lg:top-[7px] lg:h-px lg:w-auto">
            <motion.div
              className="h-full w-full origin-top bg-brand lg:origin-left"
              initial={reduce ? false : { scaleY: 0, scaleX: 0 }}
              animate={emVista ? { scaleY: 1, scaleX: 1 } : undefined}
              transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {steps.map((s, i) => (
            <div key={s.id} className="relative pb-9 last:pb-0 lg:pb-0 lg:pt-9">
              <motion.span
                className="absolute left-[-30px] top-1.5 h-[9px] w-[9px] rotate-45 border border-white/25 bg-ink lg:left-0 lg:top-[3px]"
                initial={reduce ? false : { backgroundColor: "rgba(2,5,10,1)" }}
                animate={
                  emVista
                    ? { backgroundColor: "rgb(var(--brand))", borderColor: "rgb(var(--brand))" }
                    : undefined
                }
                transition={{ duration: 0.4, delay: 0.3 + i * 0.26 }}
              />
              <p className="m-0 mb-2 text-[.78rem] tabular-nums text-brand">{s.number}</p>
              <h3
                className="m-0 text-[clamp(1.25rem,2.4vw,1.7rem)] font-semibold tracking-[-.02em]"
                style={{ fontVariationSettings: '"wdth" 104' }}
              >
                {s.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[.93rem] text-muted lg:max-w-[22ch]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
