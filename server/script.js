
/* ─── DATA ─── */
const PROBLEMS = [
    {
        emoji: "🪓",
        title: "Desmatamento",
        sub: "Destruição de florestas e matas nativas",
        solutions: [
            "Implementar políticas de reflorestamento obrigatório com espécies nativas nas propriedades rurais",
            "Criar incentivos financeiros e fiscais para produtores que preservam florestas e matas ciliares",
            "Adotar sistemas agroflorestais que integram árvores, culturas agrícolas e criação animal",
            "Usar sensoriamento remoto e satélites para monitorar e fiscalizar o desmatamento em tempo real",
            "Promover certificações ambientais que valorizam e diferenciam produtos de origem sustentável",
            "Fortalecer a fiscalização ambiental e endurecer as penalidades para infratores da legislação",
            "Expandir o aproveitamento produtivo de áreas já degradadas antes de abrir novas áreas",
            "Educar produtores sobre os benefícios econômicos das florestas: polinização, água, microclima",
            "Desenvolver e ampliar programas de Pagamento por Serviços Ambientais (PSA)",
            "Criar e conectar corredores ecológicos para manter a biodiversidade e regeneração natural"
        ]
    },
    {
        emoji: "☠️",
        title: "Uso Excessivo de Agrotóxicos",
        sub: "Contaminação do solo, água e alimentos",
        solutions: [
            "Adotar o Manejo Integrado de Pragas (MIP) como prática obrigatória e não exceção",
            "Investir em pesquisa e aplicação de controle biológico com predadores e parasitas naturais",
            "Incentivar a transição para a agricultura orgânica, natural e de base agroecológica",
            "Capacitar produtores sobre dosagem correta, segurança no manuseio e descarte de embalagens",
            "Desenvolver e difundir bioinseticidas, biofungicidas e bioestimulantes como alternativas seguras",
            "Implementar rotação de culturas para quebrar o ciclo de pragas e reduzir infestações",
            "Criar legislação mais rigorosa sobre registro, uso e monitoramento de agrotóxicos no Brasil",
            "Promover o uso de variedades geneticamente resistentes a pragas e doenças",
            "Apoiar pesquisas em biotecnologia para culturas mais resistentes com menor dependência química",
            "Estabelecer zonas tampão e faixas de proteção ao redor de rios, reservatórios e APPs"
        ]
    },
    {
        emoji: "🏜️",
        title: "Degradação do Solo",
        sub: "Erosão, compactação e perda de fertilidade",
        solutions: [
            "Praticar o plantio direto para preservar a estrutura, umidade e matéria orgânica do solo",
            "Manter cobertura vegetal permanente com palhada, resíduos e plantas de cobertura entre safras",
            "Realizar rotação e consórcio de culturas para diversificar o uso e restaurar nutrientes do solo",
            "Aplicar adubação orgânica, compostagem, bokashi e biofertilizantes regularmente",
            "Adotar curvas de nível, terraceamento e faixas de vegetação para conter a erosão hídrica",
            "Reduzir o tráfego de maquinário pesado para evitar a compactação das camadas do solo",
            "Implementar sistemas de Integração Lavoura-Pecuária-Floresta (ILPF) que recuperam o solo",
            "Monitorar regularmente pH, nutrientes, matéria orgânica e biologia do solo",
            "Recuperar áreas degradadas com plantio de leguminosas nativas fixadoras de nitrogênio",
            "Promover extensão rural e educação técnica sobre manejo sustentável e conservação do solo"
        ]
    },
    {
        emoji: "💧",
        title: "Escassez de Água",
        sub: "Uso ineficiente e contaminação dos recursos hídricos",
        solutions: [
            "Adotar sistemas de irrigação por gotejamento e microaspersão de alta eficiência hídrica",
            "Construir cisternas, barragens e reservatórios para captação e armazenamento de água da chuva",
            "Implementar o reúso de água tratada e a reciclagem da água de irrigação nas propriedades",
            "Preservar e recuperar matas ciliares para proteger nascentes e manter o fluxo de cursos d'água",
            "Mapear, monitorar e proteger aquíferos, mananciais e lençóis freáticos regionais",
            "Investir no desenvolvimento de variedades agrícolas mais tolerantes ao estresse hídrico",
            "Criar políticas de cobrança proporcional pelo uso da água que incentivem o uso racional",
            "Treinar e capacitar produtores em técnicas de irrigação eficiente e agendamento de irrigações",
            "Usar sensores de umidade e tensiômetros para irrigação de precisão e economia de até 50%",
            "Estabelecer comitês regionais para gestão compartilhada e sustentável dos recursos hídricos"
        ]
    },
    {
        emoji: "🌡️",
        title: "Emissão de Gases de Efeito Estufa",
        sub: "Contribuição do agro para as mudanças climáticas",
        solutions: [
            "Adotar práticas do Programa Agricultura de Baixo Carbono (ABC+) reconhecido pelo governo federal",
            "Implementar biodigestores para tratar dejetos animais e gerar biogás e biofertilizante líquido",
            "Instalar painéis solares, microeólicas e usar biomassa como energia renovável nas fazendas",
            "Reduzir o desmatamento e promover o reflorestamento ativo para sequestro de CO₂",
            "Expandir a Integração Lavoura-Pecuária-Floresta (ILPF) para fixação de carbono no sistema",
            "Utilizar biogás de resíduos agrícolas como substituto de combustíveis fósseis nos maquinários",
            "Adotar o plantio direto, que aumenta em até 30% o estoque de carbono no solo",
            "Criar e ampliar mercados voluntários de crédito de carbono para agricultores sustentáveis",
            "Melhorar a gestão de pastagens e a nutrição animal para reduzir emissões de metano entérico",
            "Criar incentivos fiscais e linhas de crédito subsidiado para práticas de baixo carbono"
        ]
    },
    {
        emoji: "🦋",
        title: "Perda de Biodiversidade",
        sub: "Extinção de espécies e desequilíbrio ecológico",
        solutions: [
            "Manter, recuperar e ampliar Reservas Legais e Áreas de Preservação Permanente (APPs)",
            "Promover sistemas agroflorestais que integram múltiplas espécies nativas e cultivadas",
            "Criar e manter bancos de germoplasma para conservar variedades crioulas e espécies nativas",
            "Implantar corredores ecológicos que conectem fragmentos florestais e permitam o fluxo gênico",
            "Proibir o uso de agrotóxicos comprovadamente nocivos a abelhas, pássaros e outros polinizadores",
            "Promover a agroecologia como modelo produtivo que respeita e amplia a biodiversidade local",
            "Recuperar habitats degradados com plantio de espécies nativas da flora regional",
            "Criar programas de monitoramento de fauna, flora e microrganismos benéficos do solo",
            "Educar produtores sobre o valor econômico dos polinizadores: até 35% da produção depende deles",
            "Fortalecer a aplicação da legislação ambiental e punir crimes contra a biodiversidade"
        ]
    },
    {
        emoji: "🌾",
        title: "Monocultura Extensiva",
        sub: "Dependência de uma cultura única e seus riscos",
        solutions: [
            "Implementar a rotação de culturas para restaurar a fertilidade e o equilíbrio biológico do solo",
            "Promover o cultivo consorciado de duas ou mais culturas na mesma área de forma planejada",
            "Incentivar a diversificação da produção para reduzir riscos econômicos, sanitários e ambientais",
            "Desenvolver e fortalecer mercados locais e regionais para absorver produtos diversificados",
            "Criar políticas agrícolas que incentivem a diversidade produtiva e não apenas as commodities",
            "Adotar sistemas agroflorestais como modelo alternativo de alta produtividade e diversidade",
            "Difundir a agroecologia como modelo que integra produção, ecologia e diversidade",
            "Educar produtores sobre os riscos de mercado, pragas e climáticos da dependência de uma cultura",
            "Fortalecer cadeias produtivas para frutas, hortaliças, grãos e proteínas diversificadas",
            "Apoiar cooperativas e associações que trabalham com produção diversificada e orgânica"
        ]
    },
    {
        emoji: "👷",
        title: "Precariedade do Trabalho Rural",
        sub: "Ausência de direitos, saúde e condições dignas",
        solutions: [
            "Garantir a plena aplicação e fiscalização da legislação trabalhista rural em todo o país",
            "Ampliar o acesso a programas de saúde preventiva e ocupacional para trabalhadores do campo",
            "Investir em mecanização inteligente e ergonomia para eliminar atividades de alto risco físico",
            "Promover programas de capacitação técnica, alfabetização e educação continuada no campo",
            "Fortalecer sindicatos rurais, cooperativas e organizações de representação dos trabalhadores",
            "Garantir o fornecimento gratuito e uso obrigatório de Equipamentos de Proteção Individual (EPI)",
            "Criar programas públicos de habitação rural digna, com saneamento e infraestrutura básica",
            "Ampliar o acesso ao crédito rural com juros baixos para pequenos e médios produtores",
            "Combater com rigor o trabalho infantil e o trabalho análogo à escravidão no campo",
            "Promover políticas de reforma agrária, regularização fundiária e inclusão produtiva"
        ]
    },
    {
        emoji: "🗑️",
        title: "Desperdício de Alimentos",
        sub: "Perdas na produção, transporte e consumo",
        solutions: [
            "Melhorar a infraestrutura de armazenamento com silos, câmaras frias e galpões adequados",
            "Investir em tecnologias de conservação como atmosfera modificada, ozônio e biofilmes",
            "Desenvolver cadeias curtas de abastecimento com venda direta entre produtor e consumidor",
            "Educar consumidores sobre aproveitamento integral, planejamento de compras e compostagem",
            "Criar e expandir bancos de alimentos para redistribuição de excedentes a populações vulneráveis",
            "Implementar embalagens inteligentes que monitoram e prolongam a vida útil dos produtos",
            "Promover o processamento artesanal e industrial de alimentos para aproveitar excedentes",
            "Criar legislação que simplifique e incentive a doação legal e segura de excedentes alimentares",
            "Desenvolver aplicativos e plataformas digitais de conexão direta entre produtores e compradores",
            "Investir em pesquisa de variedades com maior vida de prateleira e resistência ao transporte"
        ]
    },
    {
        emoji: "🦠",
        title: "Resistência a Pragas e Doenças",
        sub: "Evolução de agentes patogênicos e pragas resistentes",
        solutions: [
            "Adotar o Manejo Integrado de Pragas (MIP) como protocolo padrão, não como exceção",
            "Investir em biotecnologia para desenvolver culturas com resistência genética natural a patógenos",
            "Promover a rotação de princípios ativos e de culturas para evitar pressão seletiva por resistência",
            "Ampliar o uso do controle biológico com fungos entomopatogênicos, vespas e bactérias benéficas",
            "Implementar sistemas de monitoramento com armadilhas e diagnóstico precoce de surtos",
            "Reduzir e racionalizar o uso de pesticidas de amplo espectro que destroem a fauna benéfica",
            "Criar sistemas nacionais de alerta e vigilância fitossanitária para doenças emergentes e exóticas",
            "Fortalecer a pesquisa pública em fitopatologia, entomologia e microbiologia aplicada",
            "Promover a diversidade genética nas culturas para reduzir a vulnerabilidade coletiva a doenças",
            "Criar redes de cooperação entre produtores, universidades, Embrapa e institutos de pesquisa"
        ]
    }
];

