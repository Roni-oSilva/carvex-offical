"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { SiteData } from "@/lib/types";

/**
 * Secao diamante: o simbolo cresce, se fragmenta, as partes se afastam
 * e voltam a se unir enquanto as duas frases aparecem.
 */
export function Impact({ data }: { data: SiteData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const escala = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [0.35, 1, 1.05, 0.95]);
  const giro = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // fragmentacao: as quatro faces se afastam e voltam
  const sep = useTransform(scrollYProgress, [0.3, 0.55, 0.8], [0, 1, 0]);
  const dx = useTransform(sep, [0, 1], [0, 26]);
  const dxNeg = useTransform(sep, [0, 1], [0, -26]);
  const dy = useTransform(sep, [0, 1], [0, 22]);
  const dyNeg = useTransform(sep, [0, 1], [0, -22]);
  const anelOp = useTransform(scrollYProgress, [0.25, 0.5, 0.85], [0, 0.6, 0]);
  const anelEscala = useTransform(scrollYProgress, [0.25, 0.85], [0.7, 1.5]);

  const t1 = useTransform(scrollYProgress, [0.52, 0.62], [105, 0]);
  const o1 = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const t2 = useTransform(scrollYProgress, [0.68, 0.78], [105, 0]);
  const o2 = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300svh] bg-brand">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-[var(--pad)] text-center">
        {/* aneis */}
        <motion.span
          aria-hidden
          style={{ opacity: anelOp, scale: anelEscala }}
          className="absolute h-[min(64vh,520px)] w-[min(64vh,520px)] rounded-full border border-white/25"
        />
        <motion.span
          aria-hidden
          style={{ opacity: anelOp, scale: anelEscala }}
          className="absolute h-[min(44vh,360px)] w-[min(44vh,360px)] rounded-full border border-white/20"
        />

        <motion.svg
          viewBox="0 0 100 100"
          style={{ scale: escala, rotate: giro }}
          className="mb-8 h-[min(30vh,240px)] w-auto"
          fill="none"
          stroke="#fff"
          strokeWidth={2.4}
          strokeLinejoin="round"
          aria-hidden
        >
          <motion.path d="M50 5 L29 38 L50 95 Z" style={{ x: dxNeg, y: dy }} strokeOpacity={0.85} />
          <motion.path d="M50 5 L71 38 L50 95 Z" style={{ x: dx, y: dy }} strokeOpacity={0.85} />
          <motion.path d="M5 38 L50 5 L29 38 Z" style={{ x: dxNeg, y: dyNeg }} strokeOpacity={0.55} />
          <motion.path d="M95 38 L50 5 L71 38 Z" style={{ x: dx, y: dyNeg }} strokeOpacity={0.55} />
          <motion.path d="M5 38 L29 38 L50 95 Z" style={{ x: dxNeg, y: dy }} strokeOpacity={0.4} />
          <motion.path d="M95 38 L71 38 L50 95 Z" style={{ x: dx, y: dy }} strokeOpacity={0.4} />
        </motion.svg>

        <p
          className="m-0 text-[clamp(2rem,8.5vw,5.6rem)] font-bold leading-[.98] tracking-[-.045em]"
          style={{ fontVariationSettings: '"wdth" 116' }}
        >
          <span className="block overflow-hidden py-[.06em]">
            <motion.span className="block" style={{ y: t1, opacity: o1 }}>
              {data.impact.line1}
            </motion.span>
          </span>
        </p>
        <p
          className="m-0 text-[clamp(2rem,8.5vw,5.6rem)] font-bold leading-[.98] tracking-[-.045em] opacity-55"
          style={{ fontVariationSettings: '"wdth" 116' }}
        >
          <span className="block overflow-hidden py-[.06em]">
            <motion.span className="block" style={{ y: t2, opacity: o2 }}>
              {data.impact.line2}
            </motion.span>
          </span>
        </p>

        {data.impact.description && (
          <p className="mx-auto mt-7 max-w-[46ch] text-white/80">{data.impact.description}</p>
        )}
      </div>
    </section>
  );
}
