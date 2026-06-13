/* games.js v3.0 — 100 jogos para 10 temas
   Autora: Professora Cristal Santos Prestes */
'use strict';

/* ── ESTADO GLOBAL DO JOGO ── */
// _cu: função de cleanup do jogo ativo (clearInterval + removeEventListener)
// _ti: índice do tema atual (0–9)
// _si: índice da solução/jogo atual (0–9)
let _cu = null, _ti = -1, _si = -1;

/* ── METADADOS [tema][solução] ── */
const GM_T=[['Reflorestador','Pares de Incentivo','Agrofloresta','Satélite em Ação','Auditor Verde','Guardião da Floresta','Restauração de Terras','Quiz da Floresta','Conector PSA','Corredor Ecológico'],['Equilibrista de Pragas','Caça-Insetos','Seletor Orgânico','Quiz de Segurança','Laboratório Bio','Rotação de Culturas','Fiscal de Licenças','Memória Genética','Conexão Genética','Zona Tampão'],['Camadas do Solo','Barreira Anti-Erosão','Plantio de Cobertura','Quiz da Compostagem','Curvas de Nível','Guarda do Maquinário','Quebra-Cabeça ILPF','Quiz do Solo','Plantador de Leguminosas','Extensionista Rural'],['Gotejador Preciso','Coletor de Chuva','Conexão Hídrica','Mata Ciliar','Gestor de Cotas','Seletor de Sementes','Quiz Hídrico','Memória da Umidade','Sequência de Irrigação','Quiz dos Comitês'],['Capturador de CO₂','Biodigestor','Fazenda Solar','Classificador de Práticas','Padrão ILPF Carbono','Gestor de Combustíveis','Estoque de Carbono','Mercado de Carbono','Medidor de Metano','Quiz do Carbono'],['Guardião de Habitats','Padrão Agroflorestal','Memória de Sementes','Conexão de Habitats','Protetor de Polinizadores','Seletor Agroecológico','Restaurador de Habitats','Quiz de Biodiversidade','Valor dos Polinizadores','Escudo Ambiental'],['Planejador de Diversidade','Conexão de Mercados','Equilíbrio de Riscos','Layout Agroflorestal','Caçador de Monocultura','Sequência de Safras','Conexão Cooperativa','Sequência de Colheitas','Quiz da Policoltura','Teste de Resiliência'],['Fiscal de Direitos','Inspector de Segurança','Conexão Trabalho-Máquina','Sequência de Treinamento','Quiz dos Direitos','Equipador de Trabalhador','Conexão de Moradia','Seletor de Crédito','Quiz do Trabalho Infantil','Distribuidor de Terras'],['Gestor de Estoque','Seletor de Conservação','Conexão Produtor-Consumidor','Quiz do Aproveitamento','Separador de Doações','Memória de Embalagens','Sequência de Processamento','Entregador Solidário','Conexão Digital','Quiz da Vida Útil'],['Protocolo MIP','Conexão Bio-Controle','Sequência de Rotação','Gestor de Predadores','Caça-Pragas','Seletor de Agrotóxicos','Quiz de Diagnóstico','Conexão Gene-Resistência','Diversidade Genética','Rede de Pesquisa']];

const GM_S=[['Plante 12 árvores em 30s!','Encontre 6 pares — máx. 5 erros!','Monte o padrão agroflorestal!','Identifique 8 áreas desmatadas em 30s!','Classifique 10 produtos sustentáveis!','Impeça os madeireiros por 30s!','Restaure o solo antes que se espalhe!','Acerte 3/5 perguntas florestais!','Conecte 5 produtores ao PSA certo!','Ligue todos os fragmentos de floresta!'],['Mantenha pragas controladas sem pesticidas!','Clique nos insetos nocivos, proteja os benéficos!','Separe insumos orgânicos dos químicos!','Acerte 3/5 sobre segurança de agrotóxicos!','Conecte 5 bioagentes ao seu alvo!','Ordene a rotação de culturas correta!','Aprove ou reprove 8 licenças!','Encontre 6 pares de genes de resistência!','Conecte genes às doenças que combatem!','Crie zonas tampão para proteger áreas sensíveis!'],['Ordene as 5 camadas do solo!','Coloque 6 barreiras anti-erosão em 30s!','Plante cobertura vegetal antes da chuva!','Acerte 3/5 sobre compostagem!','Monte o padrão de curvas de nível!','Impeça 20 tratores pesados em 30s!','Conecte componentes do sistema ILPF!','Acerte 3/5 sobre saúde do solo!','Plante 10 leguminosas nas áreas degradadas!','Acerte 3/5 de extensão rural!'],['Cubra 10 plantas com gotejadores em 30s!','Capture 15 gotas de chuva em 30s!','Conecte 5 fontes d\'água ao uso ideal!','Plante mata ciliar antes da erosão!','Aprove/reprove 8 pedidos de uso d\'água!','Separe sementes tolerantes à seca!','Acerte 3/5 sobre eficiência hídrica!','Encontre 6 pares de umidade do solo!','Ordene as etapas de irrigação!','Acerte 3/5 sobre gestão de bacias!'],['Capture 12 bolhas de CO₂ em 30s!','Separe resíduos biodigestáveis!','Instale 10 painéis solares em 30s!','Separe práticas de baixo e alto carbono!','Monte o padrão ILPF para máximo sequestro!','Separe biocombustíveis de fósseis!','Adubie o solo para estocar carbono!','Conecte agricultores ao mercado de carbono!','Mantenha metano abaixo do limite!','Acerte 3/5 sobre pegada de carbono!'],['Proteja 30% do território como habitat!','Monte o padrão agroflorestal diverso!','Encontre 6 pares de sementes nativas!','Conecte 5 habitats aos seus corredores!','Proteja as abelhas das nuvens tóxicas!','Separe práticas agroecológicas!','Restaure habitats antes da fragmentação!','Acerte 3/5 sobre biodiversidade!','Conecte 5 polinizadores às suas culturas!','Bloqueie 8 ameaças ambientais!'],['Monte rotação sem culturas iguais adjacentes!','Conecte produtos aos canais de mercado!','Mantenha o índice de risco abaixo do limite!','Arrange as zonas agroflorestais!','Identifique monoculturas entre as fazendas!','Ordene o calendário agrícola!','Conecte 5 agricultores à cooperativa!','Ordene as etapas da colheita!','Acerte 3/5 sobre vantagens da policoltura!','Sobreviva à crise de mercado!'],['Classifique 8 práticas trabalhistas!','Identifique 8 riscos de segurança!','Conecte tarefas perigosas às máquinas!','Ordene o treinamento de segurança!','Acerte 3/5 sobre direitos trabalhistas!','Vista o EPI na ordem correta!','Conecte necessidades de moradia!','Aprove/reprove linhas de crédito!','Acerte 3/5 sobre trabalho infantil!','Distribua 10 lotes de terra!'],['Armazene 10 alimentos antes que estraguem!','Separe técnicas de conservação corretas!','Conecte produtores aos canais de venda!','Acerte 3/5 sobre aproveitamento integral!','Separe o que pode ou não ser doado!','Encontre 6 pares produto-embalagem!','Ordene as etapas de processamento!','Conecte excedentes aos destinos!','Conecte agricultores às plataformas!','Acerte 3/5 sobre vida de prateleira!'],['Ordene as 5 etapas do protocolo MIP!','Conecte 5 agentes de biocontrole!','Ordene a rotação de princípios ativos!','Posicione predadores perto das pragas!','Clique nas pragas monitoradas em 30s!','Separe pesticidas seletivos!','Acerte 3/5 de diagnóstico fitossanitário!','Conecte 5 genes de resistência!','Monte o padrão de diversidade genética!','Conecte instituições às especialidades!']];

