"use client";

import { Reveal } from "./Reveal";
import { Icon } from "./ui/icon";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/** Tres blocos compactos. Cada um abre o WhatsApp no assunto certo. */
export function Services({ data }: { data: SiteData }) {
  const items = data.services.items.filter((s) => s.active);
  if (!items.length) return null;

  return (
    <section
      id="servicos"
      className="relative border-t border-white/10 py-[clamp(64px,10vw,128px)]"
    >
      <div className="mx-auto max-w-shell px-[var(--pad)]">
        <Reveal>
          <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
            <span className="h-px w-6 flex-none bg-brand" />
            Serviços
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="m-0 max-w-[16ch] text-[clamp(2.1rem,6vw,3.8rem)] font-semibold leading-[.98] tracking-[-.04em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-[48ch] text-muted">{data.services.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.09}>
              <a
                href={generateWhatsAppLink(data.contact.whatsapp, s.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-lg border border-white/10 bg-gradient-to-b from-deep/55 to-ink/20 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/55 hover:shadow-[0_26px_60px_-30px_rgb(var(--brand)/.85)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand/12 transition-colors group-hover:bg-brand/20">
                    <Icon name={s.icon} className="h-5 w-5 text-brand" />
                  </span>
                  <span className="text-[.78rem] font-semibold tracking-[.16em] text-brand">
                    {s.number}
                  </span>
                </div>

                <h3
                  className="m-0 mb-3 text-[1.38rem] font-semibold leading-tight tracking-[-.02em]"
                  style={{ fontVariationSettings: '"wdth" 106' }}
                >
                  {s.title}
                </h3>
                <p className="m-0 text-[.97rem] text-muted">{s.description}</p>

                <div className="mt-7 flex flex-wrap gap-1.5 border-t border-white/8 pt-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[.74rem] text-muted transition-colors group-hover:border-white/25 group-hover:text-paper"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-[.92rem] text-brand">
                  Falar sobre isso
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
