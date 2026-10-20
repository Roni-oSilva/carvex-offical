const PALAVRAS = [
  "Landing Pages",
  "Painéis",
  "Automação",
  "WhatsApp",
  "Excel",
  "Integrações",
  "Relatórios",
  "Sistemas",
];

/** Faixa de palavras em rolagem infinita, no meio-termo entre as secoes. */
export function Marquee() {
  const linha = [...PALAVRAS, ...PALAVRAS];
  return (
    <div
      aria-hidden
      className="relative -rotate-1 overflow-hidden border-y border-white/10 bg-white/[.03] py-5 backdrop-blur-sm"
    >
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {linha.map((p, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center gap-8 pr-8 text-[clamp(1.4rem,3.4vw,2.4rem)] font-bold tracking-tight text-white/85"
              >
                {p}
                <span className="h-2 w-2 rotate-45 bg-[#fdba74]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
