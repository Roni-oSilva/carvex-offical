import { DiamondMark } from "./ui/logo";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

export function Footer({ data }: { data: SiteData }) {
  const services = data.services.items.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return (
    <footer className="border-t border-white/10 px-[var(--pad)] pb-10 pt-16">
      <div className="mx-auto grid max-w-shell gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          {data.brand.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.brand.logoUrl} alt="" className="h-[30px] w-auto" />
          ) : (
            <DiamondMark className="h-[30px] w-[30px] text-brand" />
          )}
          <b
            className="mb-2 mt-4 block text-[1.4rem] font-semibold tracking-[.26em] [text-indent:.26em]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {data.brand.name}
          </b>
          <p className="m-0 text-[.95rem] text-muted">{data.footer.text}</p>
        </div>

        <div>
          <h4 className="m-0 mb-3.5 text-[.85rem] font-semibold">Servicos</h4>
          {services.map((s) => (
            <a key={s.id} href="#servicos" className="mb-2 block text-[.93rem] text-muted transition-colors hover:text-paper">
              {s.title}
            </a>
          ))}
        </div>

        <div>
          <h4 className="m-0 mb-3.5 text-[.85rem] font-semibold">Contato</h4>
          <a
            href={`https://instagram.com/${data.contact.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block text-[.93rem] text-muted transition-colors hover:text-paper"
          >
            Instagram
          </a>
          <a
            href={generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block text-[.93rem] text-muted transition-colors hover:text-paper"
          >
            WhatsApp
          </a>
          <a href={`mailto:${data.contact.email}`} className="mb-2 block text-[.93rem] text-muted transition-colors hover:text-paper">
            E-mail
          </a>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-shell border-t border-white/10 pt-6 text-[.83rem] text-muted/70">
        © {data.footer.copyright}
      </p>
    </footer>
  );
}