const GM_H=[['Clique nas áreas marrons 🏜 para plantar árvores. Plante 12 antes do tempo acabar!','Vire duas cartas por vez. Achos ficam verdes; erros voltam viradas. Máx. 5 erros!','Alterne células entre 🌳 e 🌽 clicando nelas. Monte o padrão xadrez mostrado ao lado. 3 tentativas!','Clique nas áreas marrons-vermelhas (desmatadas) vistas pelo satélite. Evite as verdes. Máx. 3 erros!','Um produto aparece. Clique ✓ se sustentável, ✗ se não for. Acerte pelo menos 8 de 10!','Madeireiros 🪚 sobem pelos buracos. Clique neles antes de sumirem. Sobreviva 30 segundos!','Clique nas células 🏜 para restaurar. Se 70% ficar degradado, você perde!','3 opções por pergunta. Selecione a resposta correta. Acerte pelo menos 3 de 5!','Clique num produtor (esq.) depois no PSA correspondente (dir.). Acerte os 5 pares!','Clique em células vazias para criar corredores 🌿. Use Verificar quando conectar tudo. Máx. 20 tiles!'],['O medidor de pragas sobe sozinho. Clique nas ações verdes para reduzir. Mantenha < 60% por 25 s!','Insetos aparecem. Clique nos nocivos 🪲🪳🦟 e evite os benéficos 🐝🐞. Cada erro = -1 vida!','Produtos aparecem um por vez. Clique Orgânico ou Químico. Acerte 8 de 10!','Leia cada questão sobre segurança no uso de defensivos. Precisa acertar 3 de 5!','Clique no bioagente (esq.) depois na praga correspondente (dir.). 5 pares corretos = vitória!','Culturas estão embaralhadas. Clique nelas na ordem correta de rotação!','Fichas de licença aparecem. Clique ✓ Aprovar ou ✗ Reprovar conforme a legislação. 8 corretos!','Vire cartas procurando pares de genes de resistência. Máx. 5 erros!','Clique num gene (esq.) depois na doença que ele resiste (dir.). Acerte os 5 pares!','Clique em células ao redor de rios e florestas para criar faixas tampão. Proteja todas as áreas!'],['As camadas do solo estão embaralhadas. Clique nelas na ordem correta: de baixo para cima!','Clique em células de encosta para colocar barreiras 🪨 e deter erosão. Posicione 6 antes de 30 s!','A chuva se aproxima! Clique nas células vazias para plantar cobertura vegetal. Cubra 12!','Responda 3 de 5 perguntas sobre compostagem e adubação orgânica.','Clique nas células para montar o padrão de curvas de nível mostrado ao lado.','Tratores 🚜 cruzam o campo. Clique neles para desviá-los! 20 desviados = vitória.','Conecte cada componente do ILPF ao seu papel. Acerte os 5 pares!','Responda 3 de 5 perguntas sobre saúde e monitoramento do solo.','Clique nas células degradadas para plantar leguminosas 🌿. Plante 10!','Responda 3 de 5 questões de extensão rural e manejo conservacionista.'],['Clique em células ao lado de plantas 🌱 para instalar gotejadores 💧. Cubra 10 em 30 s!','Gotas de chuva caem pela tela. Clique nelas para capturar. Capture 15 em 30 s!','Conecte cada fonte hídrica ao uso mais eficiente. Acerte os 5 pares!','Clique nas margens do rio para plantar mata ciliar. Proteja toda a extensão antes da erosão!','Pedidos de uso d\'água aparecem. Aprove ✓ ou reprove ✗ conforme uso racional. 8 corretos!','Sementes aparecem. Clique Tolerante ou Normal para classificar corretamente. 8 de 10!','Responda 3 de 5 perguntas sobre irrigação eficiente e uso racional da água.','Encontre 6 pares de indicadores de umidade do solo. Máx. 5 erros!','Itens de irrigação estão embaralhados. Clique na sequência correta!','Responda 3 de 5 sobre gestão participativa de bacias hidrográficas.'],['Bolhas de CO₂ sobem. Clique nelas antes de escaparem! Capture 12 em 30 s!','Resíduos aparecem. Clique Biodigestável ou Não. Acerte 8 de 10!','Telhados aparecem no grid. Clique nos vazios para instalar painéis ☀️. Instale 10 em 30 s!','Práticas aparecem. Clique Baixo Carbono ou Alto Carbono. 8 de 10!','Clique nas células para montar padrão ILPF: lavoura-pecuária-floresta. 3 tentativas!','Combustíveis aparecem. Classifique como Renovável ou Fóssil. 8 de 10!','Clique em células de solo exposto para adicionar matéria orgânica 🌿. Revitalize 12 em 30 s!','Conecte cada agricultor ao programa de crédito de carbono correto. 5 pares!','O medidor de metano sobe. Clique nas ações certas para reduzir. Mantenha < 60% por 25 s!','Responda 3 de 5 sobre pegada de carbono e práticas sustentáveis.'],['Clique em células para designar áreas protegidas 🌿. Proteja pelo menos 30%!','Clique nas células para montar mosaico agroflorestal diverso. 3 tentativas!','Vire cartas procurando pares de sementes e frutas nativas. Máx. 5 erros!','Conecte cada habitat fragmentado ao corredor ecológico que o liga. 5 pares!','Nuvens de pesticida ☁️ se aproximam das abelhas. Clique nas nuvens para dispersar! 30 s.','Práticas aparecem. Clique Agroecológica ou Convencional. 8 de 10!','Habitats se fragmentam. Clique nas células degradadas para restaurar. Não deixe chegar a 70%!','Responda 3 de 5 sobre biodiversidade e espécies ameaçadas.','Conecte cada polinizador à cultura que ele poliniza. 5 pares!','Ameaças aparecem. Clique Bloquear em cada uma. Bloqueie 8!'],['Clique para plantar culturas. Regra: nenhuma igual pode estar adjacente. Preencha 12 células!','Conecte cada produto diversificado ao canal de mercado certo. 5 pares!','O índice de risco monocultura sobe. Clique em ações de diversificação para baixar. Mantenha < 60%!','Clique para montar zonas: lavoura, pecuária e floresta no padrão agroflorestal. 3 tentativas!','Fazendas aparecem. Clique Monocultura ou Diversificada. Acerte 8 de 10!','Culturas estão fora de ordem no calendário. Clique na sequência correta das safras!','Conecte cada agricultor à cooperativa adequada. 5 pares!','As etapas da colheita estão embaralhadas. Clique na sequência correta!','Responda 3 de 5 sobre vantagens da produção diversificada.','O mercado está em crise. Clique em ações de diversificação para sobreviver. 25 s!'],['Situações de trabalho aparecem. Clique Legal ou Irregular. Acerte 8 de 10!','Clique nos perigos ⚠ escondidos no ambiente de trabalho. Encontre 8 em 30 s!','Conecte cada atividade perigosa à máquina que substitui o trabalho manual. 5 pares!','Etapas de treinamento fora de ordem. Clique nelas na sequência correta!','Responda 3 de 5 sobre legislação trabalhista rural.','EPIs aparecem embaralhados. Clique neles na ordem correta de colocação!','Conecte cada necessidade habitacional à solução correspondente. 5 pares!','Fichas de crédito aparecem. Aprove ✓ ou reprove ✗ conforme os critérios. 8 corretos!','Responda 3 de 5 sobre proteção ao trabalho infantil.','Clique em células para distribuir lotes de terra. Distribua 10 lotes!'],['Alimentos aparecem no grid. Clique para armazená-los antes que estraguem 🔴. Salve 10 em 30 s!','Técnicas de conservação aparecem. Clique Correta ou Incorreta. 8 de 10!','Conecte o produtor ao canal de venda mais adequado. 5 pares!','Responda 3 de 5 sobre aproveitamento integral dos alimentos.','Itens aparecem. Clique Pode Doar ou Não Pode. 8 de 10!','Encontre 6 pares produto-embalagem ideal. Máx. 5 erros!','Etapas de processamento fora de ordem. Clique na sequência correta!','Conecte excedentes alimentares ao destino mais adequado. 5 pares!','Conecte cada produtor à plataforma digital certa. 5 pares!','Responda 3 de 5 sobre prolongamento de vida de prateleira.'],['Etapas do MIP fora de ordem. Clique nelas na sequência correta!','Conecte cada agente biológico à praga que ele controla. 5 pares!','Ordene a rotação de princípios ativos para evitar resistência. Clique em sequência!','Clique em células ao lado de focos de praga para colocar predadores 🦎. Proteja o campo!','Pragas aparecem nas armadilhas. Clique nelas rapidamente! 15 capturas em 30 s.','Pesticidas aparecem. Clique Seletivo ou Amplo Espectro. 8 de 10!','Responda 3 de 5 sobre diagnóstico e vigilância fitossanitária.','Conecte cada gene de resistência ao patógeno que ele combate. 5 pares!','Clique para montar padrão de alta diversidade genética no grid. 3 tentativas!','Conecte cada instituição à sua área de especialização. 5 pares!']];

/* ── OVERLAY ── */
// Cria e injeta o overlay do jogo no DOM ao carregar a página
(function _setup(){
    const ov=document.createElement('div');
    ov.id='go';
    ov.innerHTML=`
    <div id="go-intro">
      <div class="go-badge" id="go-badge"></div>
      <div class="go-title" id="go-title"></div>
      <div class="go-sub"   id="go-sub"></div>
      <div class="go-how"   id="go-how"></div>
      <div class="go-sol"   id="go-sol"></div>
      <div class="go-btns">
        <button class="go-play" id="go-play">▶ Jogar</button>
        <button class="go-exit" id="go-exit">✕ Sair</button>
      </div>
    </div>
    <div id="go-arena">
      <div id="go-hud">
        <span id="go-htitle"></span>
        <button id="go-quit">Desistir</button>
      </div>
      <div id="go-box"></div>
    </div>
    <div id="go-result">
      <div id="go-ricon"></div>
      <div id="go-rtitle"></div>
      <div id="go-rmsg"></div>
      <div id="go-rscore"></div>
      <button id="go-rclose">Fechar</button>
    </div>`;
    document.body.appendChild(ov);
    document.getElementById('go-play').onclick  = _launch;
    document.getElementById('go-exit').onclick  = _close;
    document.getElementById('go-quit').onclick  = _quit;
    document.getElementById('go-rclose').onclick= _close;
    ov.addEventListener('click',e=>{ if(e.target===ov)_close(); });
    document.getElementById('go-intro').style.display ='flex';
    document.getElementById('go-arena').style.display ='none';
    document.getElementById('go-result').style.display='none';
})();

/* ── PÚBLICO ── */
// Abre a tela de introdução do jogo correspondente ao tema e à solução
function showGameIntro(ti,si){
    if(typeof _requireLogin==='function' && !_requireLogin()){return;}
    _ti=ti; _si=si;
    document.getElementById('go-intro').style.display ='flex';
    document.getElementById('go-arena').style.display ='none';
    document.getElementById('go-result').style.display='none';
    document.getElementById('go-badge').textContent =`Tema ${ti+1} · Solução ${si+1}`;
    document.getElementById('go-title').textContent =GM_T[ti][si];
    document.getElementById('go-sub').textContent   =GM_S[ti][si];
    document.getElementById('go-how').textContent   =GM_H[ti][si];
    document.getElementById('go-sol').textContent   =PROBLEMS[ti].solutions[si];
    document.getElementById('go').classList.add('active');
    document.body.style.overflow='hidden';
}

/* ── PRIVADO ── */
// Transita intro → arena e instancia o jogo via GMAP[tema][solução]
// Cada função de jogo recebe o container `box` e retorna uma função de cleanup ou null
function _launch(){
    document.getElementById('go-intro').style.display='none';
    document.getElementById('go-arena').style.display='flex';
    document.getElementById('go-result').style.display='none';
    document.getElementById('go-htitle').textContent='🎮 '+GM_T[_ti][_si];
    const box=document.getElementById('go-box');
    box.innerHTML='';
    if(_cu){_cu();_cu=null;}  // limpa jogo anterior se houver
    _cu=GMAP[_ti][_si](box)||null;
}

// Finaliza o jogo: score explícito é usado quando passado; caso contrário 100 (vitória) ou 0 (derrota)
function _end(won,msg,score){
    const res=document.getElementById('go-result');
    if(!res||res.style.display==='flex')return;  // evita chamadas duplas
    if(_cu){_cu();_cu=null;}
    const pts=(score!=null)?score:(won?100:0);
    document.getElementById('go-arena').style.display ='none';
    res.style.display='flex';
    document.getElementById('go-ricon').textContent  =won?'🏆':'🌱';
    document.getElementById('go-rtitle').textContent =won?'Missão Cumprida!':'Não Desista!';
    document.getElementById('go-rmsg').textContent   =msg;
    document.getElementById('go-rscore').textContent =`+${pts} pontos`;
    if(typeof _saveGameScore==='function')_saveGameScore(_ti,_si,pts);
}

// _quit: desistir mid-jogo → fecha overlay sem mostrar resultado
// _close: fecha overlay (chamado pelo botão "Fechar" na tela de resultado)
function _quit(){if(_cu){_cu();_cu=null;}_close();}
function _close(){
    if(_cu){_cu();_cu=null;}
    document.getElementById('go').classList.remove('active');
    document.body.style.overflow='';
}

/* ══════════════════════════════════════════════════════
   TEMPLATES DE JOGO
══════════════════════════════════════════════════════ */

/* QUIZ — 5 perguntas, precisa de `need` acertos */
// Template de quiz: exibe perguntas com múltipla escolha e calcula pontuação
function _quiz(c,qs,need){
    need=need||3;
    let cur=0,score=0;
    c.innerHTML=`
    <div class="gf-hdr">
      <span>🏆 <b id="qs">0</b>/${qs.length}</span>
      <span id="qn">Pergunta 1/${qs.length}</span>
    </div>
    <div class="g4-bar"><div id="qbar" style="width:0%"></div></div>
    <div id="qq" class="g7-q"></div>
    <div id="qo" class="g7-opts"></div>
    <p class="gf-tip">Acerte pelo menos ${need} de ${qs.length} para ganhar!</p>`;
    const show=()=>{
        if(cur>=qs.length){
            const pts=Math.round(score/qs.length*100);
            _end(score>=need,score>=need?`Parabéns! Acertou ${score}/${qs.length}!`:`Acertou ${score}/${qs.length}. Continue estudando!`,pts);
            return;
        }
        const q=qs[cur];
        document.getElementById('qn').textContent=`Pergunta ${cur+1}/${qs.length}`;
        document.getElementById('qbar').style.width=`${cur/qs.length*100}%`;
        document.getElementById('qq').textContent=q.q;
        const oel=document.getElementById('qo'); oel.innerHTML='';
        q.opts.forEach((o,i)=>{
            const b=document.createElement('button');
            b.className='g7-opt'; b.textContent=o;
            b.onclick=()=>{
                document.querySelectorAll('.g7-opt').forEach(x=>x.disabled=true);
                if(i===q.ok){b.classList.add('g7-ok');score++;const s=document.getElementById('qs');if(s)s.textContent=score;}
                else{b.classList.add('g7-bad');const ok=oel.querySelectorAll('.g7-opt')[q.ok];if(ok)ok.classList.add('g7-ok');}
                cur++;setTimeout(show,980);
            };
            oel.appendChild(b);
        });
    };
    show(); return null;
}

/* MEMÓRIA — pares de cartas */
// Template de memória: vira pares de cartas e conta erros
function _mem(c,pairs,maxErr){
    maxErr=maxErr||5;
    const all=[...pairs,...pairs].map((it,i)=>({...it,id:i,fl:false,mt:false}));
    for(let i=all.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[all[i],all[j]]=[all[j],all[i]];}
    let open=[],matched=0,wrong=0;
    c.innerHTML=`
    <div class="gf-hdr">
      <span>✓ <b id="mm">0</b>/${pairs.length}</span>
      <span>✗ <b id="me">0</b>/${maxErr}</span>
    </div>
    <div id="mg" class="g1-grid"></div>
    <p class="gf-tip">Clique para virar as cartas e encontrar os pares!</p>`;
    const g=document.getElementById('mg');
    all.forEach((card,i)=>{
        const el=document.createElement('div');
        el.className='g1-card';
        el.innerHTML=`<div class="g1-ci"><div class="g1-cf">?</div><div class="g1-cb">${card.icon}<br><small>${card.label}</small></div></div>`;
        el.onclick=()=>{
            if(card.mt||card.fl||open.length>=2)return;
            card.fl=true; el.classList.add('flipped'); open.push({card,el});
            if(open.length===2){
                const[a,b]=open; open=[];
                setTimeout(()=>{
                    if(a.card.label===b.card.label){
                        a.el.classList.add('matched');b.el.classList.add('matched');
                        a.card.mt=b.card.mt=true; matched++;
                        const m=document.getElementById('mm');if(m)m.textContent=matched;
                        if(matched===pairs.length)_end(true,'Parabéns! Encontrou todos os pares!',100);
                    }else{
                        a.card.fl=b.card.fl=false;
                        a.el.classList.remove('flipped');b.el.classList.remove('flipped');
                        wrong++;const e=document.getElementById('me');if(e)e.textContent=wrong;
                        if(wrong>=maxErr)_end(false,'Muitos erros! Tente novamente!',Math.round(matched/pairs.length*50));
                    }
                },900);
            }
        };
        g.appendChild(el);
    });
    return null;
}

