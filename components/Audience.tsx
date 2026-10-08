"use client";

import { Check, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * Dizer para quem NAO serve e o que torna o "para quem serve" acreditavel.
 * Quem se reconhece na coluna da direita se poupa, e poupa voce.
 */
export function Audience({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const { fits, doesNotFit } = data.audience;

  const coluna = (
    rotulo: string,
    itens: string[],
    tipo: "serve" | "naoServe",
    delay: number
  ) => (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay }}
      className={
        "rounded-xl border p-6 sm:p-7 " +
        (tipo === "serve"
          ? "border-brand/35 bg-brand/[.06]"
          : "border-white/10 bg-white/[.02]")
      }
    >
      <h3 className="m-0 mb-6 text-[.95rem] font-semibold text-paper">{rotulo}</h3>
      <ul className="m-0 grid list-none gap-4 p-0">
        {itens.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[.98rem]">
            <span
              className={
                "mt-[.1em] grid h-5 w-5 flex-none place-items-center rounded-full " +
                (tipo === "serve" ? "bg-brand text-white" : "bg-white/10 text-muted")
              }
            >
              {tipo === "serve" ? (
                <Check size={12} strokeWidth={3} />
              ) : (
                <X size={12} strokeWidth={3} />
              )}
            </span>
            <span className={tipo === "serve" ? "text-paper" : "text-muted"}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <Station label="Para quem" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.audience.title}</StationTitle>

      <div className="mt-11 grid gap-4 lg:grid-cols-2">
        {coluna(fits.label, fits.items, "serve", 0)}
        {coluna(doesNotFit.label, doesNotFit.items, "naoServe", 0.08)}
      </div>
    </Station>
  );
}
