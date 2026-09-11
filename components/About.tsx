"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./Reveal";
import type { SiteData } from "@/lib/types";

const PALAVRAS = ["DESIGN", "DATA", "AUTOMATION"];

export function About({ data }: { data: SiteData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden py-[clamp(72px,12vw,150px)]">
      <div className="mx-auto max-w-shell px-[var(--pad)]">
        <Reveal>
          <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
            <span className="h-px w-6 flex-none bg-brand" />
            Sobre
          </p>
        </Reveal>
        <Reveal delay={0.09}>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2.2rem,6.4vw,4.4rem)] font-semibold leading-[.95] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.about.title}
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-[52ch] text-muted">{data.about.description}</p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-2">
        {PALAVRAS.map((palavra, i) => (
          <BigWord key={palavra} word={palavra} index={i} p={scrollYProgress} />
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-shell gap-8 px-[var(--pad)] sm:grid-cols-3">
        {data.about.pillars.map((pilar, i) => (
          <Reveal key={pilar.id} delay={i * 0.09}>
            <div className="border-t border-white/12 pt-5">
              <h3 className="m-0 mb-2 text-[1.1rem] font-semibold">{pilar.title}</h3>
              <p className="m-0 max-w-[30ch] text-[.95rem] text-muted">{pilar.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BigWord({ word, index, p }: { word: string; index: number; p: any }) {
  const inicio = 0.15 + index * 0.12;
  const opacity = useTransform(p, [inicio, inicio + 0.14], [0.12, 1]);
  const x = useTransform(p, [inicio, inicio + 0.2], [index % 2 === 0 ? -60 : 60, 0]);

  return (
    <motion.p
      style={{ opacity, x, fontVariationSettings: '"wdth" 120' }}
      className="m-0 whitespace-nowrap px-[var(--pad)] text-[clamp(2.6rem,13vw,10rem)] font-bold leading-[.86] tracking-[-.05em]"
    >
      {word}
    </motion.p>
  );
}
