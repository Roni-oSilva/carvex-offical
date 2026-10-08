# CARVEX — site institucional

Uma página só, sem banco de dados, sem login, sem área administrativa.
Todo o conteúdo mora em **`conteudo.json`**.

```
conteudo.json  →  build  →  site no ar
```

Cinco painéis: **hero · serviços · processo · diagnóstico · contato**.
Tudo leva ao WhatsApp.

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

---

## O número do WhatsApp

Esse é o campo que mais dá problema. Ele precisa de **três partes coladas,
só números**:

```
55   +   91   +   981902529     →   "whatsapp": "5591981902529"
país     DDD     seu número
```

Sem o `55` na frente, o link do WhatsApp não abre.

O campo `whatsappVisivel` é outra coisa: é só como o número **aparece
escrito** na tela. Esse pode ter parênteses e traço.

---

## O que dá para mudar

Nome e slogan · logo · WhatsApp, e-mail e Instagram · as quatro cores ·
hero (título, descrição, botões e os três selos) · os três serviços ·
as etapas do processo · as frases do diagnóstico · contato e rodapé.

Para esconder um serviço ou uma etapa, troque `"ativo": true` por `false`.

### Cada serviço tem dois nomes

- `nomeCurto` é a etiqueta discreta no topo do painel e o nome no rodapé
  ("Landing Pages")
- `titulo` é a manchete grande do painel ("Páginas que viram cliente")

O campo `visual` escolhe a tela animada dentro do painel: `landing`,
`dashboard`, `workflow` ou `none`.

### Títulos curtos funcionam melhor

Os painéis usam tipografia de pôster. Um título com mais de oito palavras
quebra em linhas demais e perde o impacto. Se precisar explicar mais, use
a `descricao` logo abaixo.

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

## Detalhes técnicos

**Black Hole** (`components/ui/black-hole.tsx`) — canvas 2D com disco de
acreção, linhas orbitais, grid e glow, ocupando a direita do hero.
Desktop: ~800 partículas com parallax de mouse. Mobile: ~240, sem mouse
tracking, DPR limitado a 1.5. Com `prefers-reduced-motion`, desenha um
quadro e para.

**Formulário de contato** — monta a mensagem e abre o WhatsApp já
preenchido. Sem backend, sem armazenar lead.

**Fonte** — Archivo variável, carregada por `<link>` no `app/layout.tsx`.

Next.js 16 · React 19 · TypeScript · Tailwind · Motion · Lucide.

### A forma do site

A unidade de composição é o **painel** (`components/ui/panel.tsx`): um
bloco de cantos muito arredondados, em dois tons. Azul para os momentos de
afirmação, escuro para o que exige leitura calma. Eles se alternam na
pilha para dar ritmo.

Dentro dos painéis entram **telas escuras** (`Screen`) com os mockups que
se montam durante o scroll — a landing page sendo construída, o painel de
dados e o fluxo de automação, em `components/visuals/`.

As seções de complexidade, diamante e sobre continuam no histórico do git,
caso um dia façam falta.
