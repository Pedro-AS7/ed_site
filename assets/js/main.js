(function () {
  "use strict";

  var D = window.DADOS || {};

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function linkExterno(href, texto, classe) {
    return el("a", { href: href, target: "_blank", rel: "noopener", class: classe || "", text: texto });
  }

  /* ---------- Menu no celular ---------- */
  var botaoMenu = document.querySelector(".menu-botao");
  var menu = document.getElementById("menu");
  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
      var aberto = botaoMenu.getAttribute("aria-expanded") === "true";
      botaoMenu.setAttribute("aria-expanded", String(!aberto));
      menu.classList.toggle("menu--aberto", !aberto);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        botaoMenu.setAttribute("aria-expanded", "false");
        menu.classList.remove("menu--aberto");
      }
    });
  }

  /* ---------- Canais e séries (cards) ----------
     O card inteiro é um link para o vídeo no YouTube. Nas séries, o vídeo
     abre dentro da playlist, para o próximo episódio vir em seguida. */
  function linkDoVideo(item) {
    if (!item.video) return item.link;
    var url = "https://www.youtube.com/watch?v=" + item.video.id;
    var lista = /[?&]list=([^&]+)/.exec(item.link);
    return lista ? url + "&list=" + lista[1] : url;
  }

  function cartaoVideo(item) {
    var a = el("a", { href: linkDoVideo(item), target: "_blank", rel: "noopener", class: "cartao" }, [
      item.video ? el("span", { class: "cartao__video" }, [
        el("img", { src: "https://i.ytimg.com/vi/" + item.video.id + "/hqdefault.jpg", alt: "", width: "480", height: "360", loading: "lazy" })
      ]) : null,
      el("span", { class: "cartao__corpo" }, [
        el("strong", { class: "cartao__titulo", text: item.nome }),
        el("span", { class: "cartao__texto", text: item.texto }),
        item.video ? el("span", { class: "cartao__episodio", text: item.video.titulo }) : null,
        item.publico ? el("small", { class: "cartao__rodape", text: item.publico }) : null
      ])
    ]);
    if (item.video) a.setAttribute("aria-label", item.nome + ": assistir " + item.video.titulo + " no YouTube");
    return el("li", {}, [a]);
  }

  var listaCanais = document.getElementById("lista-canais");
  (D.canais || []).forEach(function (c) { listaCanais.appendChild(cartaoVideo(c)); });

  var listaSeries = document.getElementById("lista-series");
  (D.series || []).forEach(function (s) { listaSeries.appendChild(cartaoVideo(s)); });

  /* ---------- Cupons ---------- */
  var listaCupons = document.getElementById("lista-cupons");
  var filtros = document.getElementById("filtros");
  var aviso = document.getElementById("aviso");
  var timerAviso;

  function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("aviso--visivel");
    clearTimeout(timerAviso);
    timerAviso = setTimeout(function () { aviso.classList.remove("aviso--visivel"); }, 2400);
  }

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (resolve, reject) {
      var area = el("textarea", { readonly: "", "aria-hidden": "true" });
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try { document.execCommand("copy") ? resolve() : reject(); }
      catch (e) { reject(e); }
      finally { area.remove(); }
    });
  }

  function cartaoCupom(c) {
    var parteCodigo;
    if (c.cupom) {
      var botao = el("button", { type: "button", class: "cupom__copiar", text: "Copiar" });
      botao.setAttribute("aria-label", "Copiar o cupom " + c.cupom + " da " + c.marca);
      botao.addEventListener("click", function () {
        copiar(c.cupom).then(function () {
          botao.textContent = "Copiado";
          botao.classList.add("cupom__copiar--ok");
          mostrarAviso("Cupom " + c.cupom + " copiado. Cole na hora de pagar na " + c.marca + ".");
          setTimeout(function () {
            botao.textContent = "Copiar";
            botao.classList.remove("cupom__copiar--ok");
          }, 2400);
        }, function () {
          mostrarAviso("Não deu para copiar automaticamente. O cupom é " + c.cupom + ".");
        });
      });
      parteCodigo = el("div", { class: "cupom__codigo" }, [
        el("code", { text: c.cupom }),
        botao
      ]);
    } else {
      parteCodigo = el("div", { class: "cupom__codigo cupom__codigo--sem" }, [
        el("span", { text: "Sem cupom: é só entrar pelo link" })
      ]);
    }

    return el("li", { class: "cupom", "data-categoria": c.categoria }, [
      el("div", { class: "cupom__corpo" }, [
        el("h3", { text: c.marca }),
        el("p", { text: c.oferta }),
        linkExterno(c.link, c.cupom ? "Ir para a loja" : "Ir para o site", "cupom__link")
      ]),
      parteCodigo
    ]);
  }

  (D.cupons || []).forEach(function (c) { listaCupons.appendChild(cartaoCupom(c)); });

  function filtrar(categoria) {
    Array.prototype.forEach.call(listaCupons.children, function (li) {
      li.hidden = categoria !== "Todos" && li.getAttribute("data-categoria") !== categoria;
    });
    Array.prototype.forEach.call(filtros.children, function (b) {
      b.setAttribute("aria-pressed", String(b.textContent === categoria));
    });
    listaCupons.scrollLeft = 0;
    atualizarSetas();
  }

  /* Carrossel: as setas andam uma página por vez e ficam apagadas nas pontas */
  var anterior = document.getElementById("cupons-anterior");
  var proximo = document.getElementById("cupons-proximo");

  function passo() {
    var primeiro = listaCupons.querySelector(".cupom:not([hidden])");
    var gap = parseFloat(getComputedStyle(listaCupons).columnGap) || 0;
    var umCard = primeiro ? primeiro.getBoundingClientRect().width + gap : 0;
    /* anda uma "página" (os cards visíveis), arredondada para um número inteiro de cards */
    var visiveis = umCard ? Math.max(1, Math.floor((listaCupons.clientWidth + gap) / umCard)) : 1;
    return umCard ? umCard * visiveis : listaCupons.clientWidth;
  }

  function atualizarSetas() {
    var max = listaCupons.scrollWidth - listaCupons.clientWidth - 2;
    anterior.disabled = listaCupons.scrollLeft <= 2;
    proximo.disabled = listaCupons.scrollLeft >= max;
  }

  anterior.addEventListener("click", function () { listaCupons.scrollBy({ left: -passo(), behavior: "smooth" }); });
  proximo.addEventListener("click", function () { listaCupons.scrollBy({ left: passo(), behavior: "smooth" }); });
  listaCupons.addEventListener("scroll", function () { window.requestAnimationFrame(atualizarSetas); }, { passive: true });
  window.addEventListener("resize", atualizarSetas);

  ["Todos"].concat(D.categorias || []).forEach(function (cat) {
    var b = el("button", { type: "button", class: "filtro", "aria-pressed": String(cat === "Todos"), text: cat });
    b.addEventListener("click", function () { filtrar(cat); });
    filtros.appendChild(b);
  });

  atualizarSetas();

  /* ---------- Grupos de ofertas ---------- */
  /* Logos dos apps (Simple Icons, CC0) */
  var ICONES = {
    whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
    telegram: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
    instagram: '<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>'
  };

  function icone(nome) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "grupo__icone");
    svg.innerHTML = ICONES[nome] || "";
    return svg;
  }

  var listaGrupos = document.getElementById("lista-grupos");
  (D.grupos || []).forEach(function (g) {
    var a = el("a", { href: g.link, target: "_blank", rel: "noopener", class: "grupo" }, [
      el("span", { class: "grupo__topo" }, [
        el("span", { class: "grupo__selo grupo__selo--" + g.icone }, [icone(g.icone)]),
        el("span", {}, [
          el("strong", { class: "grupo__nome", text: g.nome }),
          el("span", { class: "grupo__tipo", text: g.texto })
        ])
      ]),
      el("span", { class: "grupo__descricao", text: g.descricao || "" }),
      el("span", { class: "grupo__acao", text: g.acao || "Entrar" })
    ]);
    listaGrupos.appendChild(el("li", {}, [a]));
  });

  /* ---------- Categorias do bazar ---------- */
  var listaCategorias = document.getElementById("lista-categorias");
  (D.bazar || []).forEach(function (c) {
    listaCategorias.appendChild(el("li", {}, [linkExterno(c.link, c.nome, "categoria")]));
  });

  /* ---------- Conversa do topo: entra um balão de cada vez ---------- */
  var conversa = document.querySelector(".chat");
  if (conversa && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    conversa.classList.add("chat--animado");
    var baloes = conversa.querySelectorAll(".balao");
    Array.prototype.forEach.call(baloes, function (b, i) {
      b.style.animationDelay = (0.35 + i * 0.55) + "s";
    });
  }
})();