/* SORTER — classificar itens em duas categorias */
// Template de classificação: jogador aceita ou rejeita itens em tempo real
function _sort(c,items,yL,nL,need){
    need=need||8;
    for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
    let cur=0,correct=0,wrong=0;
    c.innerHTML=`
    <div class="gf-hdr">
      <span>✓ <b id="sc">0</b></span>
      <span>✗ <b id="se">0</b>/3</span>
    </div>
    <div class="g4-bar"><div id="sb" style="width:0%"></div></div>
    <div class="g4-card" id="scard">
      <div class="g4-icon" id="sicon"></div>
      <div class="g4-name" id="sname"></div>
    </div>
    <div class="g4-row">
      <button class="g4-yes" id="syes">${yL}</button>
      <button class="g4-no"  id="sno">${nL}</button>
    </div>
    <p class="gf-tip">Acerte pelo menos ${need} de ${items.length}!</p>`;
    const show=()=>{
        if(cur>=items.length){const pts=Math.round(correct/items.length*100);_end(correct>=need,correct>=need?`Acertou ${correct}/${items.length}!`:`Só ${correct}/${items.length} corretos.`,pts);return;}
        const p=items[cur];
        const ico=document.getElementById('sicon');const nm=document.getElementById('sname');const bar=document.getElementById('sb');
        if(ico)ico.textContent=p.icon;if(nm)nm.textContent=p.name;if(bar)bar.style.width=`${cur/items.length*100}%`;
    };
    const ans=(ok)=>{
        const p=items[cur];const card=document.getElementById('scard');if(!card)return;
        if(ok===p.ok){correct++;const el=document.getElementById('sc');if(el)el.textContent=correct;card.classList.add('g4-flash-g');setTimeout(()=>card.classList.remove('g4-flash-g'),350);}
        else{wrong++;const el=document.getElementById('se');if(el)el.textContent=wrong;card.classList.add('g4-flash-r');setTimeout(()=>card.classList.remove('g4-flash-r'),350);if(wrong>=3){_end(false,`${correct}/${items.length} corretos. Tente de novo!`,Math.round(correct/items.length*50));return;}}
        cur++;setTimeout(show,320);
    };
    document.getElementById('syes').onclick=()=>ans(true);
    document.getElementById('sno').onclick=()=>ans(false);
    show(); return null;
}

/* MATCH — conectar pares esquerda-direita */
// Template de conexão: jogador liga itens da esquerda aos correspondentes da direita
function _match(c,pairs){
    const pr=[...pairs]; const ro=[...Array(pairs.length).keys()].sort(()=>Math.random()-.5);
    let sel=null,correct=0;
    c.innerHTML=`
    <div class="gf-hdr"><span>✓ <b id="mc">0</b>/${pairs.length}</span></div>
    <div class="g8-arena">
      <div class="g8-col" id="mfc"></div>
      <div class="g8-col" id="mpc"></div>
    </div>
    <p class="gf-tip">Clique num item da esquerda e depois no correspondente da direita!</p>`;
    const fc=document.getElementById('mfc'),pc=document.getElementById('mpc');
    pr.forEach((p,i)=>{
        const d=document.createElement('div');
        d.className='g8-itm g8-f';d.textContent=p.l;d.dataset.idx=i;
        d.onclick=()=>{if(d.classList.contains('gm'))return;document.querySelectorAll('.g8-f').forEach(x=>x.classList.remove('g8-sel'));sel=i;d.classList.add('g8-sel');};
        fc.appendChild(d);
    });
    ro.forEach(pi=>{
        const d=document.createElement('div');
        d.className='g8-itm g8-p';d.textContent=pr[pi].r;d.dataset.orig=pi;
        d.onclick=()=>{
            if(sel===null||d.classList.contains('gm'))return;
            const origPi=parseInt(d.dataset.orig);
            const fEl=document.querySelector(`.g8-f[data-idx="${sel}"]`);
            document.querySelectorAll('.g8-f').forEach(x=>x.classList.remove('g8-sel'));
            if(origPi===sel){if(fEl)fEl.classList.add('gm');d.classList.add('gm');correct++;const el=document.getElementById('mc');if(el)el.textContent=correct;if(correct===pairs.length)_end(true,'Perfeito! Todos os pares conectados!',100);}
            else{if(fEl){fEl.classList.add('ge');setTimeout(()=>fEl.classList.remove('ge'),500);}d.classList.add('ge');setTimeout(()=>d.classList.remove('ge'),500);}
            sel=null;
        };
        pc.appendChild(d);
    });
    return null;
}

/* GCLICK — grid clicável com timer */
// Template de grid com clique: jogador clica em células-alvo dentro do tempo
function _gclick(c,o){
    // o: {rows,cols,time,goal,empty,target,block,blockPct,tip}
    const{rows=5,cols=6,time=30,goal=12,empty='🏜',target='🌳',block='🪨',blockPct=0.08,tip='Clique nas células disponíveis!'}=o;
    const total=rows*cols;
    let done=0,t=time;
    const types=Array(total).fill('e');
    for(let i=0;i<total;i++){if(Math.random()<blockPct)types[i]='b';}
    c.innerHTML=`
    <div class="gf-hdr">
      <span>${target} <b id="gc">0</b>/${goal}</span>
      <span>⏱ <b id="gt">${time}</b>s</span>
    </div>
    <div id="gg" class="g0-grid" style="--gc:${cols}"></div>
    <p class="gf-tip">${tip}</p>`;
    const g=document.getElementById('gg');
    types.forEach((tp,i)=>{
        const d=document.createElement('div');
        if(tp==='b'){d.className='g0t g0-rock';d.textContent=block;}
        else{
            d.className='g0t g0-empty';d.textContent=empty;
            d.onclick=()=>{
                if(d.dataset.done)return;d.dataset.done='1';
                d.textContent=target;d.className='g0t g0-tree';
                done++;const el=document.getElementById('gc');if(el)el.textContent=done;
                if(done>=goal){clearInterval(iv);_end(true,`Excelente! Completou ${done}/${goal}!`,100);}
            };
        }
        g.appendChild(d);
    });
    const iv=setInterval(()=>{t--;const el=document.getElementById('gt');if(el)el.textContent=t;if(t<=0){clearInterval(iv);const pts=Math.round(done/goal*100);_end(done>=goal,done>=goal?'Missão cumprida!':'Tempo esgotado! Só '+done+'/'+goal+'.',pts);}},1000);
    return()=>clearInterval(iv);
}

/* SEQ — clicar na sequência correta */
// Template de sequência: itens embaralhados, jogador clica na ordem correta
function _seq(c,items){
    // items em ordem correta; serão embaralhados na tela
    const shuffled=[...items].sort(()=>Math.random()-.5);
    let step=0,tries=0,maxTries=3;
    c.innerHTML=`
    <div class="gf-hdr">
      <span>📋 Passo: <b id="ss">0</b>/${items.length}</span>
      <span>⚡ Tentativas: <b id="str">${maxTries}</b></span>
    </div>
    <div id="sg" class="seq-grid"></div>
    <p class="gf-tip">Clique nos itens na ordem correta!</p>`;
    const g=document.getElementById('sg');
    const render=()=>{
        g.innerHTML='';
        shuffled.forEach((it,i)=>{
            const d=document.createElement('div');
            d.className='seq-item'+(it._done?' seq-done':'');
            d.textContent=it.icon+' '+it.label;
            if(!it._done)d.onclick=()=>check(it,d);
            g.appendChild(d);
        });
    };
    const check=(it,d)=>{
        if(it===items[step]){
            it._done=true;step++;
            const ss=document.getElementById('ss');if(ss)ss.textContent=step;
            d.className='seq-item seq-done';
            if(step>=items.length){const pts=maxTries===3?100:maxTries===2?75:50;_end(true,'Sequência correta!',pts);}
        }else{
            tries++;d.classList.add('shake');setTimeout(()=>d.classList.remove('shake'),400);
            const str=document.getElementById('str');if(str)str.textContent=maxTries-tries;
            if(tries>=maxTries){_end(false,'Sequência errada! Estude a ordem correta.',0);}
        }
    };
    render(); return null;
}

/* PAT — padrão xadrez */
// Template de padrão: jogador alterna células para montar o padrão xadrez correto
function _pat(c,rows,cols,t0,t1){
    const tgt=Array.from({length:rows*cols},(_,i)=>(Math.floor(i/cols)+i%cols)%2);
    let grid=Array.from({length:rows*cols},()=>Math.random()<.5?0:1);
    let tries=3;
    const render=()=>{
        const g=document.getElementById('pg');if(!g)return;
        g.innerHTML='';
        grid.forEach((v,i)=>{const d=document.createElement('div');d.className='g2-tile';d.textContent=v===0?t0:t1;d.onclick=()=>{grid[i]=1-grid[i];render();};g.appendChild(d);});
    };
    c.innerHTML=`
    <div class="gf-hdr"><span>🔄 Tentativas: <b id="pt">${tries}</b></span></div>
    <div class="pat-wrap">
      <div><div class="g2-lbl">Seu arranjo</div><div id="pg" class="g2-grid" style="--pc:${cols}"></div></div>
      <div><div class="g2-lbl">Padrão alvo</div><div class="g2-grid" id="ptgt" style="--pc:${cols}"></div></div>
    </div>
    <div style="text-align:center;margin-top:6px"><button class="gf-btn" id="pchk">✓ Verificar</button></div>
    <p class="gf-tip">Alterne as células clicando. Monte o padrão mostrado à direita!</p>`;
    const tgt_el=document.getElementById('ptgt');
    tgt.forEach(v=>{const d=document.createElement('div');d.className='g2-tile g2-tgt';d.textContent=v===0?t0:t1;tgt_el.appendChild(d);});
    render();
    document.getElementById('pchk').onclick=()=>{
        if(grid.every((v,i)=>v===tgt[i])){const pts=tries===3?100:tries===2?75:50;_end(true,'Padrão correto!',pts);}
        else{tries--;const el=document.getElementById('pt');if(el)el.textContent=tries;const g=document.getElementById('pg');if(g){g.classList.add('shake');setTimeout(()=>g.classList.remove('shake'),400);}if(tries<=0)_end(false,'Padrão errado. Continue praticando!',0);}
    };
    return null;
}

