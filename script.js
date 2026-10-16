/* =========================================================================
   SCRIPT PRINCIPAL DO PORTFÓLIO
   01. Utilidades
   02. Tema claro/escuro
   03. Menu mobile
   04. Cabeçalho, progresso de scroll e botão "voltar ao topo"
   05. Link ativo conforme a seção visível (scrollspy)
   06. Animações de entrada (reveal)
   07. Contadores animados
   08. Efeito de digitação no Hero
   09. Renderização e filtro dos projetos
   10. Validação do formulário de contato
   ========================================================================= */

(function () {
  "use strict";

  /* ===================== 01. UTILIDADES ===================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ===================== 02. TEMA CLARO/ESCURO ===================== */
  const html = document.documentElement;
  const themeToggle = $("#themeToggle");
  const THEME_KEY = "portfolio-tema";

  function aplicarTema(tema) {
    html.setAttribute("data-theme", tema);
    try {
      localStorage.setItem(THEME_KEY, tema);
    } catch (e) {
      /* localStorage indisponível — ignora */
    }
  }

  (function temaInicial() {
    let salvo = null;
    try {
      salvo = localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* ignora */
    }
    const prefereClaro =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    aplicarTema(salvo || (prefereClaro ? "light" : "dark"));
  })();

  themeToggle?.addEventListener("click", () => {
    const atual = html.getAttribute("data-theme");
    aplicarTema(atual === "dark" ? "light" : "dark");
  });

  /* ===================== 03. MENU MOBILE ===================== */
  const nav = $("#nav");
  const hamburger = $("#hamburger");

  function fecharMenu() {
    nav?.classList.remove("open");
    hamburger?.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  }

  hamburger?.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    hamburger.classList.toggle("open", aberto);
    hamburger.setAttribute("aria-expanded", String(aberto));
  });

  $$(".nav-link").forEach((link) => link.addEventListener("click", fecharMenu));

  document.addEventListener("click", (e) => {
    if (!nav?.classList.contains("open")) return;
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) fecharMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
  });

  /* ====== 04. CABEÇALHO, PROGRESSO DE SCROLL E VOLTAR AO TOPO ====== */
  const header = $("#header");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  function aoRolar() {
    const y = window.scrollY;
    const altura = document.documentElement.scrollHeight - window.innerHeight;

    header?.classList.toggle("scrolled", y > 20);
    toTop?.classList.toggle("show", y > 520);
    if (progress) progress.style.width = (altura > 0 ? (y / altura) * 100 : 0) + "%";
  }

  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===================== 05. SCROLLSPY ===================== */
  const secoes = $$("main section[id]");
  const links = $$(".nav-link");

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  secoes.forEach((s) => spy.observe(s));

  /* ===================== 06. ANIMAÇÕES DE ENTRADA ===================== */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add("visible"), delay);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function observarReveals(ctx = document) {
    $$(".reveal", ctx).forEach((el) => {
      if (!el.classList.contains("visible")) revealObserver.observe(el);
    });
  }

  observarReveals();

  /* ===================== 07. CONTADORES ANIMADOS ===================== */
  const contadores = $$(".stat-number");

  const contarObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const alvo = Number(el.dataset.count || 0);
        const sufixo = el.dataset.suffix !== undefined ? el.dataset.suffix : "+";
        const duracao = 1400;
        const inicio = performance.now();

        function passo(agora) {
          const p = Math.min((agora - inicio) / duracao, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(alvo * eased) + (p === 1 ? sufixo : "");
          if (p < 1) requestAnimationFrame(passo);
        }

        requestAnimationFrame(passo);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  contadores.forEach((c) => contarObserver.observe(c));

  /* ===================== 08. EFEITO DE DIGITAÇÃO ===================== */
  const typed = $("#typed");
  const frases = [
    "Estudante do Curso Técnico em ADS — SENAI",
    "Desenvolvedor Python",
    "Integração com Inteligência Artificial",
    "Programador C++",
    "Front-end com HTML e CSS"
  ];

  if (typed) {
    let iFrase = 0;
    let iChar = 0;
    let apagando = false;

    (function digitar() {
      const frase = frases[iFrase];
      typed.textContent = frase.slice(0, iChar);

      let espera = apagando ? 45 : 75;

      if (!apagando && iChar === frase.length) {
        espera = 1900;
        apagando = true;
      } else if (apagando && iChar === 0) {
        apagando = false;
        iFrase = (iFrase + 1) % frases.length;
        espera = 350;
      }

      iChar += apagando ? -1 : 1;
      setTimeout(digitar, espera);
    })();
  }

  /* ===================== 09. PROJETOS ===================== */
  const grid = $("#projectsGrid");

  function criarCard(p, index) {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.dataset.categoria = p.categoria || "outros";
    card.style.animationDelay = index * 60 + "ms";

    const temImagem = Boolean(p.imagem);
    const thumbStyle = temImagem
      ? `style="background-image:url('${p.imagem}')"`
      : "";

    card.innerHTML = `
      <div class="project-thumb" ${thumbStyle}>
        ${temImagem ? "" : `<svg class="icon icon-xl" aria-hidden="true"><use href="#i-${p.icone || "code"}"></use></svg>`}
        <span class="project-badge">${p.categoriaNome || p.categoria || "Projeto"}</span>
        ${p.destaque ? '<span class="project-destaque">Destaque</span>' : ""}
      </div>
      <div class="project-body">
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
        <div class="project-tags">
          ${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}
        </div>
        <div class="project-links">
          ${
            p.demo
              ? `<a class="primary" href="${p.demo}" target="_blank" rel="noopener">
                   <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>
                   Ver projeto
                 </a>`
              : ""
          }
          ${
            p.repo
              ? `<a href="${p.repo}" target="_blank" rel="noopener">
                   <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.1 4.0 18.1 4.3 18.1 4.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
                   Código
                 </a>`
              : ""
          }
        </div>
      </div>
    `;

    return card;
  }

  function renderizarProjetos(lista) {
    if (!grid) return;
    grid.innerHTML = "";
    observarReveals(grid);

    if (!lista.length) {
      grid.innerHTML =
        '<div class="projects-empty">Nenhum projeto nessa categoria por enquanto.</div>';
      return;
    }

    lista.forEach((p, i) => {
      const card = criarCard(p, i);
      grid.appendChild(card);
      // pequeno atraso escalonado para a animação de entrada acontecer
      setTimeout(() => card.classList.add("visible"), 60 + i * 70);
    });
  }

  // A variável "projetos" vem do arquivo projetos.js
  const listaProjetos = typeof projetos !== "undefined" ? projetos : [];
  renderizarProjetos(listaProjetos);

  /* Filtros */
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filtro = btn.dataset.filter;
      const filtrados =
        filtro === "todos" ? listaProjetos : listaProjetos.filter((p) => p.categoria === filtro);

      renderizarProjetos(filtrados);
    });
  });

  /* ===================== 10. FORMULÁRIO DE CONTATO =====================
     As mensagens são enviadas de verdade para o e-mail do Gabriel usando o
     FormSubmit (formsubmit.co) — serviço gratuito, sem back-end e sem cadastro.

     IMPORTANTE (só na primeira vez):
     ao enviar a primeira mensagem, o FormSubmit envia um e-mail de confirmação
     para gabrielcorreialuz2000@gmail.com. Clique no link desse e-mail UMA vez
     para ativar o recebimento das mensagens.

     Se o envio falhar (sem internet, por exemplo), o site abre automaticamente
     o aplicativo de e-mail do visitante com a mensagem já preenchida.
     ==================================================================== */
  const form = $("#contactForm");
  const note = $("#formNote");
  const EMAIL_CONTATO = "gabrielcorreialuz2000@gmail.com";

  function marcarErro(campo, mensagem) {
    const wrap = campo.closest(".field");
    const msg = wrap?.querySelector(".error-msg");
    wrap?.classList.toggle("invalid", Boolean(mensagem));
    if (msg) msg.textContent = mensagem || "";
    return !mensagem;
  }

  function validar() {
    const nome = $("#nome");
    const email = $("#email");
    const assunto = $("#assunto");
    const mensagem = $("#mensagem");

    let ok = true;
    ok = marcarErro(nome, nome.value.trim().length < 2 ? "Informe seu nome." : "") && ok;
    ok =
      marcarErro(
        email,
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? "" : "Informe um e-mail válido."
      ) && ok;
    ok = marcarErro(assunto, assunto.value.trim().length < 3 ? "Informe o assunto." : "") && ok;
    ok =
      marcarErro(mensagem, mensagem.value.trim().length < 10 ? "Escreva ao menos 10 caracteres." : "") &&
      ok;

    return ok;
  }

  function abrirEmailDeReserva() {
    const dados = new FormData(form);
    const corpo = `Nome: ${dados.get("nome")}\nE-mail: ${dados.get("email")}\n\n${dados.get("mensagem")}`;
    const link = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(
      dados.get("assunto")
    )}&body=${encodeURIComponent(corpo)}`;
    window.location.href = link;
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validar()) {
      if (note) note.textContent = "Verifique os campos destacados e tente novamente.";
      return;
    }

    const botao = form.querySelector('button[type="submit"]');
    const conteudoBotao = botao ? botao.innerHTML : "";

    if (botao) {
      botao.disabled = true;
      botao.textContent = "Enviando...";
    }
    if (note) note.textContent = "";

    try {
      const resposta = await fetch(form.getAttribute("action"), {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      const retorno = await resposta.json().catch(() => null);

      // Atenção: o FormSubmit responde HTTP 200 mesmo quando a mensagem NÃO foi
      // enviada (por exemplo, quando o formulário ainda não foi ativado).
      // Por isso é obrigatório conferir o campo "success" da resposta.
      if (!resposta.ok || !retorno || String(retorno.success) !== "true") {
        throw new Error((retorno && retorno.message) || "Falha no envio");
      }

      if (note) note.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
      form.reset();
    } catch (erro) {
      console.warn("Falha ao enviar pelo formulário:", erro.message);
      // Plano B: abre o aplicativo de e-mail do visitante com a mensagem pronta
      abrirEmailDeReserva();
      if (note) {
        note.textContent =
          "Não foi possível enviar pelo site. Abrimos seu e-mail como alternativa.";
      }
    } finally {
      if (botao) {
        botao.disabled = false;
        botao.innerHTML = conteudoBotao;
      }
    }
  });

  // Limpa o erro ao digitar
  $$("#contactForm input, #contactForm textarea").forEach((campo) => {
    campo.addEventListener("input", () => marcarErro(campo, ""));
  });

  /* ===================== EXTRAS ===================== */
  // Ano atual no rodapé
  const anoEl = $("#year");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Se a foto não existir, mostra o avatar com as iniciais
  const foto = $("#photo");
  function semFoto() {
    foto?.closest(".photo-frame")?.classList.add("no-photo");
  }
  if (foto) {
    foto.addEventListener("error", semFoto);
    // Caso o erro tenha ocorrido antes deste script carregar
    if (foto.complete && foto.naturalWidth === 0) semFoto();
  }

  // Recalcula as revelações depois que tudo (inclusive imagens) terminar de carregar
  window.addEventListener("load", () => observarReveals());
})();
