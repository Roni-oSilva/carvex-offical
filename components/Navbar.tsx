"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { DiamondMark } from "./ui/logo";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicos", label: "Servicos" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Navbar({ data }: { data: SiteData }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[90] flex h-[68px] items-center justify-between gap-4 border-b px-[var(--pad)] transition-colors duration-300",
          stuck
            ? "border-white/10 bg-ink/80 shadow-[0_1px_28px_-6px_rgb(var(--brand)/.45)] backdrop-blur-xl"
            : "border-transparent"
        )}
      >
        <a href="#inicio" className="flex flex-none items-center gap-2.5" aria-label={`${data.brand.name} inicio`}>
          {data.brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.brand.logoUrl} alt="" className="h-[22px] w-auto" />
          ) : (
            <DiamondMark className="h-[21px] w-[21px] text-brand" />
          )}
          <b
            className="text-[.88rem] font-semibold tracking-[.28em] [text-indent:.28em]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {data.brand.name}
          </b>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[.93rem] text-muted transition-colors hover:text-paper after:absolute after:-bottom-1.5 after:left-0 after:right-full after:h-px after:bg-brand after:transition-[right] after:duration-300 hover:after:right-0"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-[42px] items-center rounded bg-brand px-4 text-sm font-medium text-white transition hover:brightness-110 md:inline-flex"
        >
          Falar com a CARVEX
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col justify-between gap-8 bg-deep px-[var(--pad)] pb-10 pt-[102px] md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 text-[1.7rem] font-medium tracking-tight"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.06 }}
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[56px] w-full items-center justify-center rounded bg-brand font-medium text-white"
            >
              Falar com a CARVEX
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
