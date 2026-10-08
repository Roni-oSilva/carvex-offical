"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * Preco na pagina, antes de alguem precisar perguntar.
 * Quem esconde preco cobra pela cara do cliente — e o visitante sabe disso.
 */
export function Pricing({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const itens = data.pricing.items;
  if (!itens.length) return null;

  return (
    <Station id="precos" label="Preço" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.pricing.title}</StationTitle>
      <p className="mt-6 max-w-[52ch] text-muted">{data.pricing.description}</p>

      <div className="mt-12 border-t border-white/10">
        {itens.map((item, i) => (
          <motion.div
            key={item.id}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="grid gap-x-10 gap-y-3 border-b border-white/10 py-7 sm:grid-cols-[1fr_auto] sm:items-start"
          >
            <div>
              <h3 className="m-0 text-[1.12rem] font-semibold text-paper">{item.name}</h3>
              <p className="m-0 mt-2 max-w-[52ch] text-[.97rem] text-muted">{item.detail}</p>
              {item.note && (
                <p className="m-0 mt-2.5 max-w-[52ch] text-[.84rem] text-muted/70">
                  {item.note}
                </p>
              )}
            </div>
            <p
              className="m-0 text-[1.05rem] font-semibold tabular-nums text-brand sm:whitespace-nowrap sm:text-right sm:text-[1.15rem]"
              style={{ fontVariationSettings: '"wdth" 102' }}
            >
              {item.price}
            </p>
          </motion.div>
        ))}
      </div>

      {data.pricing.footnote && (
        <p className="mt-6 max-w-[52ch] text-[.88rem] text-muted/75">
          {data.pricing.footnote}
        </p>
      )}
    </Station>
  );
}