/* WHACK — whack-a-mole */
// Template whack-a-mole: clica em elementos nocivos que aparecem e somem rapidamente
function _whack(c,harmEmojis,time,lives,goal){
    time=time||30;lives=lives||10;goal=goal||0;
    const HOLES=9;let caught=0,missed=0,t=time;const active=new Set();
    c.innerHTML=`
    <div class="gf-hdr">
      <span>👊 <b id="wc">0</b>${goal?'/'+goal:''}</span>
      <span>💚 <b id="wl">${lives}</b></span>
      <span>⏱ <b id="wt">${time}</b>s</span>
    </div>
    <div class="g5-grid" id="wg">
      ${Array.from({length:HOLES},(_,i)=>`<div class="g5-hole" id="wh${i}"><div class="g5-gnd"></div><div class="g5-lg" id="wl${i}"></div></div>`).join('')}
    </div>
    <p class="gf-tip">Clique nos alvos antes que sumam!</p>`;
    for(let i=0;i<HOLES;i++){
        document.getElementById(`wh${i}`).onclick=()=>{
            if(!active.has(i))return;
            const lg=document.getElementById(`wl${i}`);if(lg){lg.classList.remove('up');lg.textContent='';}
            active.delete(i);caught++;const el=document.getElementById('wc');if(el)el.textContent=caught;
            if(goal&&caught>=goal){clearInterval(tv);clearInterval(pv);_end(true,`Capturou ${caught}!`,100);}
        };
    }
    const pop=()=>{
        const free=[];for(let i=0;i<HOLES;i++)if(!active.has(i))free.push(i);
        if(!free.length)return;
        const idx=free[Math.floor(Math.random()*free.length)];
        const lg=document.getElementById(`wl${idx}`);if(!lg)return;
        const em=harmEmojis[Math.floor(Math.random()*harmEmojis.length)];
        lg.textContent=em;lg.classList.add('up');active.add(idx);
        setTimeout(()=>{
            if(!active.has(idx))return;
            const l=document.getElementById(`wl${idx}`);if(l){l.classList.remove('up');l.textContent='';}
            active.delete(idx);missed++;lives--;
            const le=document.getElementById('wl');if(le)le.textContent=lives;
            if(lives<=0){clearInterval(tv);clearInterval(pv);_end(false,'Ficou sem vidas!',Math.round(caught/(goal||20)*50));}
        },1500);
    };
    const pv=setInterval(pop,1000);
    const tv=setInterval(()=>{t--;const el=document.getElementById('wt');if(el)el.textContent=t;if(t<=0){clearInterval(tv);clearInterval(pv);const pts=Math.round((goal?Math.min(caught/goal,1):caught/20)*100);_end(!goal||caught>=goal,`Tempo! Capturou ${caught}!`,pts);}},1000);
    return()=>{clearInterval(tv);clearInterval(pv);};
}

/* SPREAD — células que se espalham, jogador restaura */
// Template de espalhamento: degradação avança automaticamente, jogador recupera clicando
// Estados de célula: 'f' = floresta/saudável, 'd' = degradada, 'g' = em recuperação
function _spread(c,o){
    const{rows=5,cols=5,time=35,winPct=30,spread=2400,pct=0.35,degIcon='🏜',forIcon='🌳',grwIcon='🌱'}=o;
    const total=rows*cols;
    let cells=Array.from({length:total},()=>Math.random()<pct?'d':'f');
    let t=time;
    const getCov=()=>Math.round(cells.filter(x=>x==='d').length/total*100);
    const render=()=>{
        const g=document.getElementById('sg2');if(!g)return;g.innerHTML='';
        cells.forEach((tp,i)=>{
            const d=document.createElement('div');
            d.className=`g6t g6-${tp==='d'?'deg':tp==='g'?'grw':'for'}`;
            d.textContent=tp==='f'?forIcon:tp==='g'?grwIcon:degIcon;
            // clicar em célula degradada inicia recuperação (600ms de animação 'g' antes de virar 'f')
            if(tp==='d'){d.onclick=()=>{cells[i]='g';d.textContent=grwIcon;d.className='g6t g6-grw';d.onclick=null;setTimeout(()=>{cells[i]='f';render();},600);};}
            g.appendChild(d);
        });
        const pe=document.getElementById('sp');if(pe)pe.textContent=getCov()+'%';
    };
    c.innerHTML=`
    <div class="gf-hdr"><span>🏜 Degradado: <b id="sp">0%</b></span><span>⏱ <b id="st">${time}</b>s</span></div>
    <div id="sg2" class="g6-grid"></div>
    <p class="gf-tip">Clique nas células degradadas para restaurá-las!</p>`;
    render();
    // A cada `spread` ms: cada célula 'd' tenta contaminar vizinhos 4-direcionais com prob. 28%
    const sv=setInterval(()=>{
        const nd=[];
        cells.forEach((tp,i)=>{
            if(tp!=='d')return;
            // calcula linha e coluna a partir do índice linear para encontrar vizinhos
            const r=Math.floor(i/cols),col=i%cols;
            const nb=[];if(r>0)nb.push(i-cols);if(r<rows-1)nb.push(i+cols);if(col>0)nb.push(i-1);if(col<cols-1)nb.push(i+1);
            nb.forEach(n=>{if(cells[n]==='f'&&Math.random()<0.28)nd.push(n);});
        });
        nd.forEach(i=>cells[i]='d');render();
        if(getCov()>=70){clearInterval(sv);clearInterval(tv);_end(false,'A degradação tomou conta!',0);}
    },spread);
    const tv=setInterval(()=>{t--;const el=document.getElementById('st');if(el)el.textContent=t;if(t<=0){clearInterval(sv);clearInterval(tv);const p=getCov();_end(p<winPct,p<winPct?`Apenas ${p}% degradado. Ótimo!`:`${p}% degradado. Precisava de <${winPct}%!`,p<winPct?100:Math.round((100-p)/100*60));}},1000);
    return()=>{clearInterval(sv);clearInterval(tv);};
}

/* BAL — medidor de equilíbrio */
// Template de balanceamento: medidor sobe sozinho, jogador clica ações para manter abaixo do limite
function _bal(c,o){
    const{time=25,start=30,max=100,limit=60,inc=2.5,incMs=1000,actions=[],tip='Mantenha o medidor abaixo do limite!'}=o;
    let val=start,t=time;
    const cds={};
    c.innerHTML=`
    <div class="gf-hdr"><span>⏱ <b id="bt">${time}</b>s</span></div>
    <div class="bal-wrap">
      <div class="bal-bar-bg">
        <div class="bal-limit" style="bottom:${limit}%"></div>
        <div class="bal-fill" id="bfill" style="height:${start}%"></div>
      </div>
      <div class="bal-actions" id="bact"></div>
    </div>
    <p class="gf-tip">${tip}</p>`;
    const fill=document.getElementById('bfill');
    const bact=document.getElementById('bact');
    actions.forEach((a,i)=>{
        const btn=document.createElement('button');
        btn.className='bal-btn';btn.textContent=a.label;
        btn.onclick=()=>{
            if(cds[i])return;val=Math.max(0,val+a.delta);if(fill)fill.style.height=val+'%';
            cds[i]=true;btn.disabled=true;
            setTimeout(()=>{cds[i]=false;btn.disabled=false;},a.cd||3000);
        };
        bact.appendChild(btn);
    });
    const iv=setInterval(()=>{val=Math.min(max,val+inc);if(fill)fill.style.height=val+'%';if(val>=limit){clearInterval(iv);clearInterval(tv);_end(false,'O nível ultrapassou o limite!',0);}},incMs);
    const tv=setInterval(()=>{t--;const el=document.getElementById('bt');if(el)el.textContent=t;if(t<=0){clearInterval(iv);clearInterval(tv);_end(true,'Missão cumprida! Manteve o equilíbrio!',100);}},1000);
    return()=>{clearInterval(iv);clearInterval(tv);};
}

/* ══════════════════════════════════════════════════════
   TEMA 0 — DESMATAMENTO
══════════════════════════════════════════════════════ */
function g0_0(c){return _gclick(c,{rows:5,cols:6,time:30,goal:12,empty:'🏜',target:'🌳',block:'🪨',blockPct:0.08,tip:'Clique nas áreas marrons para plantar árvores!'});}

function g0_1(c){return _mem(c,[{icon:'🌽',label:'Milho'},{icon:'🐄',label:'Pecuária'},{icon:'☀️',label:'Solar'},{icon:'💧',label:'Água'},{icon:'🌳',label:'Floresta'},{icon:'🐝',label:'Polinizador'}]);}

function g0_2(c){return _pat(c,4,4,'🌽','🌳');}

function g0_3(c){
    // Satélite — encontrar desmatadas
    const COLS=6,ROWS=5,SECS=30,total=COLS*ROWS;
    let types=Array(total).fill('for');
    const deSet=new Set();while(deSet.size<8)deSet.add(Math.floor(Math.random()*total));
    deSet.forEach(i=>{types[i]='def';});
    let clouds=0;for(let i=0;i<total&&clouds<3;i++){if(types[i]==='for'&&Math.random()<0.12){types[i]='cld';clouds++;}}
    let found=0,wrong=0,t=SECS;
    c.innerHTML=`
    <div class="gf-hdr"><span>🎯 <b id="g3f">0</b>/8</span><span>✗ <b id="g3e">0</b>/3</span><span>⏱ <b id="g3t">${SECS}</b>s</span></div>
    <div id="g3g" class="g3-grid"></div>
    <p class="gf-tip">Clique nas áreas marrons-vermelhas (desmatadas) vistas pelo satélite!</p>`;
    const grid=document.getElementById('g3g');
    types.forEach((tp,i)=>{
        const d=document.createElement('div');d.className=`g3t g3-${tp}`;if(tp==='cld')d.textContent='☁️';
        d.onclick=()=>{
            if(d.dataset.done||tp==='cld')return;
            if(tp==='def'){d.dataset.done='1';d.textContent='✓';d.className='g3t g3-ok';found++;const f=document.getElementById('g3f');if(f)f.textContent=found;if(found===8){clearInterval(iv);_end(true,'Identificou todas as áreas!',100);}}
            else{wrong++;const e=document.getElementById('g3e');if(e)e.textContent=wrong;d.classList.add('g3-err');setTimeout(()=>d.classList.remove('g3-err'),380);if(wrong>=3){clearInterval(iv);_end(false,'Marcou áreas erradas!',Math.round(found/8*50));}}
        };
        grid.appendChild(d);
    });
    const iv=setInterval(()=>{t--;const el=document.getElementById('g3t');if(el)el.textContent=t;if(t<=0){clearInterval(iv);_end(found>=8,`Tempo! Encontrou ${found}/8.`,Math.round(found/8*100));}},1000);
    return()=>clearInterval(iv);
}

function g0_4(c){return _sort(c,[{icon:'🌱',name:'Orgânico',ok:true},{icon:'🏭',name:'Industrial',ok:false},{icon:'♻️',name:'Reciclado',ok:true},{icon:'☠️',name:'Agrotóxico',ok:false},{icon:'🌻',name:'Agrofloral',ok:true},{icon:'💨',name:'Poluente',ok:false},{icon:'🐄',name:'Pasto Livre',ok:true},{icon:'🔴',name:'Desmatador',ok:false},{icon:'🍃',name:'Carbono Zero',ok:true},{icon:'🚜',name:'Convencional',ok:false}],'✓ Sustentável','✗ Não é');}

function g0_5(c){return _whack(c,['🪚','🪵','🪓'],30,10,0);}

function g0_6(c){return _spread(c,{rows:5,cols:5,time:35,winPct:30});}

function g0_7(c){return _quiz(c,[{q:'Como florestas influenciam o ciclo da água?',opts:['Aumentam evapotranspiração e chuvas','Secam o solo rapidamente','Reduzem a umidade'],ok:0},{q:'Valor econômico dos polinizadores florestais?',opts:['Sem valor relevante','Bilhões anuais em produção','Apenas frutas silvestres'],ok:1},{q:'O que são "serviços ambientais"?',opts:['Turismo ecológico','Benefícios: ar, água, carbono','Apenas madeira'],ok:1},{q:'Como matas ciliares protegem a produção?',opts:['Bloqueiam sol','Evitam erosão e mantêm nascentes','Abrigam pragas'],ok:1},{q:'% do PIB agrícola dependente de polinizadores?',opts:['Menos de 5%','Cerca de 35%','Mais de 80%'],ok:1}]);}

function g0_8(c){return _match(c,[{l:'👨‍🌾 Fazendeiro',r:'💧 Água Limpa'},{l:'🐑 Pecuarista',r:'🌱 Carbono Zero'},{l:'🌾 Arrozeiro',r:'🦋 Biodiversidade'},{l:'🍃 Cafeicultor',r:'🌳 Floresta Viva'},{l:'🐓 Avicultor',r:'☀️ Energia Limpa'}]);}

