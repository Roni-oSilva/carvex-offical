"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Fragmentos geometricos convergem e formam o diamante. ~1s. */
const FACES = [
  { d: "M50 5 L29 38 L50 95 Z", from: { x: -34, y: -18 } },
  { d: "M50 5 L71 38 L50 95 Z", from: { x: 34, y: -18 } },
  { d: "M5 38 L50 5 L29 38 Z", from: { x: -40, y: 26 } },
  { d: "M95 38 L50 5 L71 38 Z", from: { x: 40, y: 26 } },
];

export function Splash({ brandName, logoUrl }: { brandName: string; logoUrl?: string }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), 1350);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-brand"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative grid place-items-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <motion.img
                src={logoUrl}
                alt=""
                className="w-[clamp(78px,14vw,120px)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }}
              />
            ) : (
              <svg
                viewBox="0 0 100 100"
                className="w-[clamp(78px,14vw,120px)]"
                fill="none"
                stroke="#fff"
                strokeWidth={2.6}
                strokeLinejoin="round"
                aria-hidden
              >
                {FACES.map((f, i) => (
                  <motion.path
                    key={f.d}
                    d={f.d}
                    initial={{ opacity: 0, x: f.from.x, y: f.from.y, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.05 + i * 0.06, ease: [0.2, 0.9, 0.25, 1] }}
                  />
                ))}
                <motion.path
                  d="M5 38 H95"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.42 }}
                />
              </svg>
            )}

            <motion.span
              className="pointer-events-none absolute -inset-y-[30%] -inset-x-[80%] mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(105deg,transparent 42%,rgba(255,255,255,.92) 50%,transparent 58%)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <motion.p
            className="absolute top-[calc(50%+clamp(60px,10vw,92px))] text-[clamp(.95rem,2.2vw,1.25rem)] font-semibold tracking-[.44em] [text-indent:.44em]"
            style={{ fontVariationSettings: '"wdth" 118' }}
            initial={{ opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {brandName}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
