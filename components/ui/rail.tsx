"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A espinha: uma linha que atravessa a pagina inteira e se preenche
 * conforme a pessoa rola, com uma cabeca luminosa na ponta.
 *
 * E o unico movimento continuo do site — tudo o mais so se move quando
 * alguem pede. As secoes se penduram nela como estacoes de um processo,
 * que e exatamente o que a CARVEX constroi.
 */
export function Rail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 85%"],
  });
  const preenchimento = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const alturaCabeca = useTransform(preenchimento, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative pl-9 sm:pl-14">
      <div aria-hidden className="absolute bottom-0 left-1 top-0 w-px bg-white/10">
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-brand via-brand to-brand/50"
          style={{ scaleY: preenchimento }}
        />

        {!reduce && (
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_14px_4px_rgb(var(--brand)/.55)]"
            style={{ top: alturaCabeca }}
          />
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Uma estacao presa a espinha. O losango acende quando a pessoa chega
 * nela — e a confirmacao de que o processo avancou mais um passo.
 */
export function Station({
  id,
  label,
  children,
  className,
}: {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const marca = useRef<HTMLSpanElement>(null);
  const chegou = useInView(marca, { once: true, margin: "-45% 0px -45% 0px" });

  return (
    <section id={id} className={cn("relative scroll-mt-28", className)}>
      {label && (
        <div className="relative mb-9 flex items-center gap-3">
          <motion.span
            ref={marca}
            aria-hidden
            className="absolute left-[-32px] h-[9px] w-[9px] rotate-45 border border-white/25 sm:left-[-52px]"
            animate={
              chegou
                ? {
                    backgroundColor: "rgb(var(--brand))",
                    borderColor: "rgb(var(--brand))",
                    scale: [1, 1.5, 1],
                  }
                : { backgroundColor: "rgb(var(--ink))" }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-[.82rem] tracking-[.14em] text-muted">{label}</span>
        </div>
      )}
      {children}
    </section>
  );
}

/** Titulo de estacao. Um so lugar decide o tamanho dos titulos do site. */
export function StationTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "m-0 max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.1rem)] font-semibold leading-[1.02] tracking-[-.035em]",
        className
      )}
      style={{ fontVariationSettings: '"wdth" 102' }}
    >
      {children}
    </h2>
  );
}
