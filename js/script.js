// =====================================================
// ONG MÃOS AMIGAS — JS GLOBAL
// Seções: Helpers, SPA (abas + botão), Tema (dark/light),
//         Cadastro (máscaras, QR PIX, validação)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---------------------------
  // Helpers
  // ---------------------------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const digits = (s) => (s || "").replace(/\D/g, "");

  // Atualiza título da Home (se existir)
  const titulo = document.getElementById("Juntos");
  if (titulo) titulo.textContent = "Juntos Podemos Transformar Vidas";

  // =====================================================
  // SPA: Abas (Home/Destaque) + Botão "Alternar Página"
  // =====================================================
  (function initSPA() {
    const tabs = $$(".menu__tabs a[data-page]");
    const panels = $$(".tab-content");
    if (!tabs.length || !panels.length) return;

    const LS_KEY = "maosamigas.pagina";

    function setTabState(tabEl, selected) {
      tabEl.classList.toggle("ativo", !!selected);
      tabEl.setAttribute("aria-selected", selected ? "true" : "false");
      tabEl.setAttribute("tabindex", selected ? "0" : "-1");
      if (selected) tabEl.setAttribute("aria-current", "page");
      else tabEl.removeAttribute("aria-current");
    }

    function setPanelState(panelEl, visible) {
      if (visible) {
        panelEl.removeAttribute("hidden");
        panelEl.style.display = "block";
      } else {
        panelEl.setAttribute("hidden", "");
        panelEl.style.display = "none";
      }
    }

    function mostrarSecao(id) {
      // Painéis
      panels.forEach((p) => setPanelState(p, p.id === id));
      // Abas
      tabs.forEach((t) => setTabState(t, t.dataset.page === id));
      // Persistência
      try { localStorage.setItem(LS_KEY, id); } catch {}
    }

    // Estado inicial
    const salva = (() => { try { return localStorage.getItem(LS_KEY); } catch { return null; } })();
    const inicial = salva && $("#" + salva) ? salva : (tabs[0]?.dataset.page || panels[0]?.id);
    if (inicial) mostrarSecao(inicial);

    // Clique nas abas
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSecao(tab.dataset.page);
        // Move foco para o painel ativo (acessibilidade)
        const ativo = $("#" + tab.dataset.page);
        ativo?.focus?.();
      });
    });

    // Botão "Alternar Página"
    const btnToggle = document.getElementById("togglePage");
    if (btnToggle) {
      btnToggle.addEventListener("click", () => {
        const atual = tabs.find((t) => t.classList.contains("ativo"))?.dataset.page;
        // alterna entre 'home' e 'destaque' se existirem
        const alvo = atual === "home" ? "destaque" : "home";
        if ($("#" + alvo)) mostrarSecao(alvo);
      });
    }
  })();

  // =====================================================
  // Tema: Dark/Light com localStorage + acessibilidade
  // =====================================================
  (function initThemeToggle() {
    const root = document.documentElement;
    const btn = document.getElementById("toggle-tema");
    if (!btn) return;

    function atualizaBotao(tema) {
      if (tema === "dark") {
        btn.textContent = "☀️ Modo Claro";
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.textContent = "🌙 Modo Escuro";
        btn.setAttribute("aria-pressed", "false");
      }
    }

    // Tema inicial
    const salvo = (() => { try { return localStorage.getItem("tema"); } catch { return null; } })();
    let temaAtual = salvo
      ? salvo
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    root.setAttribute("data-theme", temaAtual);
    atualizaBotao(temaAtual);

    // Clique
    btn.addEventListener("click", () => {
      temaAtual = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", temaAtual);
      try { localStorage.setItem("tema", temaAtual); } catch {}
      atualizaBotao(temaAtual);
    });
  })();

  // =====================================================
  // Cadastro: Máscaras, QR PIX, Validação leve + feedback
  // =====================================================
  (function initCadastro() {
    if (!document.body.classList.contains("page--cadastro")) return;

    // --- Máscaras (se jQuery + Mask disponíveis) ---
    if (window.jQuery && jQuery.fn && jQuery.fn.mask) {
      $('#cpf').mask('000.000.000-00');
      $('#telefone').mask('(00) 00000-0000');
      $('#cep').mask('00000-000');
    }

    // --- Toggle QR PIX ---
    const btnQR = document.getElementById("btn-qr");
    const qrArea = document.getElementById("qr-area");
    if (btnQR && qrArea) {
      btnQR.addEventListener("click", () => {
        const hidden = qrArea.hasAttribute("hidden");
        if (hidden) {
          qrArea.removeAttribute("hidden");
          btnQR.textContent = "Ocultar QR do PIX";
          btnQR.setAttribute("aria-expanded", "true");
          qrArea.querySelector("img")?.focus?.();
        } else {
          qrArea.setAttribute("hidden", "");
          btnQR.textContent = "Mostrar QR do PIX";
          btnQR.setAttribute("aria-expanded", "false");
          btnQR.focus();
        }
      });
    }

    // --- Validação leve + feedback ---
    const form = document.getElementById("form-cadastro");
    const feedback = document.getElementById("form-feedback");

    function setInvalid(el, msg) {
      if (!el) return;
      el.setAttribute("aria-invalid", "true");
      el.classList.add("erro");
      // Se existir um <small id="...-erro">
      const id = el.id && document.getElementById(el.id.replace(/[^a-z-]/g, "") + "-erro");
      if (id) id.textContent = msg || "";
    }

    function clearInvalid(el) {
      if (!el) return;
      el.removeAttribute("aria-invalid");
      el.classList.remove("erro");
      const id = el.id && document.getElementById(el.id.replace(/[^a-z-]/g, "") + "-erro");
      if (id) id.textContent = "";
    }

    function validaEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let ok = true;
        const focusQueue = [];

        const reqIds = [
          "nome","cpf","email","telefone","nascimento",
          "cep","logradouro","numero","bairro","cidade","uf"
        ];

        reqIds.forEach((id) => {
          const el = document.getElementById(id);
          if (!el || !String(el.value).trim()) {
            setInvalid(el, "Campo obrigatório.");
            ok = false; if (el) focusQueue.push(el);
          } else {
            clearInvalid(el);
          }
        });

        const cpf = document.getElementById("cpf");
        if (cpf && digits(cpf.value).length !== 11) {
          setInvalid(cpf, "CPF deve conter 11 dígitos.");
          ok = false; focusQueue.push(cpf);
        }

        const tel = document.getElementById("telefone");
        if (tel && digits(tel.value).length < 10) {
          setInvalid(tel, "Informe um telefone válido.");
          ok = false; focusQueue.push(tel);
        }

        const cep = document.getElementById("cep");
        if (cep && digits(cep.value).length !== 8) {
          setInvalid(cep, "CEP deve conter 8 dígitos.");
          ok = false; focusQueue.push(cep);
        }

        const email = document.getElementById("email");
        if (email && !validaEmail(email.value)) {
          setInvalid(email, "E-mail inválido.");
          ok = false; focusQueue.push(email);
        }

        if (!ok) {
          // Foca no primeiro inválido
          focusQueue[0]?.focus?.();
          return;
        }

        // Sucesso mock
        form.reset();
        if (feedback) {
          feedback.hidden = false;
          feedback.textContent = "✅ Cadastro enviado! Em breve entraremos em contato.";
          feedback.focus?.();
        }
        document.querySelector("h1")?.focus?.();
      });
    }
  })();
});