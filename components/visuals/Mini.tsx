"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Tres miniaturas em loop, uma por servico. Servem tanto no cartao da
 * abertura quanto nos cartoes de servico.
 */

const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

/** Pagina sendo "lida": blocos que brilham em sequencia. */
export function MiniLanding({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative flex h-full w-full flex-col gap-2 ${className ?? ""}`}>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40" />
        ))}
      </div>
      <motion.div
        className="h-[34%] rounded-xl bg-gradient-to-br from-[#fdba74]/70 to-brand/60"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={loop(3)}
      />
      <div className="h-2 w-[70%] rounded-full bg-white/50" />
      <div className="h-2 w-[50%] rounded-full bg-white/25" />
      <motion.div
        className="mt-auto h-7 w-[46%] rounded-full bg-white"
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={loop(2.2)}
      />
    </div>
  );
}

/** Barras que sobem e descem, com uma linha de tendencia por cima. */
export function MiniBars({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const alturas = [
    [38, 62, 46],
    [58, 40, 70],
    [44, 78, 52],
    [70, 56, 88],
    [52, 84, 64],
  ];
  return (
    <div className={`relative flex h-full w-full items-end gap-2 ${className ?? ""}`}>
      {alturas.map((a, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-t-lg bg-gradient-to-t from-brand/50 to-[#fdba74]"
          style={{ height: `${a[0]}%` }}
          animate={reduce ? undefined : { height: a.map((v) => `${v}%`) }}
          transition={loop(3.4, i * 0.25)}
        />
      ))}
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <motion.path
          d="M2 40 C 20 34, 28 44, 44 28 S 74 20, 98 6"
          fill="none"
          stroke="#fff"
          strokeWidth={1.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.85, 1] }}
        />
      </svg>
    </div>
  );
}

/** Tres etapas ligadas por uma linha, com um ponto de luz viajando. */
export function MiniFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative flex h-full w-full items-center justify-between ${className ?? ""}`}>
      <div className="absolute left-[9%] right-[9%] top-1/2 h-px -translate-y-1/2 bg-white/25" />
      {!reduce && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(253,186,116,.9)]"
          animate={{ left: ["9%", "91%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      )}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="relative z-10 grid h-11 w-11 place-items-center rounded-2xl border border-white/30 bg-white/10 backdrop-blur"
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={loop(3, i * 0.4)}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#fdba74]" />
        </motion.span>
      ))}
    </div>
  );
}
