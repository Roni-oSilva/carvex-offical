/** Diamante CARVEX. Usado quando nenhuma logo foi enviada no admin. */
export function DiamondMark({
  className,
  detailed = false,
}: {
  className?: string;
  detailed?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M50 5 L95 38 L50 95 L5 38 Z" stroke="currentColor" strokeWidth={detailed ? 3 : 5} />
      <path d="M5 38 H95" stroke="currentColor" strokeWidth={detailed ? 3 : 5} />
      {detailed && (
        <>
          <path d="M50 5 L29 38 L50 95 L71 38 Z" stroke="currentColor" strokeWidth={3} strokeOpacity={0.6} />
          <path d="M29 38 L50 20 L71 38" stroke="currentColor" strokeWidth={3} strokeOpacity={0.6} />
        </>
      )}
    </svg>
  );
}