function g0_9(c){
    // Corredor ecológico — BFS para verificar conectividade entre fragmentos
    const COLS=7,ROWS=5,total=COLS*ROWS,MAX=20;
    // índices dos tiles de floresta pré-definidos no grid 7×5
    const forests=new Set([0,1,7,8,5,6,12,13,21,22,28,29,26,27,33,34,17]);
    let path=new Set();  // tiles de corredor colocados pelo jogador
    // BFS a partir do primeiro fragmento: visita todos os tiles de floresta+corredor alcançáveis
    // Vitória quando todos os fragmentos florestais estão no conjunto visitado
    const allConnected=()=>{
        const reach=new Set();const start=[...forests][0];const q=[start];reach.add(start);
        while(q.length){const n=q.shift();const r=Math.floor(n/COLS),col=n%COLS;const nb=[];if(r>0)nb.push(n-COLS);if(r<ROWS-1)nb.push(n+COLS);if(col>0)nb.push(n-1);if(col<COLS-1)nb.push(n+1);nb.forEach(x=>{if(!reach.has(x)&&(forests.has(x)||path.has(x))){reach.add(x);q.push(x);}});}
        return[...forests].every(f=>reach.has(f));
    };
    const render=()=>{
        const g=document.getElementById('g9g');if(!g)return;g.innerHTML='';
        const re=document.getElementById('g9r');if(re)re.textContent=MAX-path.size;
        for(let i=0;i<total;i++){const d=document.createElement('div');if(forests.has(i)){d.className='g9t g9-for';d.textContent='🌳';}else if(path.has(i)){d.className='g9t g9-pth';d.textContent='🌿';d.onclick=()=>{path.delete(i);render();};}else{d.className='g9t g9-emp';d.onclick=()=>{if(path.size<MAX){path.add(i);render();}};} g.appendChild(d);}
    };
    c.innerHTML=`
    <div class="gf-hdr"><span>🌿 Disponíveis: <b id="g9r">${MAX}</b></span></div>
    <div id="g9g" class="g9-grid"></div>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:4px">
      <button class="gf-btn" id="g9chk">✓ Verificar</button>
      <button class="gf-btn gf-btn-sec" id="g9clr">🗑 Limpar</button>
    </div>
    <p class="gf-tip">Clique nas células para criar corredores. Verificar quando conectar tudo!</p>`;
    render();
    document.getElementById('g9chk').onclick=()=>{if(allConnected())_end(true,'Todos os fragmentos conectados!',100);else{const g=document.getElementById('g9g');if(g){g.classList.add('shake');setTimeout(()=>g.classList.remove('shake'),400);}}};
    document.getElementById('g9clr').onclick=()=>{path.clear();render();};
    return null;
}

/* ══════════════════════════════════════════════════════
   TEMA 1 — USO EXCESSIVO DE AGROTÓXICOS
══════════════════════════════════════════════════════ */
function g1_0(c){return _bal(c,{time:25,start:30,limit:60,inc:2.5,tip:'Mantenha a pressão de pragas abaixo de 60% por 25 s!',actions:[{label:'🐞 Joaninhas',delta:-15,cd:5000},{label:'🌿 Rotação',delta:-10,cd:4000},{label:'🦠 MIP',delta:-8,cd:3000},{label:'⚠️ Pesticida',delta:-20,cd:2000}]});}

function g1_1(c){return _whack(c,['🪲','🪳','🦟'],30,7,15);}

function g1_2(c){return _sort(c,[{icon:'🌿',name:'Húmus',ok:true},{icon:'🌱',name:'Composto',ok:true},{icon:'☀️',name:'Biofertilizante',ok:true},{icon:'💧',name:'Calda Bordalesa',ok:true},{icon:'🍂',name:'Palhada',ok:true},{icon:'☠️',name:'Roundup',ok:false},{icon:'💊',name:'Inseticida',ok:false},{icon:'🔴',name:'Herbicida',ok:false},{icon:'🏭',name:'Fungicida',ok:false},{icon:'⚗️',name:'Adubo Químico',ok:false}],'🌿 Orgânico','☠️ Químico');}

function g1_3(c){return _quiz(c,[{q:'Qual o intervalo de segurança de um agrotóxico?',opts:['Tempo para colher com segurança','Prazo de validade','Distância de aplicação'],ok:0},{q:'O que é EPI no contexto agrícola?',opts:['Equipamento de Proteção Individual','Exame Periódico Intensivo','Embalagem de Produto Inseticida'],ok:0},{q:'Como descartar embalagens de agrotóxicos?',opts:['Queimar na propriedade','Devolver no ponto de coleta','Enterrar longe de rios'],ok:1},{q:'O que é carência de um agrotóxico?',opts:['Falta do produto no mercado','Período sem aplicação antes da colheita','Dose mínima necessária'],ok:1},{q:'Qual órgão fiscaliza agrotóxicos no Brasil?',opts:['IBAMA / ANVISA / MAPA','Só a Prefeitura','Apenas o fabricante'],ok:0}]);}

function g1_4(c){return _match(c,[{l:'🦠 Bacillus thuringiensis',r:'🐛 Lagartas'},{l:'🍄 Trichoderma',r:'🌱 Fungos do Solo'},{l:'🪲 Chrysoperla',r:'🦗 Pulgões'},{l:'🐝 Trichogramma',r:'🥚 Ovos de Lepidópteros'},{l:'🦠 Beauveria bassiana',r:'🪲 Besouros e Cigarras'}]);}

function g1_5(c){return _seq(c,[{icon:'🌿',label:'Leguminosa (enriquece N)'},{icon:'🌾',label:'Cereal (usa N)'},{icon:'🥕',label:'Raiz (limpa solo)'},{icon:'🥬',label:'Folha (cobertura)'}]);}

function g1_6(c){return _sort(c,[{icon:'✅',name:'Dose correta registrada',ok:true},{icon:'✅',name:'Produto aprovado MAPA',ok:true},{icon:'✅',name:'Aplicador treinado',ok:true},{icon:'✅',name:'Respeita carência',ok:true},{icon:'✅',name:'EPI completo',ok:true},{icon:'❌',name:'Produto proibido',ok:false},{icon:'❌',name:'Sem intervalo de segurança',ok:false},{icon:'❌',name:'Dose triplicada',ok:false},{icon:'❌',name:'Produto vencido',ok:false},{icon:'❌',name:'Sem receituário',ok:false}],'✓ Aprovar','✗ Reprovar');}

function g1_7(c){return _mem(c,[{icon:'🛡️',label:'Resistência a Fungo'},{icon:'🔒',label:'Resistência a Vírus'},{icon:'⚡',label:'Resistência a Seca'},{icon:'🦠',label:'Resistência Bacteriana'},{icon:'🐛',label:'Resistência a Insetos'},{icon:'💊',label:'Tolerância Herbicida'}]);}

function g1_8(c){return _match(c,[{l:'Gene Bt',r:'🐛 Lagarta-do-Cartucho'},{l:'Gene Ry',r:'🌿 Vírus PVY'},{l:'Gene Pi',r:'🍚 Brusone do Arroz'},{l:'Gene I2',r:'🍅 Fusarium do Tomate'},{l:'Gene Sw5',r:'🥕 Vírus TSWV'}]);}

function g1_9(c){return _gclick(c,{rows:5,cols:6,time:35,goal:10,empty:'🌾',target:'🌊',block:'🏭',blockPct:0.1,tip:'Clique nos campos próximos a rios/florestas para criar zonas tampão!'});}

/* ══════════════════════════════════════════════════════
   TEMA 2 — DEGRADAÇÃO DO SOLO
══════════════════════════════════════════════════════ */
function g2_0(c){return _seq(c,[{icon:'🪨',label:'Rocha mãe (base)'},{icon:'🟤',label:'Subsolo (mineral)'},{icon:'🔵',label:'Solo B (argila)'},{icon:'🟫',label:'Solo A (matéria orgânica)'},{icon:'🌿',label:'Serapilheira (superfície)'}]);}

function g2_1(c){return _gclick(c,{rows:5,cols:5,time:30,goal:6,empty:'⛰️',target:'🪨',block:'🌊',blockPct:0.05,tip:'Clique nas encostas para instalar barreiras anti-erosão!'});}

function g2_2(c){return _gclick(c,{rows:5,cols:6,time:30,goal:12,empty:'🏜',target:'🌾',block:'🌊',blockPct:0.06,tip:'Plante cobertura vegetal antes da chuva!'});}

function g2_3(c){return _quiz(c,[{q:'O que é compostagem?',opts:['Decomposição aeróbica de resíduos orgânicos','Aplicação de calcário no solo','Irrigação com água reciclada'],ok:0},{q:'Qual tempo médio para maturar composto?',opts:['1 semana','2 a 4 meses','1 ano'],ok:1},{q:'Qual o pH ideal do composto maduro?',opts:['5,0 a 5,5','6,5 a 7,5','8,5 a 9,0'],ok:1},{q:'O que é bokashi?',opts:['Fertilizante químico japonês','Composto fermentado com micro-organismos','Agrotóxico orgânico'],ok:1},{q:'Qual função das leguminosas na adubação?',opts:['Fixar nitrogênio atmosférico','Drenar excesso de água','Repelir insetos'],ok:0}]);}

function g2_4(c){return _pat(c,4,4,'🌊','⛰️');}

function g2_5(c){return _whack(c,['🚜','🚛','⚙️'],30,5,20);}

function g2_6(c){return _match(c,[{l:'🌾 Lavoura',r:'📊 Produção de Grãos'},{l:'🐄 Pecuária',r:'💩 Matéria Orgânica'},{l:'🌳 Floresta',r:'🌡️ Microclima'},{l:'🌿 Pastagem',r:'🧲 Cobertura do Solo'},{l:'🔄 Integração',r:'♻️ Ciclagem de Nutrientes'}]);}

function g2_7(c){return _quiz(c,[{q:'O que é pH do solo?',opts:['Medida de acidez/alcalinidade','Percentual de húmus','Temperatura média'],ok:0},{q:'Solo com pH 4.5 é considerado?',opts:['Neutro','Muito ácido','Levemente alcalino'],ok:1},{q:'O que causa a compactação do solo?',opts:['Chuva em excesso','Tráfego pesado de máquinas','Plantio de leguminosas'],ok:1},{q:'Como aumentar matéria orgânica do solo?',opts:['Queima de resíduos','Compostagem e palhada','Aumento de calcário'],ok:1},{q:'O que é CTC do solo?',opts:['Capacidade de Troca de Cátions','Controle de Temperatura Central','Cálculo de Toxicidade'],ok:0}]);}

function g2_8(c){return _gclick(c,{rows:5,cols:5,time:35,goal:10,empty:'🏜',target:'🌿',block:'🪨',blockPct:0.06,tip:'Plante leguminosas nas áreas degradadas!'});}

function g2_9(c){return _quiz(c,[{q:'O que é plantio direto?',opts:['Plantar sem revolver o solo','Plantar em canteiros altos','Irrigar diretamente na raiz'],ok:0},{q:'Terraceamento serve para?',opts:['Aumentar produtividade','Conter erosão hídrica em encostas','Corrigir acidez'],ok:1},{q:'O que são plantas de cobertura?',opts:['Culturas protetoras do solo entre safras','Plantas de sombra para gado','Árvores frutíferas'],ok:0},{q:'Como o plantio direto retém carbono?',opts:['Aumenta erosão','Mantém resíduos na superfície','Elimina a matéria orgânica'],ok:1},{q:'Qual vantagem do terraceamento?',opts:['Reduz custo de adubo','Retém água e reduz erosão','Aumenta temperatura do solo'],ok:1}]);}

/* ══════════════════════════════════════════════════════
   TEMA 3 — ESCASSEZ DE ÁGUA
══════════════════════════════════════════════════════ */
function g3_0(c){return _gclick(c,{rows:5,cols:6,time:30,goal:10,empty:'🌱',target:'💧',block:'🪨',blockPct:0.06,tip:'Clique nas plantas para instalar gotejadores!'});}

function g3_1(c){return _whack(c,['💧','🌧️','☔'],30,5,15);}

