"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

/**
 * Uma landing page sendo montada durante o scroll:
 * estrutura -> tipografia -> imagem -> botoes -> metricas.
 * Todos os useTransform ficam no topo, em ordem fixa.
 */
export function LandingVisual({ p }: { p: MotionValue<number> }) {
  const estrutura = useTransform(p, [0.05, 0.22], [0, 1]);
  const estruturaY = useTransform(p, [0.05, 0.22], [14, 0]);
  const tipografia = useTransform(p, [0.24, 0.4], [0, 1]);
  const tipografiaY = useTransform(p, [0.24, 0.4], [14, 0]);
  const imagem = useTransform(p, [0.4, 0.55], [0, 1]);
  const imagemScale = useTransform(p, [0.4, 0.55], [0.8, 1]);
  const botoes = useTransform(p, [0.55, 0.68], [0, 1]);
  const botoesY = useTransform(p, [0.55, 0.68], [14, 0]);
  const metricas = useTransform(p, [0.68, 0.85], [0, 1]);
  const metricasY = useTransform(p, [0.68, 0.85], [14, 0]);

  return (
    <div className="relative aspect-[4/3] w-full rounded-lg border border-white/10 bg-deep/40 p-4 sm:p-6">
      <motion.div style={{ opacity: estrutura }} className="absolute inset-4 sm:inset-6">
        <div className="h-full w-full rounded border border-dashed border-white/12" />
      </motion.div>

      <div className="relative flex h-full flex-col gap-3">
        <motion.div
          style={{ opacity: estrutura, y: estruturaY }}
          className="flex items-center gap-2 border-b border-white/10 pb-3"
        >
          <span className="h-2 w-2 rotate-45 bg-brand" />
          <span className="h-1.5 w-12 rounded bg-white/15" />
          <span className="ml-auto h-1.5 w-8 rounded bg-white/10" />
        </motion.div>

        <motion.div style={{ opacity: tipografia, y: tipografiaY }} className="grid gap-2">
          <span className="block h-3 w-[70%] rounded bg-white/70 sm:h-4" />
          <span className="block h-3 w-[45%] rounded bg-white/70 sm:h-4" />
          <span className="mt-1 block h-1.5 w-[85%] rounded bg-white/12" />
          <span className="block h-1.5 w-[62%] rounded bg-white/12" />
        </motion.div>

        <motion.div
          style={{ opacity: imagem, scaleY: imagemScale }}
          className="relative min-h-[52px] flex-1 origin-top overflow-hidden rounded border border-white/10 bg-gradient-to-br from-brand/25 to-transparent"
        >
          <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/30" />
        </motion.div>

        <motion.div style={{ opacity: botoes, y: botoesY }} className="flex gap-2">
          <span className="h-6 w-24 rounded bg-brand" />
          <span className="h-6 w-20 rounded border border-white/20" />
        </motion.div>

        <motion.div
          style={{ opacity: metricas, y: metricasY }}
          className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-[.62rem] text-muted sm:text-[.7rem]"
        >
          {[
            ["Design", "0.9s"],
            ["Performance", "98"],
            ["Conversao", "+34%"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="m-0 text-paper">{v}</p>
              <p className="m-0">{k}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
