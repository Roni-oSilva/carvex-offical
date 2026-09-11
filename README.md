# CARVEX — site institucional

Uma página só, sem banco de dados, sem login, sem painel.
Todo o conteúdo do site mora em **`conteudo.json`**.

```
conteudo.json  →  build  →  site no ar
```

---

## Como mudar qualquer texto do site

Você não precisa instalar nada nem abrir editor de código.

1. Abra seu repositório em **github.com**
2. Clique em **`conteudo.json`**
3. Clique no ícone de **lápis** (canto superior direito)
4. Altere o texto entre as aspas
5. Desça e clique em **Commit changes**

A Vercel republica o site sozinha em cerca de 40 segundos. Só isso.

### Três regras para não quebrar o arquivo

- Mexa apenas no que está **depois dos dois-pontos, entre aspas**
- Não apague vírgulas, chaves `{ }` nem colchetes `[ ]`
- Para usar aspas dentro de um texto, escreva `\"`

Se o deploy falhar, foi vírgula ou chave apagada sem querer.
No GitHub vá em **Commits**, abra o anterior e clique em **Revert**.
O site volta ao que era em um clique.

---

## O que dá para mudar

Nome e slogan · logo · WhatsApp, e-mail e Instagram · as quatro cores ·
todos os textos do hero, serviços, processo, diamante, sobre, diagnóstico,
CTA e rodapé · as tags de cada serviço · a mensagem de WhatsApp que cada
botão dispara · quais seções aparecem no site.

Para esconder uma seção inteira, troque `true` por `false` em
`secoesVisiveis`.

### Trocar a logo

Coloque o arquivo dentro da pasta `public/` e escreva o nome em
`marca.logo`, começando com barra:

```json
"logo": "/minha-logo.png"
```

Deixando vazio, o site usa o diamante desenhado em SVG.

---

## Rodar no seu computador (opcional)

Só é necessário se você quiser ver as mudanças antes de publicar.

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Publicar

Importe o repositório na Vercel e pronto. **Nenhuma variável de ambiente
é necessária.** O site é estático: as páginas são geradas no build, então
não existe servidor consultando banco a cada visita.

---

## A narrativa do index

Não é uma pilha de seções — é uma história contada pelo scroll.

```
HERO            impacto — o título entra palavra por palavra
COMPLEXIDADE    o problema — pontos se espalham, conectam, viram caos
                e então se organizam no diamante
SERVIÇOS        a resposta — três blocos, cada um com um visual que
                se constrói durante o scroll
PROCESSO        o método — Lapidar recebe peso visual dominante
DIAMANTE        a marca — o símbolo cresce, se fragmenta e se reúne
SOBRE           DESIGN · DATA · AUTOMATION em letras enormes
DIAGNÓSTICO     o visitante escolhe a própria dor
CTA + CONTATO   conversão
```

Cada animação está presa ao scroll. O visitante controla o ritmo.

## Detalhes técnicos

**Black Hole** (`components/ui/black-hole.tsx`) — canvas 2D com disco de
acreção, linhas orbitais, grid e glow. Desktop: ~800 partículas com
parallax de mouse. Mobile: ~240, sem mouse tracking, DPR limitado a 1.5.

**Complexidade** (`components/Complexity.tsx`) — cada ponto tem uma posição
inicial dispersa e uma posição-alvo sobre o contorno do diamante. O scroll
interpola entre as duas, passando por uma fase de ruído que cria o caos.

**Formulário de contato** — monta a mensagem e abre o WhatsApp já
preenchido. Sem backend, sem armazenar lead.

**Fonte** — Archivo variável, carregada por `<link>` no `app/layout.tsx`.

Next.js 16 · React 19 · TypeScript · Tailwind · Motion · Lucide.
