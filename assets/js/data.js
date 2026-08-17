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
      foto: "assets/img/fotos/feature-wide.jpg",
      video: "assets/videos/hero.mp4?v=2",
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
      foto: "assets/img/fotos/hero-portrait.jpg",
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
    titulo: "O Playboy Rodou",
    tipo: "Single",
    ano: "2025",                                  // TODO
    capa: "assets/img/capas/lancamento.svg",      // TODO trocar pela arte real
    descricao:
      "O novo trabalho do Hungria chega com a assinatura que consagrou o som de Brasília: batida pesada, melodia de rádio e letra que gruda desde a primeira vez.",
    tipoEmbed: "album",
    spotifyId: "4Dikk6I3cwNpc91OXARpQu",
    smartlink: "", // TODO link do Onerpm/Distrokid que abre em todas plataformas
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
    { data: "2026-09-12", cidade: "Brasília",       uf: "DF", local: "Arena BRB Mané Garrincha", status: "ingressos", link: "#" }, // TODO
    { data: "2026-09-27", cidade: "São Paulo",      uf: "SP", local: "Espaço Unimed",            status: "esgotado",  link: "#" }, // TODO
    { data: "2026-10-10", cidade: "Rio de Janeiro", uf: "RJ", local: "Qualistage",               status: "ingressos", link: "#" }, // TODO
    { data: "2026-10-25", cidade: "Goiânia",        uf: "GO", local: "Arena Goiânia",            status: "emBreve",   link: "#" }, // TODO
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
    titulo: "Do DF pro mundo",
    foto: "assets/img/fotos/foto-2.jpg",
    paragrafos: [
      "Gustavo da Hungria Neves, o Hungria Hip Hop, nasceu em Brasília e começou na música ainda criança, tocando teclado na igreja. Aos 14 anos já compunha as próprias letras.",
      "Em 2007 o nome Hungria Hip Hop virou projeto, e o que era som de quebrada do DF atravessou o país: faixas que somam bilhões de execuções e uma legião que canta cada verso de cor.",
      "O som é uma mistura própria — rap, trap e melodia romântica — que virou trilha de rolê, de estrada e de história de amor mundo afora.", // TODO revisar com a equipe
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
      { num: "01", titulo: "O Começo", script: "Brasília, os primeiros versos.",
        texto: "Do teclado da igreja em Brasília aos primeiros raps que a quebrada do DF aprendeu de cor.",
        foto: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02295449e2983bad402b102363" },  // capa mais antiga (Antigas / Hip Hop Tuning, 2009)
      { num: "02", titulo: "A Ascensão", script: "O nome que o país cantou.",
        texto: "Dubai, Beijo com Trap, bilhões de plays — o som de Brasília virou trilha do mundo inteiro.",
        foto: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02055bbb715f18dc40b39908d6" },  // Zorro do Asfalto
      { num: "03", titulo: "O Legado", script: "Trilha de uma geração.",
        texto: "Arenas lotadas e uma legião que sabe cada verso. A história continua sendo escrita.",
        foto: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02afcc8db00abdf22cf6a82545" },  // mais recente (Virou Verão, 2025)
    ],
  },

  /* ---------------------------------------------------------------
     10. GALERIA — troque pelos JPGs oficiais
     --------------------------------------------------------------- */
  galeria: [
    { src: "assets/img/fotos/foto-1.jpg", alt: "Hungria ao vivo" },
    { src: "assets/img/fotos/hero-portrait.jpg", alt: "Hungria no microfone" },
    { src: "assets/img/fotos/foto-3.jpg", alt: "Show ao vivo" },
    { src: "assets/img/fotos/feature-wide.jpg", alt: "Palco com coral e velas" },
    { src: "assets/img/fotos/foto-4.jpg", alt: "No palco" },
    { src: "assets/img/fotos/foto-5.jpg", alt: "Apresentação" },
  ],

  /* ---------------------------------------------------------------
     11. LOJA / MERCH (deixe a lista vazia [] pra esconder a seção)
     --------------------------------------------------------------- */
  loja: {
    linkLoja: "", // TODO link da loja oficial
    produtos: [
      { nome: "Camiseta Oficial", preco: "R$ 129,90", img: "assets/img/produtos/produto-1.svg", link: "#" }, // TODO
      { nome: "Moletom Tour",     preco: "R$ 249,90", img: "assets/img/produtos/produto-2.svg", link: "#" }, // TODO
      { nome: "Boné Logo",        preco: "R$  89,90", img: "assets/img/produtos/produto-3.svg", link: "#" }, // TODO
    ],
  },

  /* ---------------------------------------------------------------
     12. SEO
     --------------------------------------------------------------- */
  seo: {
    urlSite: "https://www.hungriaoficial.com.br", // TODO domínio final
  },
};
