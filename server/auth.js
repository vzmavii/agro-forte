/* auth.js — Sistema de autenticação, ranking e painel admin
   Autora: Professora Cristal Santos Prestes

   Fluxo: _buildAuthUI() (IIFE) → injeta overlays no <body>
          _doRegister/_doLogin → preenche _DB.current
          games.js chama _requireLogin() antes de abrir qualquer jogo
          games.js chama _saveGameScore() ao terminar cada jogo */
'use strict';  // evita variáveis implícitas e facilita depuração

/* ── ARMAZENAMENTO IN-MEMORY (reinicia com o servidor) ── */
const _DB = {
    users: [
        {
            username: 'cristal',
            password: 'Emanuel20',
            email: 'cristal@agrofortefuturo.com',
            dob: '16/11/2002',
            ip: '127.0.0.1',
            host: 'localhost',
            scores: {},      // {themeIdx_solIdx: points}
            isAdmin: true,
            joinedAt: new Date().toLocaleDateString('pt-BR')
        }
    ],
    current: null   // usuário logado
};

/* ── CAPTURAR IP ── */
// Busca o IP público do usuário via API externa
async function _fetchIP() {
    try {
        const r = await fetch('https://api.ipify.org?format=json');
        const j = await r.json();
        return j.ip || '0.0.0.0';
    } catch {
        return '0.0.0.0';
    }
}

/* ── UTILITÁRIOS ── */
const _isAdmin = () => _DB.current && _DB.current.isAdmin;

// Calcula a pontuação total somando todos os jogos do usuário
function _getTotalScore(user) {
    return Object.values(user.scores || {}).reduce((a, b) => a + b, 0);
}

/* ── SALVAR PONTUAÇÃO DE JOGO (chamado por games.js) ── */
function _saveGameScore(ti, si, pts) {
    if (!_DB.current) return;
    const key = `${ti}_${si}`;
    const prev = _DB.current.scores[key] || 0;
    if (pts > prev) {
        _DB.current.scores[key] = pts;
    }
    _updateRankingIfOpen();
}

/* ── VERIFICAR LOGIN ANTES DE ABRIR JOGO ── */
// Retorna true se logado; abre painel de login e retorna false caso contrário
function _requireLogin() {
    if (_DB.current) return true;
    _openAuthPanel('login');
    return false;
}

