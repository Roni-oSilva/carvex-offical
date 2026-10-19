"use client";

import { motion, useReducedMotion } from "motion/react";
import { TextRoll } from "./ui/text-roll";
import { MagneticLink } from "./MagneticButton";
import { Station } from "./ui/rail";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/**
 * A abertura, no mesmo padrao dos outros sites CARVEX: painel grande com
 * degrade, etiqueta em pilula, titulo com a ultima frase em destaque,
 * botoes em pilula e etiquetas flutuantes.
 */
export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  const entra = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // ultima frase do titulo fica em azul claro
  const palavras = data.hero.title.split(" ");
  const corte = Math.max(palavras.length - 4, 1);
  const inicio = palavras.slice(0, corte).join(" ");
  const destaque = palavras.slice(corte).join(" ");

  const flutuantes = data.services.items
    .filter((s) => s.active)
    .map((s) => s.shortName);
  const posicoes = [
    "right-[6%] top-[14%] rotate-[-6deg]",
    "right-[3%] top-[44%] rotate-[4deg]",
    "right-[14%] top-[72%] rotate-[-3deg]",
  ];

  return (
    <Station id="inicio" className="pb-[clamp(56px,9vw,120px)] pt-[clamp(24px,4vw,48px)]">
      <span
        aria-hidden
        className="absolute left-[-32px] top-12 h-[9px] w-[9px] rotate-45 bg-brand sm:left-[-52px]"
      />

      <div
        className="relative overflow-hidden rounded-panel border border-white/15 px-[clamp(22px,5vw,72px)] py-[clamp(36px,6vw,92px)] shadow-[0_40px_120px_-40px_rgb(var(--brand)/.7)]"
        style={{
          background:
            "radial-gradient(60% 80% at 85% 20%, rgb(var(--brand)/.55), transparent 70%), linear-gradient(135deg, rgb(var(--brand-deep)) 0%, rgb(var(--brand)) 100%)",
        }}
      >
        {/* aneis decorativos */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-white/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-[240px] w-[240px] rounded-full border border-white/10"
        />

        <motion.p
          {...entra(0)}
          className="relative m-0 mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[.82rem] font-semibold text-white backdrop-blur"
        >
          <span aria-hidden className="h-2 w-2 rounded-full bg-white" />
          {data.hero.label}
        </motion.p>

        <motion.h1
          {...entra(0.08)}
          className="relative m-0 max-w-[15ch] text-[clamp(2.4rem,6.4vw,4.9rem)] font-bold leading-[1] tracking-[-.03em]"
        >
          {inicio} <span className="text-[#bfe8ff]">{destaque}</span>
        </motion.h1>

        <motion.p
          {...entra(0.16)}
          className="relative m-0 mt-7 max-w-[46ch] text-[1.06rem] text-white/85 sm:text-[1.2rem]"
        >
          {data.hero.description}
        </motion.p>

        <motion.p
          {...entra(0.24)}
          className="relative m-0 mt-5 max-w-[44ch] border-l-2 border-white/60 pl-5 text-[1rem] text-white sm:text-[1.08rem]"
        >
          {data.hero.reinforcement}
        </motion.p>

        <motion.div {...entra(0.32)} className="relative mt-10 flex flex-wrap gap-3">
          <MagneticLink
            href={wa}
            external
            className="w-full bg-white font-bold text-[rgb(var(--brand-deep))] hover:shadow-[0_14px_44px_-14px_rgba(255,255,255,.8)] sm:w-auto"
          >
            <TextRoll>{data.hero.primaryCta}</TextRoll> <span aria-hidden>→</span>
          </MagneticLink>
          <MagneticLink
            href="#servicos"
            className="w-full border-2 border-white/50 font-semibold text-white hover:bg-white/10 sm:w-auto"
          >
            <TextRoll>{data.hero.secondaryCta}</TextRoll>
          </MagneticLink>
        </motion.div>

        {/* etiquetas flutuantes (so em telas grandes) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
          {flutuantes.slice(0, 3).map((nome, i) => (
            <motion.span
              key={nome}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -9, 0] }}
              transition={
                reduce
                  ? undefined
                  : {
                      opacity: { duration: 0.6, delay: 0.5 + i * 0.12 },
                      y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 },
                    }
              }
              className={`absolute ${posicoes[i]} rounded-full bg-white px-6 py-3 text-[1.05rem] font-bold text-[rgb(var(--brand-deep))] shadow-[0_18px_40px_-14px_rgba(0,20,60,.6)]`}
            >
              {nome}
            </motion.span>
          ))}
        </div>
      </div>
    </Station>
  );
}
