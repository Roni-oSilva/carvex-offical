"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";

/**
 * Celular com uma conversa que acontece conforme o scroll avanca.
 * Antes de cada resposta o robo "digita" — sao os tres pontinhos.
 * E o detalhe que faz a tela parecer viva em vez de uma lista de baloes.
 *
 * A conversa e ficticia, e o componente ao lado diz isso.
 */
const CONVERSA: { de: "cliente" | "robo"; texto: string }[] = [
  { de: "cliente", texto: "Oi, tem horário pra amanhã?" },
  { de: "robo", texto: "Tenho! 9h, 14h30 ou 16h." },
  { de: "cliente", texto: "14h30" },
  { de: "robo", texto: "Fechado. Corte e barba, amanhã 14h30. Mando lembrete 1h antes." },
  { de: "cliente", texto: "quanto fica?" },
  { de: "robo", texto: "R$ 55 os dois. Te espero!" },
];

const INICIO = 0.1;
const PASSO = 0.1;
const DIGITANDO = 0.045; // quanto tempo os pontinhos ficam antes da resposta

export function ChatVisual({ p }: { p: MotionValue<number> }) {
  const [avanco, setAvanco] = useState(0);

  // arredonda para evitar re-render a cada pixel de scroll
  useMotionValueEvent(p, "change", (v) => {
    const passo = Math.round(v * 200) / 200;
    setAvanco((atual) => (atual === passo ? atual : passo));
  });

  useEffect(() => setAvanco(p.get()), [p]);

  return (
    <div className="mx-auto w-full max-w-[300px]">
      {/* moldura do aparelho */}
      <div className="rounded-[32px] border border-white/15 bg-white/[.04] p-1.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.95)]">
        <div className="overflow-hidden rounded-[26px] bg-ink">
          {/* barra de status */}
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[.6rem] text-muted/70">
            <span className="tabular-nums">14:02</span>
            <span className="flex items-center gap-[3px]" aria-hidden>
              <span className="h-[7px] w-[2px] rounded-sm bg-muted/50" />
              <span className="h-[9px] w-[2px] rounded-sm bg-muted/60" />
              <span className="h-[11px] w-[2px] rounded-sm bg-muted/70" />
            </span>
          </div>

          {/* contato */}
          <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-2.5">
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-[.62rem] font-bold text-white">
              CX
            </span>
            <div className="leading-tight">
              <p className="m-0 text-[.82rem] font-medium text-paper">Carvex Bot</p>
              <p className="m-0 flex items-center gap-1.5 text-[.66rem] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                online agora
              </p>
            </div>
          </div>

          {/* conversa */}
          <div className="grid min-h-[286px] content-start gap-2 px-3 py-4">
            {CONVERSA.map((m, i) => {
              const entra = INICIO + i * PASSO;
              const visivel = avanco >= entra;
              const digitando =
                m.de === "robo" && avanco >= entra - DIGITANDO && avanco < entra;

              if (!visivel && !digitando) return null;

              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[.8rem] leading-snug " +
                    (m.de === "robo"
                      ? "justify-self-start rounded-bl-md bg-white/[.08] text-paper"
                      : "justify-self-end rounded-br-md bg-brand text-white")
                  }
                >
                  {digitando ? <Pontinhos /> : m.texto}
                </motion.div>
              );
            })}
          </div>

          {/* campo de digitacao */}
          <div className="border-t border-white/8 px-4 py-3">
            <p className="m-0 text-[.73rem] text-muted/55">Digite uma mensagem…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Os tres pontinhos de "digitando", em onda. */
function Pontinhos() {
  return (
    <span className="flex items-center gap-1 py-[3px]" aria-label="digitando">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
