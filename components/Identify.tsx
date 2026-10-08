"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/** Cada frase abre o WhatsApp com o assunto ja escrito. */
export function Identify({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const options = data.identify.options;
  if (!options.length) return null;

  return (
    <Station label="Começar" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.identify.title}</StationTitle>
      <p className="mt-6 max-w-[50ch] text-muted">{data.identify.description}</p>

      <div className="mt-11 grid gap-3">
        {options.map((o, i) => (
          <motion.a
            key={o.id}
            href={generateWhatsAppLink(data.contact.whatsapp, o.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group flex min-h-[78px] items-center justify-between gap-5 rounded-xl border border-white/12 bg-white/[.02] px-5 py-5 transition-colors hover:border-brand/60 hover:bg-brand/[.08] sm:px-7"
          >
            <span className="text-[1rem] font-medium text-paper sm:text-[1.14rem]">
              {o.label}
            </span>
            <span
              aria-hidden
              className="flex-none text-brand transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </motion.a>
        ))}
      </div>
    </Station>
  );
}
