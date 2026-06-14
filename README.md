# Agro Forte Futuro — Sustentável
### Equilíbrio entre Produção e Meio Ambiente

**Autores:** Kauany e Mateus  
**Tema:** Agro Forte Futuro — Sustentável Equilíbrio entre Produção e Meio Ambiente
**Versão:** 3.0

---

## Objetivo

Site educativo interativo que apresenta os **10 maiores desafios da agroindústria atual** e as **10 formas de resolver** cada um. Cada solução possui um **mini-jogo educativo** (100 jogos no total) que ensina sobre sustentabilidade de forma lúdica.

---

## Como Abrir

### Opção 1 — Direto no navegador (sem servidor)
Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Firefox, Edge).

### Opção 2 — Servidor local (recomendado)
```bash
# Instalar http-server (uma vez)
npm install -g http-server

# Iniciar na porta 8080
http-server -p 8080

# Acessar em:
http://localhost:8080
```

**Porta ocupada (EADDRINUSE)?**
```bash
# Usar porta alternativa
http-server -p 3000

# Ou encerrar processo na porta 8080 (CMD)
netstat -ano | findstr :8080
taskkill /PID <numero_do_pid> /F
```

### Opção 3 — VS Code Live Server (recomendado para desenvolvimento)
1. Instale a extensão **Live Server** no VS Code
2. Clique com o botão direito no `index.html` → **Open with Live Server**
3. O navegador abre automaticamente em `http://127.0.0.1:5500`

---

## Solução de Problemas

| Problema | Causa provável | Solução |
|----------|---------------|---------|
| Botão "🎮 Jogar" não abre | Usuário não está logado | Clique em "👤 Entrar" no header e faça login |
| IP capturado como `0.0.0.0` | Sem acesso à internet ou api.ipify.org bloqueado | Normal em redes restritas; o cadastro funciona normalmente |
| Fontes não carregam | Sem acesso à internet (Google Fonts CDN) | O site usa fallback para `sans-serif` automaticamente |
| Dados perdidos ao recarregar | Comportamento esperado — dados em memória | Use o servidor local e não recarregue para manter a sessão |
| Modo escuro não persiste | localStorage desabilitado no navegador | Habilite cookies/localStorage nas configurações do navegador |
| Jogo trava/congela | Timer ainda rodando após fechar | Clique "Desistir" antes de fechar para garantir o cleanup |

---

## Funcionalidades

- **Hero animado** com esferas flutuantes e apresentação do tema
- **Estatísticas** da agroindústria brasileira
- **10 cards interativos** — cada um com 10 soluções expandíveis
- **100 mini-jogos** (10 por tema) com mecânicas variadas
- **Sistema de pontuação** — cada jogo vale até 100 pontos
- **🏆 Ranking** — classifica os 100 melhores jogadores
- **👤 Login/Registro** — conta com nome de usuário, e-mail e data de nascimento
- **👑 Painel Admin** — visualiza todos os cadastros (IP + hostname) e pode excluir contas
- **🌙 Modo Escuro** — toggle persiste via localStorage
- **Design responsivo** — funciona em desktop, tablet e celular

---

## Sistema de Login

| Campo | Descrição |
|-------|-----------|
| Usuário | Nome público |
| E-mail | Contato |
| Data de Nascimento | Registro |
| Senha | Autenticação |

**Conta administrador pré-cadastrada:**
- Usuário: `cristal`
- Senha: `Emanuel20`
- Data de Nascimento: `16/11/2002`

> ⚠️ Dados ficam em memória JavaScript — reiniciar o servidor zera os registros (exceto o admin padrão).

### Painel Admin

Acessível apenas pela conta `cristal`. Para abrir: clique no botão **👤 cristal** no header → **👥 Ver Contas Cadastradas**.

O painel exibe todas as contas com:
- Nome de usuário, e-mail e data de nascimento
- IP público e hostname capturados no registro
- Data de cadastro e pontuação total

**Excluir conta:** cada conta não-admin exibe o botão **🗑️ Excluir** ao lado direito. Ao clicar:
- A conta é removida imediatamente da memória
- A lista é atualizada na hora sem fechar o painel
- O usuário excluído perde acesso ao login instantaneamente
- Para voltar a usar o site, precisará criar uma nova conta
- A conta `cristal` (admin) nunca exibe o botão e não pode ser excluída

---

## Estrutura de Arquivos

