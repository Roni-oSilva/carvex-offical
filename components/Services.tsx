"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MiniBars, MiniFlow, MiniLanding } from "./visuals/Mini";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Service, SiteData } from "@/lib/types";

const VISUAIS: Record<Service["visual"], () => React.ReactNode> = {
  landing: () => <MiniLanding />,
  dashboard: () => <MiniBars />,
  workflow: () => <MiniFlow />,
  none: () => null,
};

/** Cartao com um brilho que acompanha o cursor e inclinacao 3D leve. */
function Card({ s, i, phone }: { s: Service; i: number; phone: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-6px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        ref={ref}
        href={generateWhatsAppLink(phone, s.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={move}
        onPointerLeave={leave}
        className="spot group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/12 bg-white/[.04] p-7 backdrop-blur-md transition-[transform,border-color] duration-300 ease-out hover:border-[#fdba74]/60"
      >
        <div className="flex items-start justify-between">
          <span className="text-[.9rem] font-bold tracking-[.2em] text-[#fdba74]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-white/15 bg-white/[.06] px-3.5 py-1.5 text-[.78rem] font-semibold text-white/75">
            {s.leadTime}
          </span>
        </div>

        <div className="my-8 h-[130px] rounded-2xl border border-white/10 bg-[#1f0f05]/60 p-4">
          {VISUAIS[s.visual]()}
        </div>

        <h3 className="m-0 text-[clamp(1.6rem,2.4vw,2rem)] font-bold leading-[1.05] tracking-[-.02em]">
          {s.shortName}
        </h3>
        <p className="m-0 mt-3 text-[1rem] text-white/65">{s.description}</p>

        <span className="mt-auto flex items-center gap-2 pt-7 text-[.95rem] font-bold text-white">
          Quero esse
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#7c2d12] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} aria-hidden />
          </span>
        </span>
      </a>
    </motion.div>
  );
}

export function Services({ data }: { data: SiteData }) {
  const itens = data.services.items.filter((s) => s.active);
  return (
    <section id="servicos" className="relative px-[var(--pad)] py-[clamp(80px,12vw,160px)]">
      <div className="mx-auto max-w-shell">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 mb-14 text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-none tracking-[-.035em]"
        >
          Três frentes. <span className="text-grad">Zero enrolação.</span>
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {itens.map((s, i) => (
            <Card key={s.id} s={s} i={i} phone={data.contact.whatsapp} />
          ))}
        </div>
      </div>
    </section>
  );
}
