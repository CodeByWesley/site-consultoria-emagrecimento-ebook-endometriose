/**
 * Andrelly Mendonça — Landing Page
 * JavaScript Vanilla: menu hambúrguer, accordion do FAQ e scroll suave.
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     1. MENU HAMBÚRGUER (mobile)
     ========================================================== */
  var hamburguer = document.getElementById('hamburguer');
  var nav = document.getElementById('nav');

  if (hamburguer && nav) {
    hamburguer.addEventListener('click', function () {
      var estaAberto = nav.classList.toggle('aberto');
      hamburguer.classList.toggle('ativo', estaAberto);
      hamburguer.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');
      hamburguer.setAttribute('aria-label', estaAberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em um link (útil em telas pequenas)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('aberto');
        hamburguer.classList.remove('ativo');
        hamburguer.setAttribute('aria-expanded', 'false');
        hamburguer.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  /* ==========================================================
     2. ACCORDION DO FAQ
     ========================================================== */
  var perguntas = document.querySelectorAll('.accordion__pergunta');

  perguntas.forEach(function (botao) {
    botao.addEventListener('click', function () {
      var item = botao.closest('.accordion__item');
      var jaAtivo = item.classList.contains('ativo');

      // Fecha os demais itens (accordion exclusivo — apenas uma resposta aberta por vez)
      document.querySelectorAll('.accordion__item.ativo').forEach(function (outroItem) {
        if (outroItem !== item) {
          outroItem.classList.remove('ativo');
          outroItem.querySelector('.accordion__pergunta').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('ativo', !jaAtivo);
      botao.setAttribute('aria-expanded', jaAtivo ? 'false' : 'true');
    });
  });

  /* ==========================================================
     3. SCROLL SUAVE PARA ÂNCORAS INTERNAS
     (reforço via JS para navegadores sem suporte a scroll-behavior)
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (evento) {
      var destinoId = link.getAttribute('href');
      if (destinoId.length <= 1) return; // ignora "#" vazio

      var destino = document.querySelector(destinoId);
      if (!destino) return;

      evento.preventDefault();

      var offsetHeader = document.querySelector('.header').offsetHeight;
      var posicao = destino.getBoundingClientRect().top + window.pageYOffset - offsetHeader - 12;

      window.scrollTo({
        top: posicao,
        behavior: 'smooth'
      });
    });
  });

  /* ==========================================================
     4. ANO ATUAL NO RODAPÉ
     ========================================================== */
  var spanAno = document.getElementById('ano-atual');
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }

});
