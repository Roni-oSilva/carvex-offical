"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticLink } from "./MagneticButton";
import { MiniBars, MiniFlow, MiniLanding } from "./visuals/Mini";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Um cartao que flutua e se desloca com o mouse, cada um numa profundidade. */
function Depth({
  sx,
  sy,
  depth,
  className,
  children,
  delay = 0,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(sx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(sy, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div className={`absolute ${className ?? ""}`} style={{ x, y }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: 40 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={
          reduce
            ? undefined
            : {
                opacity: { duration: 0.8, delay: 1.4 + delay },
                scale: { duration: 0.9, delay: 1.4 + delay, ease: EASE },
                y: { duration: 5 + delay * 4, repeat: Infinity, ease: "easeInOut", delay: 2 + delay },
              }
        }
        className="glass"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const wa = generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const rotY = useTransform(sx, [-0.5, 0.5], [9, -9]);
  const rotX = useTransform(sy, [-0.5, 0.5], [-7, 7]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const palavras = data.hero.title.split(" ");
  const corte = Math.max(palavras.length - 2, 1);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        if (reduce) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-[var(--pad)] pb-24 pt-32"
    >
      <div className="mx-auto grid w-full max-w-shell items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }}>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
            className="m-0 mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[.82rem] font-semibold text-white/85 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c084fc] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c084fc]" />
            </span>
            {data.hero.label}
          </motion.p>

          <h1 className="m-0 text-[clamp(2.8rem,8vw,6.4rem)] font-bold leading-[.96] tracking-[-.035em]">
            {palavras.map((p, i) => (
              <span key={i} className="mr-[.22em] inline-block overflow-hidden pb-[.04em] align-top">
                <motion.span
                  className={`inline-block ${i >= corte ? "text-grad" : ""}`}
                  initial={reduce ? false : { y: "110%", rotate: 4, filter: "blur(10px)" }}
                  animate={{ y: 0, rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 1.25 + i * 0.09, ease: EASE }}
                >
                  {p}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
            className="m-0 mt-7 max-w-[34ch] text-[1.15rem] text-white/70 sm:text-[1.3rem]"
          >
            {data.hero.description}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.05, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticLink
              href={wa}
              external
              className="shine w-full bg-white font-bold text-[#3b1482] shadow-[0_18px_50px_-18px_rgba(192,132,252,.9)] sm:w-auto"
            >
              {data.hero.primaryCta} <ArrowUpRight size={19} aria-hidden />
            </MagneticLink>
            <MagneticLink
              href="#servicos"
              className="w-full border border-white/25 bg-white/[.06] font-semibold text-white backdrop-blur hover:bg-white/15 sm:w-auto"
            >
              {data.hero.secondaryCta}
            </MagneticLink>
          </motion.div>
        </motion.div>

        {/* cluster de cartoes 3D */}
        <div className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[520px]" style={{ perspective: 1100 }}>
          <motion.div
            className="relative h-full w-full"
            style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          >
            <Depth sx={sx} sy={sy} depth={26} delay={0} className="left-[6%] top-[6%] w-[64%]">
              <div className="p-5">
                <p className="m-0 mb-4 text-[.78rem] font-semibold tracking-wide text-white/60">PAINEL</p>
                <div className="h-[130px] sm:h-[170px]">
                  <MiniBars />
                </div>
              </div>
            </Depth>

            <Depth sx={sx} sy={sy} depth={52} delay={0.15} className="bottom-[2%] left-[0%] w-[34%]">
              <div className="h-[190px] p-4 sm:h-[250px]">
                <MiniLanding />
              </div>
            </Depth>

            <Depth sx={sx} sy={sy} depth={38} delay={0.3} className="bottom-[16%] right-[0%] w-[58%]">
              <div className="p-5">
                <p className="m-0 mb-3 text-[.78rem] font-semibold tracking-wide text-white/60">AUTOMAÇÃO</p>
                <div className="h-[56px]">
                  <MiniFlow />
                </div>
              </div>
            </Depth>

            <Depth sx={sx} sy={sy} depth={70} delay={0.45} className="right-[4%] top-[0%]">
              <span className="block rounded-full px-5 py-2.5 text-[.88rem] font-bold text-white">Sob medida</span>
            </Depth>
          </motion.div>
        </div>
      </div>

      {/* indicador de rolagem */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: fade }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="relative block h-10 w-6 rounded-full border border-white/30">
          <motion.span
            className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-white"
            animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
