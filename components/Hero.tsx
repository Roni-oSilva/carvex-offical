"use client";

import { motion, useReducedMotion } from "motion/react";
import { BlackHole } from "./ui/black-hole";
import { TextRoll } from "./ui/text-roll";
import { Badge, Panel, Screen } from "./ui/panel";
import { MagneticLink } from "./MagneticButton";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/**
 * O primeiro painel: azul inteiro, titulo em corpo de poster a esquerda,
 * uma tela escura a direita. O Black Hole fica atras da tela, como textura.
 */
export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  const entra = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div id="inicio" className="px-[var(--pad)] pt-[88px]">
      <Panel
        tone="blue"
        glow
        className="mx-auto grid max-w-shell items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:p-14"
      >
        {data.hero.blackHole && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[52%] opacity-45 lg:block"
          >
            <BlackHole className="h-full w-full" />
          </div>
        )}

        <div>
          <motion.p
            {...entra(0)}
            className="m-0 mb-7 text-[.82rem] tracking-[.2em] text-white/70"
          >
            {data.brand.slogan}
          </motion.p>

          <motion.h1
            {...entra(0.08)}
            className="m-0 max-w-[13ch] text-[clamp(2.4rem,5.4vw,4.3rem)] font-bold leading-[.92] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 104' }}
          >
            {data.hero.title}
          </motion.h1>

          <motion.p
            {...entra(0.16)}
            className="m-0 mb-8 mt-7 max-w-[42ch] text-[1.02rem] text-white/85 sm:text-[1.12rem]"
          >
            {data.hero.description}
          </motion.p>

          <motion.div {...entra(0.24)} className="mb-9 flex flex-wrap gap-2.5">
            {data.hero.badges.map((selo) => (
              <Badge key={selo}>{selo}</Badge>
            ))}
          </motion.div>

          <motion.div {...entra(0.32)} className="flex flex-wrap gap-3">
            <MagneticLink
              href={wa}
              external
              className="w-full bg-white text-ink hover:bg-white/90 sm:w-auto"
            >
              <TextRoll>{data.hero.primaryCta}</TextRoll> <span aria-hidden>→</span>
            </MagneticLink>
            <MagneticLink
              href="#servicos"
              className="w-full ring-1 ring-inset ring-white/35 hover:bg-white/10 sm:w-auto"
            >
              <TextRoll>{data.hero.secondaryCta}</TextRoll>
            </MagneticLink>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Screen>
            <HeroScreen services={data.services.items.filter((s) => s.active)} />
          </Screen>
        </motion.div>
      </Panel>
    </div>
  );
}

/** Mock estatico: uma visao geral do que a CARVEX entrega. */
function HeroScreen({ services }: { services: SiteData["services"]["items"] }) {
  const barras = [28, 41, 34, 52, 44, 61, 50, 68, 58, 82, 71, 90];

  return (
    <div className="grid gap-3 text-paper">
      <div className="flex items-center gap-2 border-b border-white/8 pb-3">
        <span className="h-2 w-2 rotate-45 bg-brand" />
        <span className="text-[.74rem] tracking-[.16em] text-muted">CARVEX</span>
        <span className="ml-auto text-[.7rem] text-muted/70">exemplo</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/[.03] p-3 ring-1 ring-inset ring-white/8">
          <p className="m-0 text-[.66rem] text-muted">Tempo economizado</p>
          <p className="m-0 mt-1 text-[1.25rem] font-semibold tabular-nums">18h / mês</p>
        </div>
        <div className="rounded-lg bg-white/[.03] p-3 ring-1 ring-inset ring-white/8">
          <p className="m-0 text-[.66rem] text-muted">Processos no ar</p>
          <p className="m-0 mt-1 text-[1.25rem] font-semibold tabular-nums">12</p>
        </div>
      </div>

      <div className="rounded-lg bg-white/[.03] p-3 ring-1 ring-inset ring-white/8">
        <div className="flex h-16 items-end gap-1.5">
          {barras.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-brand/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-1.5">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-2.5 rounded-lg bg-white/[.03] px-3 py-2.5 ring-1 ring-inset ring-white/8"
          >
            <span className="h-1.5 w-1.5 flex-none rotate-45 bg-brand" />
            <span className="text-[.82rem]">{s.shortName}</span>
            <span className="ml-auto text-[.7rem] text-muted">ativo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
