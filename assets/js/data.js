/* =====================================================================
   DADOS DO SITE — edite APENAS este arquivo para trocar o conteúdo.
   Tudo que aparece no site (textos, músicas, vídeos, shows, fotos)
   sai daqui. Não precisa mexer no HTML.
   Itens marcados com  // TODO  precisam de dado real.
   ===================================================================== */

window.SITE_DATA = {

  /* ---------------------------------------------------------------
     1. IDENTIDADE
     --------------------------------------------------------------- */
  artista: {
    nome: "Hungria",
    nomeCompleto: "Hungria Hip Hop",
    tagline: "Rap. Brasília. Coração.",
    origem: "Brasília — DF",
    email: "contato@hungriaoficial.com.br",     // TODO e-mail real
    emailBooking: "booking@hungriaoficial.com.br", // TODO
    emailImprensa: "imprensa@hungriaoficial.com.br", // TODO
    whatsapp: "5561983486282",                   // (61) 98348-6282 — Eduardo (booking)
  },

  /* ---------------------------------------------------------------
     2. LINKS OFICIAIS
     --------------------------------------------------------------- */
  links: {
    spotify:   "https://open.spotify.com/artist/0vLuOi2k62sHujIfplInlK",
    youtube:   "https://www.youtube.com/channel/UCAI8SmRbXgSpP8Zo3xZbxzQ",
    instagram: "https://www.instagram.com/hungria_oficial/",
    tiktok:    "https://www.tiktok.com/@oficialhungria",
    whatsapp:  "https://wa.me/5561983486282",          // (61) 98348-6282 — Eduardo (booking)
    appleMusic:"https://music.apple.com/br/artist/hungria-hip-hop/1140018064", // TODO conferir
    deezer:    "https://www.deezer.com/br/artist/6486089",                     // TODO conferir
    amazon:    "",
    tidal:     "",
    facebook:  "https://www.facebook.com/hungriahiphopoficial",
    x:         "",
  },

  /* ---------------------------------------------------------------
     3. SPOTIFY
     O ID abaixo é o real do Hungria Hip Hop.
     --------------------------------------------------------------- */
  spotify: {
    artistId: "0vLuOi2k62sHujIfplInlK",
    // Playlist oficial pra tocar no site (opcional). Cole só o ID.
    playlistId: "", // TODO ex: "37i9dQZF1E4lUSpoU4g3ic"
    ouvintesMensais: "12,4M", // TODO atualizar manualmente

    // ABAS DO SPOTIFY — cada aba troca o player. tipo: "artist"|"album"|"track"|"playlist"
    abas: [
      { label: "Populares",    tipo: "artist", id: "0vLuOi2k62sHujIfplInlK" },
      { label: "Novo single",  tipo: "album",  id: "4Dikk6I3cwNpc91OXARpQu" },
      { label: "Discografia",  tipo: "artist", id: "0vLuOi2k62sHujIfplInlK" }, // TODO trocar por playlist "This is Hungria"
    ],
  },

  /* ---------------------------------------------------------------
     3.5. TEXTOS DAS SEÇÕES (modelo simples, tema claro)
     --------------------------------------------------------------- */
  copy: {
    // Intro de abertura (cortina que revela o hero).
    intro: {
      palavra: "HUNGRIA",
      sub: "Rap · Brasília — DF",
    },

    // Topo do site (hero de tela cheia).
    hero: {
      kicker: "Site oficial",
      titulo: "HUNGRIA",           // nome gigante em display
      sub: "O som do DF que virou trilha do mundo inteiro.",
      release: "Novo single — O Playboy Rodou",
      foto: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/feature-wide.jpg",
      video: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/hero.mp4",
      foco: "center 38%",
      ctaAgenda: "Ver agenda",       // botão único e central do hero (leva pra agenda.html)
    },

    // Bloco-manifesto (texto grande da seção Sobre / experiência).
    manifesto: [
      "Do teclado da igreja em Brasília aos bilhões de plays: o Hungria transformou o rap do DF em trilha de estrada, de rolê e de história de amor mundo afora.",
      "Batida pesada, melodia de rádio e verso que gruda — uma assinatura que uma geração inteira canta de cor.",
    ],

    // Faixa de destaque (imagem grande com chamada).
    feature: {
      selo: "Ao vivo",
      titulo: "Do palco pro mundo",
      texto: "Batida pesada, melodia de rádio e o coração de Brasília — o som que virou trilha de uma geração.",
      foto: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/hero-portrait.jpg",
      cta: "Ver clipes",
      href: "#clipes",
    },
  },

  /* ---------------------------------------------------------------
     4. LANÇAMENTO EM DESTAQUE (topo da seção Música)
     tipoEmbed: "album" | "track" | "playlist"
     --------------------------------------------------------------- */
  lancamento: {
    selo: "Novo lançamento",
    titulo: "Ninguém é de Ferro",
    artista: "Hungria",
    tipo: "Clipe oficial",
    ano: "2026",
    capa: "assets/img/capas/ninguem-e-de-ferro.jpg",
    descricao:
      "O novo clipe do Hungria já está no ar. Assista agora.",
    tipoEmbed: "youtube",
    youtubeId: "2aZN2DvMeHE",
    smartlink: "https://www.youtube.com/watch?v=2aZN2DvMeHE",
  },

  /* ---------------------------------------------------------------
     5. DISCOGRAFIA / RELEASES
     spotifyId vazio => o card só linka pro perfil do Spotify.
     --------------------------------------------------------------- */
  discografia: [
    // ─── Faixas selecionadas pelo dono do site (nesta ordem).
    //     Aparecem como as CAPAS DE CD no leque e na lista da seção "Ouça agora".
    //     IDs e capas oficiais do Spotify (via oEmbed).
    { titulo: "Amor e Fé", ano: "", tipo: "Acústico", tipoEmbed: "track", spotifyId: "6ZEKE3RR5EMhAMTJzjGOB6",
      capa: "https://i.scdn.co/image/ab67616d0000b27357c4eac77883a5d57dae079d" },
    { titulo: "Preta", ano: "", tipo: "com João Carlos Martins", tipoEmbed: "track", spotifyId: "0UYB92l1Wrk98xVGN2MBaI",
      capa: "https://i.scdn.co/image/ab67616d0000b2730c2b6baf19fd9ca0491ba516" },
    { titulo: "Um Pedido", ano: "2019", tipo: "Single", tipoEmbed: "track", spotifyId: "71dwCpTZQpjLuqnJzyGbFz",
      capa: "https://i.scdn.co/image/ab67616d0000b273799703775cd8eac4b2e97e8e" },
    { titulo: "Lembranças", ano: "2016", tipo: "Single", tipoEmbed: "track", spotifyId: "2BZx6pvXQpY8pExUmdkkm1",
      capa: "https://i.scdn.co/image/ab67616d0000b2734d7f4371bae76e432c022ed7" },
    { titulo: "Dubai", ano: "2016", tipo: "Single", tipoEmbed: "track", spotifyId: "16Ij1j3ZawPQ2vxsnusKLY",
      capa: "https://i.scdn.co/image/ab67616d0000b273d9bb405761f343d75084d796" },
    { titulo: "Insônia", ano: "", tipo: "com Tribo da Periferia", tipoEmbed: "track", spotifyId: "0BB3OKNepoICimJJgfcNbs",
      capa: "https://i.scdn.co/image/ab67616d0000b273e756d96b3f7961a3f16c2269" },
    { titulo: "Emendou", ano: "2025", tipo: "com Tribo da Periferia", tipoEmbed: "track", spotifyId: "3NLXuaKeDDxvFwtDkBeOL8",
      capa: "https://i.scdn.co/image/ab67616d0000b2737eabd87c7422724365ad54ad" },
  ],

  /* ---------------------------------------------------------------
     6. VÍDEOS (YouTube) — cole só o ID do vídeo
        youtu.be/AbCdEf12345  ->  youtubeId: "AbCdEf12345"
     --------------------------------------------------------------- */
  videos: [
    { titulo: "Clipe oficial — Faixa 1", youtubeId: "", ano: "2025", destaque: true }, // TODO
    { titulo: "Clipe oficial — Faixa 2", youtubeId: "", ano: "2024" }, // TODO
    { titulo: "Clipe oficial — Faixa 3", youtubeId: "", ano: "2024" }, // TODO
    { titulo: "Ao vivo — Brasília",      youtubeId: "", ano: "2023" }, // TODO
  ],

  /* ---------------------------------------------------------------
     7. AGENDA DE SHOWS
     status: "ingressos" | "esgotado" | "emBreve"
     --------------------------------------------------------------- */
  shows: [
    { data: "2026-11-01", cidade: "Santa Maria",           uf: "Rio Grande do Sul" },
    { data: "2026-11-02", ate: "2026-11-12", pausa: "Férias" },   // período sem shows
    { data: "2026-11-13", cidade: "Guarulhos",             uf: "São Paulo" },
    { data: "2026-11-14", cidade: "Poços de Caldas",       uf: "Minas Gerais" },
    { data: "2026-11-19", cidade: "São Paulo",             uf: "São Paulo" },
    { data: "2026-11-20", cidade: "Porto Ferreira",        uf: "São Paulo" },
    { data: "2026-11-21", cidade: "Avaré",                 uf: "São Paulo" },
    { data: "2026-11-22", cidade: "São Bento do Sul",      uf: "Santa Catarina" },
    { data: "2026-11-27", cidade: "Pelotas",               uf: "Rio Grande do Sul" },
    { data: "2026-11-28", cidade: "Santana do Livramento", uf: "Rio Grande do Sul" },
  ],

  /* ---------------------------------------------------------------
     8. NÚMEROS (prova social)
     --------------------------------------------------------------- */
  numeros: [
    { valor: "2,2B+", rotulo: "Views no YouTube" },
    { valor: "12M+",  rotulo: "Ouvintes mensais" },  // TODO
    { valor: "6M+",   rotulo: "Seguidores" },        // TODO
    { valor: "15",    rotulo: "Anos de estrada" },
  ],

  /* ---------------------------------------------------------------
     9. SOBRE
     --------------------------------------------------------------- */
  sobre: {
    titulo: "De Brasília para o mundo",
    foto: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/foto-2.jpg",
    paragrafos: [   // texto aprovado pela equipe (Edu) em 16/11/2026
      "Gustavo da Hungria Neves, conhecido como Hungria Hip Hop, nasceu em Brasília e encontrou na música, ainda criança, uma forma de expressar sua identidade. Começou tocando teclado na igreja e, aos 14 anos, já escrevia as próprias letras.",
      "Em 2007, nasceu o projeto Hungria Hip Hop. Com uma sonoridade autêntica, que mistura rap, trap e melodias marcantes, o artista construiu uma trajetória que ultrapassou fronteiras e conquistou milhões de pessoas por todo o país.",
      "Com Brasília presente em sua essência, Hungria transformou vivências, sentimentos e histórias em músicas que atravessam gerações. Hoje, seus números impressionam, mas é a conexão com o público, traduzida em bilhões de reproduções e milhares de vozes cantando suas canções, que revela a dimensão de sua trajetória.",
    ],
  },

  /* ---------------------------------------------------------------
     9.5. TRAJETÓRIA — início / meio / agora (3 tempos da carreira)
     Troque as fotos por imagens que simbolizam cada fase.
     --------------------------------------------------------------- */
  jornada: {
    seloEsq: ["Do teclado da igreja", "aos bilhões de plays"],
    titulo: ["Uma voz", "três tempos"],
    seloDir: ["Hungria", "2007 — hoje"],
    fases: [
      { num: "01", titulo: "O Começo", script: "Onde tudo ganhou voz.",
        texto: "Brasília, os primeiros palcos e as primeiras composições. Do teclado da igreja às letras escritas ainda na adolescência, Hungria começou a construir uma identidade musical que carregaria e o fortaleceria ao longo da sua trajetória.",
        foto: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02295449e2983bad402b102363" },  // capa mais antiga (Antigas / Hip Hop Tuning, 2009)
      { num: "02", titulo: "A Ascensão", script: "Um som que conquistou o Brasil.",
        texto: "Com uma sonoridade própria e músicas que ganharam o país, Hungria transformou sua identidade em um fenômeno nacional. Canções como Um Pedido e Lembranças ultrapassaram fronteiras, conquistaram milhões de ouvintes e consolidaram seu nome na música brasileira.",
        foto: "https://i.scdn.co/image/ab67616d0000b2734d7f4371bae76e432c022ed7" },  // capa: Lembranças
      { num: "03", titulo: "O Legado", script: "Uma história que se conecta com gerações.",
        texto: "De Amor e Fé a Temporal e Preta, Hungria segue transformando sentimentos e histórias em músicas que fazem parte da vida de milhões de pessoas. Dos primeiros shows às grandes turnês, uma trajetória marcada por identificação, emoção e uma legião de fãs que canta cada verso. E essa história continua!",
        foto: "https://i.scdn.co/image/ab67616d0000b27357c4eac77883a5d57dae079d" },  // capa: Amor e Fé
    ],
  },

  /* ---------------------------------------------------------------
     10. GALERIA — troque pelos JPGs oficiais
     --------------------------------------------------------------- */
  galeria: [
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/foto-1.jpg", alt: "Hungria ao vivo" },
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/hero-portrait.jpg", alt: "Hungria no microfone" },
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/foto-3.jpg", alt: "Show ao vivo" },
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/feature-wide.jpg", alt: "Palco com coral e velas" },
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/foto-4.jpg", alt: "No palco" },
    { src: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/fotos/foto-5.jpg", alt: "Apresentação" },
  ],

  /* ---------------------------------------------------------------
     11. LOJA / MERCH (deixe a lista vazia [] pra esconder a seção)
     --------------------------------------------------------------- */
  loja: {
    linkLoja: "", // TODO link da loja oficial
    produtos: [
      { nome: "Camiseta Oficial", preco: "R$ 129,90", img: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/produtos/produto-1.svg", link: "#" }, // TODO
      { nome: "Moletom Tour",     preco: "R$ 249,90", img: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/produtos/produto-2.svg", link: "#" }, // TODO
      { nome: "Boné Logo",        preco: "R$  89,90", img: "https://pub-dfd14236a91140a5a1e41c79f0a83fe4.r2.dev/hungria/img/produtos/produto-3.svg", link: "#" }, // TODO
    ],
  },

  /* ---------------------------------------------------------------
     12. SEO
     --------------------------------------------------------------- */
  seo: {
    urlSite: "https://www.hungriaoficial.com.br", // TODO domínio final
  },
};
