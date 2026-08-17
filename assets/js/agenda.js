/* =====================================================================
   HUNGRIA — AGENDA · agenda.js
   Página dedicada de shows. Lê os dados de assets/js/data.js e monta a
   lista completa de datas. Leve e independente do main.js.
   ===================================================================== */
(function () {
  "use strict";

  const D = window.SITE_DATA;
  if (!D) return;

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const A = D.artista || {};
  const spotifyUrl = D.links.spotify || `https://open.spotify.com/artist/${D.spotify.artistId}`;
  const PLATAFORMAS = [["spotify","Spotify"],["appleMusic","Apple Music"],["youtube","YouTube"],["deezer","Deezer"],["amazon","Amazon Music"],["tidal","Tidal"]];
  const REDES = [["instagram","Instagram"],["tiktok","TikTok"],["youtube","YouTube"],["facebook","Facebook"],["x","X"]];

  /* --- topo / rodapé -------------------------------------------------- */
  if ($("#year")) $("#year").textContent = new Date().getFullYear();
  if ($("#hdCta")) $("#hdCta").href = spotifyUrl;

  const platHTML = PLATAFORMAS.filter(([k]) => D.links[k]).map(([k, n]) => `<a href="${esc(D.links[k])}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
  if ($("#footerPlat")) $("#footerPlat").insertAdjacentHTML("beforeend", platHTML);
  const socialHTML = REDES.filter(([k]) => D.links[k]).map(([k, n]) => `<a href="${esc(D.links[k])}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
  if ($("#footerSocial")) $("#footerSocial").insertAdjacentHTML("beforeend", socialHTML);
  if ($("#mnavSocial")) $("#mnavSocial").innerHTML = socialHTML;

  const cards = [["Booking / Shows", A.emailBooking], ["Imprensa", A.emailImprensa], ["Geral", A.email]].filter(([, v]) => v);
  if ($("#footerContato")) $("#footerContato").insertAdjacentHTML("beforeend", cards.map(([t, mail]) => `<a href="mailto:${esc(mail)}">${esc(t)}</a>`).join(""));

  /* --- menu mobile ---------------------------------------------------- */
  const burger = $("#burger"), mnav = $("#mnav"), menuClose = $("#menuClose");
  const abrir = () => { mnav.classList.add("open"); burger.classList.add("open"); burger.setAttribute("aria-expanded", "true"); document.body.classList.add("lock"); };
  const fechar = () => { mnav.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.classList.remove("lock"); };
  if (burger && mnav) {
    burger.addEventListener("click", () => mnav.classList.contains("open") ? fechar() : abrir());
    if (menuClose) menuClose.addEventListener("click", fechar);
    $$("nav a", mnav).forEach((a) => a.addEventListener("click", fechar));
    addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });
  }

  /* --- lista de datas ------------------------------------------------- */
  const MES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const WD  = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  const TAG = { ingressos: "Ingressos", esgotado: "Esgotado", emBreve: "Em breve" };

  // Mostra TODAS as datas da lista (o dono atualiza a agenda periodicamente).
  const datas = (D.shows || []).slice().sort((a, b) => a.data.localeCompare(b.data));

  const lista = $("#agenda-list");
  if (lista) {
    lista.innerHTML = datas.length ? datas.map((s, i) => {
      const d = new Date(s.data + "T12:00:00");
      return `<div class="dates__row reveal" style="--d:${i * 75}ms">
        <span class="dates__d">${String(d.getDate()).padStart(2, "0")} ${MES[d.getMonth()]}<small>${WD[d.getDay()]} · ${d.getFullYear()}</small></span>
        <div class="dates__city">${esc(s.cidade)} <span class="dates__uf">/ ${esc(s.uf)}</span></div>
      </div>`;
    }).join("") : `<p class="dates__empty">Nenhuma data confirmada no momento. Novas cidades em breve — acompanhe as redes.</p>`;

    // dispara o reveal "painel de embarque" quando cada linha entra na tela
    const linhas = $$(".dates__row.reveal", lista);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
      }), { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
      linhas.forEach((el) => io.observe(el));
    } else {
      linhas.forEach((el) => el.classList.add("on"));
    }
  }
})();