/* ─── BUILD CARDS ─── */
// Gera dinamicamente todos os cards de problemas e soluções no DOM
function build() {
    const grid = document.getElementById('probGrid');

    grid.innerHTML = PROBLEMS.map((p, i) => `
        <div class="p-card" id="pc${i}" onclick="toggle(${i})">
            <div class="p-head">
                <div class="p-num">${i + 1}</div>
                <div class="p-emoji">${p.emoji}</div>
                <div class="p-text">
                    <h3>${p.title}</h3>
                    <small>${p.sub}</small>
                </div>
                <div class="p-arrow">+</div>
            </div>
            <div class="sol-panel">
                <div class="sol-inner">
                    <div class="sol-label">10 Formas de Resolver</div>
                    ${p.solutions.map((s, j) => `
                        <div class="sol-item has-game"
                             style="animation-delay:${j * 0.04}s"
                             onclick="event.stopPropagation(); showGameIntro(${i}, ${j})">
                             <!-- stopPropagation: impede que o clique na solução feche o card via toggle(i) -->
                            <div class="sol-n">${j + 1}</div>
                            <div class="sol-txt">${s}<span class="game-badge">🎮 Jogar</span></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

/* ─── TOGGLE LOGIC ─── */
// Abre ou fecha o painel de soluções de um card de problema
function toggle(i) {
    const card = document.getElementById('pc' + i);
    const isOpen = card.classList.contains('open');

    document.querySelectorAll('.p-card').forEach(c => c.classList.remove('open'));

    if (!isOpen) {
        card.classList.add('open');
        setTimeout(() => {
            const rect = card.getBoundingClientRect();
            const offset = rect.top + window.scrollY - 90;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 80);
    }
}

/* ─── SCROLL EFFECTS ─── */
// Aplica classe scrolled no header e exibe botão de voltar ao topo conforme rolagem
const hdr = document.getElementById('hdr');
const btt = document.getElementById('btt');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 40);
    btt.classList.toggle('show', y > 400);
});

btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── INIT ─── */
// Inicializa os cards ao carregar a página
build();