function g3_2(c){return _match(c,[{l:'💧 Água da Chuva',r:'🌾 Irrigação de Lavoura'},{l:'🏭 Água Tratada',r:'🚿 Higiene Rural'},{l:'🐄 Águas Residuais',r:'🌿 Fertirrigação'},{l:'🌊 Rio',r:'💦 Reservatório'},{l:'⛰️ Aquífero',r:'🏡 Abastecimento Doméstico'}]);}

function g3_3(c){return _spread(c,{rows:5,cols:6,time:40,winPct:20,spread:2000,pct:0.25,degIcon:'🏜',forIcon:'🌊',grwIcon:'🌿'});}

function g3_4(c){return _sort(c,[{icon:'✅',name:'Irrigação por gotejamento',ok:true},{icon:'✅',name:'Reúso de água tratada',ok:true},{icon:'✅',name:'Captação de chuva',ok:true},{icon:'✅',name:'Sensor de umidade',ok:true},{icon:'✅',name:'Rotação com resistentes',ok:true},{icon:'❌',name:'Irrigação por inundação',ok:false},{icon:'❌',name:'Desperdício na limpeza',ok:false},{icon:'❌',name:'Poço sem licença',ok:false},{icon:'❌',name:'Descarte em nascente',ok:false},{icon:'❌',name:'Irrigação no calor',ok:false}],'✓ Racional','✗ Desperdiça');}

function g3_5(c){return _sort(c,[{icon:'🌾',name:'Sorgo (tolerante)',ok:true},{icon:'🌵',name:'Palma Forrageira',ok:true},{icon:'🌻',name:'Girassol (tolerante)',ok:true},{icon:'🥜',name:'Amendoim (tolerante)',ok:true},{icon:'🌿',name:'Feijão-Caupi',ok:true},{icon:'🌽',name:'Milho Comum',ok:false},{icon:'🍅',name:'Tomate Convencional',ok:false},{icon:'🥬',name:'Alface',ok:false},{icon:'🥕',name:'Cenoura Comum',ok:false},{icon:'🌶️',name:'Pimentão',ok:false}],'💪 Tolerante à Seca','💧 Precisa de Água');}

function g3_6(c){return _quiz(c,[{q:'Qual sistema de irrigação mais eficiente?',opts:['Aspersão convencional','Gotejamento e microaspersão','Inundação de sulcos'],ok:1},{q:'O que é tensiômetro?',opts:['Sensor de temperatura do solo','Medidor de umidade do solo','Equipamento de bombeamento'],ok:1},{q:'Quanto da água doce mundial vai para a agricultura?',opts:['Cerca de 20%','Cerca de 45%','Cerca de 70%'],ok:2},{q:'O que são matas ciliares?',opts:['Árvores de grande porte','Vegetação que protege margens de rios','Plantas aquáticas'],ok:1},{q:'O que é eficiência de irrigação?',opts:['Quantidade de água usada','% de água aproveitada pela planta','Custo do sistema de irrigação'],ok:1}]);}

function g3_7(c){return _mem(c,[{icon:'💧',label:'Umidade Alta'},{icon:'🏜',label:'Solo Seco'},{icon:'🌱',label:'Ponto de Murcha'},{icon:'⚡',label:'Capacidade de Campo'},{icon:'🌊',label:'Saturação'},{icon:'🔵',label:'Água Disponível'}]);}

function g3_8(c){return _seq(c,[{icon:'📊',label:'Medir umidade do solo'},{icon:'📅',label:'Definir turno de rega'},{icon:'⚙️',label:'Verificar sistema'},{icon:'💧',label:'Irrigar na quantidade certa'},{icon:'📋',label:'Registrar consumo'}]);}

function g3_9(c){return _quiz(c,[{q:'O que é um comitê de bacia hidrográfica?',opts:['Órgão policial ambiental','Colegiado de gestão participativa de recursos hídricos','Empresa de distribuição de água'],ok:1},{q:'O que é outorga de uso da água?',opts:['Multa por uso indevido','Autorização para captação de água','Contrato de venda de água'],ok:1},{q:'O que protege a Lei 9.433/97?',opts:['Solo e ar','Recursos hídricos','Florestas e fauna'],ok:1},{q:'Como a cobrança pelo uso da água incentiva economia?',opts:['Não incentiva','Valor por volume usado estimula redução','Só penaliza grandes empresas'],ok:1},{q:'O que são APPs hídricas?',opts:['Aplicativos de monitoramento','Áreas de Preservação Permanente em margens de rios','Áreas de Produção Primária Hídrica'],ok:1}]);}

/* ══════════════════════════════════════════════════════
   TEMA 4 — EMISSÃO DE GASES DE EFEITO ESTUFA
══════════════════════════════════════════════════════ */
function g4_0(c){return _whack(c,['🫧','💨','🌫️'],30,5,12);}

function g4_1(c){return _sort(c,[{icon:'🐄',name:'Dejeto bovino',ok:true},{icon:'🐖',name:'Esterco suíno',ok:true},{icon:'🌾',name:'Palha de cana',ok:true},{icon:'🥬',name:'Resíduos vegetais',ok:true},{icon:'💧',name:'Efluente tratado',ok:true},{icon:'🔩',name:'Metal enferrujado',ok:false},{icon:'🧴',name:'Plástico',ok:false},{icon:'🏗️',name:'Cimento',ok:false},{icon:'🔋',name:'Bateria velha',ok:false},{icon:'🪟',name:'Vidro',ok:false}],'✓ Biodigestável','✗ Não é');}

function g4_2(c){return _gclick(c,{rows:4,cols:5,time:30,goal:10,empty:'🏠',target:'☀️',block:'🌳',blockPct:0.1,tip:'Clique nos telhados para instalar painéis solares!'});}

function g4_3(c){return _sort(c,[{icon:'🌿',name:'Plantio Direto',ok:true},{icon:'☀️',name:'Energia Solar',ok:true},{icon:'🐄',name:'Manejo Pastagem',ok:true},{icon:'🌾',name:'ILPF',ok:true},{icon:'🚜',name:'Biocombustível',ok:true},{icon:'🔥',name:'Queimada',ok:false},{icon:'🚗',name:'Diesel fóssil',ok:false},{icon:'🌊',name:'Irrigação excessiva',ok:false},{icon:'🏭',name:'Fertilizante nitrogenado',ok:false},{icon:'🚜',name:'Revolvimento do solo',ok:false}],'🌿 Baixo Carbono','🔥 Alto Carbono');}

function g4_4(c){return _pat(c,3,4,'🌾','🌳');}

function g4_5(c){return _sort(c,[{icon:'🌿',name:'Etanol de cana',ok:true},{icon:'🫛',name:'Biodiesel de soja',ok:true},{icon:'🌽',name:'Etanol de milho',ok:true},{icon:'♻️',name:'Biogás',ok:true},{icon:'🪵',name:'Lenha certificada',ok:true},{icon:'⛽',name:'Gasolina',ok:false},{icon:'🛢️',name:'Diesel',ok:false},{icon:'🏭',name:'Carvão mineral',ok:false},{icon:'🔥',name:'Gás natural fóssil',ok:false},{icon:'✈️',name:'Querosene',ok:false}],'🌿 Renovável','⛽ Fóssil');}

function g4_6(c){return _gclick(c,{rows:5,cols:5,time:30,goal:12,empty:'🏜',target:'🌿',block:'🪨',blockPct:0.06,tip:'Adicione matéria orgânica ao solo para estocar carbono!'});}

function g4_7(c){return _match(c,[{l:'🌾 Produtor de Soja',r:'🌍 CBio (RenovaBio)'},{l:'🐄 Pecuarista',r:'💚 REDD+ Agropecuária'},{l:'🌳 Reflorestador',r:'🏆 Crédito REDD'},{l:'☀️ Energia Solar',r:'⚡ Certificado I-REC'},{l:'🚜 Biocombustível',r:'♻️ Crédito de Carbono'}]);}

function g4_8(c){return _bal(c,{time:25,start:30,limit:60,inc:2.5,tip:'Mantenha emissões de metano abaixo de 60%!',actions:[{label:'🌿 Ajustar Dieta',delta:-15,cd:5000},{label:'💊 Probiótico',delta:-10,cd:4000},{label:'🐄 Manejar Pastagem',delta:-8,cd:3500},{label:'💉 Vacina Entérica',delta:-12,cd:6000}]});}

function g4_9(c){return _quiz(c,[{q:'O gado bovino emite GEE principalmente por?',opts:['Respiração CO₂','Fermentação entérica (metano)','Fezes sem metano'],ok:1},{q:'O que é o Programa ABC+?',opts:['Crédito rural para maquinário','Financiamento de práticas de baixo carbono','Seguro agrícola'],ok:1},{q:'Plantio direto reduz GEE porque?',opts:['Aumenta produtividade','Mantém carbono no solo','Reduz uso de água'],ok:1},{q:'O que sequestra mais carbono por hectare?',opts:['Monocultura de soja','Sistema ILPF com florestas','Pastagem degradada'],ok:1},{q:'Biogás de biodigestor substitui?',opts:['Água de irrigação','Combustível fóssil nos veículos','Agrotóxicos'],ok:1}]);}

/* ══════════════════════════════════════════════════════
   TEMA 5 — PERDA DE BIODIVERSIDADE
══════════════════════════════════════════════════════ */
function g5_0(c){return _gclick(c,{rows:5,cols:6,time:35,goal:9,empty:'🏜',target:'🌿',block:'🏭',blockPct:0.08,tip:'Clique nas células para designar áreas protegidas (≥30% do território)!'});}

function g5_1(c){return _pat(c,4,4,'🌽','🌳');}

function g5_2(c){return _mem(c,[{icon:'🌻',label:'Girassol Nativo'},{icon:'🍓',label:'Araçá'},{icon:'🌴',label:'Açaí'},{icon:'🥜',label:'Amendoim Crioulo'},{icon:'🍋',label:'Umbu'},{icon:'🌿',label:'Erva-Mate'}]);}

function g5_3(c){return _match(c,[{l:'🌳 Mata Atlântica',r:'🦋 Corredor Verde'},{l:'🌊 Cerrado',r:'🌿 Vereda'},{l:'🌵 Caatinga',r:'🦎 Corredor da Seca'},{l:'🌴 Amazônia',r:'🐆 Arco do Desmatamento'},{l:'🌾 Pampa',r:'🐦 Corredor das Aves'}]);}

function g5_4(c){return _whack(c,['☁️','💀','🧪'],30,5,0);}

function g5_5(c){return _sort(c,[{icon:'🌿',name:'Agroecologia',ok:true},{icon:'🌱',name:'Policultivo',ok:true},{icon:'🐝',name:'Apicultura integrada',ok:true},{icon:'🌳',name:'Agrofloresta',ok:true},{icon:'♻️',name:'Compostagem',ok:true},{icon:'☠️',name:'Herbicida total',ok:false},{icon:'🏭',name:'Monocultura intensiva',ok:false},{icon:'🔥',name:'Queima de resíduos',ok:false},{icon:'🚿',name:'Irrigação excessiva',ok:false},{icon:'💊',name:'Pesticida preventivo',ok:false}],'🌿 Agroecológica','⚠️ Convencional');}

function g5_6(c){return _spread(c,{rows:5,cols:6,time:40,winPct:20,spread:2200,pct:0.3,degIcon:'🏜',forIcon:'🦋',grwIcon:'🌱'});}

function g5_7(c){return _quiz(c,[{q:'Quantas espécies já foram extintas pela ação humana no Brasil?',opts:['Menos de 10','Centenas, com muitas em risco','Nenhuma ainda'],ok:1},{q:'Por que abelhas são essenciais para a agricultura?',opts:['Produzem mel que alimenta animais','Polinizam cerca de 35% da produção global','Controlam pragas'],ok:1},{q:'O que são espécies exóticas invasoras?',opts:['Espécies nativas em risco','Espécies introduzidas que prejudicam o ecossistema','Animais criados em cativeiro'],ok:1},{q:'Qual principal causa da perda de biodiversidade?',opts:['Mudanças climáticas','Destruição de habitats','Caça furtiva'],ok:1},{q:'O que é a extinção da megafauna?',opts:['Extinção de mamíferos gigantes','Redução de plantas enormes','Fim dos dinossauros'],ok:0}]);}

