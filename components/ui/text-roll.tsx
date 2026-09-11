"use client";

import { cn } from "@/lib/utils";

/**
 * Text Roll: no hover a palavra sobe e uma copia entra por baixo.
 * Movimento disparado pelo usuario, entao continua valendo com
 * prefers-reduced-motion desligando so a duracao.
 */
export function TextRoll({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("group/roll inline-grid h-[1.2em] items-center overflow-hidden", className)}>
      <span className="col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(.6,0,.2,1)] group-hover/roll:-translate-y-[110%] group-hover:-translate-y-[110%] motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="col-start-1 row-start-1 translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(.6,0,.2,1)] group-hover/roll:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}

export default TextRoll;
