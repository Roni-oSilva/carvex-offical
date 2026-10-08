"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/**
 * As perguntas que travam a decisao. Abrir e fechar e movimento pedido
 * pela pessoa, entao aqui a animacao mostra o que mudou — ela trabalha.
 */
export function Faq({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const [aberta, setAberta] = useState<string | null>(data.faq.items[0]?.id ?? null);

  if (!data.faq.items.length) return null;

  return (
    <Station label="Dúvidas" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.faq.title}</StationTitle>

      <div className="mt-11 border-t border-white/10">
        {data.faq.items.map((item) => {
          const ativa = aberta === item.id;
          return (
            <div key={item.id} className="border-b border-white/10">
              <h3 className="m-0">
                <button
                  onClick={() => setAberta(ativa ? null : item.id)}
                  aria-expanded={ativa}
                  aria-controls={`resposta-${item.id}`}
                  className="group flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <span className="text-[1.05rem] font-medium text-paper transition-colors group-hover:text-brand sm:text-[1.18rem]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={
                      "grid h-8 w-8 flex-none place-items-center rounded-full border transition-all duration-300 " +
                      (ativa
                        ? "rotate-45 border-brand bg-brand text-white"
                        : "border-white/20 text-muted")
                    }
                  >
                    <Plus size={15} strokeWidth={2.2} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {ativa && (
                  <motion.div
                    id={`resposta-${item.id}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="m-0 max-w-[62ch] pb-7 pr-10 text-[1rem] text-muted">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Station>
  );
}