```
siteprojeto/
│
├── index.html              — Página principal (HTML semântico)
├── README.md               — Este arquivo
│
├── style/
│   └── style.css           — Todos os estilos (CSS3)
│
├── server/
│   ├── script.js           — Dados dos 10 desafios e lógica do site
│   ├── auth.js             — Login, registro, ranking, modo escuro
│   └── games.js            — 100 mini-jogos e sistema de pontuação
│
├── assets/                 — Ícones dos jogos (PNG criados no Paint)
│   ├── tree.png
│   ├── sapling.png
│   ├── degraded.png
│   ├── logger.png
│   ├── bee.png
│   ├── pesticide.png
│   ├── water_drop.png
│   ├── co2_bubble.png
│   ├── pest.png
│   └── solar_panel.png
│
└── imagem/                 — Imagens do site (PNG criados no Paint)
    ├── logo_leaf.png
    ├── icon_env.png
    ├── icon_prod.png
    ├── icon_social.png
    ├── author.png
    └── scroll_hint.png
```

---

## Tipos de Mini-jogos

| Mecânica | Descrição |
|----------|-----------|
| Grid Clicável | Plantar, instalar ou distribuir elementos em um grid |
| Whack-a-mole | Clicar em alvos antes que fujam da tela |
| Memória | Encontrar pares de cartas viradas |
| Sorter | Classificar itens em duas categorias |
| Match | Conectar pares esquerda-direita |
| Sequência | Ordenar itens clicando na ordem correta |
| Padrão | Montar um arranjo igual ao alvo mostrado |
| Spreading | Restaurar células degradadas antes que atinjam 70% |
| Balanço | Manter um medidor abaixo do limite por tempo determinado |
| Quiz | Responder perguntas de múltipla escolha |

---

## Os 10 Temas e Mini-jogos

| # | Tema | Mecânicas dos Jogos |
|---|------|---------------------|
| 1 | Desmatamento | Grid click, Memória, Padrão, Satélite, Sorter, Whack, Spreading, Quiz, Match, BFS |
| 2 | Agrotóxicos | Balanço, Whack, Sorter, Quiz, Match, Sequência, Sorter, Memória, Match, Grid |
| 3 | Degradação do Solo | Sequência, Grid, Grid, Quiz, Padrão, Whack, Match, Quiz, Grid, Quiz |
| 4 | Escassez de Água | Grid, Whack, Match, Spreading, Sorter, Sorter, Quiz, Memória, Sequência, Quiz |
| 5 | Emissão de Gases | Whack, Sorter, Grid, Sorter, Padrão, Sorter, Grid, Match, Balanço, Quiz |
| 6 | Perda de Biodiversidade | Grid, Padrão, Memória, Match, Whack, Sorter, Spreading, Quiz, Match, Sorter |
| 7 | Monocultura | Adjacência, Match, Balanço, Padrão, Sorter, Sequência, Match, Sequência, Quiz, Balanço |
| 8 | Precariedade Rural | Sorter, Grid, Match, Sequência, Quiz, Sequência, Match, Sorter, Quiz, Grid |
| 9 | Desperdício de Alimentos | Grid, Sorter, Match, Quiz, Sorter, Memória, Sequência, Match, Match, Quiz |
| 10 | Resistência a Pragas | Sequência, Match, Sequência, Grid, Whack, Sorter, Quiz, Match, Padrão, Match |

---

## Compatibilidade de Navegadores

| Navegador | Versão mínima | Status |
|-----------|--------------|--------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Opera | 76+ | ✅ Completo |

> ⚠️ **Internet Explorer não é suportado.** O site usa ES6+ (arrow functions, Set, spread operator, fetch API) e variáveis CSS que não funcionam no IE.

---

## Tecnologias

- **HTML5** — Semântico com tags button, input, label, a, section, header, footer
- **CSS3** — Variáveis, Flexbox, Grid, Media Queries, animações @keyframes, transições
- **JavaScript ES6+** — DOM manipulation, fetch API, localStorage, closures
- **Google Fonts** — Montserrat + Open Sans (CDN)
- **Imagens** — PNG criados com **Paint** (Microsoft)

---

## Fluxo do Sistema de Jogos

```
Clique em "🎮 Jogar" (solução)
        ↓
_requireLogin()
  ├── NÃO logado → abre painel de login → aguarda
  └── Logado ↓
showGameIntro(ti, si)
  → exibe overlay #go-intro (título, objetivo, instruções, solução)
        ↓
Clique "▶ Jogar"
  → _launch()
  → GMAP[ti][si](box)   ← instancia o jogo correto
  → exibe #go-arena
        ↓
Jogo em execução
  ├── Vitória/Derrota → _end(won, msg, score)
  │     → _saveGameScore(ti, si, pts)   ← salva melhor pontuação
  │     → exibe #go-result
  │           ↓ Clique "Fechar" → _close()
  └── Clique "Desistir" → _quit() → _close()
```

