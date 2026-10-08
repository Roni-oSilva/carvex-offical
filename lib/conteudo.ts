import bruto from "@/conteudo.json";
import type { SiteData } from "./types";

/**
 * Le o conteudo.json e converte para a forma que os componentes esperam.
 * Nao existe banco de dados: o conteudo entra no site durante o build.
 *
 * Os campos que comecam com _ no JSON sao comentarios para quem edita
 * o arquivo. Sao ignorados aqui.
 */
export function getSiteData(): SiteData {
  const c = bruto;

  return {
    brand: {
      name: c.marca.nome,
      slogan: c.marca.slogan,
      logoUrl: c.marca.logo,
    },
    theme: {
      primary: c.cores.principal,
      background: c.cores.fundo,
      text: c.cores.texto,
      accent: c.cores.destaque,
    },
    hero: {
      title: c.hero.titulo,
      highlight: c.hero.destaque,
      description: c.hero.descricao,
      primaryCta: c.hero.botaoPrincipal,
      secondaryCta: c.hero.botaoSecundario,
      badges: c.hero.selos,
      blackHole: c.hero.blackHole,
    },
    services: {
      title: c.servicos.titulo,
      description: c.servicos.descricao,
      items: c.servicos.itens.map((s, i) => ({
        id: `servico-${i}`,
        number: s.numero,
        title: s.titulo,
        description: s.descricao,
        icon: s.icone,
        tags: s.tags,
        whatsappMessage: s.mensagemWhatsapp,
        active: s.ativo,
      })),
    },
    contact: {
      title: c.contato.titulo,
      description: c.contato.descricao,
      whatsapp: c.contato.whatsapp,
      whatsappLabel: c.contato.whatsappVisivel,
      email: c.contato.email,
      instagram: c.contato.instagram,
      defaultMessage: c.contato.mensagemPadrao,
    },
    footer: {
      text: c.rodape.texto,
      copyright: c.rodape.copyright,
    },
  };
}
