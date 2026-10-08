"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { BlackHole } from "./ui/black-hole";
import { TextRoll } from "./ui/text-roll";
import { MagneticLink } from "./MagneticButton";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/**
 * Divide o titulo em tres partes: antes do destaque, o destaque, depois.
 * O destaque recebe um bloco azul atras. Se o texto do destaque nao
 * existir dentro do titulo, o titulo e renderizado inteiro, sem bloco.
 */
function dividirTitulo(titulo: string, destaque: string) {
  if (!destaque) return { antes: titulo, marcado: "", depois: "" };
  const i = titulo.indexOf(destaque);
  if (i === -1) return { antes: titulo, marcado: "", depois: "" };
  return {
    antes: titulo.slice(0, i),
    marcado: destaque,
    depois: titulo.slice(i + destaque.length),
  };
}

export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);
  const { antes, marcado, depois } = dividirTitulo(data.hero.title, data.hero.highlight);

  const entra = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-[124px] md:min-h-svh"
    >
      {data.hero.blackHole && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:w-[58%]">
            <BlackHole className="h-full w-full" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[52%] bg-gradient-to-r from-ink via-ink/85 to-transparent lg:block"
          />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-shell px-[var(--pad)]">
        <motion.p
          {...entra(0)}
          className="m-0 mb-7 flex items-center gap-3 text-[.82rem] tracking-[.18em] text-muted"
        >
          <span className="h-px w-7 flex-none bg-brand" />
          {data.brand.slogan}
        </motion.p>

        <motion.h1
          {...entra(0.1)}
          className="m-0 mb-7 max-w-[14ch] text-[clamp(2.6rem,8.6vw,6rem)] font-semibold leading-[1.02] tracking-[-.045em]"
          style={{ fontVariationSettings: '"wdth" 110' }}
        >
          {antes}
          {marcado && (
            <span className="box-decoration-clone bg-brand px-[.18em] py-[.02em] text-white">
              {marcado}
            </span>
          )}
          {depois}
        </motion.h1>

        <motion.p
          {...entra(0.2)}
          className="m-0 mb-9 max-w-[44ch] text-[1.02rem] text-muted sm:text-[1.14rem]"
        >
          {data.hero.description}
        </motion.p>

        <motion.div {...entra(0.3)} className="mb-10 flex flex-wrap gap-2.5">
          {data.hero.badges.map((selo) => (
            <span
              key={selo}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.03] py-2 pl-2.5 pr-4 text-[.82rem] text-paper"
            >
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand">
                <Check size={12} strokeWidth={3} className="text-white" />
              </span>
              {selo}
            </span>
          ))}
        </motion.div>

        <motion.div {...entra(0.38)} className="flex flex-wrap gap-3.5">
          <MagneticLink
            href={wa}
            external
            className="w-full bg-brand text-white hover:brightness-110 hover:shadow-[0_14px_44px_-14px_rgb(var(--brand)/.9)] sm:w-auto"
          >
            <TextRoll>{data.hero.primaryCta}</TextRoll> <span aria-hidden>→</span>
          </MagneticLink>
          <MagneticLink
            href="#servicos"
            className="w-full border border-white/25 text-paper hover:border-brand hover:bg-brand/10 sm:w-auto"
          >
            <TextRoll>{data.hero.secondaryCta}</TextRoll>
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
}
