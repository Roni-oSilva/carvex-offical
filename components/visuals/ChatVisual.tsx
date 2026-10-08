"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

/**
 * Celular com uma conversa que vai aparecendo conforme o scroll avanca.
 * Cada balao entra na sua vez, alternando cliente e robo.
 *
 * A conversa e ficticia e o rodape do componente diz isso.
 */
const CONVERSA: { de: "cliente" | "robo"; texto: string }[] = [
  { de: "cliente", texto: "Oi, tem horário pra amanhã?" },
  { de: "robo", texto: "Tenho sim! Às 9h, 14h30 e 16h. Qual fica melhor?" },
  { de: "cliente", texto: "14h30" },
  { de: "robo", texto: "Fechado. Corte e barba, 14h30, amanhã. Mando lembrete 1h antes." },
  { de: "cliente", texto: "quanto fica?" },
  { de: "robo", texto: "R$ 55 os dois juntos. Te espero!" },
];

export function ChatVisual({ p }: { p: MotionValue<number> }) {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="rounded-[26px] border border-white/12 bg-ink p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)]">
        {/* cabecalho da conversa */}
        <div className="flex items-center gap-2.5 rounded-t-[18px] bg-white/[.04] px-3.5 py-3">
          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-brand text-[.6rem] font-bold text-white">
            CX
          </span>
          <div className="leading-tight">
            <p className="m-0 text-[.8rem] font-medium text-paper">Carvex Bot</p>
            <p className="m-0 flex items-center gap-1.5 text-[.65rem] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              online agora
            </p>
          </div>
        </div>

        {/* baloes */}
        <div className="grid min-h-[320px] content-start gap-2 bg-white/[.015] px-3 py-4">
          {CONVERSA.map((m, i) => (
            <Balao key={i} p={p} index={i} de={m.de} texto={m.texto} />
          ))}
        </div>

        {/* campo de digitacao */}
        <div className="rounded-b-[18px] bg-white/[.04] px-3.5 py-3">
          <p className="m-0 text-[.72rem] text-muted/60">Digite uma mensagem…</p>
        </div>
      </div>
    </div>
  );
}

function Balao({
  p,
  index,
  de,
  texto,
}: {
  p: MotionValue<number>;
  index: number;
  de: "cliente" | "robo";
  texto: string;
}) {
  const inicio = 0.12 + index * 0.1;
  const opacity = useTransform(p, [inicio, inicio + 0.07], [0, 1]);
  const y = useTransform(p, [inicio, inicio + 0.07], [10, 0]);

  const doRobo = de === "robo";

  return (
    <motion.p
      style={{ opacity, y }}
      className={
        "m-0 max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[.8rem] leading-snug " +
        (doRobo
          ? "justify-self-start rounded-bl-md bg-white/[.07] text-paper"
          : "justify-self-end rounded-br-md bg-brand text-white")
      }
    >
      {texto}
    </motion.p>
  );
}
