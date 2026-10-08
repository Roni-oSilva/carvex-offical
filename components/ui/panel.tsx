import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * O painel e a unidade de composicao do site: um bloco de cantos muito
 * arredondados que carrega um poster. Dois tons:
 *   blue  — azul saturado, texto branco. Para os momentos de afirmacao.
 *   dark  — quase preto com borda fria. Para o que exige leitura calma.
 */
export function Panel({
  tone = "dark",
  className,
  children,
  glow = false,
}: {
  tone?: "blue" | "dark";
  className?: string;
  children: ReactNode;
  glow?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-panel",
        tone === "blue"
          ? "bg-brand text-white"
          : "border border-white/10 bg-gradient-to-b from-deep/70 to-ink",
        glow && "shadow-[0_40px_120px_-50px_rgb(var(--brand)/.9)]",
        className
      )}
    >
      {tone === "blue" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/3 -z-10 aspect-square w-[70%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--brand-deep)/.55), transparent 65%)",
          }}
        />
      )}
      {children}
    </section>
  );
}

/** Selo flutuante, no espirito dos chips da referencia. */
export function Badge({
  children,
  tone = "onBlue",
  className,
}: {
  children: ReactNode;
  tone?: "onBlue" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[.8rem] leading-none backdrop-blur-sm sm:text-[.86rem]",
        tone === "onBlue"
          ? "bg-white/15 text-white ring-1 ring-inset ring-white/25"
          : "bg-white/[.04] text-paper ring-1 ring-inset ring-white/12",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 flex-none rotate-45",
          tone === "onBlue" ? "bg-white" : "bg-brand"
        )}
      />
      {children}
    </span>
  );
}

/**
 * A moldura escura que segura um mockup dentro de um painel azul,
 * como as telas de aplicativo da referencia.
 */
export function Screen({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-slab bg-ink p-3 ring-1 ring-inset ring-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)] sm:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
