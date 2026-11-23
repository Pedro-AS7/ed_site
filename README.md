# Site do Edson Castro

Site estático (HTML, CSS e JavaScript puros, sem build) que reúne o trabalho do Edson Castro:
vídeos, podcast, livros, cupons dos parceiros, grupos de ofertas, bazar, sobre e contato.

A pesquisa que deu origem ao conteúdo está em `pesquisa-edson-castro.md`.

## Rodar localmente

```bash
python3 -m http.server 8765
# abra http://127.0.0.1:8765
```

Abrir o `index.html` direto (file://) funciona, mas o vídeo do YouTube só carrega servido por HTTP.

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Cupons, grupos de ofertas, categorias do bazar, canais e séries (com o vídeo de cada card) | `assets/js/dados.js` |
| Textos fixos (topo, livros, bazar, sobre, contato, rodapé) | `index.html` |
| Cores, fontes e layout | `assets/css/style.css` (variáveis no `:root`; cada seção é uma `.faixa` com `.container`, `.cabeca` e `.grade` ou `.dupla`) |
| Ícone da aba e do topo | avatar do canal do YouTube (URL no `index.html`) |

Na seção **YouTube**, os cards de **Canais** e **Séries** mostram um vídeo fixo de cada um (campo `video` em `dados.js`)
e abrem esse vídeo no YouTube; nas séries, ele abre dentro da playlist. Para atualizar, troque o `id` e o `titulo`.

Nos **Grupos de ofertas**, o campo `icone` escolhe o logo do app (`whatsapp`, `telegram` ou `instagram`); os desenhos
ficam em `ICONES`, no `assets/js/main.js` (Simple Icons, licença CC0), e as cores de cada marca no CSS (`.grupo__selo--*`).

Depois de mudar o CSS ou o JS, aumente o número em `?v=` nos três links do fim e do começo do `index.html`
(`style.css?v=2`, `dados.js?v=2`, `main.js?v=2`), senão o navegador de quem já visitou pode continuar com a versão antiga.

## Publicar

O site está no **GitHub Pages**: https://pedro-as7.github.io/ed_site/ (repositório `Pedro-AS7/ed_site`, branch `main`, pasta raiz).
Para atualizar, faça commit e `git push`; o Pages publica sozinho em cerca de 1 minuto.

O repositório é público (exigência do Pages no plano grátis). O `pesquisa-edson-castro.md` fica fora do git pelo `.gitignore`.
Domínio sugerido: `omelhoramigodoshomens.com.br`, que já é do Edson e hoje não tem site no ar
(configure em Settings → Pages → Custom domain e aponte o DNS para o GitHub).

## Pendências antes de publicar

- **Imagens:** o avatar, as capas dos livros e as miniaturas vêm direto dos servidores do YouTube e da Amazon.
  Trocar por fotos oficiais salvas em `assets/img/` (uma foto real do Edson no topo funcionaria melhor que a caricatura).
- **Cupons:** confirmar quais ainda valem; os da EBAC, Futfanatics e Manual mudam por campanha.
- **Livro "Guia definitivo":** o link usa a tag de afiliado `edsoncastro-20`; confirmar se ele quer esse link ou outro.
- **Sobre:** revisar o texto com o Edson e decidir se cita o Manual do Homem Moderno.
