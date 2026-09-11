"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { SiteData } from "@/lib/types";

type Node = {
  /** posicao inicial dispersa */
  sx: number; sy: number;
  /** posicao alvo, sobre o contorno do diamante */
  tx: number; ty: number;
  /** ruido que cria a fase de caos */
  nx: number; ny: number;
  seed: number;
};

/** Pontos sobre o contorno do diamante CARVEX, em coordenadas 0..1. */
function diamondTarget(t: number): { x: number; y: number } {
  // 4 arestas: topo->direita, direita->baixo, baixo->esquerda, esquerda->topo
  const P = [
    { x: 0.5, y: 0.06 },
    { x: 0.95, y: 0.38 },
    { x: 0.5, y: 0.95 },
    { x: 0.05, y: 0.38 },
  ];
  const seg = Math.floor(t * 4) % 4;
  const f = t * 4 - Math.floor(t * 4);
  const a = P[seg];
  const b = P[(seg + 1) % 4];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

/**
 * Secao 01 + transicao + secao 02, em um unico bloco sticky.
 * O scroll conduz: pontos dispersos -> conexoes -> caos -> diamante.
 */
export function Complexity({ data }: { data: SiteData }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  // mantem o progresso acessivel dentro do loop sem recriar o efeito
  const progressRef = useRef(0);
  progressRef.current = progress;

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  // Titulo 01 sai, titulo 02 entra na segunda metade.
  const op1 = useTransform(scrollYProgress, [0, 0.34, 0.46], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.46], [0, -40]);
  const op2 = useTransform(scrollYProgress, [0.58, 0.72, 1], [0, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.58, 0.78], [40, 0]);

  useEffect(() => scrollYProgress.on("change", setProgress), [scrollYProgress]);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const isMobile =
      window.matchMedia("(max-width: 760px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    const COUNT = isMobile ? 60 : 130;
    let w = 0, h = 0, raf = 0, t = 0;
    let nodes: Node[] = [];

    const build = () => {
      nodes = Array.from({ length: COUNT }, (_, i) => {
        const target = diamondTarget(i / COUNT);
        return {
          sx: 0.08 + Math.random() * 0.84,
          sy: 0.1 + Math.random() * 0.8,
          tx: target.x,
          ty: target.y,
          nx: (Math.random() - 0.5) * 0.34,
          ny: (Math.random() - 0.5) * 0.34,
          seed: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

    const frame = () => {
      const p = progressRef.current;
      t += 0.006;

      // fases: 0-.35 surgir + conectar | .35-.55 caos | .55-1 organizar
      const appear = Math.min(1, p / 0.22);
      const chaos = Math.max(0, Math.min(1, (p - 0.28) / 0.24)) * (1 - Math.max(0, (p - 0.55) / 0.2));
      const order = easeInOut(Math.max(0, Math.min(1, (p - 0.55) / 0.42)));

      // area util quadrada e centrada
      const side = Math.min(w, h) * 0.82;
      const ox = (w - side) / 2;
      const oy = (h - side) / 2;

      const pts = nodes.map((n, i) => {
        const drift = reduce ? 0 : Math.sin(t + n.seed) * 0.012;
        const bx = n.sx + n.nx * chaos + drift;
        const by = n.sy + n.ny * chaos + drift * 0.6;
        const x = bx + (n.tx - bx) * order;
        const y = by + (n.ty - by) * order;
        const visible = i / COUNT <= appear;
        return { x: ox + x * side, y: oy + y * side, visible };
      });

      ctx.clearRect(0, 0, w, h);

      // conexoes: muitas no caos, poucas e limpas na ordem
      const linkDist = side * (0.16 + chaos * 0.12);
      const lineAlpha = 0.05 + chaos * 0.22;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(8,104,247,${lineAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        if (!pts[i].visible) continue;
        for (let j = i + 1; j < pts.length; j++) {
          if (!pts[j].visible) continue;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          if (dx * dx + dy * dy < linkDist * linkDist) {
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
          }
        }
      }
      ctx.stroke();

      // contorno do diamante emergindo
      if (order > 0.05) {
        ctx.strokeStyle = `rgba(255,255,255,${order * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const c = [
          [0.5, 0.06], [0.95, 0.38], [0.5, 0.95], [0.05, 0.38],
        ] as const;
        c.forEach(([x, y], i) => {
          const px = ox + x * side;
          const py = oy + y * side;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = `rgba(8,104,247,${order * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(ox + 0.05 * side, oy + 0.38 * side);
        ctx.lineTo(ox + 0.95 * side, oy + 0.38 * side);
        ctx.stroke();
      }

      // pontos
      for (const pt of pts) {
        if (!pt.visible) continue;
        ctx.fillStyle = order > 0.6 ? "rgba(255,255,255,.85)" : "rgba(156,168,186,.7)";
        ctx.fillRect(pt.x - 1, pt.y - 1, 2.2, 2.2);
      }

      raf = requestAnimationFrame(frame);
    };

    build();
    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <section ref={wrap} className="relative h-[280svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <canvas
          ref={canvas}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-shell px-[var(--pad)] text-center">
          <motion.h2
            style={{ opacity: op1, y: y1, fontVariationSettings: '"wdth" 112' }}
            className="col-start-1 row-start-1 m-0 mx-auto max-w-[18ch] text-[clamp(2.1rem,7vw,5rem)] font-semibold leading-[.98] tracking-[-.04em]"
          >
            {data.story.line1}
          </motion.h2>

          <motion.h2
            style={{ opacity: op2, y: y2, fontVariationSettings: '"wdth" 112' }}
            className="pointer-events-none col-start-1 row-start-1 m-0 mx-auto max-w-[18ch] self-center text-[clamp(2.1rem,7vw,5rem)] font-semibold leading-[.98] tracking-[-.04em]"
          >
            {data.story.line2}
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
