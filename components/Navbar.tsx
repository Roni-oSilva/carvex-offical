"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DiamondMark } from "./ui/logo";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

/** Menu em pilula de vidro, flutuando no topo. */
export function Navbar({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const [stuck, setStuck] = useState(false);
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-[80] flex justify-center px-3 sm:top-5"
    >
      <nav
        className={cn(
          "flex w-full max-w-[760px] items-center justify-between gap-3 rounded-full border px-3 py-2 pl-5 transition-all duration-500",
          stuck
            ? "border-white/15 bg-[#1c1405]/92 shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)]"
            : "border-white/10 bg-[#1c1405]/70"
        )}
      >
        <a href="#inicio" className="flex items-center gap-2.5" aria-label={`${data.brand.name} inicio`}>
          {data.brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.brand.logoUrl} alt="" className="h-[22px] w-auto" />
          ) : (
            <DiamondMark className="h-[22px] w-[22px] text-[#f5d77a]" />
          )}
          <span className="text-[.86rem] font-bold tracking-[.26em] [text-indent:.26em]">
            {data.brand.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[.92rem] font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-5 py-2.5 text-[.9rem] font-bold text-[#5c3d00] transition hover:scale-[1.04] hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,.7)]"
        >
          Falar agora
        </a>
      </nav>
    </motion.header>
  );
}