function g5_8(c){return _match(c,[{l:'🐝 Abelha-europeia',r:'🍎 Maçã'},{l:'🦋 Borboleta',r:'🌻 Girassol'},{l:'🐦 Beija-flor',r:'🌺 Bromélias'},{l:'🪲 Abelha-nativa',r:'🫐 Mirtilo'},{l:'🦟 Mariposa-noturna',r:'🌸 Cacau'}]);}

function g5_9(c){return _sort(c,[{icon:'🛡️',name:'Reserva Legal',ok:true},{icon:'🌊',name:'Mata Ciliar',ok:true},{icon:'🔗',name:'Corredor Ecológico',ok:true},{icon:'🏛️',name:'Legislação Ambiental',ok:true},{icon:'🌿',name:'Recuperação de APP',ok:true},{icon:'🔥',name:'Queimada',ok:false},{icon:'☠️',name:'Defensivo aéreo',ok:false},{icon:'🏭',name:'Poluição hídrica',ok:false},{icon:'🚜',name:'Compactação do solo',ok:false},{icon:'🌾',name:'Monocultura extensiva',ok:false}],'🛡️ Proteger','⚠️ Bloquear Ameaça');}

/* ══════════════════════════════════════════════════════
   TEMA 6 — MONOCULTURA EXTENSIVA
══════════════════════════════════════════════════════ */
function g6_0(c){
    // Regra: nenhuma cultura pode ser adjacente (4 direções) a outra igual — promove diversidade
    const COLS=4,ROWS=3,total=COLS*ROWS;
    const crops=['🌽','🌾','🥕','🥬'];
    let grid=Array(total).fill(null);let placed=0;const GOAL=10;
    // verifica se colocar valor `v` na posição `i` viola alguma adjacência
    const isOk=(g,i,v)=>{const r=Math.floor(i/COLS),col=i%COLS;const nb=[];if(r>0)nb.push(i-COLS);if(r<ROWS-1)nb.push(i+COLS);if(col>0)nb.push(i-1);if(col<COLS-1)nb.push(i+1);return nb.every(n=>g[n]!==v);};
    const render=()=>{
        const g=document.getElementById('g6g2');if(!g)return;g.innerHTML='';
        grid.forEach((v,i)=>{
            const d=document.createElement('div');d.className='g2-tile';d.textContent=v||'⬜';
            if(!v){const nextCrop=crops[placed%crops.length];d.onclick=()=>{if(!isOk(grid,i,nextCrop)){d.classList.add('shake');setTimeout(()=>d.classList.remove('shake'),400);return;}grid[i]=nextCrop;placed++;const pc=document.getElementById('pcount');if(pc)pc.textContent=placed;if(placed>=GOAL)_end(true,'Diversidade plantada com sucesso!',100);render();};}
            g.appendChild(d);
        });
    };
    c.innerHTML=`
    <div class="gf-hdr"><span>🌾 <b id="pcount">0</b>/${GOAL}</span></div>
    <div id="g6g2" class="g2-grid" style="--pc:${COLS}"></div>
    <p class="gf-tip">Plante culturas sem repetir adjacências. Próxima: ${crops[0]}</p>`;
    render(); return null;
}

function g6_1(c){return _match(c,[{l:'🍅 Tomate',r:'🏪 Feira Livre'},{l:'🥬 Hortaliças',r:'🏫 Merenda Escolar'},{l:'🫐 Frutas Nativas',r:'🏨 Gastronomia Local'},{l:'🌾 Grãos Diversificados',r:'🏭 Cooperativa'},{l:'🐄 Leite A2',r:'💻 E-commerce Direto'}]);}

function g6_2(c){return _bal(c,{time:25,start:40,limit:65,inc:3,tip:'Diversifique a produção para manter o risco abaixo de 65%!',actions:[{label:'🥕 Diversificar',delta:-15,cd:4000},{label:'🌿 Agroflor.',delta:-12,cd:5000},{label:'🤝 Cooperativa',delta:-10,cd:3500},{label:'📊 Planejamento',delta:-8,cd:3000}]});}

function g6_3(c){return _pat(c,3,4,'🌾','🌳');}

function g6_4(c){return _sort(c,[{icon:'🌾',name:'Só soja 5000ha',ok:false},{icon:'🌽',name:'Só milho 3000ha',ok:false},{icon:'🍅',name:'Só tomate 200ha',ok:false},{icon:'🌴',name:'Só dendê 4000ha',ok:false},{icon:'🍬',name:'Só cana 8000ha',ok:false},{icon:'🥬',name:'Horta + Pomar',ok:true},{icon:'🌿',name:'ILPF diverso',ok:true},{icon:'🐄',name:'Leite + Grãos',ok:true},{icon:'🌳',name:'Agrofloresta mista',ok:true},{icon:'🐔',name:'Aves + Hortaliças',ok:true}],'🌈 Diversificada','⚠️ Monocultura');}

function g6_5(c){return _seq(c,[{icon:'🌿',label:'Verão: Leguminosa'},{icon:'🌾',label:'Outono: Cereal'},{icon:'🏜',label:'Inverno: Pousio'},{icon:'🥕',label:'Primavera: Raiz'}]);}

function g6_6(c){return _match(c,[{l:'👨‍🌾 Produtor de Mel',r:'🐝 Cooperativa Apícola'},{l:'🥬 Horticultor',r:'🏪 Cooperativa de Orgânicos'},{l:'🐄 Pecuarista',r:'🥛 Cooperativa de Laticínios'},{l:'🌾 Cerealista',r:'🌽 Cooperativa de Grãos'},{l:'🌺 Floricultor',r:'💐 Cooperativa de Flores'}]);}

function g6_7(c){return _seq(c,[{icon:'📊',label:'Planejar colheita'},{icon:'🔧',label:'Preparar equipamentos'},{icon:'🌾',label:'Colher na maturação certa'},{icon:'🚛',label:'Transportar adequadamente'},{icon:'🏭',label:'Armazenar corretamente'}]);}

function g6_8(c){return _quiz(c,[{q:'Principal vantagem da policoltura?',opts:['Menor variedade de alimentos','Maior resiliência e menor risco','Mais barata sempre'],ok:1},{q:'Rotação de culturas ajuda a?',opts:['Aumentar a erosão','Quebrar ciclos de pragas e enriquecer o solo','Reduzir produtividade'],ok:1},{q:'O que é consórcio de culturas?',opts:['Financiamento conjunto','Plantio simultâneo de 2+ culturas','Cooperativa agrícola'],ok:1},{q:'Policoltura contribui para?',opts:['Dependência de um produto','Soberania e segurança alimentar','Mais uso de pesticidas'],ok:1},{q:'Risco econômico da monocultura?',opts:['Maior estabilidade','Toda a renda depende de um produto','Menor custo de produção'],ok:1}]);}

function g6_9(c){return _bal(c,{time:25,start:50,limit:70,inc:4,tip:'Mercado em crise! Diversifique para manter receita acima de 30%!',actions:[{label:'🥕 Novo Produto',delta:-20,cd:5000},{label:'🌿 Orgânicos',delta:-15,cd:4000},{label:'🤝 Venda Direta',delta:-12,cd:3500},{label:'📦 Processar',delta:-10,cd:3000}]});}

/* ══════════════════════════════════════════════════════
   TEMA 7 — PRECARIEDADE DO TRABALHO RURAL
══════════════════════════════════════════════════════ */
function g7_0(c){return _sort(c,[{icon:'✅',name:'Registro em carteira',ok:true},{icon:'✅',name:'EPI fornecido',ok:true},{icon:'✅',name:'Salário mínimo pago',ok:true},{icon:'✅',name:'Descanso semanal',ok:true},{icon:'✅',name:'Seguro acidente',ok:true},{icon:'❌',name:'Trabalho infantil',ok:false},{icon:'❌',name:'Sem carteira assinada',ok:false},{icon:'❌',name:'Jornada de 16h',ok:false},{icon:'❌',name:'Sem EPI obrigatório',ok:false},{icon:'❌',name:'Alojamento precário',ok:false}],'✓ Legal','✗ Irregular');}

function g7_1(c){return _gclick(c,{rows:5,cols:5,time:30,goal:8,empty:'⬜',target:'⚠️',block:'🌿',blockPct:0.12,tip:'Clique nos perigos escondidos no ambiente de trabalho!'});}

function g7_2(c){return _match(c,[{l:'🔪 Corte de cana manual',r:'🚜 Colheitadeira mecânica'},{l:'☠️ Aplicação manual de veneno',r:'🚁 Pulverização aérea/drones'},{l:'⛏️ Cavar poços',r:'💧 Perfuratriz hidráulica'},{l:'🌾 Colheita no sol',r:'🤖 Robô colhedor'},{l:'🏋️ Carregamento manual',r:'🏗️ Carregadeira mecânica'}]);}

function g7_3(c){return _seq(c,[{icon:'📋',label:'Análise de riscos'},{icon:'🎓',label:'Capacitação teórica'},{icon:'🦺',label:'Distribuição de EPIs'},{icon:'⚙️',label:'Treinamento prático'},{icon:'📊',label:'Avaliação e registro'}]);}

function g7_4(c){return _quiz(c,[{q:'O que é NR-31?',opts:['Norma de segurança para trabalho rural','Regulamento de agrotóxicos','Lei de reforma agrária'],ok:0},{q:'Trabalhador rural tem direito a?',opts:['Apenas salário','FGTS, férias, 13°, previdência','Só salário mínimo'],ok:1},{q:'Trabalho análogo à escravidão inclui?',opts:['Apenas trabalho forçado físico','Servidão por dívida e condições degradantes também','Só menores de 18'],ok:1},{q:'O que é CAT na legislação trabalhista?',opts:['Comunicação de Acidente de Trabalho','Carteira Agrícola de Trabalhador','Controle Agropecuário Total'],ok:0},{q:'O empregador rural pode exigir hora extra?',opts:['Ilimitadamente','Até 2h/dia com acréscimo mínimo de 50%','Não pode nunca'],ok:1}]);}

function g7_5(c){return _seq(c,[{icon:'🥾',label:'Botas de segurança'},{icon:'👖',label:'Calça de proteção'},{icon:'🦺',label:'Avental/macacão'},{icon:'🧤',label:'Luvas impermeáveis'},{icon:'😷',label:'Máscara respiratória'},{icon:'🥽',label:'Óculos de proteção'}]);}

function g7_6(c){return _match(c,[{l:'🏚️ Sem moradia digna',r:'🏡 Programa Habitação Rural'},{l:'💧 Sem água potável',r:'🚰 Cisterna e saneamento'},{l:'🎓 Sem escola',r:'📚 EJA no campo'},{l:'🏥 Sem saúde',r:'🚑 UBS móvel rural'},{l:'🔌 Sem energia',r:'☀️ Luz para Todos'}]);}

function g7_7(c){return _sort(c,[{icon:'✅',name:'Pronaf Mulher',ok:true},{icon:'✅',name:'Pronaf Jovem',ok:true},{icon:'✅',name:'Pronaf A (assentados)',ok:true},{icon:'✅',name:'BNB FNE Rural',ok:true},{icon:'✅',name:'Crédito Fundiário',ok:true},{icon:'❌',name:'Empréstimo com usura',ok:false},{icon:'❌',name:'Penhor de terra ilegal',ok:false},{icon:'❌',name:'Gato de mão-de-obra',ok:false},{icon:'❌',name:'Agiota rural',ok:false},{icon:'❌',name:'Consórcio suspeito',ok:false}],'✓ Aprovar','✗ Reprovar');}

function g7_8(c){return _quiz(c,[{q:'Qual idade mínima para trabalho leve rural?',opts:['14 anos como aprendiz','16 anos','18 anos'],ok:0},{q:'Trabalho noturno rural é permitido para menores de?',opts:['14 anos','16 anos','18 anos'],ok:2},{q:'O que é trabalho análogo à escravidão?',opts:['Trabalho em outro estado','Condições degradantes + restrição de liberdade','Trabalho temporário'],ok:1},{q:'Onde denunciar trabalho infantil?',opts:['Disque 100 — Direitos Humanos','Só na delegacia local','Não tem como denunciar'],ok:0},{q:'Empregador que usa trabalho infantil sofre?',opts:['Apenas advertência','Multas, interdição e processo criminal','Nenhuma consequência'],ok:1}]);}

