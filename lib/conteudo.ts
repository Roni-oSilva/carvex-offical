import bruto from "@/conteudo.json";
import type { SiteData } from "./types";

/**
 * Le o conteudo.json e converte para a forma que os componentes esperam.
 * Nao existe banco de dados: o conteudo entra no site durante o build.
 *
 * Os campos que comecam com _ no JSON sao apenas comentarios para quem
 * edita o arquivo. Sao ignorados aqui.
 */
export function getSiteData(): SiteData {
  const c = bruto;

  return {
    brand: {
      name: c.marca.nome,
      slogan: c.marca.slogan,
      logoUrl: c.marca.logo,
      faviconUrl: "",
    },
    theme: {
      primary: c.cores.principal,
      background: c.cores.fundo,
      text: c.cores.texto,
      accent: c.cores.destaque,
    },
    hero: {
      title: c.hero.titulo,
      description: c.hero.descricao,
      primaryCta: c.hero.botaoPrincipal,
      secondaryCta: c.hero.botaoSecundario,
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
        icon: "Gem",
        tags: s.tags,
        whatsappMessage: s.mensagemWhatsapp,
        visual: s.visual as SiteData["services"]["items"][number]["visual"],
        active: s.ativo,
        order: i,
      })),
    },
    process: {
      title: c.processo.titulo,
      description: c.processo.descricao,
      steps: c.processo.etapas.map((e, i) => ({
        id: `etapa-${i}`,
        number: e.numero,
        title: e.titulo,
        description: e.descricao,
        active: e.ativo,
        order: i,
      })),
    },
    impact: {
      line1: c.diamante.frase1,
      line2: c.diamante.frase2,
      description: c.diamante.descricao,
      imageUrl: "",
      active: c.secoesVisiveis.diamante,
    },
    about: {
      title: c.sobre.titulo,
      description: c.sobre.descricao,
      pillars: c.sobre.pilares.map((p, i) => ({
        id: `pilar-${i}`,
        title: p.titulo,
        description: p.descricao,
        icon: "Gem",
      })),
    },
    story: {
      line1: c.complexidade.frase1,
      line2: c.complexidade.frase2,
    },
    identify: {
      title: c.diagnostico.titulo,
      options: c.diagnostico.opcoes.map((o, i) => ({
        id: `opcao-${i}`,
        label: o.frase,
        whatsappMessage: o.mensagemWhatsapp,
      })),
    },
    cta: {
      title: c.cta.titulo,
      description: c.cta.descricao,
      buttonText: c.cta.textoBotao,
    },
    contact: {
      title: c.contato.tituloSecao,
      whatsapp: c.contato.whatsapp,
      email: c.contato.email,
      instagram: c.contato.instagram,
      defaultMessage: c.contato.mensagemPadrao,
    },
    footer: {
      text: c.rodape.texto,
      copyright: c.rodape.copyright,
    },
    visibility: {
      story: c.secoesVisiveis.complexidade,
      services: c.secoesVisiveis.servicos,
      process: c.secoesVisiveis.processo,
      impact: c.secoesVisiveis.diamante,
      about: c.secoesVisiveis.sobre,
      identify: c.secoesVisiveis.diagnostico,
      cta: c.secoesVisiveis.cta,
      contact: c.secoesVisiveis.contato,
    },
  };
}

/** O numero do WhatsApp como aparece escrito na tela. */
export const WHATSAPP_VISIVEL = bruto.contato.whatsappVisivel;
