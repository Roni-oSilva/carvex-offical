"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Linha fina no topo que se enche conforme a pagina e lida. */
export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-brand via-[#fdba74] to-white"
      style={{ scaleX }}
    />
  );
}
