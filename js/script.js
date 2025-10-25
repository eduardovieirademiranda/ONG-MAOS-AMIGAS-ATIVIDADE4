document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
   *  TÍTULO (Index)
   * ======================================================= */
  const titulo = document.getElementById("Juntos");
  if (titulo) titulo.textContent = "Juntos Podemos Transformar Vidas";

  /* =========================================================
   *  ABAS (do menu__tabs com data-page) + persistência
   *  (compatível com seu HTML atual)
   * ======================================================= */
  const tabsData = document.querySelectorAll(".menu__tabs a[data-page]");
  const secoes = document.querySelectorAll(".tab-content");

  function mostrarSecao(id) {
    if (!secoes.length) return;
    secoes.forEach((sec) => {
      const ativa = sec.id === id;
      sec.style.display = ativa ? "block" : "none";
      if (ativa) sec.removeAttribute("hidden"); else sec.setAttribute("hidden", "");
    });

    tabsData.forEach((tab) => {
      tab.classList.remove("ativo");
      tab.removeAttribute("aria-current");
    });

    const atual = document.querySelector(`.menu__tabs a[data-page="${id}"]`);
    if (atual) {
      atual.classList.add("ativo");
      atual.setAttribute("aria-current", "page");
    }

    try {
      localStorage.setItem("maosamigas.pagina", id);
    } catch {}
  }

  if (tabsData.length && secoes.length) {
    const paginaSalva =
      (typeof localStorage !== "undefined" && localStorage.getItem("maosamigas.pagina")) ||
      "home";
    mostrarSecao(paginaSalva);

    tabsData.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        const alvo = this.getAttribute("data-page");
        if (alvo) mostrarSecao(alvo);
      });
    });
  }

  /* =========================================================
   *  ABAS (versão .tab + botão #togglePage) — Index
   *  (mantém compatibilidade com outra marcação de abas)
   * ======================================================= */
  (function spaTabsAlternativo() {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
    const toggleButton = document.getElementById("togglePage");
    if (!tabs.length || !contents.length) return;

    let current = 0;

    function changePage(index) {
      tabs.forEach((t) => t.classList.remove("ativo"));
      contents.forEach((c) => {
        c.style.display = "none";
        c.setAttribute("hidden", "");
      });

      tabs[index].classList.add("ativo");
      contents[index].style.display = "block";
      contents[index].removeAttribute("hidden");
      current = index;

      tabs.forEach((t) => t.removeAttribute("aria-current"));
      tabs[index].setAttribute("aria-current", "page");
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(idx);
      });
    });

    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        current = (current + 1) % contents.length;
        changePage(current);
      });
    }

    // inicia na primeira aba se não houver persistência ativa do bloco anterior
    if (!tabsData.length) changePage(0);
  })();

  /* =========================================================
   *  Destaque no menu superior conforme página atual
   * ======================================================= */
  (function marcaMenuAtivo() {
    const menuLinks = document.querySelectorAll(".menu__list a");
    if (!menuLinks.length) return;
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === paginaAtual) {
        link.classList.add("ativo");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("ativo");
        link.removeAttribute("aria-current");
      }
    });
  })();

  /* =========================================================
   *  Máscaras (jQuery Mask) — CPF / Telefone / CEP
   * ======================================================= */
  if (window.jQuery) {
    $("#cpf").length && $("#cpf").mask("000.000.000-00");
    $("#telefone").length && $("#telefone").mask("(00) 00000-0000");
    $("#cep").length && $("#cep").mask("00000-000");
  }

  /* =========================================================
   *  QR do PIX (toggle acessível + fallback de imagem)
   * ======================================================= */
  (function qrPix() {
    const btn = document.getElementById("btn-qr");
    const area = document.getElementById("qr-area");
    if (!btn || !area) return;

    btn.addEventListener("click", function () {
      const oculto = area.hasAttribute("hidden");
      if (oculto) {
        area.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "Esconder QR do PIX";
      } else {
        area.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Mostrar QR do PIX";
      }
    });

    const img = area.querySelector("img");
    if (img) {
      img.addEventListener("error", () => {
        area.innerHTML =
          '<p style="margin-top:8px;">QR ainda não disponível. Salve o arquivo em <code>imagens/pix-qr.png</code>.</p>';
      });
    }
  })();

  /* =========================================================
   *  Envio local do formulário (Cadastro) + mensagem sucesso
   * ======================================================= */
  (function envioLocal() {
    const form = document.getElementById("form-cadastro");
    const msg = document.getElementById("msg-sucesso");
    if (!form || !msg) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // validação nativa
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // sucesso local
      msg.hidden = false;
      form.reset();

      // acessibilidade
      msg.setAttribute("tabindex", "-1");
      msg.focus();

      // esconde após alguns segundos
      setTimeout(() => {
        msg.hidden = true;
      }, 6000);
    });
  })();
});
