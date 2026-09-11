"use client";

import { useEffect, useState } from "react";
import { motion, type MotionValue, useTransform } from "motion/react";

/** Contador que acompanha o progresso do scroll. */
function Counter({
  p,
  from,
  to,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const mv = useTransform(p, [from, to], [0, value]);
  const [n, setN] = useState(0);
  useEffect(() => mv.on("change", setN), [mv]);
  return (
    <span>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Dashboard ilustrativo. Numeros sobem e graficos se desenham no scroll. */
export function DashboardVisual({ p }: { p: MotionValue<number> }) {
  const cards = useTransform(p, [0.08, 0.3], [0, 1]);
  const cardsY = useTransform(p, [0.08, 0.3], [16, 0]);
  const linha = useTransform(p, [0.32, 0.72], [0, 1]);
  const barras = useTransform(p, [0.5, 0.85], [0, 1]);

  const kpis = [
    { label: "Revenue", value: 284.6, prefix: "R$ ", suffix: "k", decimals: 1 },
    { label: "Conversion", value: 4.8, suffix: "%", decimals: 1 },
    { label: "Growth", value: 32, prefix: "+", suffix: "%", decimals: 0 },
    { label: "Performance", value: 98, decimals: 0 },
  ];

  const alturas = [38, 62, 45, 78, 58, 92];

  return (
    <div className="w-full rounded-lg border border-white/10 bg-deep/40 p-4 sm:p-6">
      <motion.div style={{ opacity: cards, y: cardsY }} className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {kpis.map((k, i) => (
          <div key={k.label} className="rounded border border-white/10 bg-white/[.02] p-3">
            <p className="m-0 text-[.68rem] uppercase tracking-wider text-muted">{k.label}</p>
            <p
              className="m-0 mt-1 text-[1.15rem] font-semibold tabular-nums sm:text-[1.4rem]"
              style={{ fontVariationSettings: '"wdth" 106' }}
            >
              <Counter
                p={p}
                from={0.12 + i * 0.04}
                to={0.5 + i * 0.04}
                value={k.value}
                prefix={k.prefix}
                suffix={k.suffix}
                decimals={k.decimals}
              />
            </p>
          </div>
        ))}
      </motion.div>

      {/* grafico de linha desenhado por pathLength */}
      <div className="mt-3 rounded border border-white/10 bg-white/[.02] p-3">
        <svg viewBox="0 0 300 90" className="w-full" role="img" aria-label="Grafico ilustrativo">
          <defs>
            <linearGradient id="cvxFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(8,104,247)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(8,104,247)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[22, 45, 68].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(156,168,186,.12)" strokeWidth="1" />
          ))}

          <motion.path
            d="M0 72 L50 58 L100 64 L150 38 L200 44 L250 22 L300 14"
            fill="none"
            stroke="rgb(8,104,247)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: linha }}
          />
          <motion.path
            d="M0 72 L50 58 L100 64 L150 38 L200 44 L250 22 L300 14 L300 90 L0 90 Z"
            fill="url(#cvxFill)"
            style={{ opacity: linha }}
          />
        </svg>
      </div>

      {/* barras: um unico scaleY anima o grupo inteiro */}
      <motion.div
        style={{ opacity: barras, scaleY: barras, originY: 1 }}
        className="mt-3 flex h-16 items-end gap-1.5"
      >
        {alturas.map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h}%` }} />
        ))}
      </motion.div>
    </div>
  );
}
