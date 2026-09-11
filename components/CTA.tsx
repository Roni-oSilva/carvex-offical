"use client";

import { Reveal } from "./Reveal";
import { TextRoll } from "./ui/text-roll";
import { MagneticLink } from "./MagneticButton";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

export function CTA({ data }: { data: SiteData }) {
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  return (
    <section className="relative overflow-hidden border-t border-white/10 py-[clamp(96px,15vw,190px)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[52%] aspect-square w-[min(1000px,150vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle,rgb(var(--brand)/.4),rgb(var(--brand)/.08) 42%,transparent 66%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-shell px-[var(--pad)]">
        <Reveal>
          <h2
            className="mx-auto m-0 max-w-[14ch] text-[clamp(2.4rem,8.4vw,5.4rem)] font-semibold leading-[.95] tracking-[-.035em]"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            {data.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.09}>
          <p className="mx-auto mb-11 mt-7 max-w-[44ch] text-muted">{data.cta.description}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <MagneticLink
            href={wa}
            external
            className="min-h-[64px] bg-brand px-9 text-lg text-white hover:brightness-110 hover:shadow-[0_18px_50px_-16px_rgb(var(--brand)/.95)]"
          >
            <TextRoll>{data.cta.buttonText}</TextRoll> <span aria-hidden>→</span>
          </MagneticLink>
        </Reveal>
        <Reveal delay={0.27}>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href={`https://instagram.com/${data.contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/10 pb-1 text-[.94rem] text-muted transition-colors hover:border-brand hover:text-paper"
            >
              Instagram
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="border-b border-white/10 pb-1 text-[.94rem] text-muted transition-colors hover:border-brand hover:text-paper"
            >
              {data.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
