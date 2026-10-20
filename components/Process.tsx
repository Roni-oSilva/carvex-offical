"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ProcessStep, SiteData } from "@/lib/types";

/** So a primeira frase de cada etapa: o resto vira conversa. */
const primeiraFrase = (t: string) => (t.split(/(?<=[.!?])\s/)[0] ?? t).trim();

function Step({ s, i }: { s: ProcessStep; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const chegou = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <div ref={ref} className="relative pl-16 md:pl-0 md:pt-20">
      <motion.span
        className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-2 border-white/20 bg-[#1f0f05] text-[.95rem] font-bold md:left-0"
        animate={
          chegou || reduce
            ? { backgroundColor: "#ea580c", borderColor: "#fdba74", scale: [1, 1.25, 1], boxShadow: "0 0 32px 4px rgba(253,186,116,.55)" }
            : {}
        }
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
      >
        {s.number}
      </motion.span>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={chegou ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="m-0 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-.02em]">{s.title}</h3>
        <p className="m-0 mt-2 max-w-[26ch] text-[1rem] text-white/65">{primeiraFrase(s.description)}</p>
      </motion.div>
    </div>
  );
}

export function Process({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const passos = data.process.steps.filter((s) => s.active);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="processo" className="relative px-[var(--pad)] py-[clamp(70px,10vw,140px)]">
      <div className="mx-auto max-w-shell">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 mb-16 text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-none tracking-[-.035em]"
        >
          Quatro passos. <span className="text-grad">Só isso.</span>
        </motion.h2>

        <div ref={ref} className="relative grid gap-12 md:grid-cols-4 md:gap-6">
          {/* linha: horizontal no desktop, vertical no celular */}
          <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-white/10 md:bottom-auto md:left-6 md:right-6 md:top-6 md:h-px md:w-auto" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-brand to-[#fdba74] md:hidden"
            style={{ scaleY: reduce ? 1 : p }}
          />
          <motion.div
            aria-hidden
            className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-gradient-to-r from-brand to-[#fdba74] md:block"
            style={{ scaleX: reduce ? 1 : p }}
          />
          {passos.map((s, i) => (
            <Step key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
