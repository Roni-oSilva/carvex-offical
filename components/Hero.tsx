"use client";

import { motion, useReducedMotion } from "motion/react";
import { TextRoll } from "./ui/text-roll";
import { MagneticLink } from "./MagneticButton";
import { Station } from "./ui/rail";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/**
 * A abertura. Uma afirmacao, uma explicacao, e a frase que separa a
 * CARVEX de qualquer agencia: quem faz ja viveu o problema do cliente.
 */
export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  const entra = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <Station id="inicio" className="pb-[clamp(72px,11vw,150px)] pt-[clamp(56px,9vw,110px)]">
      <motion.p
        {...entra(0)}
        className="relative m-0 mb-8 flex items-center gap-3 text-[.82rem] text-muted"
      >
        <span
          aria-hidden
          className="absolute left-[-32px] h-[9px] w-[9px] rotate-45 bg-brand sm:left-[-52px]"
        />
        {data.hero.label}
      </motion.p>

      <motion.h1
        {...entra(0.08)}
        className="m-0 max-w-[16ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-semibold leading-[1] tracking-[-.04em]"
        style={{ fontVariationSettings: '"wdth" 102' }}
      >
        {data.hero.title}
      </motion.h1>

      <motion.p
        {...entra(0.16)}
        className="m-0 mt-8 max-w-[52ch] text-[1.06rem] text-muted sm:text-[1.2rem]"
      >
        {data.hero.description}
      </motion.p>

      <motion.p
        {...entra(0.24)}
        className="m-0 mt-6 max-w-[46ch] border-l-2 border-brand pl-5 text-[1rem] text-paper sm:text-[1.08rem]"
      >
        {data.hero.reinforcement}
      </motion.p>

      <motion.div {...entra(0.32)} className="mt-11 flex flex-wrap gap-3">
        <MagneticLink
          href={wa}
          external
          className="w-full bg-brand text-white hover:brightness-110 hover:shadow-[0_14px_44px_-14px_rgb(var(--brand)/.9)] sm:w-auto"
        >
          <TextRoll>{data.hero.primaryCta}</TextRoll> <span aria-hidden>→</span>
        </MagneticLink>
        <MagneticLink
          href="#servicos"
          className="w-full border border-white/20 text-paper hover:border-brand hover:bg-brand/10 sm:w-auto"
        >
          <TextRoll>{data.hero.secondaryCta}</TextRoll>
        </MagneticLink>
      </motion.div>
    </Station>
  );
}
