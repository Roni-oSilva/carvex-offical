/**
 * Fundo estatico e leve: manchas de cor em degrade (sem blur, sem animacao)
 * e uma grade sutil. Fixo e atras do conteudo.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
