"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, AtSign, Mail, MessageCircle } from "lucide-react";
import { MagneticLink } from "./MagneticButton";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

/** Fechamento: uma frase grande e um botao que pulsa. */
export function Cta({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const c = data.contact;
  const wa = generateWhatsAppLink(c.whatsapp, c.defaultMessage);

  const contatos = [
    { href: wa, label: c.whatsappLabel, icon: MessageCircle, ext: true },
    { href: `https://instagram.com/${c.instagram}`, label: `@${c.instagram}`, icon: AtSign, ext: true },
    { href: `mailto:${c.email}`, label: c.email, icon: Mail, ext: false },
  ];

  return (
    <section id="contato" className="relative px-[var(--pad)] pb-[clamp(60px,8vw,110px)] pt-[clamp(60px,8vw,110px)]">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-shell overflow-hidden rounded-panel border border-white/20 px-[clamp(22px,5vw,80px)] py-[clamp(56px,9vw,120px)] text-center shadow-[0_50px_140px_-50px_rgb(var(--brand)/.9)]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 0%, rgb(253 186 116 / .45), transparent 70%), linear-gradient(135deg, rgb(var(--brand-deep)) 0%, rgb(var(--brand)) 100%)",
        }}
      >
        <div aria-hidden className="ring ring-1" />
        <div aria-hidden className="ring ring-2" />

        <h2 className="relative m-0 text-[clamp(2.6rem,8vw,6.2rem)] font-bold leading-[.98] tracking-[-.04em]">
          Vamos <span className="shimmer">conversar?</span>
        </h2>
        <p className="relative m-0 mx-auto mt-5 max-w-[28ch] text-[1.15rem] text-white/80 sm:text-[1.3rem]">
          {c.title}
        </p>

        <div className="relative mt-11 inline-block">
          {!reduce && (
            <>
              <span aria-hidden className="pulse-ring" />
              <span aria-hidden className="pulse-ring" style={{ animationDelay: "1.2s" }} />
            </>
          )}
          <MagneticLink
            href={wa}
            external
            className="shine relative bg-white px-10 text-[1.1rem] font-bold text-[#7c2d12] shadow-[0_24px_60px_-20px_rgba(40,12,0,.8)]"
          >
            Chamar no WhatsApp <ArrowUpRight size={21} aria-hidden />
          </MagneticLink>
        </div>

        <div className="relative mt-12 flex flex-wrap justify-center gap-3">
          {contatos.map(({ href, label, icon: Ico, ext }) => (
            <a
              key={label}
              href={href}
              target={ext ? "_blank" : undefined}
              rel={ext ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[.95rem] font-semibold backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#7c2d12]"
            >
              <Ico size={18} aria-hidden /> {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