function g7_9(c){return _gclick(c,{rows:4,cols:5,time:35,goal:10,empty:'⬜',target:'🏡',block:'🏭',blockPct:0.06,tip:'Distribua lotes de terra clicando nas células disponíveis!'});}

/* ══════════════════════════════════════════════════════
   TEMA 8 — DESPERDÍCIO DE ALIMENTOS
══════════════════════════════════════════════════════ */
function g8_0(c){return _gclick(c,{rows:4,cols:5,time:30,goal:10,empty:'🔴',target:'📦',block:'🏚️',blockPct:0.06,tip:'Armazene os alimentos antes que estraguem!'});}

function g8_1(c){return _sort(c,[{icon:'❄️',name:'Refrigeração adequada',ok:true},{icon:'🧊',name:'Congelamento correto',ok:true},{icon:'🌿',name:'Atmosfera modificada',ok:true},{icon:'🫙',name:'Envase a vácuo',ok:true},{icon:'🧂',name:'Salga/defumação',ok:true},{icon:'☀️',name:'Deixar ao sol',ok:false},{icon:'💧',name:'Deixar em água parada',ok:false},{icon:'📦',name:'Caixa aberta no calor',ok:false},{icon:'🔄',name:'Misturar maturações',ok:false},{icon:'🏚️',name:'Silo sem vedação',ok:false}],'✓ Correta','✗ Incorreta');}

function g8_2(c){return _match(c,[{l:'🥬 Pequeno Produtor',r:'🏪 Feira Orgânica'},{l:'🌾 Cooperativa',r:'🏫 Merenda Escolar (PNAE)'},{l:'🍅 Agroindústria',r:'🛒 Supermercado'},{l:'🍳 Restaurante Rural',r:'🚚 Entrega Direta'},{l:'🐄 Laticínio',r:'💻 Plataforma Digital'}]);}

function g8_3(c){return _quiz(c,[{q:'O que é aproveitamento integral de alimentos?',opts:['Comer apenas a parte nobre','Usar cascas, talos e sementes na culinária','Desperdiçar apenas resíduos'],ok:1},{q:'Quanto de alimento é desperdiçado no Brasil por ano?',opts:['Menos de 1 milhão de toneladas','Cerca de 46 milhões de toneladas','Mais de 200 milhões'],ok:1},{q:'Onde ocorre maior desperdício na cadeia?',opts:['Só na casa do consumidor','Em toda a cadeia: colheita, transporte, varejo, consumo','Apenas no transporte'],ok:1},{q:'O que são bancos de alimentos?',opts:['Financeiras agrícolas','Centros que redistribuem excedentes para quem precisa','Armazéns privados'],ok:1},{q:'Compostagem de resíduos orgânicos?',opts:['Polui o solo','Transforma resíduos em adubo','Só funciona em indústrias'],ok:1}]);}

function g8_4(c){return _sort(c,[{icon:'✅',name:'Frutas com mancha leve',ok:true},{icon:'✅',name:'Legumes maduros',ok:true},{icon:'✅',name:'Pão do dia anterior',ok:true},{icon:'✅',name:'Alimentos em excedente limpos',ok:true},{icon:'✅',name:'Produtos próximos ao vencimento',ok:true},{icon:'❌',name:'Alimentos mofados',ok:false},{icon:'❌',name:'Carne mal refrigerada',ok:false},{icon:'❌',name:'Produto vencido',ok:false},{icon:'❌',name:'Alimento contaminado',ok:false},{icon:'❌',name:'Produto sem identificação',ok:false}],'✓ Pode Doar','✗ Não Pode');}

function g8_5(c){return _mem(c,[{icon:'🥬',label:'Embalagem ativa'},{icon:'🍎',label:'Cera de carnaúba'},{icon:'🥛',label:'Tetra Pak'},{icon:'🥩',label:'Vácuo rígido'},{icon:'🌾',label:'Saco hermético'},{icon:'🍯',label:'Pote de mel âmbar'}]);}

function g8_6(c){return _seq(c,[{icon:'🌾',label:'Colheita no ponto certo'},{icon:'❄️',label:'Resfriamento rápido'},{icon:'🔍',label:'Seleção e classificação'},{icon:'📦',label:'Embalagem adequada'},{icon:'🚛',label:'Transporte refrigerado'},{icon:'🏪',label:'Distribuição e venda'}]);}

function g8_7(c){return _match(c,[{l:'🥬 Hortifrúti excedente',r:'🍽️ Restaurante Popular'},{l:'🥩 Carne descartada',r:'🐕 Canil Municipal'},{l:'🌾 Grão fora do padrão',r:'🐄 Alimentação Animal'},{l:'🍞 Pão do dia',r:'🏚️ Banco de Alimentos'},{l:'🧃 Polpa de fruta',r:'🏫 Merenda Escolar'}]);}

function g8_8(c){return _match(c,[{l:'🥬 Produtor de Orgânicos',r:'🌿 Plataforma Hortifrúti'},{l:'🐄 Pequeno Leiteiro',r:'🛒 App Delivery Rural'},{l:'🌾 Cerealista',r:'💻 Bolsa de Cereais Digital'},{l:'🍅 Tomaticultor',r:'🏪 Marketplace ATER'},{l:'🐔 Avicultor',r:'📲 WhatsApp Business'}]);}

function g8_9(c){return _quiz(c,[{q:'O que é embalagem de atmosfera modificada?',opts:['Embalagem colorida','Embalagem com gases que prolongam a vida útil','Embalagem biodegradável'],ok:1},{q:'Ozônio na conservação de alimentos serve para?',opts:['Colorir os alimentos','Eliminar patógenos e prolongar vida útil','Acelerar maturação'],ok:1},{q:'Biofilme comestível é?',opts:['Plástico ecológico','Revestimento natural que protege o alimento','Filme PVC reciclável'],ok:1},{q:'Refrigeração ideal para frutas tropicais?',opts:['0°C (congelamento)','8 a 12°C (frio sem congelar)','Temperatura ambiente'],ok:1},{q:'Cadeia fria serve para?',opts:['Reduzir custo de transporte','Manter temperatura controlada do produtor ao consumidor','Congelar todos os alimentos'],ok:1}]);}

/* ══════════════════════════════════════════════════════
   TEMA 9 — RESISTÊNCIA A PRAGAS E DOENÇAS
══════════════════════════════════════════════════════ */
function g9_0(c){return _seq(c,[{icon:'📊',label:'Monitoramento (armadilhas)'},{icon:'🔍',label:'Diagnóstico correto'},{icon:'📉',label:'Nível de dano econômico'},{icon:'🌿',label:'Medidas preventivas'},{icon:'🦠',label:'Controle integrado'}]);}

function g9_1(c){return _match(c,[{l:'🦠 Beauveria bassiana',r:'🪲 Broca da Cana'},{l:'🍄 Metarhizium',r:'🦗 Gafanhoto'},{l:'🐝 Trichogramma',r:'🥚 Ovos de Lagarta'},{l:'🦠 Bacillus subtilis',r:'🌱 Fusarium (Solo)'},{l:'🪲 Chrysoperla',r:'🦟 Mosca-Branca'}]);}

function g9_2(c){return _seq(c,[{icon:'🌿',label:'Princípio A (fungicida)'},{icon:'🌾',label:'Princípio B (inseticida)'},{icon:'🥕',label:'Intervalo sem tratamento'},{icon:'🌻',label:'Princípio C (diferente)'}]);}

function g9_3(c){return _gclick(c,{rows:5,cols:5,time:35,goal:8,empty:'🦗',target:'🦎',block:'🌳',blockPct:0.1,tip:'Posicione predadores nas células infestadas por pragas!'});}

function g9_4(c){return _whack(c,['🦗','🪲','🐛','🦟'],30,5,15);}

function g9_5(c){return _sort(c,[{icon:'🎯',name:'Bacillus thuringiensis',ok:true},{icon:'🎯',name:'Trichogramma',ok:true},{icon:'🎯',name:'Beauveria bassiana',ok:true},{icon:'🎯',name:'Inseticida piretroide',ok:true},{icon:'🎯',name:'Neonicotinoide específico',ok:true},{icon:'💀',name:'Organofosforado geral',ok:false},{icon:'💀',name:'Piretroide amplo',ok:false},{icon:'💀',name:'Carbamato total',ok:false},{icon:'💀',name:'Fumigante geral',ok:false},{icon:'💀',name:'Brometo de metila',ok:false}],'🎯 Seletivo','💀 Amplo Espectro');}

function g9_6(c){return _quiz(c,[{q:'O que é resistência de pragas a pesticidas?',opts:['Pragas que crescem mais','Adaptação genética que reduz eficácia do produto','Pragas que se escondem'],ok:1},{q:'Como evitar resistência a fungicidas?',opts:['Usar sempre o mesmo produto','Rotacionar princípios ativos com modos de ação diferentes','Aumentar a dose'],ok:1},{q:'O que é nível de dano econômico no MIP?',opts:['Custo do pesticida','Ponto onde a praga causa prejuízo maior que o controle','Número máximo de pragas permitido'],ok:1},{q:'Armadilhas de feromônio servem para?',opts:['Matar pragas diretamente','Monitorar população e capturar adultos','Repelir insetos'],ok:1},{q:'O que é fitossanidade?',opts:['Saúde financeira da fazenda','Saúde dos vegetais e controle de doenças/pragas','Higiene de alimentos'],ok:1}]);}

function g9_7(c){return _match(c,[{l:'Gene Lr34',r:'🌾 Ferrugem do Trigo'},{l:'Gene Xa21',r:'🌾 Bactéria do Arroz'},{l:'Gene I2',r:'🍅 Fusarium do Tomate'},{l:'Gene Mi',r:'🍅 Nematoide do Tomate'},{l:'Gene Sw5',r:'🌿 Vírus do Tospovírus'}]);}

function g9_8(c){return _pat(c,4,4,'🌾','🌻');}

function g9_9(c){return _match(c,[{l:'🏛️ Embrapa',r:'🌱 Melhoramento Genético'},{l:'🎓 UFV',r:'🦠 Fitopatologia'},{l:'🔬 IAC',r:'🌿 Entomologia'},{l:'🌍 Inmet',r:'🌡️ Clima e Epidemiologia'},{l:'🤝 Andef',r:'📊 Registros e Homologação'}]);}

/* ══════════════════════════════════════════════════════
   MAPA DE JOGOS [tema][solução]
   GMAP[i][j] → função do jogo para o tema i, solução j
   Chamado por _launch() usando _ti e _si como índices
══════════════════════════════════════════════════════ */
const GMAP=[
    [g0_0,g0_1,g0_2,g0_3,g0_4,g0_5,g0_6,g0_7,g0_8,g0_9],
    [g1_0,g1_1,g1_2,g1_3,g1_4,g1_5,g1_6,g1_7,g1_8,g1_9],
    [g2_0,g2_1,g2_2,g2_3,g2_4,g2_5,g2_6,g2_7,g2_8,g2_9],
    [g3_0,g3_1,g3_2,g3_3,g3_4,g3_5,g3_6,g3_7,g3_8,g3_9],
    [g4_0,g4_1,g4_2,g4_3,g4_4,g4_5,g4_6,g4_7,g4_8,g4_9],
    [g5_0,g5_1,g5_2,g5_3,g5_4,g5_5,g5_6,g5_7,g5_8,g5_9],
    [g6_0,g6_1,g6_2,g6_3,g6_4,g6_5,g6_6,g6_7,g6_8,g6_9],
    [g7_0,g7_1,g7_2,g7_3,g7_4,g7_5,g7_6,g7_7,g7_8,g7_9],
    [g8_0,g8_1,g8_2,g8_3,g8_4,g8_5,g8_6,g8_7,g8_8,g8_9],
    [g9_0,g9_1,g9_2,g9_3,g9_4,g9_5,g9_6,g9_7,g9_8,g9_9]
];
