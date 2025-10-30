# 🌍 ONG MÃOS AMIGAS — Atividade 4

Projeto desenvolvido como parte da **Atividade Prática 4** do curso de **Análise e Desenvolvimento de Sistemas** (Cruzeiro do Sul Virtual).

Nesta etapa foram aplicados os conceitos de **acessibilidade (WCAG 2.1 AA)**, **versionamento com GitFlow**, **publicação no GitHub Pages** e **controle de versões (tag v1.0)**.  
O projeto integra todos os aprendizados das atividades anteriores, resultando em um site completo, acessível e responsivo.

---

## 🧭 Estrutura do Projeto

| Arquivo / Pasta | Função |
|------------------|--------|
| `index.html` | Página inicial da ONG |
| `projetos.html` | Apresenta os principais projetos sociais |
| `cadastro.html` | Formulário de inscrição de voluntários |
| `css/style.css` | Estilos globais, design tokens e dark mode |
| `js/script.js` | Funções SPA, localStorage e alternância de conteúdo |
| `imagens/` | Logotipo, fotos e documentação (prints W3C) |

---

## 🌗 Recursos e Funcionalidades

- 🌙 **Dark Mode automático** (ativado conforme o tema do sistema)  
- ♿ **Acessibilidade (WCAG 2.1 AA)**  
  - Foco visível (`:focus-visible`)  
  - Links e botões com contraste mínimo ≥ 4.5 : 1  
  - Estrutura semântica com `header`, `main`, `footer`  
  - Navegação por teclado e *skip link* no topo da página  
  - Atributos `aria-current="page"` para indicar a página ativa  
- 🧠 **SPA simples** com JavaScript + localStorage  
- 🧩 **GitFlow completo** com branches `main`, `develop`, `feature/a11y-teclado`, `release/v1.0`  
- ☁️ **Deploy** realizado no GitHub Pages:  
  👉 [https://eduardovieirademiranda.github.io/ONG-MAOS-AMIGAS-ATIVIDADE4](https://eduardovieirademiranda.github.io/ONG-MAOS-AMIGAS-ATIVIDADE4)

---

## 💻 Página Inicial (index.html)

A *Home* apresenta a ONG, seu propósito e formas de ajudar.

| Seção | Descrição |
|-------|------------|
| **Hero (Topo)** | Mensagem principal *“Juntos Podemos Transformar o Mundo”* com atualização dinâmica via JavaScript. |
| **Quem Somos** | Explica a missão da ONG e mostra imagem ilustrativa. |
| **Como Ajudar** | Mostra as opções de doação via PIX e QR Code. |
| **Projetos em Destaque** | Cards com dois projetos sociais em destaque. |

---

## 💡 Página de Projetos

| Projeto | Descrição |
|----------|------------|
| **Projeto Esperança** | Atividades recreativas e educacionais para crianças em situação de vulnerabilidade. |
| **Projeto Transformar** | Oficinas e cursos de capacitação profissional para jovens e adultos. |

Os projetos são exibidos em **cards responsivos**, com imagens e textos otimizados para leitura.

---

## 🧾 Página de Cadastro

Formulário completo para novos voluntários:

- Nome completo  
- E-mail  
- Telefone (máscara automática via jQuery Mask)  
- CPF e CEP (máscara + validação)  
- Cidade e Área de interesse  
- Mensagem opcional  

📋 Inclui também:
- Mensagens de validação padrão do navegador  
- Cards laterais com informações de doação e motivos para participar  

---

## 🧩 Scripts Implementados

-javascript

// Atualiza o título dinamicamente na Home
const titulo = document.getElementById("Juntos");
if (titulo) titulo.textContent = "Juntos Podemos Transformar Vidas";

// Salva a última página visitada (SPA)
localStorage.setItem("maosamigas.pagina", id);

// Alternância automática de tema (dark/light)
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.dataset.theme = 'dark';
}

🔀 Estrutura GitFlow
Branch	Função
main	Versão estável e publicada no GitHub Pages
develop	Integração de recursos antes do release
feature/a11y-teclado	Implementação da acessibilidade via teclado
release/v1.0	Versão de preparação antes da publicação

📌 Tag final: v1.0
💬 Mensagem de commit: Finaliza Atividade 4 — integração completa e release v1.0

## ✅ Prints de Validação W3C (CDN — jsDelivr)

### 🏠 Página Inicial — index.html  
![index](https://cdn.jsdelivr.net/gh/eduardovieirademiranda/ONG-MAOS-AMIGAS-ATIVIDADE4@main/imagens/docs/index-w3c.png)

---

### 💡 Página de Projetos — projetos.html  
![projetos](https://cdn.jsdelivr.net/gh/eduardovieirademiranda/ONG-MAOS-AMIGAS-ATIVIDADE4@main/imagens/docs/proj-w3c.png)

---

### 🧾 Página de Cadastro — cadastro.html  
![cadastro](https://cdn.jsdelivr.net/gh/eduardovieirademiranda/ONG-MAOS-AMIGAS-ATIVIDADE4@main/imagens/docs/cad-w3c.png)

---

### 🎨 Validação CSS — style.css  
![css](https://cdn.jsdelivr.net/gh/eduardovieirademiranda/ONG-MAOS-AMIGAS-ATIVIDADE4@main/imagens/docs/css-w3c.png)

---

### 🌙 Modo Escuro — Dark Mode  
![dark](https://cdn.jsdelivr.net/gh/eduardovieirademiranda/ONG-MAOS-AMIGAS-ATIVIDADE4@main/imagens/docs/dark.png)

🏁 Conclusão

A Atividade 4 consolida todas as etapas do desenvolvimento front-end da ONG MÃOS AMIGAS, aplicando:

Estrutura semântica HTML5

Design System e responsividade CSS3

SPA e armazenamento local com JavaScript

Acessibilidade (WCAG 2.1 AA)

GitFlow e versionamento profissional

Publicação final no GitHub Pages

🌟 Projeto concluído com sucesso, unindo tecnologia, acessibilidade e impacto social.