/* ══════════════════════════════════════════════════════
   OVERLAY DE AUTENTICAÇÃO
   IIFE: executa imediatamente ao carregar o script,
   antes de qualquer interação do usuário, para garantir
   que os overlays existam quando os botões forem clicados
══════════════════════════════════════════════════════ */
(function _buildAuthUI() {
    /* Botão de login/usuário no header */
    const hdr = document.getElementById('hdr');
    if (hdr) {
        const btn = document.createElement('button');
        btn.id = 'auth-btn';
        btn.className = 'auth-hdr-btn';
        btn.textContent = '👤 Entrar';
        btn.onclick = () => {
            if (_DB.current) _openUserPanel();
            else _openAuthPanel('login');
        };
        hdr.appendChild(btn);
    }

    /* Botão Modo Escuro */
    const darkBtn = document.createElement('button');
    darkBtn.id = 'dark-btn';
    darkBtn.className = 'dark-hdr-btn';
    darkBtn.title = 'Alternar modo escuro';
    darkBtn.textContent = '🌙';
    darkBtn.onclick = _toggleDark;
    if (hdr) hdr.appendChild(darkBtn);

    /* Overlay de autenticação */
    const ov = document.createElement('div');
    ov.id = 'auth-ov';
    ov.innerHTML = `
    <div id="auth-panel">
      <button id="auth-close" onclick="_closeAuth()">✕</button>
      <div id="auth-tabs">
        <button class="auth-tab active" id="tab-login" onclick="_switchTab('login')">Entrar</button>
        <button class="auth-tab" id="tab-reg" onclick="_switchTab('register')">Registrar</button>
      </div>

      <!-- LOGIN -->
      <div id="auth-login">
        <h3>👤 Bem-vindo!</h3>
        <label>Usuário<input type="text" id="li-user" placeholder="Nome de usuário"></label>
        <label>Senha<input type="password" id="li-pass" placeholder="Senha"></label>
        <div id="li-err" class="auth-err"></div>
        <button class="auth-submit" onclick="_doLogin()">Entrar ▶</button>
      </div>

      <!-- REGISTRO -->
      <div id="auth-register" style="display:none">
        <h3>🌱 Criar Conta</h3>
        <label>Usuário<input type="text" id="rg-user" placeholder="Escolha um nome de usuário"></label>
        <label>E-mail<input type="email" id="rg-email" placeholder="seu@email.com"></label>
        <label>Data de Nascimento<input type="date" id="rg-dob"></label>
        <label>Senha<input type="password" id="rg-pass" placeholder="Crie uma senha"></label>
        <div id="rg-err" class="auth-err"></div>
        <button class="auth-submit" onclick="_doRegister()">Registrar ✓</button>
      </div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov) _closeAuth(); });

    /* Painel do usuário logado */
    const up = document.createElement('div');
    up.id = 'user-panel-ov';
    up.innerHTML = `
    <div id="user-panel">
      <button onclick="_closeUserPanel()">✕</button>
      <div id="up-name"></div>
      <div id="up-score"></div>
      <button id="up-admin-btn" style="display:none" onclick="_openAdminPanel()">👥 Ver Contas Cadastradas</button>
      <button class="auth-submit" style="margin-top:10px" onclick="_doLogout()">Sair ↩</button>
    </div>`;
    document.body.appendChild(up);
    up.addEventListener('click', e => { if (e.target === up) _closeUserPanel(); });

    /* Painel admin */
    const ap = document.createElement('div');
    ap.id = 'admin-panel-ov';
    ap.innerHTML = `
    <div id="admin-panel">
      <button onclick="document.getElementById('admin-panel-ov').style.display='none'">✕</button>
      <h3>👥 Contas Cadastradas</h3>
      <div id="admin-list"></div>
    </div>`;
    document.body.appendChild(ap);
    ap.addEventListener('click', e => { if (e.target === ap) ap.style.display = 'none'; });

    /* Botão Ranking + painel */
    _buildRankingUI();
})();

function _openAuthPanel(tab) {
    document.getElementById('auth-ov').style.display = 'flex';
    _switchTab(tab || 'login');
    document.body.style.overflow = 'hidden';
}

function _closeAuth() {
    document.getElementById('auth-ov').style.display = 'none';
    document.body.style.overflow = '';
}

function _switchTab(tab) {
    document.getElementById('auth-login').style.display    = tab === 'login'    ? 'flex' : 'none';
    document.getElementById('auth-register').style.display = tab === 'register' ? 'flex' : 'none';
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-reg').classList.toggle('active', tab === 'register');
}

// Registra novo usuário capturando IP, valida campos e faz login automático
async function _doRegister() {
    const user  = document.getElementById('rg-user').value.trim();
    const email = document.getElementById('rg-email').value.trim();
    const dob   = document.getElementById('rg-dob').value;
    const pass  = document.getElementById('rg-pass').value;
    const err   = document.getElementById('rg-err');

    if (!user || !email || !dob || !pass) {
        err.textContent = 'Preencha todos os campos!'; return;
    }
    if (_DB.users.find(u => u.username.toLowerCase() === user.toLowerCase())) {
        err.textContent = 'Usuário já existe. Escolha outro nome.'; return;
    }
    err.textContent = '...capturando IP...';
    try {
        const ip   = await _fetchIP();
        const host = window.location.hostname || navigator.platform || 'Desconhecido';
        const [y, m, d] = dob.split('-');
        const dobFmt = `${d}/${m}/${y}`;
        const newUser = {
            username: user, password: pass, email, dob: dobFmt,
            ip, host, scores: {}, isAdmin: false,
            joinedAt: new Date().toLocaleDateString('pt-BR')
        };
        _DB.users.push(newUser);
        _DB.current = newUser;
        _closeAuth();
        _updateAuthBtn();
        _showToast(`Bem-vindo, ${user}! 🌱`);
    } catch (e) {
        err.textContent = 'Erro ao criar conta. Tente novamente.';
    }
}

// Valida credenciais e autentica o usuário
function _doLogin() {
    const user = document.getElementById('li-user').value.trim();
    const pass = document.getElementById('li-pass').value;
    const err  = document.getElementById('li-err');
    const found = _DB.users.find(u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass);
    if (!found) {
        err.textContent = 'Usuário ou senha incorretos.'; return;
    }
    _DB.current = found;
    _closeAuth();
    _updateAuthBtn();
    _showToast(`Olá, ${found.username}! 👋`);
}

function _doLogout() {
    _DB.current = null;
    _closeUserPanel();
    _updateAuthBtn();
    _showToast('Até logo! 👋');
}

function _updateAuthBtn() {
    const btn = document.getElementById('auth-btn');
    if (!btn) return;
    btn.textContent = _DB.current ? `👤 ${_DB.current.username}` : '👤 Entrar';
}

function _openUserPanel() {
    const n = document.getElementById('up-name');
    const s = document.getElementById('up-score');
    const a = document.getElementById('up-admin-btn');
    if (n) n.textContent = `Olá, ${_DB.current.username}! 👋`;
    if (s) s.textContent = `Pontuação total: ${_getTotalScore(_DB.current)} pts`;
    if (a) a.style.display = _isAdmin() ? 'block' : 'none';
    document.getElementById('user-panel-ov').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function _closeUserPanel() {
    document.getElementById('user-panel-ov').style.display = 'none';
    document.body.style.overflow = '';
}

// Exibe painel admin com lista de todos os usuários, IPs e pontuações
function _openAdminPanel() {
    if (!_isAdmin()) return;
    const list = document.getElementById('admin-list');
    list.innerHTML = '';
    _DB.users.forEach(function(u, i) {
        const row = document.createElement('div');
        row.className = 'admin-row';
        row.innerHTML =
            '<span class="admin-num">#' + (i + 1) + '</span>' +
            '<div class="admin-info">' +
              '<strong>' + u.username + (u.isAdmin ? ' 👑' : '') + '</strong>' +
              '<small>' + u.email + ' | Nasc: ' + u.dob + '</small>' +
              '<small>IP: <code>' + u.ip + '</code> | Host: <code>' + u.host + '</code></small>' +
              '<small>Cadastro: ' + u.joinedAt + ' | Pontos: ' + _getTotalScore(u) + '</small>' +
            '</div>';
        if (!u.isAdmin) {
            const btn = document.createElement('button');
            btn.className = 'admin-del-btn';
            btn.textContent = '🗑️ Excluir';
            btn.onclick = function() { _deleteUser(u.username); };
            row.appendChild(btn);
        }
        list.appendChild(row);
    });
    document.getElementById('admin-panel-ov').style.display = 'flex';
}

// Remove uma conta de usuário (nunca remove admin)
function _deleteUser(username) {
    const idx = _DB.users.findIndex(u => u.username === username);
    if (idx === -1 || _DB.users[idx].isAdmin) return;
    _DB.users.splice(idx, 1);
    _openAdminPanel();
    _showToast(`Conta "${username}" excluída. 🗑️`);
}

/* ══════════════════════════════════════════════════════
   RANKING
══════════════════════════════════════════════════════ */
function _buildRankingUI() {
    /* Botão acima dos desafios */
    /* Insere o botão de ranking antes do how-banner, dentro do pg-wrap */
    const howBanner = document.querySelector('#desafios .how-banner');
    if (howBanner) {
        const btn = document.createElement('button');
        btn.id = 'ranking-btn';
        btn.className = 'ranking-open-btn';
        btn.innerHTML = '🏆 Ranking';
        btn.onclick = _openRanking;
        howBanner.parentNode.insertBefore(btn, howBanner);
    }

    /* Overlay do ranking */
    const ov = document.createElement('div');
    ov.id = 'ranking-ov';
    ov.innerHTML = `
    <div id="ranking-panel">
      <button onclick="document.getElementById('ranking-ov').style.display='none'">✕</button>
      <h3>🏆 Ranking — Top 100</h3>
      <p class="rank-sub">Pontuação total somando todos os jogos</p>
      <div id="ranking-list"></div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov) ov.style.display = 'none'; });
}

