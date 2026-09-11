"use client";

import { Reveal } from "./Reveal";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/** Cada opcao abre o WhatsApp com a mensagem correspondente ja escrita. */
export function Identify({ data }: { data: SiteData }) {
  return (
    <section className="relative border-t border-white/10 py-[clamp(72px,12vw,150px)]">
      <div className="mx-auto max-w-shell px-[var(--pad)]">
        <Reveal>
          <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
            <span className="h-px w-6 flex-none bg-brand" />
            Diagnostico rapido
          </p>
        </Reveal>
        <Reveal delay={0.09}>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2.2rem,6.4vw,4.4rem)] font-semibold leading-[.95] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.identify.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/8">
          {data.identify.options.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.07}>
              <a
                href={generateWhatsAppLink(data.contact.whatsapp, o.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[86px] items-center justify-between gap-5 bg-ink px-5 py-6 transition-colors hover:bg-brand/10 sm:px-8"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-[.75rem] tabular-nums text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.02rem] font-medium sm:text-[1.24rem]">{o.label}</span>
                </span>
                <span
                  aria-hidden
                  className="flex-none text-brand transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[.88rem] text-muted">
          Escolha a frase mais parecida com a sua situacao. A conversa comeca ja no assunto certo.
        </p>
      </div>
    </section>
  );
}
