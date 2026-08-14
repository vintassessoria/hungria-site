# Site Oficial — Hungria Hip Hop

Site de artista em HTML/CSS/JS puro. **Sem build, sem dependência.** É só abrir o `index.html`.

---

## Como abrir

Dê dois cliques em `index.html`.

Para os embeds do Spotify/YouTube funcionarem 100%, o ideal é rodar um servidor local:

```bash
npx serve .
```

---

## Estrutura

```
index.html                 estrutura das seções
assets/css/style.css       todo o visual (cores, tipografia, animações)
assets/js/data.js          >>> O CONTEÚDO DO SITE ESTÁ AQUI <<<
assets/js/main.js          renderização e interações
assets/img/                imagens (hoje são placeholders .svg)
```

**Para mudar o conteúdo, mexa só em `assets/js/data.js`.** Textos, músicas, vídeos,
shows, fotos, produtos e links — está tudo lá, comentado em português.
Tudo que está marcado com `// TODO` precisa de dado real.

---

## Direção visual

Inspirado no [Avantgarde Artists Agency](https://www.avantgardeartistsagency.com/).
Preto absoluto, branco e nada mais — sem cor de apoio, só opacidades de branco.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#000` | fundo |
| `--fg` | `#fff` | texto |
| `--fg-60` / `--fg-40` | branco 60% / 40% | texto secundário |
| `--fg-10` | branco 10% | linhas divisórias |

Fontes: **Manrope** (tudo) + **Meddon** (manuscrita, só como acento).

A tipografia é **fluida em `vw`**, com as proporções tiradas da referência —
corpo `1.30vw`, título de seção `4.16vw`, parágrafo grande `5.35vw`,
manuscrita `11vw`. Todas com `clamp()` para não quebrar em tela pequena.
Letter-spacing negativo (`-0.023em`) nos textos grandes.

### Os movimentos-assinatura

1. **Primeira palavra manuscrita** — o primeiro parágrafo da seção Sobre começa
   com a palavra em Meddon gigante, dentro do texto sans. É o gesto mais forte
   do layout. Escreva o texto em `copy.manifesto` pensando nisso.
2. **Imagens em preto e branco** que ganham cor no hover (`grayscale(1)` → `0`).
3. **Faixa infinita de fotos** verticais 2:3 logo abaixo do título do topo.
4. **Máquina de escrever** — palavra fixa manuscrita + verbos que se revezam.
5. **Dígitos rolando** tipo odômetro no número de destaque.

---

## Animações

| Animação | Onde |
|---|---|
| Preloader com contador e barra | entrada do site |
| Palavras do título subindo uma a uma | topo |
| Máscara horizontal revelando o texto | títulos e parágrafos grandes |
| Faixa de fotos em loop contínuo (pausa no hover) | topo |
| Máquina de escrever com verbos alternando | seção depois do Sobre |
| Dígitos rolando tipo odômetro | número de destaque |
| Preto e branco → cor no hover | todos os cards e a galeria |
| Cursor com blend invertido | site todo |

Detalhes de implementação:

- Tudo respeita `prefers-reduced-motion`.
- Os estados iniciais das animações são presos a `html.js`. Se o JavaScript
  falhar ou for bloqueado, o site aparece inteiro em vez de ficar em branco.
- Além do `IntersectionObserver`, existe uma verificação no scroll como rede
  de segurança, para nenhum bloco ficar invisível.
- Ajuste a velocidade geral pelas curvas `--io` e `--out` no `:root`.

---

## Seções

| Seção | O que faz |
|---|---|
| Topo | Frase palavra a palavra + faixa infinita de fotos |
| Sobre | Manifesto com a primeira palavra manuscrita + número em odômetro |
| Máquina de escrever | "Hungria compõe / produz / lota arena…" |
| Statement | Frase de impacto com a última palavra manuscrita |
| Discografia | Grid de capas com "ouvir" no hover, abre o player do Spotify |
| Ouça agora | Player oficial do artista no Spotify + links das plataformas |
| Clipes | Grid 16:9 com lightbox do YouTube |
| Agenda | Datas da turnê (as passadas somem sozinhas) |
| Galeria | Grid com lightbox |
| Loja | Cards de produtos |
| Newsletter | Captação de e-mail |
| Contato | Booking, imprensa e formulário |
| Rodapé | Voltar ao topo, links, plataformas, redes |

---

## Spotify

O ID do artista já está preenchido e é o real:

```js
spotify: { artistId: "0jzT4HaVpuV28XeX7xr3Ln" }
```

Isso já faz o player "Ouça agora" funcionar de verdade.

### Como pegar o ID de um álbum ou faixa

1. No Spotify, clique nos `...` → **Compartilhar** → **Copiar link**.
2. O link vem assim: `https://open.spotify.com/album/4Dikk6I3cwNpc91OXARpQu?si=...`
3. O ID é o pedaço entre `/album/` e o `?` → `4Dikk6I3cwNpc91OXARpQu`
4. Cole em `spotifyId` e ajuste `tipoEmbed` para `"album"`, `"track"` ou `"playlist"`.

---

## YouTube

Em `videos`, cole só o ID do vídeo:

- `https://youtu.be/AbCdEf12345` → `youtubeId: "AbCdEf12345"`
- `https://www.youtube.com/watch?v=AbCdEf12345` → `youtubeId: "AbCdEf12345"`

A miniatura é puxada automaticamente do YouTube — não precisa subir imagem.

---

## Imagens

Todas as imagens hoje são placeholders `.svg`. Substitua pelos arquivos
oficiais e atualize o caminho no `data.js`.

| Uso | Tamanho | Formato |
|-----|---------|---------|
| Fotos da galeria e da faixa do topo | 1200×1800 (2:3, **vertical**) | `.jpg` |
| Capas de álbum | 1000×1000 (quadrada) | `.jpg` |
| Produtos | 1000×1000 | `.jpg` |
| Compartilhamento (OG) | 1200×630 | `.jpg` |

As fotos da faixa do topo saem da lista `galeria` — por isso elas precisam ser
**verticais**. Como o site deixa tudo em preto e branco, fotos com bom contraste
funcionam muito melhor que fotos claras e lavadas.

Depois de trocar, atualize também a meta tag `og:image` no `index.html`.

---

## Formulários

Hoje os formulários **não têm back-end**: o de contato abre o app de e-mail do
visitante e o de newsletter só mostra confirmação na tela.

Para receber de verdade:

- **Formspree** — troque `<form id="contactForm">` por `action="https://formspree.io/f/SEU_ID" method="POST"` e remova o `preventDefault` do `main.js`.
- **Netlify Forms** — se hospedar na Netlify, basta adicionar `netlify` no `<form>`.
- **Newsletter** — Mailchimp, Brevo ou RD Station (o ponto de integração está marcado com `// TODO` no `main.js`).

---

## Publicar

Como é site estático, sobe em qualquer lugar de graça:

- **Netlify** ou **Vercel** — arraste a pasta na tela de deploy.
- **GitHub Pages** — suba o repositório e ative o Pages.

Depois é só apontar o domínio.

---

## Pendências antes de ir pro ar

- [ ] Trocar todas as imagens placeholder pelas oficiais (fotos verticais!)
- [ ] Preencher os `spotifyId` da discografia
- [ ] Preencher os `youtubeId` dos clipes
- [ ] Confirmar links de Apple Music, Deezer, Instagram, TikTok e Facebook
- [ ] Colocar e-mails reais de booking / imprensa
- [ ] Atualizar a agenda de shows com datas reais
- [ ] Revisar os textos de `copy` (manifesto, statement, verbos) com a equipe
- [ ] Conectar os formulários a um serviço
- [ ] Definir o domínio e atualizar `seo.urlSite` + `canonical` no `index.html`