// Ordena usuários por pontuação total e exibe os top 100
function _openRanking() {
    const sorted = [..._DB.users]
        .sort((a, b) => _getTotalScore(b) - _getTotalScore(a))
        .slice(0, 100);
    const list = document.getElementById('ranking-list');
    const medals = ['🥇', '🥈', '🥉'];
    list.innerHTML = sorted.map((u, i) => `
        <div class="rank-row${_DB.current && u.username === _DB.current.username ? ' rank-me' : ''}">
          <span class="rank-pos">${medals[i] || '#' + (i + 1)}</span>
          <span class="rank-name">${u.username}${u.isAdmin ? ' 👑' : ''}</span>
          <span class="rank-pts">${_getTotalScore(u)} pts</span>
        </div>`).join('') || '<p style="text-align:center;color:#666">Nenhuma pontuação ainda.</p>';
    document.getElementById('ranking-ov').style.display = 'flex';
}

function _updateRankingIfOpen() {
    const ov = document.getElementById('ranking-ov');
    if (ov && ov.style.display === 'flex') _openRanking();
}

/* ══════════════════════════════════════════════════════
   MODO ESCURO
══════════════════════════════════════════════════════ */
// Alterna o modo escuro e salva a preferência no localStorage
function _toggleDark() {
    const isDark = document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('dark-btn');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? '1' : '0');
}

// IIFE: restaura o modo escuro imediatamente ao carregar, antes do primeiro frame renderizado
(function _restoreDark() {
    if (localStorage.getItem('darkMode') === '1') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('dark-btn');
        if (btn) btn.textContent = '☀️';
    }
})();

/* ── TOAST ── */
// Exibe notificação temporária na tela por ~3 segundos
function _showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = msg;
    document.body.appendChild(t);
    // 10ms de delay antes de adicionar a classe: garante que o elemento já
    // está no DOM para que a transição CSS de entrada seja disparada corretamente
    setTimeout(() => t.classList.add('toast-show'), 10);
    setTimeout(() => { t.classList.remove('toast-show'); setTimeout(() => t.remove(), 400); }, 2800);
}
