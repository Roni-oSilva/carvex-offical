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
      label: c.hero.etiqueta,
      title: c.hero.titulo,
      description: c.hero.descricao,
      reinforcement: c.hero.reforco,
      primaryCta: c.hero.botaoPrincipal,
      secondaryCta: c.hero.botaoSecundario,
    },
    symptoms: {
      title: c.sintomas.titulo,
      items: c.sintomas.itens,
    },
    services: {
      title: c.servicos.titulo,
      description: c.servicos.descricao,
      items: c.servicos.itens.map((s, i) => ({
        id: `servico-${i}`,
        shortName: s.nomeCurto,
        title: s.titulo,
        description: s.descricao,
        deliverables: s.entregas,
        leadTime: s.prazo,
        visual: s.visual as Service["visual"],
        whatsappMessage: s.mensagemWhatsapp,
        active: s.ativo,
      })),
    },
    tools: {
      title: c.ferramentas.titulo,
      description: c.ferramentas.descricao,
      groups: c.ferramentas.grupos.map((g, i) => ({
        id: `grupo-${i}`,
        area: g.area,
        items: g.itens,
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
    audience: {
      title: c.paraQuem.titulo,
      fits: { label: c.paraQuem.serve.rotulo, items: c.paraQuem.serve.itens },
      doesNotFit: {
        label: c.paraQuem.naoServe.rotulo,
        items: c.paraQuem.naoServe.itens,
      },
    },
    faq: {
      title: c.duvidas.titulo,
      items: c.duvidas.itens.map((d, i) => ({
        id: `duvida-${i}`,
        question: d.pergunta,
        answer: d.resposta,
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
