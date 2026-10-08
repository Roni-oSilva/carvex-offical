"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * As etapas sao mesmo uma sequencia — uma depende da anterior —
 * entao os numeros aqui carregam informacao, nao enfeite.
 */
export function Process({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const steps = data.process.steps.filter((s) => s.active);
  if (!steps.length) return null;

  return (
    <Station id="processo" label="Como funciona" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.process.title}</StationTitle>
      <p className="mt-6 max-w-[54ch] text-muted">{data.process.description}</p>

      <ol className="m-0 mt-12 grid list-none gap-0 p-0">
        {steps.map((s, i) => (
          <motion.li
            key={s.id}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className="grid gap-x-7 gap-y-3 border-t border-white/10 py-7 sm:grid-cols-[auto_1fr_1.5fr] sm:items-baseline"
          >
            <span className="text-[.9rem] tabular-nums text-brand">{s.number}</span>
            <h3
              className="m-0 text-[clamp(1.3rem,2.6vw,1.75rem)] font-semibold tracking-[-.02em]"
              style={{ fontVariationSettings: '"wdth" 102' }}
            >
              {s.title}
            </h3>
            <p className="m-0 max-w-[48ch] text-[.98rem] text-muted">{s.description}</p>
          </motion.li>
        ))}
      </ol>
    </Station>
  );
}
