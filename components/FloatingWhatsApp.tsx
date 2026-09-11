"use client";

import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { SiteData } from "@/lib/types";

export function FloatingWhatsApp({ data }: { data: SiteData }) {
  return (
    <a
      href={generateWhatsAppLink(data.contact.whatsapp, data.contact.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a CARVEX no WhatsApp"
      className="fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full bg-brand shadow-[0_16px_42px_-14px_rgb(var(--brand)/.95)] transition-transform hover:scale-105"
    >
      <MessageCircle size={26} className="text-white" strokeWidth={1.8} />
    </a>
  );
}
