"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * Fundo vivo: auroras que derivam, grade sutil e um brilho que segue o
 * cursor. Tudo fixo e atras do conteudo.
 */
export function Background() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });
  const sy = useSpring(y, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 260);
      y.set(e.clientY - 260);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="grid-bg absolute inset-0" />
      {!reduce && (
        <motion.div
          className="absolute left-0 top-0 hidden h-[520px] w-[520px] rounded-full md:block"
          style={{
            x: sx,
            y: sy,
            background: "radial-gradient(closest-side, rgb(253 186 116 / .16), transparent)",
          }}
        />
      )}
    </div>
  );
}
