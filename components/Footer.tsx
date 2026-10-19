import { DiamondMark } from "./ui/logo";
import type { SiteData } from "@/lib/types";

export function Footer({ data }: { data: SiteData }) {
  return (
    <footer className="px-[var(--pad)] pb-10 pt-6">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[.9rem] text-white/55">
        <span className="flex items-center gap-3">
          {data.brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.brand.logoUrl} alt="" className="h-6 w-auto" />
          ) : (
            <DiamondMark className="h-6 w-6 text-[#c084fc]" />
          )}
          <b className="font-bold tracking-[.26em] text-white">{data.brand.name}</b>
          <span>{data.footer.text}</span>
        </span>
        <span>© {data.footer.copyright}</span>
      </div>
    </footer>
  );
}
