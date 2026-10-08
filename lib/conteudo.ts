import bruto from "@/conteudo.json";
import type { Service, SiteData } from "./types";

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
        title: s.titulo,
        shortName: s.nomeCurto,
        description: s.descricao,
        badges: s.selos,
        visual: s.visual as Service["visual"],
        whatsappMessage: s.mensagemWhatsapp,
        active: s.ativo,
      })),
    },
    process: {
      title: c.processo.titulo,
      description: c.processo.descricao,
      steps: c.processo.etapas.map((e, i) => ({
        id: `etapa-${i}`,
        number: String(i + 1).padStart(2, "0"),
        title: e.titulo,
        description: e.descricao,
        active: e.ativo,
      })),
    },
    identify: {
      title: c.diagnostico.titulo,
      description: c.diagnostico.descricao,
      options: c.diagnostico.opcoes.map((o, i) => ({
        id: `opcao-${i}`,
        label: o.frase,
        whatsappMessage: o.mensagemWhatsapp,
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
