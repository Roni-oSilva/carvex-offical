"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const NOS = ["LEAD", "CRM", "IA", "PROCESSAMENTO", "RESPOSTA", "RESULTADO"];

/**
 * Workflow que se monta durante o scroll. Cada no entra na sua vez,
 * as conexoes se desenham e um ponto luminoso percorre o caminho.
 * Desktop: fluxo em duas colunas. Mobile: coluna unica vertical.
 */
export function WorkflowVisual({ p }: { p: MotionValue<number> }) {
  const inicio = 0.1;
  const passo = 0.11;

  return (
    <div className="w-full rounded-lg border border-white/10 bg-deep/40 p-4 sm:p-6">
      <div className="grid gap-0">
        {NOS.map((n, i) => (
          <Node key={n} label={n} p={p} from={inicio + i * passo} last={i === NOS.length - 1} />
        ))}
      </div>
    </div>
  );
}

function Node({
  label,
  p,
  from,
  last,
}: {
  label: string;
  p: MotionValue<number>;
  from: number;
  last: boolean;
}) {
  const opacity = useTransform(p, [from, from + 0.07], [0, 1]);
  const x = useTransform(p, [from, from + 0.07], [-12, 0]);
  const linha = useTransform(p, [from + 0.04, from + 0.12], [0, 1]);
  const pulseY = useTransform(p, [from + 0.04, from + 0.12], ["0%", "100%"]);

  return (
    <div>
      <motion.div
        style={{ opacity, x }}
        className="flex items-center gap-3 rounded border border-white/10 bg-white/[.02] px-3.5 py-3"
      >
        <span className="h-1.5 w-1.5 flex-none rotate-45 bg-brand" />
        <span className="text-[.78rem] tracking-[.14em] text-paper sm:text-[.85rem]">{label}</span>
        <ArrowRight size={14} className="ml-auto flex-none text-muted/50" />
      </motion.div>

      {!last && (
        <div className="relative ml-[18px] h-6 w-px bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 bg-brand"
            style={{ scaleY: linha, originY: 0, height: "100%" }}
          />
          <motion.span
            aria-hidden
            className="absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_10px_rgb(8,104,247)]"
            style={{ top: pulseY, opacity: linha }}
          />
        </div>
      )}
    </div>
  );
}
