"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { TextRoll } from "./ui/text-roll";
import type { SiteData } from "@/lib/types";

/** Desktop: linha horizontal. Mobile: linha vertical. */
export function Process({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const steps = data.process.steps.filter((s) => s.active).sort((a, b) => a.order - b.order);
  if (!steps.length) return null;

  return (
    <section id="processo" className="relative border-t border-white/10 py-[clamp(64px,11vw,150px)]">
      <div className="mx-auto max-w-shell px-[var(--pad)]">
        <Reveal>
          <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
            <span className="h-px w-6 flex-none bg-brand" />
            CARVEX Method
          </p>
        </Reveal>
        <Reveal delay={0.09}>
          <h2
            className="m-0 text-[clamp(2.15rem,6vw,4.2rem)] font-semibold leading-[.95] tracking-[-.035em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.process.title}
          </h2>
        </Reveal>
        {data.process.description && (
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-[54ch] text-muted">{data.process.description}</p>
          </Reveal>
        )}

        <div className="relative mt-14 grid gap-0 pl-7 lg:mt-16 lg:grid-cols-4 lg:gap-5 lg:pl-0">
          {/* trilho */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10 lg:bottom-auto lg:right-0 lg:top-[9px] lg:h-px lg:w-auto">
            <motion.div
              className="w-full bg-brand lg:h-full"
              initial={reduce ? false : { scaleY: 0, scaleX: 0 }}
              whileInView={{ scaleY: 1, scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", transformOrigin: "top left" }}
            />
          </div>

          {steps.map((s, i) => (
            <div key={s.id} className="relative pb-8 last:pb-0 lg:pb-0 lg:pt-[34px]">
              <motion.span
                className="absolute left-[-30px] top-1.5 h-[9px] w-[9px] rotate-45 border border-white/25 bg-ink lg:left-0 lg:top-[5px]"
                initial={reduce ? false : { backgroundColor: "rgba(2,5,10,1)" }}
                whileInView={{ backgroundColor: "rgb(var(--brand))", borderColor: "rgb(var(--brand))" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.28 }}
              />
              <em className="mb-2 block text-[.8rem] not-italic tracking-[.16em] text-muted">
                {s.number}
              </em>
              <h3
                className={
                  "group m-0 font-semibold tracking-[-.02em] " +
                  (i === steps.length - 1
                    ? "text-[clamp(1.9rem,4.4vw,3rem)] text-brand"
                    : "text-[clamp(1.3rem,2.4vw,1.85rem)]")
                }
                style={{ fontVariationSettings: i === steps.length - 1 ? '"wdth" 118' : '"wdth" 108' }}
              >
                <TextRoll>{s.title}</TextRoll>
              </h3>
              <p className="mt-2 max-w-[34ch] text-[.93rem] text-muted lg:max-w-[24ch]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
