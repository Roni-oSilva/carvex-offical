"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BlackHole } from "./ui/black-hole";
import { TextRoll } from "./ui/text-roll";
import { MagneticLink } from "./MagneticButton";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // O titulo entra palavra por palavra, com blur.
  const palavras = data.hero.title.split(" ");

  const entra = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[94svh] items-center overflow-hidden pb-24 pt-[132px] md:min-h-svh"
    >
      {data.hero.blackHole && (
        <>
          {/* composicao: o canvas ocupa a metade direita no desktop */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:w-[62%]">
            <BlackHole className="h-full w-full" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[46%] bg-gradient-to-r from-ink via-ink/85 to-transparent lg:block"
          />
        </>
      )}

      <motion.div
        style={{ y: parallax, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-shell px-[var(--pad)]"
      >
        <motion.p
          {...entra(0)}
          className="m-0 mb-6 flex items-center gap-3 text-[.84rem] tracking-[.16em] text-muted"
        >
          <span className="h-px w-7 flex-none bg-brand" />
          {data.brand.slogan}
        </motion.p>

        <h1
          className="m-0 mb-7 max-w-[13ch] text-[clamp(2.7rem,9vw,6.6rem)] font-semibold leading-[.94] tracking-[-.045em]"
          style={{ fontVariationSettings: '"wdth" 110' }}
        >
          {palavras.map((palavra, i) => (
            <motion.span key={`${palavra}-${i}`} {...entra(0.12 + i * 0.13)} className="mr-[.24em] inline-block">
              {palavra}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...entra(0.14 + palavras.length * 0.13)}
          className="m-0 mb-10 max-w-[46ch] text-[1.02rem] text-muted sm:text-[1.16rem]"
        >
          {data.hero.description}
        </motion.p>

        <motion.div
          {...entra(0.24 + palavras.length * 0.13)}
          className="flex flex-wrap gap-3.5"
        >
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
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-[var(--pad)] z-10 flex items-center gap-3 text-[.78rem] text-muted/60"
      >
        <span className="h-px w-9 bg-white/20" />
        Role para comecar
      </motion.div>
    </section>
  );
}
