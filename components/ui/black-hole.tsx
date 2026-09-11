"use client";

import { useEffect, useRef } from "react";

type Particle = { a: number; r: number; s: number; o: number; z: number };

/**
 * Fundo tecnologico do HERO: disco de acrecao, linhas orbitais,
 * grid discreto e glow azul, desenhados em canvas 2D.
 *
 * Desktop  -> mais particulas + parallax de mouse
 * Mobile   -> menos particulas, sem mouse tracking
 * Reduce   -> desenha um unico quadro e para
 */
export function BlackHole({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile =
      window.matchMedia("(max-width: 760px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, cx = 0, cy = 0, R = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;

    const seed = () => {
      const count = isMobile ? 240 : 800;
      particles = Array.from({ length: count }, () => {
        const r = R * (1.25 + Math.pow(Math.random(), 0.5) * 3.6);
        return {
          a: Math.random() * Math.PI * 2,
          r,
          s: 0.0014 + (R / r) * 0.0062,
          o: 0.1 + Math.random() * 0.55,
          z: Math.random(),
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * (isMobile ? 0.5 : 0.74);
      cy = h * (isMobile ? 0.27 : 0.5);
      R = Math.min(w, h) * (isMobile ? 0.1 : 0.085);
      seed();
    };

    const draw = () => {
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      const ox = cx + tx;
      const oy = cy + ty;

      ctx.clearRect(0, 0, w, h);

      // grid discreto
      ctx.strokeStyle = "rgba(156,168,186,.05)";
      ctx.lineWidth = 1;
      const g = isMobile ? 92 : 68;
      ctx.beginPath();
      for (let x = (tx * 0.4) % g; x < w; x += g) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (ty * 0.4) % g; y < h; y += g) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // glow
      const gr = ctx.createRadialGradient(ox, oy, R * 0.7, ox, oy, R * 5.2);
      gr.addColorStop(0, "rgba(8,104,247,.34)");
      gr.addColorStop(0.4, "rgba(8,104,247,.11)");
      gr.addColorStop(1, "rgba(2,5,10,0)");
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(ox, oy, R * 5.2, 0, Math.PI * 2);
      ctx.fill();

      // linhas orbitais
      ctx.strokeStyle = "rgba(8,104,247,.2)";
      for (let i = 1; i <= 3; i++) {
        const rx = R * (1.7 + i * 1.05);
        ctx.beginPath();
        ctx.ellipse(ox, oy, rx, rx * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // materia em orbita
      for (const p of particles) {
        p.a += p.s;
        const x = ox + Math.cos(p.a) * p.r;
        const y = oy + Math.sin(p.a) * p.r * 0.3;
        if (p.z > 0.86) {
          ctx.fillStyle = `rgba(255,255,255,${p.o})`;
          ctx.fillRect(x, y, 1.6, 1.6);
        } else {
          ctx.fillStyle = `rgba(8,104,247,${p.o * 0.85})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // horizonte de eventos
      ctx.fillStyle = "#02050A";
      ctx.beginPath();
      ctx.arc(ox, oy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(8,104,247,.65)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(ox, oy, R + 2, 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      resize();
      if (!reduce) draw();
    };

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 34;
      my = (e.clientY / window.innerHeight - 0.5) * 26;
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });
    if (!isMobile && !reduce) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }

    draw();
    if (reduce) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}

export default BlackHole;
