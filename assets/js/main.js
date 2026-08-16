/* =====================================================================
   HUNGRIA — SITE OFICIAL · main.js
   Cinematográfico, palco/rua/Brasília. Profundidade por composição e
   movimento controlado. Respeita prefers-reduced-motion e aparelho fraco.
   Todo o conteúdo sai de assets/js/data.js.
   ===================================================================== */
(function () {
  "use strict";

  const D = window.SITE_DATA;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  // ---- capacidades do dispositivo ----
  const reduz   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const temHover = matchMedia("(hover: hover)").matches && matchMedia("(pointer: fine)").matches;
  const ehMobile = matchMedia("(max-width: 900px)").matches;
  const fraco = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  // efeitos pesados (poeira, parallax por cursor, brasas) só quando faz sentido
  const efeitosPesados = temHover && !reduz && !ehMobile && !fraco;
  if (!temHover) document.documentElement.classList.add("no-cursor");

  const C = D.copy, A = D.artista;
  const spotifyUrl = D.links.spotify || `https://open.spotify.com/artist/${D.spotify.artistId}`;
  const PLATAFORMAS = [["spotify","Spotify"],["appleMusic","Apple Music"],["youtube","YouTube"],["deezer","Deezer"],["amazon","Amazon Music"],["tidal","Tidal"]];
  const REDES = [["instagram","Instagram"],["tiktok","TikTok"],["youtube","YouTube"],["whatsapp","WhatsApp"],["facebook","Facebook"],["x","X"]];
  const spEmbed = (tipo, id, altura) =>
    `<iframe src="https://open.spotify.com/embed/${tipo}/${id}?utm_source=generator&theme=0"
      height="${altura}" loading="lazy" frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      title="Player do Spotify"></iframe>`;

  /* ==================================================================
     INTRO (pulada sob reduced-motion)
     ================================================================== */
  const intro = $("#intro");
  // Preloader: logo entra suave (fade + sobe + desfoca), segura ~2,2s e a
  // cortina sobe revelando o site — no espírito do "Simple Preloader" do Framer.
  // A logo entra centralizada, segura, e então DESLIZA até parar exatamente
  // em cima da logo do header (mesmo tamanho e posição). A cortina preta só
  // some por trás — efeito "magic move": a logo da intro vira a do header.
  const introLogo = $(".intro__logo"), introImg = introLogo && introLogo.querySelector("img");
  const encerrarIntro = () => {
    const headerImg = $(".hd__logo img");
    if (introLogo && introImg && headerImg) {
      const a = introImg.getBoundingClientRect(), b = headerImg.getBoundingClientRect();
      if (a.height && b.height) {
        const sc = b.height / a.height;
        const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
        const dy = (b.top + b.height / 2) - (a.top + a.height / 2);
        introLogo.style.transition = "transform .85s cubic-bezier(.7,0,.2,1)";
        introLogo.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sc.toFixed(3)})`;
      }
    }
    // com a logo pousando no header, a cortina faz fade revelando o hero
    setTimeout(() => { intro.classList.add("off"); document.body.classList.add("go"); }, 600);
    setTimeout(() => (intro.style.display = "none"), 1450);
  };
  // Sempre roda (mesmo com "movimento reduzido"): o dono do site quer a abertura.
  requestAnimationFrame(() => intro.classList.add("reveal-logo"));
  setTimeout(encerrarIntro, 2000);

  // ── SILK BACKGROUND (WebGL próprio, sem biblioteca): seda em movimento
  //    sobre a foto de fundo (mix screen). Pausa quando a aba está oculta. ──
  (() => {
    const cv = document.getElementById("silkbg"); if (!cv) return;
    const gl = cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, powerPreference: "low-power" });
    if (!gl) { cv.style.display = "none"; return; }
    gl.clearColor(0, 0, 0, 0); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const vs = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";
    const fs = "precision highp float;uniform float uTime;uniform vec2 uRes;vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vec2 uv=gl_FragCoord.xy/uRes;vec3 c0=vec3(0.82,0.11,0.13);vec3 c1=vec3(0.12,0.02,0.05);vec3 c2=vec3(0.70,0.19,0.08);vec3 c3=vec3(0.30,0.03,0.10);float u=fract(uv.x+uTime*0.05);vec3 ramp;if(u<0.25)ramp=mix(c0,c1,u*4.0);else if(u<0.5)ramp=mix(c1,c2,(u-0.25)*4.0);else if(u<0.75)ramp=mix(c2,c3,(u-0.5)*4.0);else ramp=mix(c3,c0,(u-0.75)*4.0);float hn=exp(snoise(vec2(uv.x*2.0+uTime*0.10,uTime*0.22))*0.5);float he=uv.y*2.0-hn+0.2;float a=smoothstep(-0.05,0.45,0.6*he)*0.82;gl_FragColor=vec4(ramp*a,a);}";
    const mk = (ty, s) => { const sh = gl.createShader(ty); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
    const pr = gl.createProgram(); gl.attachShader(pr, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.style.display = "none"; return; }
    gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const la = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(pr, "uTime"), uR = gl.getUniformLocation(pr, "uRes");
    const dpr = Math.min(1.1, window.devicePixelRatio || 1);
    const resize = () => { cv.width = Math.max(2, Math.round(innerWidth * dpr)); cv.height = Math.max(2, Math.round(innerHeight * dpr)); gl.viewport(0, 0, cv.width, cv.height); };
    resize(); addEventListener("resize", resize, { passive: true });
    const t0 = performance.now(); let vis = true, raf = 0;
    const loop = () => { if (!vis) { raf = 0; return; } raf = requestAnimationFrame(loop); gl.uniform1f(uT, (performance.now() - t0) * 0.001); gl.uniform2f(uR, cv.width, cv.height); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3); };
    document.addEventListener("visibilitychange", () => { vis = !document.hidden; if (vis && !raf) loop(); });
    loop();
  })();

  // ── HERO PRELOADER (autônomo): após a intro (body.go), um quadro cicla
  //    imagens com wipe e expande até virar o hero. Fail-safe: nunca prende.
  (() => {
    const hpre = $("#hpre"); if (!hpre) return;
    const frame = $("#hpreFrame"), imgs = $$(".hpre__img", hpre);
    if (!frame || !imgs.length) return;
    let iniciou = false;
    const finish = () => { hpre.classList.add("done"); document.body.classList.remove("lock"); setTimeout(() => (hpre.style.display = "none"), 600); };
    const play = () => {
      if (iniciou) return; iniciou = true;
      if (window.scrollY > 40) { hpre.style.display = "none"; return; }   // fora do topo (hero): não roda a abertura
      document.body.classList.add("lock"); hpre.classList.add("on");
      imgs[0].classList.add("show");
      let i = 0;
      const iv = setInterval(() => {
        i++;
        if (i < imgs.length) imgs[i].classList.add("show");
        else { clearInterval(iv); frame.classList.add("expand"); setTimeout(finish, 850); }
      }, 300);
      setTimeout(finish, 6000);   // fail-safe absoluto
    };
    if (document.body.classList.contains("go")) requestAnimationFrame(play);
    else { const mo = new MutationObserver(() => { if (document.body.classList.contains("go")) { mo.disconnect(); setTimeout(play, 500); } }); mo.observe(document.body, { attributes: true, attributeFilter: ["class"] }); }
  })();

  /* ==================================================================
     CURSOR
     ================================================================== */
  const cur = $("#cur");
  if (temHover && !reduz) {
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; cur.classList.add("on"); });
    (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => cur.classList.toggle("hov", !!e.target.closest("a,button,[data-cur],.fancard,.card,.dates__row")));
  }

  // atmosfera: desloca MUITO de leve com o cursor → sensação de "metros atrás"
  const atmos = $("#atmos");
  const pagebgImg = $(".pagebg__img");   // fundo fixo: camada mais profunda → move MENOS
  if ((atmos || pagebgImg) && efeitosPesados) {
    let ax = 0, ay = 0, tx = 0, ty = 0;
    addEventListener("mousemove", (e) => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, { passive: true });
    (function loop() { ax += (tx - ax) * .04; ay += (ty - ay) * .04;
      if (atmos) atmos.style.transform = `translate3d(${(-ax * 18).toFixed(1)}px, ${(-ay * 18).toFixed(1)}px, 0)`;
      if (pagebgImg) pagebgImg.style.transform = `translate3d(${(-ax * 9).toFixed(1)}px, ${(-ay * 9).toFixed(1)}px, 0) scale(1.06)`;
      requestAnimationFrame(loop); })();
  }

  /* ==================================================================
     HEADER / MENU / SCROLLSPY
     ================================================================== */
  const hd = $("#hd"), burger = $("#burger"), mnav = $("#mnav");
  const abrirMenu = (v) => { burger.classList.toggle("open", v); mnav.classList.toggle("open", v); document.body.classList.toggle("lock", v); burger.setAttribute("aria-expanded", String(v)); };
  burger.addEventListener("click", () => abrirMenu(!mnav.classList.contains("open")));
  $$("#mnav a").forEach((a) => a.addEventListener("click", () => abrirMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") { abrirMenu(false); fecharModal(); } });

  /* ==================================================================
     REVEAL (rede de segurança) + SCROLLSPY + PARALLAX
     ================================================================== */
  const pend = new Set();
  const ligar = (el) => { pend.delete(el); io.unobserve(el); el.classList.add("on"); $$(".stats__val[data-val]", el).forEach(contar); };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) ligar(e.target); }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  const observar = () => $$(".reveal").forEach((el) => { if (!el.classList.contains("on") && !pend.has(el)) { pend.add(el); io.observe(el); } });
  const checarReveal = () => { if (!pend.size) return; const lim = innerHeight * .94; [...pend].forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < lim && r.bottom > 0) ligar(el); }); };

  // parallax do feature (foto desliza mais devagar que o scroll)
  const featPhoto = $(".feat__photo");
  const featParallax = () => {
    if (!featPhoto || reduz) return;
    const media = $(".feat__media"); if (!media) return;
    const r = media.getBoundingClientRect();
    if (r.bottom < -80 || r.top > innerHeight + 80) return;
    const prog = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // ~[-1,1]
    featPhoto.style.transform = `translateY(${prog * (ehMobile ? -18 : -46)}px)`;
  };

  let ticking = false;
  const onScroll = () => {
    hd.classList.toggle("stuck", scrollY > 30);
    const pos = scrollY + innerHeight * .4; let atual = "";
    $$("main section[id]").forEach((s) => { if (s.offsetTop <= pos) atual = s.id; });
    $$(".hd__nav a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + atual));
    featParallax();
    // mobile: leve deslocamento da luz do hero com o scroll
    if (!efeitosPesados && !reduz) { const l = $("#heroLight"); if (l) l.style.transform = `translateY(${scrollY * .04}px)`; }
    checarReveal(); ticking = false;
  };
  addEventListener("scroll", () => { checarReveal(); if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", () => { ticking = false; onScroll(); layoutFan(); }, { passive: true });

  // contador dos números
  const contar = (el) => {
    if (el.dataset.done) return; el.dataset.done = "1";
    const m = String(el.dataset.val).match(/^([\d.,]+)(.*)$/);
    if (!m || reduz) { el.textContent = el.dataset.val; return; }
    const casas = (m[1].split(",")[1] || "").length, alvo = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
    const t = performance.now(), dur = 1400;
    (function passo(now) { const p = Math.min(1, (now - t) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (alvo * e).toFixed(casas).replace(".", ",") + m[2]; if (p < 1) requestAnimationFrame(passo); })(t);
  };

  /* ==================================================================
     HERO — camadas com parallax por cursor (desktop) e poeira
     ================================================================== */
  const stage = $("#heroStage"), heroLight = $("#heroLight"), heroEl = $(".hero");
  // o topo só anima enquanto está na tela — fora dela, nada roda
  let heroVisivel = true;
  if (heroEl) new IntersectionObserver((es) => { heroVisivel = es[0].isIntersecting; }, { threshold: 0 }).observe(heroEl);

  if (efeitosPesados && stage) {
    const layers = $$(".hero__layer[data-depth], .hero__inner > [data-depth]");
    const deps = layers.map((el) => +el.dataset.depth || 0);
    let tx = 0, ty = 0, cx2 = 0, cy2 = 0;
    addEventListener("mousemove", (e) => {
      const nx = (e.clientX / innerWidth - .5), ny = (e.clientY / innerHeight - .5);
      tx = nx; ty = ny;
      if (heroLight) { heroLight.style.setProperty("--lx", (32 + nx * 22) + "%"); heroLight.style.setProperty("--ly", (26 + ny * 18) + "%"); }
    }, { passive: true });
    (function loop() {
      requestAnimationFrame(loop);
      if (!heroVisivel) return;
      const dx = tx - cx2, dy = ty - cy2;
      // parado o suficiente? não escreve nada (evita trabalho por frame à toa)
      if (Math.abs(dx) < .0004 && Math.abs(dy) < .0004) return;
      cx2 += dx * .06; cy2 += dy * .06;
      for (let i = 0; i < layers.length; i++) layers[i].style.transform = `translate3d(${-cx2 * deps[i]}px, ${-cy2 * deps[i]}px, 0)`;
    })();
  }

  // poeira/partículas discretas (só desktop capaz)
  const dust = $("#heroDust");
  if (efeitosPesados && dust && dust.getContext) {
    const ctx = dust.getContext("2d");
    let w, h, parts;
    const build = () => {
      const r = dust.getBoundingClientRect(); w = dust.width = r.width; h = dust.height = r.height;
      const n = Math.min(46, Math.round(w / 34));
      parts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .3, s: Math.random() * .28 + .05, o: Math.random() * .4 + .1, red: Math.random() < .18 }));
    };
    build(); addEventListener("resize", build, { passive: true });
    // desenha a ~30fps e só com o topo visível (poeira não precisa de 60fps)
    let ultimo = 0;
    (function draw(t) {
      requestAnimationFrame(draw);
      if (!heroVisivel || t - ultimo < 33) return;
      ultimo = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.s; p.x += Math.sin(p.y * .01) * .12;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fillStyle = p.red ? `rgba(181,22,32,${p.o})` : `rgba(242,240,236,${p.o})`;
        ctx.fill();
      }
    })(0);
  }

  /* ==================================================================
     MODAL
     ================================================================== */
  const modal = $("#modal"), modalBox = $("#modalBox");
  const abrirModal = (html) => { modalBox.innerHTML = html; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); };
  const fecharModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); setTimeout(() => (modalBox.innerHTML = ""), 400);
    $$(".splayer.is-playing").forEach((s) => s.classList.remove("is-playing"));
    $$(".fancard.is-ejecting").forEach((c) => c.classList.remove("is-ejecting")); };
  $("#modalClose").addEventListener("click", fecharModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) fecharModal(); });

  /* ==================================================================
     RENDER
     ================================================================== */
  $("#year").textContent = new Date().getFullYear();
  $("#hdCta").href = spotifyUrl;

  // --- hero ---
  const H = C.hero;
  const heroVideo = $("#heroVideo"), heroImg = $("#heroImg"), heroPlay = $("#heroPlay");
  if (H.video) {
    // A foto fica como fundo e o vídeo assume por cima quando REALMENTE tocar.
    // Se o navegador bloquear o autoplay, o botão de play aparece — o gesto
    // do usuário sempre libera o vídeo, então o hero NUNCA fica sem vídeo.
    heroImg.src = "assets/img/fotos/hero-start.jpg";   // background do hero (frame de 5s, casa com o take do vídeo)
    heroImg.style.objectPosition = H.foco || "center 34%";
    heroVideo.src = H.video;
    heroVideo.style.objectPosition = H.foco || "center 34%";
    const heroReelVid = $("#heroReelVid"); if (heroReelVid) { heroReelVid.src = H.video; const rp = heroReelVid.play(); if (rp) rp.catch(() => {}); }
    // começa num trecho mais claro do show (primeiros segundos são escuros)
    heroVideo.addEventListener("loadedmetadata", () => { try { heroVideo.currentTime = 5; } catch (e) {} }, { once: true });
    // usa CLASSE (não inline opacity) pra não brigar com a regra base do CSS
    const camada = heroImg.parentElement;   // .hero__photo
    const mostrar = (v) => camada.classList.toggle("show-video", !!v);
    const tentarTocar = () => { const p = heroVideo.play(); if (p) p.catch(() => {}); };
    const esconderPlay = () => heroPlay.classList.remove("show");
    const mostrarPlay = () => heroPlay.classList.add("show");
    let aguardandoPlay = 0;
    heroVideo.addEventListener("playing", () => { clearTimeout(aguardandoPlay); mostrar(true); esconderPlay(); });
    heroVideo.addEventListener("pause", () => { if (heroVideo.currentTime < 0.1) { mostrar(false); } });
    heroVideo.addEventListener("error", () => { mostrar(false); esconderPlay(); });
    heroPlay.addEventListener("click", (e) => { e.preventDefault(); esconderPlay(); tentarTocar(); });
    // ── SINCRONIA COM A ABERTURA + tocar só quando o hero está visível ──
    // O vídeo fica parado no frame inicial (5s = último take da abertura) até
    // (a) a abertura terminar e (b) o hero estar na tela. Fora do hero: pausa.
    const hpreEl = document.getElementById("hpre");
    const aberturaPronta = () => !hpreEl || hpreEl.classList.contains("done") || hpreEl.style.display === "none";
    const heroSec = document.getElementById("inicio");
    let heroVisivel = true, liberou = false;
    const iniciarHero = () => {
      if (!aberturaPronta() || !heroVisivel) return;
      clearTimeout(aguardandoPlay);
      liberou = true; tentarTocar();
      aguardandoPlay = setTimeout(() => { if (heroVideo.paused || heroVideo.readyState < 3) { mostrar(false); mostrarPlay(); } }, 1200);
    };
    if (heroSec && "IntersectionObserver" in window) {
      new IntersectionObserver((es) => es.forEach((en) => {
        heroVisivel = en.isIntersecting;
        if (heroVisivel) iniciarHero(); else heroVideo.pause();
      }), { threshold: 0.2 }).observe(heroSec);
    }
    if (hpreEl && !aberturaPronta()) {
      const mo = new MutationObserver(() => { if (aberturaPronta()) { mo.disconnect(); iniciarHero(); } });
      mo.observe(hpreEl, { attributes: true, attributeFilter: ["class", "style"] });
    } else { iniciarHero(); }
    // gesto do usuário destrava onde o autoplay é bloqueado
    const desbloquear = () => { if (liberou) tentarTocar(); removeEventListener("pointerdown", desbloquear); removeEventListener("keydown", desbloquear); };
    addEventListener("pointerdown", desbloquear); addEventListener("keydown", desbloquear);
  } else {
    heroVideo.remove();
    if (heroPlay) heroPlay.remove();
    heroImg.src = H.foto;
    heroImg.style.objectPosition = H.foco || "center 34%";
  }
  const heroTitleEl = $("#heroTitle");
  if (heroTitleEl) heroTitleEl.innerHTML = `<span>${esc(H.titulo)}</span>`;
  const heroAgenda = $("#heroAgenda");
  if (heroAgenda) heroAgenda.textContent = H.ctaAgenda || "Ver agenda";


  /* --- CardDeck: leque com os destaques (o catálogo completo vai na lista) - */
  const deck = $("#deck");
  // todas as capas viram CDs no leque; as 5 primeiras (pedidas) ficam à frente
  const destaques = D.discografia;
  deck.innerHTML = destaques.map((r, i) => `
    <article class="fancard" data-i="${i}" tabindex="0" role="button" aria-label="Ouvir ${esc(r.titulo)}" style="--i:${i}">
      <div class="fancard__disc" aria-hidden="true">
        <span class="fancard__label"><img src="${esc(r.capa)}" alt="" loading="lazy"></span>
      </div>
      <div class="fancard__cover">
        <img src="${esc(r.capa)}" alt="Capa de ${esc(r.titulo)}" loading="lazy">
        <span class="fancard__sheen"></span>
        <div class="fancard__cap"><div class="fancard__name">${esc(r.titulo)}</div><div class="fancard__sub">${esc(r.tipo)} · ${esc(r.ano)}</div></div>
      </div>
    </article>`).join("") + `<span class="fandeck__hint">passe o mouse • clique para ouvir</span>`;

  const fans = $$(".fancard", deck);
  const N = fans.length, mid = (N - 1) / 2;
  const CFG = { spacing: 232, rot: 0, arc: 0, decay: 0 };
  let hoverIdx = -1;

  // layout agendado em rAF: vários eventos no mesmo frame = 1 só escrita
  let fanQueued = false;
  const layoutFan = () => {
    if (fanQueued) return;
    fanQueued = true;
    requestAnimationFrame(() => {
      fanQueued = false;
      const compact = matchMedia("(max-width: 640px)").matches;
      // espaçamento ADAPTATIVO: cabe as N capas na largura do leque; quanto
      // mais CDs, mais elas se sobrepõem (como um baralho aberto em leque).
      const deckW = deck.clientWidth || 1100;
      const cardW = (fans[0] && fans[0].offsetWidth) || (compact ? 118 : 200);
      const fit = (deckW * (compact ? 0.98 : 0.94) - cardW) / Math.max(1, N - 1);
      const sp = Math.max(compact ? 26 : 54, Math.min(compact ? 74 : CFG.spacing, fit));
      // amplitude do zigue-zague vertical encolhe quando há muitas capas
      const ampl = Math.min(12, 130 / N);
      for (let i = 0; i < N; i++) {
        const c = fans[i], off = i - mid, dist = Math.abs(off), zig = (i % 2 === 0) ? -1 : 1;
        // espalhado (zigue-zague pela área) em vez de arco: sem curva, sem rotação progressiva
        let x = off * sp, y = zig * (28 + dist * ampl), rot = zig * 4, sc = 1, z = 100 - Math.round(dist * 8);
        if (hoverIdx > -1) {
          if (i === hoverIdx) { y -= 54; sc *= 1.14; rot = 0; z = 200; }
          else { const dir = i < hoverIdx ? -1 : 1; x += dir * 60 / Math.max(1, Math.abs(i - hoverIdx)); }
        }
        // translate3d = camada na GPU
        const t = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${sc})`;
        if (c._t !== t) { c.style.transform = t; c._t = t; }   // só escreve se mudou
        if (c._z !== z) { c.style.zIndex = z; c._z = z; }
      }
    });
  };
  layoutFan();

  fans.forEach((c) => {
    const sheen = $(".fancard__sheen", c);
    let rect = null, sheenQueued = false, mx = 0, my = 0;
    // Enter: ir DIRETO de um card pro outro. Não colapsamos o leque no
    // mouseleave de cada card (isso causava o recolapsa/reabre a cada
    // card ao varrer o mouse — o "travado"). Só quem colapsa é o leque
    // inteiro (deck.mouseleave), então o hover flui suave entre as capas.
    c.addEventListener("mouseenter", () => {
      rect = c.getBoundingClientRect();   // mede UMA vez ao entrar
      const i = +c.dataset.i;
      if (hoverIdx === i) return;         // já é o card ativo: nada a fazer
      hoverIdx = i;
      for (let k = 0; k < fans.length; k++) fans[k].classList.toggle("is-hover", k === i);
      layoutFan();
    });
    if (temHover) c.addEventListener("mousemove", (e) => {
      if (!rect) return;                  // sem medir layout a cada movimento
      mx = (e.clientX - rect.left) / rect.width * 100;
      my = (e.clientY - rect.top) / rect.height * 100;
      if (sheenQueued) return;
      sheenQueued = true;
      requestAnimationFrame(() => { sheenQueued = false; sheen.style.setProperty("--mx", mx + "%"); sheen.style.setProperty("--my", my + "%"); });
    }, { passive: true });
    const abrir = () => {
      const r = D.discografia[+c.dataset.i];
      c.classList.add("is-ejecting");           // o disco "sai" do encarte antes de abrir
      setTimeout(() => {
        if (r.spotifyId) abrirModal(spEmbed(r.tipoEmbed || "album", r.spotifyId, 420).replace("<iframe", '<iframe class="aud"'));
        else window.open(spotifyUrl, "_blank", "noopener");
      }, 720);
    };
    c.addEventListener("click", abrir);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); } });
  });
  // colapsa o leque só quando o mouse sai da área inteira (não entre cards)
  deck.addEventListener("mouseleave", () => {
    if (hoverIdx === -1) return;
    hoverIdx = -1;
    for (let k = 0; k < fans.length; k++) fans[k].classList.remove("is-hover");
    layoutFan();
  });

  // --- lista de faixas premium (capa · nome · info · onda · play/pause) ---
  const faixas = D.discografia.filter((r) => r.spotifyId);
  const barsHTML = Array.from({ length: 16 }, (_, i) => `<i style="--i:${i}"></i>`).join("");
  const playSvg = `<svg class="ico-play" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M11 6.13a1 1 0 0 1 0 1.74L1.5 13.35A1 1 0 0 1 0 12.48V1.52A1 1 0 0 1 1.5.65L11 6.13Z"/></svg>`;
  const pauseSvg = `<svg class="ico-pause" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="3.4" height="12" rx="1"/><rect x="7.6" y="1" width="3.4" height="12" rx="1"/></svg>`;
  const playersEl = $("#players");
  if (playersEl) {
    playersEl.innerHTML = faixas.map((r, i) => `
      <article class="splayer reveal" data-i="${i}" tabindex="0" role="button" aria-label="Tocar ${esc(r.titulo)}" style="--d:${(i % 3) * 60}ms">
        <div class="splayer__info">
          <div class="splayer__art"><img src="${esc(r.capa)}" alt="Capa de ${esc(r.titulo)}" loading="lazy"></div>
          <div class="splayer__meta">
            <div class="splayer__title">${esc(r.titulo)}</div>
            <div class="splayer__sub"><span>${esc(r.tipo)}</span> • <span>${esc(A.nome)}</span></div>
          </div>
        </div>
        <div class="splayer__right">
          <div class="splayer__wave" aria-hidden="true">${barsHTML}</div>
          <button class="splayer__btn" aria-label="Tocar ${esc(r.titulo)}" tabindex="-1">${playSvg}${pauseSvg}</button>
        </div>
      </article>`).join("");
    const splayers = $$(".splayer", playersEl);
    const tocarFaixa = (card) => {
      const r = faixas[+card.dataset.i];
      splayers.forEach((s) => s.classList.remove("is-playing"));
      card.classList.add("is-playing");
      if (r.spotifyId) abrirModal(spEmbed(r.tipoEmbed || "track", r.spotifyId, 420).replace("<iframe", '<iframe class="aud"'));
      else window.open(spotifyUrl, "_blank", "noopener");
    };
    splayers.forEach((card) => {
      const btn = $(".splayer__btn", card);
      if (btn) btn.addEventListener("click", (e) => { e.stopPropagation(); tocarFaixa(card); });
      card.addEventListener("click", () => tocarFaixa(card));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tocarFaixa(card); } });
    });
  }

  // --- plataformas / redes ---
  const platHTML = PLATAFORMAS.filter(([k]) => D.links[k]).map(([k, n]) => `<a href="${esc(D.links[k])}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
  const pfEl = $("#platforms"); if (pfEl) pfEl.innerHTML = platHTML;   // #platforms pode não existir mais
  $("#footerPlat").insertAdjacentHTML("beforeend", platHTML);
  const socialHTML = REDES.filter(([k]) => D.links[k]).map(([k, n]) => `<a href="${esc(D.links[k])}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
  $("#footerSocial").insertAdjacentHTML("beforeend", socialHTML); $("#mnavSocial").innerHTML = socialHTML;

  // (A antiga seção "feature" virou o bloco MANIFESTO, que é HTML estático —
  //  não precisa de render por JS. O bloco antigo referenciava #featImg etc.,
  //  que não existem mais, e era o que travava o site inteiro.)

  // (Seção "Clipes/Vídeos" removida.)

  // --- turnê ---
  const MES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const TAG = { ingressos: "Ingressos", esgotado: "Esgotado", emBreve: "Em breve" };
  const futuros = (D.shows || []).filter((s) => new Date(s.data + "T23:59:59") >= new Date()).sort((a, b) => a.data.localeCompare(b.data));
  $("#shows-list").innerHTML = futuros.length ? futuros.map((s, i) => {
    const d = new Date(s.data + "T12:00:00"), tag = TAG[s.status] || TAG.emBreve, on = s.status === "ingressos" && s.link && s.link !== "#";
    return `<div class="dates__row reveal" style="--d:${i * 60}ms">
      <span class="dates__d">${String(d.getDate()).padStart(2, "0")} ${MES[d.getMonth()]}</span>
      <div><div class="dates__city">${esc(s.cidade)} <span class="dates__uf">/ ${esc(s.uf)}</span></div><div class="dates__venue">${esc(s.local)}</div></div>
      ${on ? `<a class="dates__tag" href="${esc(s.link)}" target="_blank" rel="noopener" data-cur>${tag}</a>` : `<span class="dates__tag">${tag}</span>`}
    </div>`; }).join("") : `<p class="dates__empty reveal">Nenhuma data confirmada no momento. Novas cidades em breve.</p>`;

  // --- sobre (biografia + logo com efeito heatmap) ---
  $("#sobreTitulo").textContent = D.sobre.titulo;
  $("#bioText").innerHTML = D.sobre.paragrafos.map((p, i) => `<p class="reveal" style="--d:${i * 90}ms">${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.numeros.map((n, i) => `<div class="stats__item reveal" style="--d:${(i % 4) * 70}ms"><div class="stats__val" data-val="${esc(n.valor)}">0</div><div class="stats__lbl">${esc(n.rotulo)}</div></div>`).join("");

  // --- trajetória (início · meio · agora) ---
  const J = D.jornada;
  if (J && $("#jornada-grid")) {
    const linhas = (a) => (a || []).map(esc).join("<br>");
    if ($("#jornadaTitulo")) $("#jornadaTitulo").innerHTML = linhas(J.titulo);
    if ($("#jornadaSeloEsq")) $("#jornadaSeloEsq").innerHTML = linhas(J.seloEsq);
    if ($("#jornadaSeloDir")) $("#jornadaSeloDir").innerHTML = linhas(J.seloDir);
    $("#jornada-grid").innerHTML = (J.fases || []).map((f, i) => `
      <article class="jrn__col reveal" style="--d:${i * 90}ms">
        <div class="jrn__body">
          <h3 class="jrn__title">${esc(f.titulo)}</h3>
          <p class="jrn__script">${esc(f.script)}</p>
          <p class="jrn__desc">${esc(f.texto)}</p>
        </div>
        <div class="jrn__media">
          <div class="jrn__frame" data-parallax><img src="${esc(f.foto)}" alt="${esc(f.titulo)}" loading="lazy"></div>
          <span class="jrn__num" aria-hidden="true">${esc(f.num)}</span>
        </div>
      </article>`).join("");
  }

  // ── EFEITOS 3D (inspirado no site da Sand) ──────────────────────────────
  // tilt 3D no hover dos cards de mídia (perspectiva no pai + rotateX/Y)
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const tilt = (el, max) => {
      let raf = 0, rx = 0, ry = 0;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        rx = -(((e.clientY - r.top) / r.height) - .5) * max;
        ry = (((e.clientX - r.left) / r.width) - .5) * max;
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; });
      }, { passive: true });
      el.addEventListener("pointerleave", () => { el.style.transform = "rotateX(0deg) rotateY(0deg)"; });
    };
    $$(".jrn__media").forEach((el) => tilt(el, 13));
    $$(".splayer").forEach((el) => tilt(el, 7));
  }
  // scroll suave com inércia (Lenis) — degrada pro scroll nativo se ausente
  if (window.Lenis) {
    const lenis = new window.Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: 1 });
    const rafL = (t) => { lenis.raf(t); requestAnimationFrame(rafL); };
    requestAnimationFrame(rafL);
  }

  // ── PARALLAX EM CAMADAS: a foto (fundo) desliza mais devagar que o conteúdo.
  //    data-parallax vai no CONTAINER (que recorta); a <img> interna se move.
  //    Versão simplificada no mobile e com prefers-reduced-motion.
  const parClips = $$("[data-parallax]");
  if (parClips.length) {
    const fator = (ehMobile ? .6 : 1) * (reduz ? .75 : 1);   // simplificado, mas ainda visível
    const alvos = parClips.map((c) => ({ c, im: c.querySelector("img") })).filter((o) => o.im);
    let ptick = false;
    const pupd = () => {
      ptick = false;
      const vh = innerHeight;
      for (const { c, im } of alvos) {
        const r = c.getBoundingClientRect();
        if (r.bottom < -40 || r.top > vh + 40) continue;            // fora da tela: não mexe
        const prog = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
        const p = prog < -1 ? -1 : prog > 1 ? 1 : prog;
        const amp = Math.min(r.height, vh) * 0.055 * fator;
        im.style.transform = `translate3d(0, ${(-p * amp).toFixed(1)}px, 0) scale(${(1.07 + Math.abs(p) * 0.05).toFixed(3)})`;
      }
    };
    const ponscr = () => { if (!ptick) { ptick = true; requestAnimationFrame(pupd); } };
    addEventListener("scroll", ponscr, { passive: true });
    addEventListener("resize", ponscr, { passive: true });
    pupd();
  }

  // ── TEXTO QUE ACENDE NO SCROLL (palavra a palavra) ──────────────────────
  const mtx = $("#mtxText");
  if (mtx) {
    const wordify = (parent) => {
      [...parent.childNodes].forEach((node) => {
        if (node.nodeType === 3) {                         // nó de texto → vira palavras
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) frag.appendChild(document.createTextNode(tok));
            else { const s = document.createElement("span"); s.className = "mtx__w"; s.textContent = tok; frag.appendChild(s); }
          });
          parent.replaceChild(frag, node);
        } else if (node.nodeType === 1) { wordify(node); }  // entra nos <span class="mtx__u">
      });
    };
    $$("p", mtx).forEach(wordify);
    const words = $$(".mtx__w", mtx);
    const sec = mtx.closest("section");
    const floor = reduz ? 0.3 : 0.14;
    let wtick = false;
    const wupd = () => {
      wtick = false;
      const r = sec.getBoundingClientRect(), n = words.length, vh = innerHeight;
      // progresso da seção no scroll → frente de "acendimento" palavra a palavra
      const p = Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (r.height * 0.7)));
      const front = p * (n + 6);
      for (let i = 0; i < n; i++) {
        let o = front - i; o = o < 0 ? 0 : o > 1 ? 1 : o;
        words[i].style.opacity = (floor + (1 - floor) * o).toFixed(3);
      }
    };
    const wscr = () => { if (!wtick) { wtick = true; requestAnimationFrame(wupd); } };
    addEventListener("scroll", wscr, { passive: true });
    addEventListener("resize", wscr, { passive: true });
    wupd();
  }

  // ── RADIUS NO SCROLL: os cantos do card da faixa arredondam ao centralizar
  //    na tela (réplica do RadiusOnScroll do Framer). Cheap: só border-radius.
  const bandaSec = $("#faixa"), bandaCard = $("#bandaCard");
  if (bandaSec && bandaCard) {
    if (reduz) {
      bandaCard.style.setProperty("--br", "26px");                 // estático, sem animar
    } else {
      const maxR = 46;
      let rtick = false;
      const rupd = () => {
        rtick = false;
        const r = bandaSec.getBoundingClientRect(), vh = innerHeight;
        if (r.bottom < 0 || r.top > vh) return;                    // fora da tela
        const dist = Math.abs((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
        const p = Math.max(0, Math.min(1, 1 - dist));              // 1 = centralizado
        bandaCard.style.setProperty("--br", (p * maxR).toFixed(1) + "px");
      };
      const ronscr = () => { if (!rtick) { rtick = true; requestAnimationFrame(rupd); } };
      addEventListener("scroll", ronscr, { passive: true });
      addEventListener("resize", ronscr, { passive: true });
      rupd();
    }
  }

  // ── GRANDE HIT: a "pílula" (©2026 · vídeo · Grande Hit) se ABRE no scroll
  //    até o clipe preencher a tela; depois surge o título. Usa clip-path
  //    (sem reflow) e respeita reduced-motion.
  const ghit = $("#grande-hit"), ghitPin = $("#ghitPin"), ghitReel = $("#ghitReel"),
        ghitPill = $("#ghitPill"), ghitSlot = $(".ghit__slot"), ghitVideo = $("#ghitVideo");
  if (ghit && ghitPin && ghitPill && ghitSlot) {
    let sW = 0, sH = 0;
    const medir = () => { const r = ghitSlot.getBoundingClientRect(); sW = r.width; sH = r.height; };
    medir();
    const setClip = (ct, cl, rad) => { ghitPill.style.clipPath =
      `inset(${ct.toFixed(1)}px ${cl.toFixed(1)}px ${ct.toFixed(1)}px ${cl.toFixed(1)}px round ${rad.toFixed(1)}px)`; };
    if (reduz) {
      setClip(0, 0, 0); if (ghitReel) ghitReel.style.opacity = "0"; ghitPin.classList.add("is-full");
    } else {
      let gt = false;
      const gupd = () => {
        gt = false;
        const r = ghit.getBoundingClientRect(), vh = innerHeight, vw = innerWidth;
        if (r.bottom < 0 || r.top > vh) return;
        const p = Math.max(0, Math.min(1, -r.top / (r.height - vh)));
        const e = 1 - Math.pow(1 - p, 3), k = Math.min(1, e * 1.15);
        setClip(((vh - sH) / 2) * (1 - k), ((vw - sW) / 2) * (1 - k), (sH / 2) * (1 - k));
        if (ghitReel) ghitReel.style.opacity = Math.max(0, 1 - k * 2.6).toFixed(2);
        ghitPin.classList.toggle("is-full", k > 0.72);
      };
      const gscr = () => { if (!gt) { gt = true; requestAnimationFrame(gupd); } };
      addEventListener("scroll", gscr, { passive: true });
      addEventListener("resize", () => { medir(); gscr(); }, { passive: true });
      gupd();
    }
    if (ghitVideo) {                                                  // toca só quando visível (poupa dados/bateria)
      ghitVideo.muted = true;
      const ioV = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) ghitVideo.play().catch(() => {}); else ghitVideo.pause();
      }), { threshold: 0.05 });
      ioV.observe(ghit);
    }
  }

  // ── DEPTH BLUR CAROUSEL (coverflow 3D): centro grande, laterais recuam em
  //    profundidade (z) e giram (rotateY); arraste ou scroll horizontal, com snap.
  const dbcTrack = $("#dbcTrack");
  if (dbcTrack) {
    const cards = $$(".dbc__card", dbcTrack), N = cards.length;
    const imgs = cards.map((c) => c.firstElementChild);
    const base = () => { const k = Math.max(.52, Math.min(1, innerWidth / 1200));
      return { iw: 340 * k, ih: 500 * k, sw: 220 * k, sh: 360 * k, gap: 42 * k }; };
    let cfg = base(), scroll = 0, target = 0, snapT = 0, raf = 0, visivel = false;
    const wrap = (o) => { let m = ((o % N) + N) % N; if (m > N / 2) m -= N; return m; };
    const lerp = (a, b, t) => a + (b - a) * t;
    const apply = () => {
      const { iw, ih, sw, sh, gap } = cfg, centerToNext = iw / 2 + gap + sw / 2, sideToSide = sw + gap;
      for (let i = 0; i < N; i++) {
        const o = wrap(i - scroll), a = Math.abs(o), s = Math.sign(o);
        const w = a <= 1 ? lerp(iw, sw, a) : sw, h = a <= 1 ? lerp(ih, sh, a) : sh;
        const x = a === 0 ? 0 : (a <= 1 ? s * centerToNext * a : s * (centerToNext + (a - 1) * sideToSide * 0.85));
        const rotY = s * Math.min(a * 35, 46), op = a < 5 ? 1 : a < 7 ? 1 - (a - 5) / 2 : 0;
        const el = cards[i];
        el.style.width = w + "px"; el.style.height = h + "px";
        el.style.marginLeft = (-w / 2) + "px"; el.style.marginTop = (-h / 2) + "px";
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,${(-a * 200).toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg)`;
        el.style.zIndex = Math.round(1000 - a * 10);
        imgs[i].style.opacity = op.toFixed(2);
      }
    };
    const tick = () => { scroll += (target - scroll) * 0.14; apply();
      raf = (visivel && Math.abs(target - scroll) > 0.0004) ? requestAnimationFrame(tick) : 0; };
    const kick = () => { if (!raf && visivel) raf = requestAnimationFrame(tick); };
    const snap = () => { clearTimeout(snapT); snapT = setTimeout(() => { target = Math.round(target); kick(); }, 160); };

    const grab = $("#dbcGrab");
    grab.addEventListener("wheel", (e) => {           // horizontal = carrossel; vertical = página
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); target += e.deltaX * 0.004; kick(); snap(); }
    }, { passive: false });
    let down = false, lastX = 0, vX = 0, lastT = 0;
    grab.addEventListener("pointerdown", (e) => { down = true; lastX = e.clientX; lastT = performance.now(); vX = 0; grab.setPointerCapture(e.pointerId); });
    grab.addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - lastX, now = performance.now();
      vX = dx / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; target += -dx * 0.006; kick(); });
    const up = () => { if (!down) return; down = false; target = Math.round(target - vX * 0.3); kick(); };
    grab.addEventListener("pointerup", up); grab.addEventListener("pointercancel", up); grab.addEventListener("lostpointercapture", up);

    addEventListener("resize", () => { cfg = base(); apply(); }, { passive: true });
    const io = new IntersectionObserver((es) => { visivel = es[0].isIntersecting; if (visivel) kick(); }, { threshold: 0 });
    io.observe(dbcTrack.closest("section"));
    apply();
  }

  // ── HEATMAP: campo de ruído térmico animado, recortado na logo ──────────
  //   Câmera-térmica: ruído fBm → rampa de cor (azul frio → laranja/branco
  //   quente) → grão em movimento → máscara pela logo. Tudo em canvas 2D.
  const heat = $("#heat"), heatCv = $("#heatCv");
  if (heat && heatCv && heatCv.getContext) {
    const ctx = heatCv.getContext("2d");

    // rampa térmica (256 cores) a partir de paradas cor/posição
    const stops = [[0,[8,20,74]],[.18,[24,70,210]],[.33,[42,112,255]],[.44,[70,58,150]],
                   [.52,[205,58,28]],[.64,[255,92,26]],[.80,[255,162,44]],[1,[255,232,150]]];
    const LUT = new Uint8Array(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = i / 255; let a = stops[0], b = stops[stops.length - 1];
      for (let s = 0; s < stops.length - 1; s++) if (t >= stops[s][0] && t <= stops[s + 1][0]) { a = stops[s]; b = stops[s + 1]; break; }
      const f = (t - a[0]) / ((b[0] - a[0]) || 1);
      LUT[i*3] = a[1][0] + (b[1][0]-a[1][0])*f; LUT[i*3+1] = a[1][1] + (b[1][1]-a[1][1])*f; LUT[i*3+2] = a[1][2] + (b[1][2]-a[1][2])*f;
    }

    // ruído de valor + fBm (3 oitavas)
    const perm = new Uint8Array(512); for (let i = 0; i < 512; i++) perm[i] = (Math.random() * 256) | 0;
    const g = (x, y) => perm[(perm[x & 255] + (y & 255)) & 255] / 255;
    const vn = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf*xf*(3-2*xf), v = yf*yf*(3-2*yf);
      const x1 = g(xi,yi)*(1-u) + g(xi+1,yi)*u, x2 = g(xi,yi+1)*(1-u) + g(xi+1,yi+1)*u; return x1*(1-v) + x2*v; };
    const fbm = (x, y) => { let s = 0, a = .6, f = 1; for (let o = 0; o < 3; o++) { s += vn(x*f, y*f)*a; f *= 2.1; a *= .5; } return s; };

    // logo (máscara pelo alpha) + tile de grão
    const logo = new Image(); let logoReady = false; logo.onload = () => logoReady = true; logo.src = "assets/img/hungria-logomarca.png";
    const gt = document.createElement("canvas"); gt.width = gt.height = 140; const gtx = gt.getContext("2d");
    const gid = gtx.createImageData(140, 140);
    for (let i = 0; i < gid.data.length; i += 4) { const n = (Math.random() * 255) | 0; gid.data[i] = gid.data[i+1] = gid.data[i+2] = n; gid.data[i+3] = 255; }
    gtx.putImageData(gid, 0, 0);
    const gpat = ctx.createPattern(gt, "repeat");

    // buffers (baixa resolução p/ o campo orgânico; sobe suave no canvas)
    let W, H, LW, LH, off, offctx, buf;
    const resize = () => {
      const r = heat.getBoundingClientRect();
      W = heatCv.width = Math.min(520, Math.round(r.width)); H = heatCv.height = Math.round(W * 1106 / 1364);
      LW = Math.max(90, Math.round(W * .42)); LH = Math.round(LW * 1106 / 1364);
      off = document.createElement("canvas"); off.width = LW; off.height = LH; offctx = off.getContext("2d"); buf = offctx.createImageData(LW, LH);
    };
    resize(); addEventListener("resize", resize, { passive: true });

    // calor extra na posição do cursor
    let px = -1, py = -1;
    if (temHover && !reduz) {
      heat.addEventListener("mousemove", (e) => { const r = heat.getBoundingClientRect(); px = (e.clientX - r.left) / r.width; py = (e.clientY - r.top) / r.height; }, { passive: true });
      heat.addEventListener("mouseleave", () => { px = -1; });
    }

    const frame = (t) => {
      const time = t * 0.00016, d = buf.data;
      for (let y = 0; y < LH; y++) for (let x = 0; x < LW; x++) {
        const nx = x / LW, ny = y / LH;
        let v = fbm(nx * 3.2 + time, ny * 3.2 - time * .6);
        v = v * 1.18 - 0.12 + (1 - ny) * 0.14;                       // topo levemente mais quente
        if (px >= 0) { const dx = nx - px, dy = ny - py; v += Math.max(0, .5 - (dx*dx + dy*dy) * 6) * .9; }
        v += (Math.random() - .5) * 0.05;                            // micro-ruído
        v = v < 0 ? 0 : v > 1 ? 1 : v;
        const si = ((v * 255) | 0) * 3, di = (y * LW + x) * 4;
        d[di] = LUT[si]; d[di+1] = LUT[si+1]; d[di+2] = LUT[si+2]; d[di+3] = 255;
      }
      offctx.putImageData(buf, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, 0, 0, LW, LH, 0, 0, W, H);                  // campo térmico suave
      // grão fino em movimento
      const gx = (Math.random() * 140) | 0, gy = (Math.random() * 140) | 0;
      ctx.globalCompositeOperation = "overlay"; ctx.globalAlpha = .6;
      ctx.save(); ctx.translate(-gx, -gy); ctx.fillStyle = gpat; ctx.fillRect(gx, gy, W, H); ctx.restore();
      // recorta na silhueta da logo (alpha)
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-in";
      if (logoReady) { const lw = W * .74, lh = lw * 1106 / 1364, lx = (W - lw) / 2, ly = (H - lh) / 2; ctx.drawImage(logo, lx, ly, lw, lh); }
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduz) { (function once() { if (logoReady) frame(0); else setTimeout(once, 60); })(); }  // 1 quadro estático
    else {
      let vis = true; new IntersectionObserver((es) => { vis = es[0].isIntersecting; }, { threshold: 0 }).observe(heat);
      const step = 1000 / ((fraco || ehMobile) ? 24 : 30); let last = 0;
      (function loop(t) { requestAnimationFrame(loop); if (!vis || t - last < step) return; last = t; frame(t); })(0);
    }
  }

  // --- contato ---
  const cards = [["Booking / Shows", A.emailBooking], ["Imprensa", A.emailImprensa], ["Geral", A.email]].filter(([, v]) => v);
  $("#contactCards").innerHTML = cards.map(([t, mail]) => `<div class="cta__card"><h4>${esc(t)}</h4><a href="mailto:${esc(mail)}">${esc(mail)}</a></div>`).join("");
  $("#footerContato").insertAdjacentHTML("beforeend", cards.map(([t, mail]) => `<a href="mailto:${esc(mail)}">${esc(t)}</a>`).join(""));

  // --- brasas (vermelho, limitadas, só desktop capaz) ---
  const embers = $("#embers");
  if (embers && efeitosPesados) {
    for (let i = 0; i < 10; i++) { const s = document.createElement("span"); s.className = "ember"; s.style.left = Math.random() * 100 + "%"; s.style.animationDuration = 7 + Math.random() * 6 + "s"; s.style.animationDelay = Math.random() * 7 + "s"; embers.appendChild(s); }
  }

  /* ==================================================================
     FORMULÁRIOS (sem back-end — ver README)
     ================================================================== */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault(); const f = e.target; let ok = true;
    $$("input, textarea", f).forEach((el) => { const ruim = el.required && !el.value.trim(); el.classList.toggle("err", ruim); if (ruim) ok = false; });
    if (!ok) { $("#formMsg").textContent = "Preencha os campos obrigatórios."; return; }
    const d = new FormData(f), corpo = `Nome: ${d.get("nome")}\nE-mail: ${d.get("email")}\n\n${d.get("mensagem")}`;
    location.href = `mailto:${A.emailBooking || A.email}?subject=${encodeURIComponent("[Site] " + d.get("assunto"))}&body=${encodeURIComponent(corpo)}`;
    $("#formMsg").textContent = "Abrindo seu app de e-mail…";
  });
  $("#newsForm").addEventListener("submit", (e) => {
    e.preventDefault(); const email = e.target.email.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { $("#newsMsg").textContent = "Digite um e-mail válido."; return; }
    $("#newsMsg").textContent = "Pronto, você está na lista."; e.target.reset();
  });

  /* ==================================================================
     SEO — dados estruturados
     ================================================================== */
  const tag = document.createElement("script"); tag.type = "application/ld+json";
  tag.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "MusicGroup",
    name: A.nomeCompleto, alternateName: A.nome, genre: ["Rap", "Hip Hop", "Trap"],
    foundingLocation: { "@type": "Place", name: A.origem }, url: D.seo.urlSite, email: A.email, sameAs: Object.values(D.links).filter(Boolean) });
  document.head.appendChild(tag);

  /* ==================================================================
     FINAL
     ================================================================== */
  observar(); onScroll(); addEventListener("load", () => { checarReveal(); featParallax(); layoutFan(); });
  document.addEventListener("error", (e) => { if (e.target.tagName === "IMG") e.target.style.opacity = "0"; }, true);
})();
