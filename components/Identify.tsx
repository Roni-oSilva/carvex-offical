"use client";

import { Panel } from "./ui/panel";
import { Reveal } from "./Reveal";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/** Painel azul. Cada frase abre o WhatsApp ja no assunto certo. */
export function Identify({ data }: { data: SiteData }) {
  const options = data.identify.options;
  if (!options.length) return null;

  return (
    <div className="px-[var(--pad)] pt-[var(--pad)]">
      <Panel tone="blue" glow className="mx-auto max-w-shell p-7 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <h2
                className="m-0 max-w-[14ch] text-[clamp(2rem,5.6vw,3.6rem)] font-bold leading-[.93] tracking-[-.04em]"
                style={{ fontVariationSettings: '"wdth" 106' }}
              >
                {data.identify.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[34ch] text-white/80">{data.identify.description}</p>
            </Reveal>
          </div>

          <div className="grid gap-2.5">
            {options.map((o, i) => (
              <Reveal key={o.id} delay={0.06 * i}>
                <a
                  href={generateWhatsAppLink(data.contact.whatsapp, o.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[76px] items-center justify-between gap-5 rounded-slab bg-white/10 px-5 py-5 text-left ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20 sm:px-7"
                >
                  <span className="text-[1rem] font-medium sm:text-[1.14rem]">{o.label}</span>
                  <span
                    aria-hidden
                    className="flex-none text-white/70 transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
