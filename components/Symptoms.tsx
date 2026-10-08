"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * O reconhecimento. Antes de dizer o que a CARVEX vende, mostrar que
 * ela conhece a rotina de quem vai ler. Cada frase e uma cena concreta.
 */
export function Symptoms({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const items = data.symptoms.items;
  if (!items.length) return null;

  return (
    <Station label="O problema" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.symptoms.title}</StationTitle>

      <ul className="mt-10 grid list-none gap-px border-y border-white/10 p-0 sm:grid-cols-2">
        {items.map((frase, i) => (
          <motion.li
            key={frase}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
            className="relative flex items-start gap-3.5 py-5 pr-4 text-[1rem] text-paper shadow-[0_1px_0_rgba(255,255,255,.08)] sm:text-[1.05rem]"
          >
            <span
              aria-hidden
              className="mt-[.55em] h-1.5 w-1.5 flex-none rotate-45 bg-brand"
            />
            {frase}
          </motion.li>
        ))}
      </ul>
    </Station>
  );
}
