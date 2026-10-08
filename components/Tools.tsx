"use client";

import { motion, useReducedMotion } from "motion/react";
import { Station, StationTitle } from "./ui/rail";
import type { SiteData } from "@/lib/types";

/** Com o que trabalhamos: ferramenta por area, sem logo de terceiro. */
export function Tools({ data }: { data: SiteData }) {
  const reduce = useReducedMotion();
  const groups = data.tools.groups;
  if (!groups.length) return null;

  return (
    <Station label="Ferramentas" className="pb-[clamp(72px,11vw,140px)]">
      <StationTitle>{data.tools.title}</StationTitle>
      <p className="mt-6 max-w-[54ch] text-muted">{data.tools.description}</p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {groups.map((g, i) => (
          <motion.div
            key={g.id}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="border-t border-white/15 pt-5"
          >
            <h3 className="m-0 mb-5 text-[.95rem] font-semibold text-paper">{g.area}</h3>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[.98rem] text-muted"
                >
                  <span aria-hidden className="h-px w-3 flex-none bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Station>
  );
}
