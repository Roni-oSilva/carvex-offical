"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A espinha: uma linha que atravessa a pagina inteira e se preenche
 * conforme a pessoa rola. E o unico movimento continuo do site — tudo
 * o mais so se move quando alguem pede.
 *
 * As secoes se penduram nela como estacoes de um processo, que e
 * exatamente o que a CARVEX constroi.
 */
export function Rail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 85%"],
  });
  const preenchimento = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative pl-9 sm:pl-14">
      <div
        aria-hidden
        className="absolute bottom-0 left-1 top-0 w-px bg-white/10"
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-brand via-brand to-brand/40"
          style={{ scaleY: preenchimento }}
        />
      </div>
      {children}
    </div>
  );
}

/**
 * Uma estacao presa a espinha. O losango marca a posicao; a etiqueta
 * diz o que esta acontecendo ali.
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
  return (
    <section id={id} className={cn("relative scroll-mt-28", className)}>
      {label && (
        <div className="relative mb-9 flex items-center gap-3">
          <span
            aria-hidden
            className="absolute left-[-32px] h-[9px] w-[9px] rotate-45 border border-brand bg-ink sm:left-[-52px]"
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