---

## localStorage

O site usa `localStorage` para persistir apenas um dado entre sessões:

| Chave | Valor | Uso |
|-------|-------|-----|
| `darkMode` | `"1"` ou `"0"` | Preferência de modo escuro |

> Todos os dados de usuários (contas, pontuações, ranking) ficam **somente em memória JavaScript** e são perdidos ao fechar ou recarregar o navegador.

---

## Identidade Visual

Paleta de cores centrada no verde-floresta (#1a3d20 → #3a9147) com destaques âmbar (#e8971a), criando uma identidade visual que remete diretamente ao agronegócio sustentável. Animações suaves (fade-up, orb-float, shake) guiam a atenção sem distrair do conteúdo educativo.

---

## Documentação Técnica

### index.html — Estrutura do HTML

| Seção | Descrição |
|-------|-----------|
| `<link rel="icon">` | Favicon apontando para `imagem/logo_leaf.png` — evita erro 404 no log do servidor |
| `<header id="hdr">` | Logo + navegação com âncoras internas (#sobre, #desafios, #rodape) |
| `<section class="hero" id="topo">` | Tela inicial 100vh com esferas animadas (.orb), título, subtítulo, badge da autora, botão CTA e indicador de rolagem |
| `<div class="stats">` | Faixa âmbar com 4 estatísticas reais do setor |
| `<section class="sec about" id="sobre">` | 3 cards: Ambiental, Eficiência, Social |
| `<section class="sec problems" id="desafios">` | Instrução de uso (.how-banner) + grid de cards preenchido dinamicamente por JS (#probGrid) |
| `<section class="quote-sec">` | Citação dos alunos Kauany e Mateus |
| `<footer id="rodape">` | Rodapé com nome do projeto e créditos da autora |
| `<div id="go">` (injetado por games.js) | Overlay dos mini-jogos: #go-intro (apresentação), #go-arena (jogo + HUD), #go-result (vitória ou derrota) |
| `<button id="btt">` | Botão flutuante "voltar ao topo" (fixo na tela, aparece após 400px de scroll) |

---

### style/style.css — Documentação do CSS

**Variáveis CSS (`:root`)**

| Variável | Valor | Uso |
|----------|-------|-----|
| `--gd` | `#1a3d20` | Verde escuro — headers, números |
| `--gm` | `#27682f` | Verde médio — gradientes, hover |
| `--gl` | `#3a9147` | Verde claro — bordas ativas |
| `--gp` | `#eaf5ec` | Verde pálido — fundos de cards |
| `--amb` | `#e8971a` | Âmbar/dourado — destaques, CTAs |
| `--ambl` | `#fde68a` | Âmbar claro — texto sobre fundo escuro |
| `--txt` | `#182418` | Texto principal escuro |
| `--txm` | `#3a5040` | Texto secundário médio |

**Blocos do CSS (em ordem no arquivo)**

- Reset global → `*` selector, box-sizing
- `html / body` → scroll suave, fonte base
- `HEADER` → fixo, blur, compacta ao rolar
- `HERO` → gradientes, padrão geométrico, `.orb` (esferas)
- `STATS STRIP` → faixa âmbar com 4 métricas
- `SEÇÕES GENÉRICAS` → `.sec`, `.sec-hd`, `.sec-chip`, `.rule`
- `ABOUT` → grid 3 colunas, hover animado
- `HOW-BANNER` → instrução de uso com borda verde
- `PROBLEMS / SOLUTIONS` → `.p-card`, `.p-head`, `.sol-panel`, expansão por max-height, `.open`
- `QUOTE` → seção escura com gradiente verde
- `FOOTER` → camadas de opacidade no texto
- `BACK TO TOP` → aparece após 400px de scroll
- `RESPONSIVE` → `@media max-width: 820px`
- `SISTEMA DE JOGOS` → `.has-game`, `.game-badge`, `#go`, `#go-intro`, `#go-arena`, `#go-hud`, `#go-result`, `.g0-*` até `.g9-*`

**Animações declaradas**

| Animação | Uso |
|----------|-----|
| `orb-float` | Hero — esferas flutuando |
| `fade-up` | Hero — entrada dos textos |
| `bob` | Hero — pulso do indicador de scroll |
| `sol-in` | Entrada das linhas de solução |
| `shake` | Feedback de erro nos jogos |
| `pop-in` | Crescimento de árvore (jogo g0) |

---

### server/auth.js — Documentação do Sistema de Autenticação

**Armazenamento**
Toda a base de usuários fica no objeto `_DB` em memória JavaScript. Ao reiniciar o servidor ou fechar o navegador todos os dados são perdidos, exceto a conta `cristal` que está escrita diretamente no código.

**Estrutura de um usuário em `_DB.users`**
```js
{
  username: string,
  password: string,
  email:    string,
  dob:      string,   // dd/mm/yyyy
  ip:       string,   // capturado via api.ipify.org no registro
  host:     string,   // window.location.hostname
  scores:   object,   // { "themeIdx_solIdx": pontos }
  isAdmin:  boolean,
  joinedAt: string    // data formatada pt-BR
}
```

**Funções principais**

| Função | Descrição |
|--------|-----------|
| `_doRegister()` | Valida campos, captura IP via fetch, cria conta e faz login automático |
| `_doLogin()` | Valida credenciais e autentica o usuário |
| `_doLogout()` | Limpa `_DB.current` e atualiza o header |
| `_openAdminPanel()` | Constrói a lista de contas via DOM; exibe botão 🗑️ Excluir para não-admins |
| `_deleteUser(username)` | Remove a conta do array `_DB.users`; atualiza a lista; exibe toast de confirmação. Nunca remove admin |
| `_saveGameScore(ti, si, pts)` | Salva a maior pontuação por jogo no objeto `scores` do usuário logado |
| `_openRanking()` | Ordena usuários por pontuação total e exibe os top 100 |
| `_toggleDark()` | Alterna modo escuro e persiste preferência no `localStorage` |
| `_showToast(msg)` | Exibe notificação temporária na tela por ~3 segundos |

**Overlays injetados no `<body>`**

| ID | Descrição |
|----|-----------|
| `#auth-ov` | Painel de login/registro com duas abas |
| `#user-panel-ov` | Painel do usuário logado (nome, pontuação, botão admin, logout) |
| `#admin-panel-ov` | Painel admin com lista de contas e botões de exclusão |
| `#ranking-ov` | Ranking top 100 ordenado por pontuação |

---

### server/script.js — Documentação do JavaScript Principal

**Array `PROBLEMS`**

Array com 10 objetos. Cada objeto:
```js
{
  emoji:     // ícone visual do card
  title:     // título do desafio
  sub:       // subtítulo/descrição curta
  solutions: // array com 10 strings (soluções)
}
```

**Função `build()`**
Gera o HTML de todos os 10 cards via `.map()` + `innerHTML`. Todas as soluções recebem a classe `.has-game`, o `onclick="showGameIntro(i, j)"` e o badge `🎮 Jogar` — os índices `i` (tema) e `j` (solução) são passados diretamente ao HTML gerado. Executada uma vez ao carregar a página.

**Função `toggle(i)`**
Abre/fecha o painel de soluções de um card. Fecha todos antes de abrir o clicado. Faz scroll suave até o card aberto.

**Scroll Effects**
- Header compacta quando `y > 40px` (classe `.scrolled`)
- Botão `#btt` aparece quando `y > 400px` (classe `.show`)
- Clique no `#btt` → scroll suave ao topo

---

### server/games.js — Documentação do Sistema de Jogos

**Metadados dos jogos** (arrays `[tema][solução]`, 10×10 cada)
- `GM_T[10][10]` → título de cada jogo (ex: "Reflorestador")
- `GM_S[10][10]` → objetivo curto (ex: "Plante 12 árvores em 30s!")
- `GM_H[10][10]` → instrução detalhada exibida na tela de introdução

**IIFE de Setup (`_setup`)**
Executa automaticamente ao carregar o script. Cria o HTML do overlay (`#go`) com 3 painéis e insere no `body`. Conecta os botões Jogar, Desistir, Sair e Fechar. Fecha ao clicar fora do painel.

**API Pública**
- `showGameIntro(ti, si)` → abre o overlay preenchendo metadados de `GM_T/GM_S/GM_H`; chamada pelos `onclick` gerados em `script.js`

**Funções Privadas**

| Função | Descrição |
|--------|-----------|
| `_launch()` | Transita intro → arena; chama `GMAP[_ti][_si](box)` |
| `_end(won, msg, score)` | Transita arena → resultado; salva pontuação via `_saveGameScore` |
| `_quit()` | Desiste mid-jogo, chama cleanup e fecha overlay |
| `_close()` | Fecha overlay e restaura `body.style.overflow` |
| `_cu` | Variável que guarda a função de cleanup do jogo ativo |

**Os 10 Jogos (g0 a g9)**

| Jogo | Nome | Descrição |
|------|------|-----------|
| g0 | Reflorestador | Grid 6×5 (30 tiles). Plantar 12 árvores em 30s. Crescimento: 🌱→🌿→🌳 |
| g1 | Pares de Incentivo | Memória: 12 cartas (6 pares). Máximo 5 erros. Encontrar todos os pares = vitória |
| g2 | Agrofloresta | Grid 4×4, padrão xadrez alternando 🌳 e 🌽. 3 tentativas para acertar |
| g3 | Satélite em Ação | Grid 6×5: clicar nos 8 tiles desmatados em 30s. Máximo 3 erros |
| g4 | Auditor Verde | 10 produtos um por vez: ✓ Sustentável / ✗ Não é. Máximo 3 erros. Acertar 8/10 = vitória |
| g5 | Guardião da Floresta | Whack-a-mole: grid 3×3, madeireiros sobem por 1,5s. Sobreviver 30s = vitória. Árvores = 0 = derrota |
| g6 | Restauração de Terras | Grid 5×5. Degradação espalha a cada 2,4s. ≥ 70% degradado = derrota. Sobreviver 35s com < 30% = vitória |
| g7 | Quiz da Floresta | 5 perguntas de múltipla escolha (3 opções). Acertar 3/5 = vitória |
| g8 | Conector PSA | 5 produtores × 5 programas PSA. Conectar os pares corretos. 5 conexões = vitória |
| g9 | Corredor Ecológico | Grid 7×5 com 5 fragmentos. Máximo 20 tiles de corredor. BFS verifica conectividade |

---

### Como Adicionar um Novo Jogo

Os 100 jogos são organizados em `server/games.js`. Para adicionar ou substituir um jogo:

**1. Escolha o tema e a solução** — `gTEMA_SOL(c)` (ex: `g0_5` = tema 0, solução 5)

**2. Escolha o template** e chame-o retornando o resultado:
```js
function g0_5(c) {
    return _quiz(c, [
        { q: 'Pergunta?', opts: ['A', 'B', 'C'], ok: 0 }  // ok = índice da resposta correta
    ], 3);  // 3 = mínimo de acertos para vitória
}
```

**3. Registre no GMAP** (no final do arquivo):
```js
const GMAP = [
    [g0_0, g0_1, g0_2, ..., g0_5, ...],  // tema 0
    ...
];
```

**4. Atualize os metadados** nas arrays `GM_T` (título), `GM_S` (objetivo) e `GM_H` (instrução) — todas têm estrutura `[tema][solução]`.

---

### Como Adicionar um Novo Tema

1. Adicione um objeto ao array `PROBLEMS` em `server/script.js`
2. Crie 10 funções de jogo (`gN_0` a `gN_9`) em `server/games.js`
3. Adicione uma linha ao `GMAP` com as 10 funções
4. Adicione os metadados nas arrays `GM_T`, `GM_S` e `GM_H`

---

### Pontuação — Cálculo

| Situação | Pontos |
|---------|--------|
| Vitória padrão | 100 pts |
| Derrota padrão | 0 pts |
| Vitória parcial (quiz, sorter) | `acertos / total × 100` |
| Sequência com 3 tentativas | 100 pts |
| Sequência com 2 tentativas | 75 pts |
| Sequência com 1 tentativa | 50 pts |
| Padrão com 3 tentativas | 100 pts |
| Padrão com 2 tentativas | 75 pts |

Sempre é salva a **maior pontuação** obtida em cada jogo. Rejogando com pontuação menor, o registro não é atualizado.

---

### assets/ e imagem/

**`assets/`** — destinada a ícones e sprites dos jogos (PNG criados no Paint). Os jogos atualmente usam emojis e CSS puro.

**`imagem/`** — destinada a imagens do site (PNG criados no Paint). O visual do site usa CSS puro.

Para referenciar no HTML:
```html
<img src="imagem/nome-da-imagem.png" alt="...">
```

Para referenciar nos jogos (games.js):
```js
const img = document.createElement('img');
img.src = 'assets/nome-do-asset.png';
```

---

*© 2025 Agro Forte Futuro — Professora Cristal Santos Prestes*
