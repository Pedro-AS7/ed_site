/*
 * Dados editáveis do site.
 * Para trocar um cupom, um link ou um vídeo, mude só este arquivo.
 * Levantamento feito em 23/11/2026 (veja pesquisa-edson-castro.md).
 */
window.DADOS = {
  categorias: ["Roupas e calçados", "Cuidados e saúde", "Futebol", "Livros e cursos"],

  cupons: [
    { marca: "Insider", categoria: "Roupas e calçados", oferta: "Desconto em roupas básicas", cupom: "EDSONCASTRO", link: "https://creators.insiderstore.com.br/EdsonCastro" },
    { marca: "Korova", categoria: "Roupas e calçados", oferta: "20% de desconto", cupom: "CASTRINHO", link: "https://8e1tjj.s.gy/korova_castrinho" },
    { marca: "Eixo", categoria: "Roupas e calçados", oferta: "Desconto em roupas", cupom: "EDSON15", link: "https://www.eixocompany.com.br/" },
    { marca: "Reise", categoria: "Roupas e calçados", oferta: "10% em compras acima de R$ 497", cupom: "EDSONCASTRO", link: "https://www.reise.com.br/s/castrinho" },
    { marca: "Growth", categoria: "Cuidados e saúde", oferta: "Desconto em suplementos", cupom: "GENETICA", link: "https://www.gsuplementos.com.br/" },
    { marca: "Manual", categoria: "Cuidados e saúde", oferta: "Tratamento para queda de cabelo", cupom: "CABELODOEDSON", link: "https://www.manual.com.br/queda-de-cabelo?utm_source=influs&utm_medium=site&utm_campaign=CABELODOEDSON&coupon=CABELODOEDSON" },
    { marca: "Nuture", categoria: "Cuidados e saúde", oferta: "Desconto na loja", cupom: "CASTRINHO", link: "https://bit.ly/nuturecastrinho" },
    { marca: "O Aristocrata", categoria: "Cuidados e saúde", oferta: "10% em sabonetes", cupom: "CASTRINHO", link: "https://oaristocrata.com/products/frescor-da-mata" },
    { marca: "Futfanatics", categoria: "Futebol", oferta: "Camisas de time", cupom: "EDNAFUT", link: "https://www.futfanatics.com.br/" },
    { marca: "Clube de Literatura Clássica", categoria: "Livros e cursos", oferta: "Desconto no plano anual", cupom: "EDSONCASTRO12", link: "https://literaturaclassica.com.br/" },
    { marca: "EBAC", categoria: "Livros e cursos", oferta: "R$ 300 de desconto em cursos", cupom: "300edson", link: "https://ebac.me/6eyk" },
    { marca: "AUVP", categoria: "Livros e cursos", oferta: "Escola de investimentos: faça a análise de perfil", cupom: null, link: "https://sard.ink/AUVPCastro14" }
  ],

  /* Categorias do bazar (links para a loja na Nuvemshop) */
  bazar: [
    { nome: "Tênis", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/tenis/" },
    { nome: "Camisetas", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/camisetas/" },
    { nome: "Camisas", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/camisas/" },
    { nome: "Calças", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/calcas1/" },
    { nome: "Bermudas", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/bermudas/" },
    { nome: "Jaquetas", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/jaquetas/" },
    { nome: "Moletons", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/moletom/" },
    { nome: "Relógios", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/relogios/" },
    { nome: "Bonés", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/bones/" },
    { nome: "Bolsas", link: "https://lojadocastrinho.lojavirtualnuvem.com.br/bazar/bolsas/" }
  ],

  grupos: [
    { nome: "WhatsApp", icone: "whatsapp", acao: "Entrar no grupo", texto: "Grupo de ofertas", descricao: "As promoções chegam como mensagem, junto com as suas conversas.", link: "https://edsoncastrogrupos.com/canaledson" },
    { nome: "Telegram", icone: "telegram", acao: "Entrar no clube", texto: "Clube de descontos", descricao: "Todas as ofertas reunidas num canal, para ver quando quiser.", link: "https://t.me/clubededescontosdocastro" },
    { nome: "Instagram", icone: "instagram", acao: "Entrar no canal", texto: "Canal de transmissão", descricao: "As ofertas aparecem direto nas suas mensagens do Instagram.", link: "https://www.instagram.com/channel/AbbGu6nbRxYRDnyg/" }
  ],

  /* video: um vídeo recente de cada série ou canal; o card abre esse vídeo no YouTube */
  series: [
    { nome: "Podcast do Edson Castro", texto: "Conversas longas com convidados, de Sérgio Reis a especialistas em Fórmula 1.", link: "https://www.youtube.com/playlist?list=PLluZaBvdSFLbFN_cvE-BKdLVQ5_XQw9nE", video: { id: "0M79Y_oCGiU", titulo: "Papo sertanejo raiz com Sérgio Reis" } },
    { nome: "Conversas difíceis", texto: "Mais de 120 episódios sobre dinheiro, trabalho e as dores da vida adulta.", link: "https://www.youtube.com/playlist?list=PLluZaBvdSFLZYpqhWd67fk8XvElcpNKba", video: { id: "LK4hqVMcp30", titulo: "Trabalha o dia inteiro e não sai do lugar?" } },
    { nome: "Boa Noite Castrinho", texto: "As lives para comentar a semana e responder o chat: terça e quinta às 10h, domingo às 21h30.", link: "https://www.youtube.com/playlist?list=PLluZaBvdSFLZ1yuV4d-vg3Q4-sVugJzRB", video: { id: "HSN4YQlK_u0", titulo: "Boa Noite Castrinho de 22/11/2026" } },
    { nome: "Moda masculina", texto: "Tênis, relógios, perfumes, cortes de cabelo e como montar um look.", link: "https://www.youtube.com/playlist?list=PLluZaBvdSFLZUskdK9sGPBQQfBbKQqgKi", video: { id: "puuFhZNsZWY", titulo: "12 tendências de estilo masculino para 2026" } }
  ],

  canais: [
    { nome: "Edson Castro [Oficial]", texto: "O canal principal: vídeos quase todo dia e as lives", publico: "484 mil inscritos", link: "https://www.youtube.com/@edsoncastrooficial", video: { id: "YtW249aS5XI", titulo: "Por que os coachs odeiam o GTA 6?" } },
    { nome: "Cortes do Castrinho", texto: "Os melhores momentos das lives e do podcast", publico: "145 mil inscritos", link: "https://www.youtube.com/@cortesdocastrinho", video: { id: "OgEl9wvPK7k", titulo: "GTA 6 é um jogo sem defeitos?" } },
    { nome: "Edson Castro Show", texto: "O podcast com os convidados", publico: "72 mil inscritos", link: "https://www.youtube.com/@edsoncastroshow", video: { id: "FqSeHELxlGQ", titulo: "Por que o trânsito de São Paulo nunca vai melhorar?" } },
    { nome: "Pequenas coisas da vida", texto: "Podcast e vlogs com a Leticia Pinheiro", publico: "9,5 mil inscritos", link: "https://www.youtube.com/@pequenascoisasdavida", video: { id: "hJUFw99E_FI", titulo: "Jantamos no festival de sopas do Ceagesp" } }
  ]
};
