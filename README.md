# CARVEX — site institucional

Uma página só, sem banco de dados, sem login, sem área administrativa.
Todo o conteúdo mora em **`conteudo.json`**.

```
conteudo.json  →  build  →  site no ar
```

Nove estações, presas a uma linha que atravessa a página:

```
abertura · o problema · o que fazemos · ferramentas · como funciona
sem enrolação · para quem · dúvidas · começar · contato
```

---

## Antes de divulgar o site

## Antes de divulgar: o que é promessa sua

- os **prazos** de cada serviço (campo `prazo`)
- tudo o que está em **`limites`** — são promessas ao contrário, e é
  justamente por isso que elas valem
- a resposta sobre **suporte depois de pronto**, nas dúvidas

Prefira prometer menos do que você entrega.

---

## Como mudar qualquer texto do site

Você não precisa instalar nada nem abrir editor de código.

1. Abra este repositório em **github.com**
2. Clique em **`conteudo.json`**
3. Clique no ícone de **lápis** (canto superior direito)
4. Altere o texto entre as aspas
5. Desça e clique em **Commit changes**

A Vercel republica o site sozinha em cerca de 40 segundos.

### Três regras para não quebrar o arquivo

- Mexa apenas no que está **depois dos dois-pontos, entre aspas**
- Não apague vírgulas, chaves `{ }` nem colchetes `[ ]`
- Para usar aspas dentro de um texto, escreva `\"`

Se o deploy falhar, foi vírgula ou chave apagada sem querer.
No GitHub vá em **Commits**, abra o anterior e clique em **Revert**.
O site volta ao que era em um clique.

---

## O número do WhatsApp

É o campo que mais dá problema. Precisa de **três partes coladas, só
números**:

```
55   +   91   +   981902529     →   "whatsapp": "5591981902529"
país     DDD     seu número
```

Sem o `55` na frente, o link não abre.

O `whatsappVisivel` é outra coisa: é só como o número **aparece escrito**
na tela. Esse pode ter parênteses e traço.

---

## As seções, uma a uma

**`hero`** — a abertura. O campo `reforco` é a frase que aparece com a
barra azul do lado: é ela que separa a CARVEX de qualquer agência, porque
diz que quem faz já viveu o problema. Não troque por algo genérico.

**`sintomas`** — frases que o visitante reconhece na própria rotina.
Quanto mais concreta a cena, melhor. "O mesmo relatório montado à mão
toda semana" funciona; "falta de eficiência" não.

**`servicos`** — cada um tem `nomeCurto` (a etiqueta e o nome no rodapé),
`titulo` (a manchete), `entregas` (o que chega na mão do cliente), `prazo`
e `visual`. O `visual` escolhe a tela animada ao lado: `landing`, `dashboard`,
`workflow` ou `none`.

**`limites`** — o que a CARVEX **não** faz. É a seção que mais constrói
confiança no site, exatamente porque trabalha contra a venda.

**`ferramentas`** — com o que você trabalha, agrupado por área.

**`processo`** — as quatro etapas. Os números são gerados sozinhos.

**`paraQuem`** — duas colunas, serve e não serve. A coluna do "não serve"
é o que torna a outra acreditável. Não a apague por achar que afasta
cliente: ela afasta o cliente errado, que é o objetivo.

**`duvidas`** — as perguntas que travam a decisão. A primeira já abre.

**`diagnostico`** — cada frase abre o WhatsApp no assunto certo.

Para esconder um serviço ou uma etapa, troque `"ativo": true` por `false`.

### Trocar a logo

Coloque o arquivo na pasta `public/` e escreva o nome em `marca.logo`,
começando com barra:

```json
"logo": "/minha-logo.png"
```

Vazio, o site usa o diamante desenhado em SVG.

---

## Rodar no seu computador (opcional)

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Publicar

Importe o repositório na Vercel. **Nenhuma variável de ambiente é
necessária.** O site é estático: as páginas são geradas no build, não há
servidor consultando banco a cada visita.

---

## A forma do site

A ideia visual é **um sistema em funcionamento** — que é o que a CARVEX
vende. Uma linha atravessa a página inteira e se preenche conforme a
pessoa rola (`components/ui/rail.tsx`). As seções se penduram nela como
estações de um processo, cada uma marcada por um losango.

Esse é o **único movimento contínuo do site**. Todo o resto só se move
quando alguém pede: as perguntas que abrem, os botões magnéticos, as
telas dos serviços que se montam conforme o scroll avança.

As três telas em `components/visuals/` ilustram o tipo de entrega — uma
landing page sendo construída, um painel de indicadores e um fluxo de
automação. Elas estão marcadas como ilustração, não como dado de cliente real, e é
importante que continuem assim.

O painel de BI mostra números inventados (`R$ 284,6k`, `+32%`). São a
receita de um cliente imaginário, para ilustrar o formato da entrega —
não têm relação com o que a CARVEX cobra. Ficam em
`components/visuals/DashboardVisual.tsx` se você quiser trocar.

## Detalhes técnicos

**Formulário de contato** — monta a mensagem e abre o WhatsApp já
preenchido. Sem backend, sem armazenar lead.

**Fonte** — Archivo variável, carregada por `<link>` no `app/layout.tsx`.

**Movimento reduzido** — quem liga `prefers-reduced-motion` no sistema
recebe o site sem animação nenhuma, e nada quebra.

Next.js 16 · React 19 · TypeScript · Tailwind · Motion · Lucide.

As versões anteriores (painéis azuis, seção diamante, complexidade)
continuam no histórico do git, caso um dia façam falta.
