"use client";

import { useState } from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { TextRoll } from "./ui/text-roll";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_VISIVEL } from "@/lib/conteudo";
import type { SiteData } from "@/lib/types";

type Errors = Partial<Record<"nome" | "mensagem" | "contato", string>>;

export function Contact({ data }: { data: SiteData }) {
  const [form, setForm] = useState({ nome: "", empresa: "", mensagem: "", contato: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState("Abre o WhatsApp com a mensagem ja escrita.");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.nome.trim()) next.nome = "Precisamos do seu nome para responder.";
    if (!form.mensagem.trim()) next.mensagem = "Conte rapidamente o que voce precisa.";
    if (!form.contato.trim()) next.contato = "Deixe um canal para retornarmos.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const texto =
      `Nova mensagem pelo site — ${data.brand.name}\n\n` +
      `Nome: ${form.nome}\n` +
      (form.empresa ? `Empresa: ${form.empresa}\n` : "") +
      `Necessidade: ${form.mensagem}\n` +
      `Contato: ${form.contato}`;

    window.open(generateWhatsAppLink(data.contact.whatsapp, texto), "_blank", "noopener");
    setNote("Mensagem pronta no WhatsApp. E so enviar que retornamos em breve.");
  };

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: WHATSAPP_VISIVEL,
      href: generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage),
      external: true,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${data.contact.instagram.replace("@", "")}`,
      href: `https://instagram.com/${data.contact.instagram.replace("@", "")}`,
      external: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
      external: false,
    },
  ];

  return (
    <section id="contato" className="border-t border-white/10 bg-deep py-[clamp(64px,11vw,150px)]">
      <div className="mx-auto grid max-w-shell items-start gap-10 px-[var(--pad)] lg:grid-cols-[.8fr_1.2fr] lg:gap-[clamp(36px,6vw,90px)]">
        <div>
          <Reveal>
            <p className="m-0 mb-[18px] flex items-center gap-3 text-[.86rem] text-muted">
              <span className="h-px w-6 flex-none bg-brand" />
              Contato
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <h2
              className="m-0 text-[clamp(2.15rem,6vw,4.2rem)] font-semibold leading-[.95] tracking-[-.035em]"
              style={{ fontVariationSettings: '"wdth" 112' }}
            >
              {data.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col">
              {channels.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group flex items-center justify-between gap-3.5 border-b border-white/10 py-4 transition-colors hover:border-brand",
                    i === 0 && "border-t"
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <c.icon size={19} className="flex-none text-brand" strokeWidth={1.6} />
                    {c.label}
                  </span>
                  <span className="text-[.93rem] text-muted transition-colors group-hover:text-paper">
                    {c.value}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.09}>
          <form onSubmit={submit} noValidate className="grid gap-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm text-muted">Nome</label>
              <input id="nome" value={form.nome} onChange={set("nome")} placeholder="Como podemos te chamar" className="w-full rounded border-0 border-b border-white/30 bg-transparent px-0.5 py-3 text-base text-paper placeholder:text-muted/45 transition-colors focus:border-brand focus:outline-none" />
              {errors.nome && <p className="mt-2 text-[.83rem] text-rose-300">{errors.nome}</p>}
            </div>
            <div>
              <label htmlFor="empresa" className="mb-2 block text-sm text-muted">Empresa</label>
              <input id="empresa" value={form.empresa} onChange={set("empresa")} placeholder="Opcional" className="w-full rounded border-0 border-b border-white/30 bg-transparent px-0.5 py-3 text-base text-paper placeholder:text-muted/45 transition-colors focus:border-brand focus:outline-none" />
            </div>
            <div>
              <label htmlFor="mensagem" className="mb-2 block text-sm text-muted">Mensagem</label>
              <textarea
                id="mensagem"
                value={form.mensagem}
                onChange={set("mensagem")}
                placeholder="Uma landing page, um dashboard, uma automação — ou uma ideia ainda sem nome."
                className="w-full rounded border-0 border-b border-white/30 bg-transparent px-0.5 py-3 text-base text-paper placeholder:text-muted/45 transition-colors focus:border-brand focus:outline-none min-h-[96px] resize-y leading-relaxed"
              />
              {errors.mensagem && <p className="mt-2 text-[.83rem] text-rose-300">{errors.mensagem}</p>}
            </div>
            <div>
              <label htmlFor="contato" className="mb-2 block text-sm text-muted">WhatsApp ou e-mail</label>
              <input id="contato" value={form.contato} onChange={set("contato")} placeholder="Onde devemos responder" className="w-full rounded border-0 border-b border-white/30 bg-transparent px-0.5 py-3 text-base text-paper placeholder:text-muted/45 transition-colors focus:border-brand focus:outline-none" />
              {errors.contato && <p className="mt-2 text-[.83rem] text-rose-300">{errors.contato}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded bg-brand px-6 font-medium text-white transition hover:brightness-110"
              >
                <TextRoll>Enviar mensagem</TextRoll> <span aria-hidden>→</span>
              </button>
              <p className="m-0 max-w-[32ch] text-[.85rem] text-muted">{note}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
