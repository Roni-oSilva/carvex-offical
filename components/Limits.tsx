"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * O que a CARVEX nao faz. E a secao que mais constroi confianca no site,
 * justamente porque trabalha contra a venda.
 */
export function Limits({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const itens = data.limits.items;
  if (!itens.length) return null;

  return (
    <Station label="Limites" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.limits.title}</StationTitle>
      <p className="mt-6 max-w-[52ch] text-muted">{data.limits.description}</p>

      <ul className="m-0 mt-11 grid list-none gap-0 p-0 border-t border-white/10">
        {itens.map((frase, i) => (
          <motion.li
            key={frase}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex items-start gap-4 border-b border-white/10 py-5"
          >
            <span
              aria-hidden
              className="mt-[.45em] h-px w-5 flex-none bg-muted/50"
            />
            <span className="max-w-[62ch] text-[1rem] text-paper">{frase}</span>
          </motion.li>
        ))}
      </ul>
    </Station>
  );
}
