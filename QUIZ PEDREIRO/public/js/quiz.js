(() => {
  const palco = document.getElementById('qz-palco');
  const prog = document.getElementById('qz-prog');
  const barra = document.getElementById('qz-barra');
  const trilha = document.querySelector('.qz-trilha');
  const btnVoltar = document.getElementById('qz-voltar');

  const ESTADOS = [
    { uf: 'AC', nome: 'Acre', min: 35, justo: 50, prem: 75 },
    { uf: 'AL', nome: 'Alagoas', min: 30, justo: 44, prem: 66 },
    { uf: 'AP', nome: 'Amapá', min: 34, justo: 48, prem: 72 },
    { uf: 'AM', nome: 'Amazonas', min: 36, justo: 52, prem: 78 },
    { uf: 'BA', nome: 'Bahia', min: 29, justo: 42, prem: 64 },
    { uf: 'CE', nome: 'Ceará', min: 28, justo: 39, prem: 60 },
    { uf: 'DF', nome: 'Distrito Federal', min: 45, justo: 66, prem: 98 },
    { uf: 'ES', nome: 'Espírito Santo', min: 38, justo: 55, prem: 82 },
    { uf: 'GO', nome: 'Goiás', min: 36, justo: 53, prem: 79 },
    { uf: 'MA', nome: 'Maranhão', min: 28, justo: 41, prem: 62 },
    { uf: 'MT', nome: 'Mato Grosso', min: 40, justo: 58, prem: 86 },
    { uf: 'MS', nome: 'Mato Grosso do Sul', min: 39, justo: 56, prem: 84 },
    { uf: 'MG', nome: 'Minas Gerais', min: 36, justo: 52, prem: 78 },
    { uf: 'PA', nome: 'Pará', min: 32, justo: 46, prem: 69 },
    { uf: 'PB', nome: 'Paraíba', min: 28, justo: 40, prem: 61 },
    { uf: 'PR', nome: 'Paraná', min: 42, justo: 62, prem: 92 },
    { uf: 'PE', nome: 'Pernambuco', min: 30, justo: 44, prem: 66 },
    { uf: 'PI', nome: 'Piauí', min: 27, justo: 39, prem: 59 },
    { uf: 'RJ', nome: 'Rio de Janeiro', min: 44, justo: 64, prem: 95 },
    { uf: 'RN', nome: 'Rio Grande do Norte', min: 29, justo: 42, prem: 63 },
    { uf: 'RS', nome: 'Rio Grande do Sul', min: 42, justo: 61, prem: 91 },
    { uf: 'RO', nome: 'Rondônia', min: 35, justo: 50, prem: 75 },
    { uf: 'RR', nome: 'Roraima', min: 35, justo: 51, prem: 76 },
    { uf: 'SC', nome: 'Santa Catarina', min: 44, justo: 64, prem: 96 },
    { uf: 'SP', nome: 'São Paulo', min: 45, justo: 65, prem: 97 },
    { uf: 'SE', nome: 'Sergipe', min: 29, justo: 42, prem: 63 },
    { uf: 'TO', nome: 'Tocantins', min: 33, justo: 48, prem: 72 }
  ];

  const state = {
    step: 1,
    answers: {
      servico: 'Pedreiro',
      estado: { uf: 'SP', nome: 'São Paulo', min: 45, justo: 65, prem: 97 },
      comoFaz: 'Calculo tudo de cabeça',
      basePreco: 'Pelo que cobrei num serviço parecido',
      cobrouPouco: 'Sim, já me aconteceu várias vezes',
      reacaoCliente: 'Ele chora desconto e eu acabo cedendo',
      tempoOrcamento: 'Mais de 1 hora',
      atrapalha: 'Somar o material sem esquecer nada',
      usaria: 'Com certeza usaria'
    }
  };

  let timers = [];
  function clearTimers() {
    timers.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timers = [];
  }

  function setProgress(pct, showProg, showBack) {
    prog.hidden = !showProg;
    btnVoltar.hidden = !showBack;
    barra.style.width = `${pct}%`;
    trilha.setAttribute('aria-valuenow', String(pct));
  }

  function fmtMoney(v) {
    return v.toLocaleString('pt-BR');
  }

  function renderOptions(key, items) {
    const selected = state.answers[key];
    return `
      <div class="qz-ops">
        ${items.map((item) => `
          <button type="button" class="qz-op ${selected === item.txt ? 'sim' : ''}" data-val="${item.txt.replace(/"/g, '&quot;')}">
            <span class="qz-op-ico">${item.ico}</span>
            <span class="qz-op-txt">${item.txt}</span>
            <span class="qz-op-bola" aria-hidden="true"></span>
          </button>
        `).join('')}
      </div>
    `;
  }

  function bindOptions(key, nextStep) {
    palco.querySelectorAll('.qz-op').forEach((btn) => {
      btn.addEventListener('click', () => {
        palco.querySelectorAll('.qz-op').forEach((b) => b.classList.remove('sim'));
        btn.classList.add('sim');
        state.answers[key] = btn.dataset.val;
        const t = setTimeout(() => goTo(nextStep), 180);
        timers.push(t);
      });
    });
  }

  function renderWhatsAppMockup(showBadge = true) {
    return `
      <div class="cel">
        <div class="cel-tela">
          <div class="cel-topo">
            <div class="cel-ilha"></div>
            <div class="cel-status"><span>9:41</span><span>5G 100%</span></div>
            <div class="cel-zap-h">
              <div class="cel-av">DM</div>
              <div>
                <div class="cel-nome">Dona Maria</div>
                <div class="cel-on">online</div>
              </div>
            </div>
          </div>
          <div class="cel-chat">
            <div class="msg-pdf">
              <div class="msg-pdf-card">
                <div class="msg-pdf-head">Carlos Souza Pedreiro</div>
                <div class="msg-pdf-num">ORÇAMENTO Nº 0031</div>
                <div class="msg-pdf-row"><span>Levantar parede · 25 m²</span><span>R$ 1.625</span></div>
                <div class="msg-pdf-row"><span>Reboco de parede · 25 m²</span><span>R$ 1.125</span></div>
                <div class="msg-pdf-tot"><span>TOTAL</span><span>R$ 2.750</span></div>
              </div>
              <div class="msg-pdf-meta">
                <span>Orcamento-0031.pdf · 1 página · PDF</span>
                <span>17:30</span>
              </div>
            </div>
            <div class="msg-zap eu">
              Bom dia, Dona Maria! Segue o orçamento detalhado 🙂
              <span class="msg-hora">17:30</span>
            </div>
            <div class="msg-zap cli">
              Nossa, ficou muito profissional! 😍
              <span class="msg-hora">17:31</span>
            </div>
            <div class="msg-zap cli">
              Pode começar segunda?
              <span class="msg-hora">17:31</span>
            </div>
            ${showBadge ? '<div class="cel-fechado">✓ FECHADO</div>' : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderScreen(step) {
    clearTimers();
    let html = '';

    if (step === 1) {
      setProgress(0, false, false);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Quem calcula a obra <span class="az">no olho</span> está <span class="vm">perdendo dinheiro</span> ou deixando lucro na mesa</h1>
          <p class="qz-sub">Descubra como montar o orçamento <b>só com a sua voz</b>, usando o preço da sua região, em <b>40 segundos</b>.</p>
          <figure class="hst">
            <img src="/img/cenas/hero-pedreiro.webp" alt="Pedreiro conferindo orçamento na obra">
            <span class="hst-tag">DEPOIS</span>
            <figcaption class="hst-orc">
              <div class="hst-topo">
                <img src="/icons/icon-192.png" alt="Orçaí" style="width:18px;height:18px;border-radius:4px;object-fit:cover;">
                <span style="font-family:'Barlow',sans-serif;font-weight:800;letter-spacing:.01em;">Orçaí</span>
              </div>
              <div class="hst-cli">
                <span>Orçamento pra Dona Maria</span>
                <span class="hst-pronto">✓ pronto em 0:40</span>
              </div>
              <div class="hst-linha"><span>Levantar parede 45 m²</span><b>R$ 2.925</b></div>
              <div class="hst-linha"><span>Reboco 45 m²</span><b>R$ 2.025</b></div>
              <div class="hst-mat"><span>📦 Material da parede</span><b>591 blocos · 32 sacos</b></div>
              <div class="hst-tot"><span>TOTAL</span><b>R$ 4.950</b></div>
            </figcaption>
          </figure>
          <button type="button" id="qz-start" class="qz-cta pulsa">AVANÇAR</button>
        </section>
      `;
      palco.innerHTML = html;
      document.getElementById('qz-start').addEventListener('click', () => goTo(2));
      return;
    }

    if (step === 2) {
      setProgress(7, true, false);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Qual é a sua área na obra?</h1>
          ${renderOptions('servico', [
            { ico: '🧱', txt: 'Pedreiro' },
            { ico: '🎨', txt: 'Pintor' },
            { ico: '⚡', txt: 'Eletricista' },
            { ico: '🚿', txt: 'Encanador' },
            { ico: '🛠️', txt: 'Faço de tudo um pouco' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('servico', 3);
      return;
    }

    if (step === 3) {
      setProgress(14, true, true);
      const selUf = state.answers.estado.uf;
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Qual é o seu estado?</h1>
          <p class="qz-sub">Assim a gente puxa os valores da sua região.</p>
          <div class="qz-ufs">
            ${ESTADOS.map((e) => `
              <button type="button" class="qz-uf ${selUf === e.uf ? 'sim' : ''}" data-uf="${e.uf}">
                <span class="qz-uf-sigla">${e.uf}</span>
                <span class="qz-uf-nome">${e.nome}</span>
              </button>
            `).join('')}
          </div>
        </section>
      `;
      palco.innerHTML = html;
      palco.querySelectorAll('.qz-uf').forEach((btn) => {
        btn.addEventListener('click', () => {
          palco.querySelectorAll('.qz-uf').forEach((b) => b.classList.remove('sim'));
          btn.classList.add('sim');
          const found = ESTADOS.find((e) => e.uf === btn.dataset.uf);
          if (found) state.answers.estado = found;
          const t = setTimeout(() => goTo(4), 180);
          timers.push(t);
        });
      });
      return;
    }

    if (step === 4) {
      setProgress(21, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Hoje, como você monta seus orçamentos? 📋</h1>
          ${renderOptions('comoFaz', [
            { ico: '🤦‍♂️', txt: 'Calculo tudo de cabeça' },
            { ico: '📱', txt: 'Uso a calculadora do celular' },
            { ico: '📝', txt: 'Escrevo no caderno' },
            { ico: '🫤', txt: 'Tenho dificuldade pra calcular' },
            { ico: '💻', txt: 'Uso planilha ou aplicativo' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('comoFaz', 5);
      return;
    }

    if (step === 5) {
      setProgress(29, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Como você decide quanto cobrar pela mão de obra?</h1>
          ${renderOptions('basePreco', [
            { ico: '😅', txt: 'Pelo que cobrei num serviço parecido' },
            { ico: '🗣️', txt: 'Pelo que outros pedreiros cobram' },
            { ico: '⏰', txt: 'Pelo tempo e esforço que vai levar' },
            { ico: '📋', txt: 'Sigo uma tabela própria' },
            { ico: '🤔', txt: 'Sempre fico na dúvida do valor' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('basePreco', 6);
      return;
    }

    if (step === 6) {
      setProgress(36, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Já acabou um serviço e sentiu que cobrou barato demais?</h1>
          ${renderOptions('cobrouPouco', [
            { ico: '😬', txt: 'Sim, já me aconteceu várias vezes' },
            { ico: '😰', txt: 'Sim, quando a obra deu bem mais trabalho' },
            { ico: '🤔', txt: 'Às vezes fico na dúvida se valeu a pena' },
            { ico: '🛡️', txt: 'Ainda não, mas quero me prevenir' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('cobrouPouco', 7);
      return;
    }

    if (step === 7) {
      setProgress(43, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">O que costuma acontecer depois que você manda o preço?</h1>
          ${renderOptions('reacaoCliente', [
            { ico: '😪', txt: 'Ele chora desconto e eu acabo cedendo' },
            { ico: '❌', txt: 'Ele acha caro e não sei como justificar' },
            { ico: '😟', txt: 'Fico com receio de pedir mais e perder o serviço' },
            { ico: '👻', txt: 'Ele vê o valor e não responde mais' },
            { ico: '✅', txt: 'Na maioria aceita, mas quero parecer mais profissional' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('reacaoCliente', 8);
      return;
    }

    if (step === 8) {
      setProgress(50, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Seu orçamento tem que mostrar o <span class="az">esforço</span> que existe por trás do valor</h1>
          <div class="qz-fone">${renderWhatsAppMockup(true)}</div>
          <div class="fm-passos">
            <span class="fm-passo ativo">1. Toca</span>
            <span class="fm-passo">2. Fala</span>
            <span class="fm-passo">3. Confere</span>
            <span class="fm-passo">4. Manda</span>
            <span class="fm-passo">5. Fechado</span>
          </div>
          <div class="qz-claro">
            <p class="qz-claro-tit">DESSE JEITO O CLIENTE ENXERGA O VALOR:</p>
            <div class="qz-claro-item">
              <span class="qz-claro-ico">🧱</span>
              <div class="qz-claro-txt"><b>Cada etapa com a medida certa</b>Parede 25 m², reboco 25 m²: ele enxerga tudo o que será feito.</div>
            </div>
            <div class="qz-claro-item">
              <span class="qz-claro-ico">📦</span>
              <div class="qz-claro-txt"><b>O material bem separado</b>Quantidade de blocos e argamassa, sem nada escondido.</div>
            </div>
            <div class="qz-claro-item">
              <span class="qz-claro-ico">👷</span>
              <div class="qz-claro-txt"><b>A sua mão de obra valorizada</b>O seu serviço fica claro no documento e tem preço justo.</div>
            </div>
          </div>
          <p class="qz-frase">Quando o cliente entende o que está pagando, <span>fica muito mais fácil defender o seu preço.</span></p>
          <button type="button" id="qz-next-8" class="qz-cta">AVANÇAR</button>
        </section>
      `;
      palco.innerHTML = html;
      const pills = palco.querySelectorAll('.fm-passo');
      let idx = 0;
      const iv = setInterval(() => {
        idx = (idx + 1) % pills.length;
        pills.forEach((p, i) => p.classList.toggle('ativo', i === idx));
      }, 1400);
      timers.push(iv);
      document.getElementById('qz-next-8').addEventListener('click', () => goTo(9));
      return;
    }

    if (step === 9) {
      setProgress(57, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Quanto tempo você gasta pra preparar um orçamento? ⏱️</h1>
          ${renderOptions('tempoOrcamento', [
            { ico: '🕐', txt: 'Cerca de 30 minutos' },
            { ico: '🕜', txt: 'Mais de 1 hora' },
            { ico: '📆', txt: 'Acabo deixando pro dia seguinte' },
            { ico: '❌', txt: 'Muitas vezes nem envio orçamento' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('tempoOrcamento', 10);
      return;
    }

    if (step === 10) {
      setProgress(64, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Qual é a maior dificuldade na hora de montar o orçamento?</h1>
          ${renderOptions('atrapalha', [
            { ico: '😪', txt: 'Ter que parar o serviço pra anotar tudo' },
            { ico: '🧱', txt: 'Somar o material sem esquecer nada' },
            { ico: '📲', txt: 'Enviar com uma cara profissional' },
            { ico: '💰', txt: 'Saber o valor certo praticado na minha cidade' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('atrapalha', 11);
      return;
    }

    if (step === 11) {
      setProgress(71, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Se você pudesse gerar o orçamento só falando, já com o preço da sua região e o material calculado, usaria?</h1>
          ${renderOptions('usaria', [
            { ico: '✅', txt: 'Com certeza usaria' },
            { ico: '🤔', txt: 'Talvez' },
            { ico: '👊', txt: 'Tenho interesse' }
          ])}
        </section>
      `;
      palco.innerHTML = html;
      bindOptions('usaria', 12);
      return;
    }

    if (step === 12) {
      setProgress(79, true, true);
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Você pode estar <span class="vm">deixando dinheiro</span> em todo serviço</h1>
          <div class="qz-dor-foto">
            <img src="/img/cenas/antes-pedreiro.webp" alt="Obra sem orçamento claro">
            <div class="qz-ad-neon">25 m² × R$ ? + material? = ???</div>
            <div class="qz-dor-leg">Fazendo conta de cabeça, <b>todo orçamento vira um chute.</b> Às vezes você trabalha de graça sem nem notar.</div>
          </div>
          <p class="qz-rot-sec">QUEM CALCULA NO CHUTE:</p>
          <div class="qz-perdas">
            <div class="qz-perda" style="animation-delay:0s"><span class="qz-perda-ico">🧱<span class="qz-perda-x">✕</span></span><div><b>Esquece parte do material</b> na hora de somar</div></div>
            <div class="qz-perda" style="animation-delay:.12s"><span class="qz-perda-ico">📉<span class="qz-perda-x">✕</span></span><div><b>Não sabe seu mínimo</b> e cobra menos do que vale</div></div>
            <div class="qz-perda" style="animation-delay:.24s"><span class="qz-perda-ico">🗺️<span class="qz-perda-x">✕</span></span><div><b>Pede o mesmo valor</b> em qualquer lugar</div></div>
            <div class="qz-perda" style="animation-delay:.36s"><span class="qz-perda-ico">⏳<span class="qz-perda-x">✕</span></span><div><b>Demora pra responder</b> e perde o cliente pra outro</div></div>
            <div class="qz-perda" style="animation-delay:.48s"><span class="qz-perda-ico">💸<span class="qz-perda-x">✕</span></span><div><b>Aceita dar desconto</b> e sai no prejuízo</div></div>
          </div>
          <div class="qz-jeito">
            <p class="qz-jeito-tit">✅ Agora ficou simples resolver isso</p>
            <p class="qz-jeito-txt">O Orçaí gera o orçamento completo com os valores da sua cidade. Você só precisa falar.</p>
            <div class="qz-fluxo">
              <div class="qz-fluxo-passo"><span class="qz-fluxo-bola">🎤</span>Fala</div>
              <span class="qz-fluxo-seta">→</span>
              <div class="qz-fluxo-passo"><span class="qz-fluxo-bola">📄</span>Monta</div>
              <span class="qz-fluxo-seta">→</span>
              <div class="qz-fluxo-passo"><span class="qz-fluxo-bola">🤝</span>Fecha</div>
            </div>
          </div>
          <button type="button" id="qz-next-12" class="qz-cta">QUERO VER NA PRÁTICA</button>
        </section>
      `;
      palco.innerHTML = html;
      document.getElementById('qz-next-12').addEventListener('click', () => goTo(13));
      return;
    }

    if (step === 13) {
      setProgress(86, true, false);
      const r = 56;
      const c = 2 * Math.PI * r;
      const items = [
        { t: 'Avaliando como você monta seus orçamentos', s: `Sua resposta: “${state.answers.comoFaz}”` },
        { t: 'Buscando a tabela de preços da sua região', s: `Sua resposta: “${state.answers.estado.nome}”` },
        { t: 'Analisando a reação dos seus clientes ao preço', s: `Sua resposta: “${state.answers.reacaoCliente}”` },
        { t: 'Calculando o tempo gasto em cada orçamento', s: `Sua resposta: “${state.answers.tempoOrcamento}”` },
        { t: 'Ajustando o aplicativo pro seu tipo de serviço', s: `Sua resposta: “${state.answers.servico}”` }
      ];
      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Processando suas respostas…</h1>
          <div class="qz-anel-wrap">
            <svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="${r}" fill="none" stroke="#E2DDD2" stroke-width="12"/>
              <circle id="qz-anel-arco" cx="70" cy="70" r="${r}" fill="none" stroke="#FFC21A" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}"/>
            </svg>
            <div id="qz-anel-pct" class="qz-anel-pct">0%</div>
          </div>
          <ul class="qz-an">
            ${items.map((it, i) => `
              <li data-idx="${i}">
                <span class="qz-an-ico"></span>
                <div class="qz-an-txt"><b>${it.t}</b><span>${it.s}</span></div>
              </li>
            `).join('')}
          </ul>
        </section>
      `;
      palco.innerHTML = html;

      const arco = document.getElementById('qz-anel-arco');
      const pctEl = document.getElementById('qz-anel-pct');
      const lis = palco.querySelectorAll('.qz-an li');
      let pct = 0;

      const iv = setInterval(() => {
        pct = Math.min(100, pct + 2);
        pctEl.textContent = `${pct}%`;
        arco.style.strokeDashoffset = String(c - (c * pct) / 100);

        const doneCount = Math.floor((pct / 100) * items.length);
        lis.forEach((li, i) => {
          const ico = li.querySelector('.qz-an-ico');
          if (i < doneCount) {
            li.classList.remove('vez');
            li.classList.add('ok');
            ico.textContent = '✓';
          } else if (i === doneCount && pct < 100) {
            li.classList.add('vez');
            li.classList.remove('ok');
          }
        });

        if (pct >= 100) {
          clearInterval(iv);
          const t = setTimeout(() => goTo(14), 450);
          timers.push(t);
        }
      }, 55);
      timers.push(iv);
      return;
    }

    if (step === 14) {
      setProgress(93, true, false);
      const uf = state.answers.estado;
      const totMin = uf.min * 25;
      const totJusto = uf.justo * 25;
      const dif = totJusto - totMin;

      html = `
        <section class="qz-tela entra">
          <div class="qz-selo-wrap"><span class="qz-selo">SEU RESULTADO</span></div>
          <h1 class="qz-h1">Seus orçamentos estão <span class="vm">deixando lucro pra trás</span></h1>
          <div class="qz-gauge">
            <svg class="qz-gauge-svg" viewBox="0 0 200 115" aria-hidden="true">
              <path d="M 22 100 A 78 78 0 0 1 61 32" fill="none" stroke="#22A447" stroke-width="18" stroke-linecap="round"/>
              <path d="M 67 29 A 78 78 0 0 1 133 29" fill="none" stroke="#F2B632" stroke-width="18"/>
              <path d="M 139 32 A 78 78 0 0 1 178 100" fill="none" stroke="#D93A2B" stroke-width="18" stroke-linecap="round"/>
              <g id="qz-ponteiro" class="qz-ponteiro">
                <line x1="100" y1="100" x2="100" y2="30" stroke="#1E2328" stroke-width="5" stroke-linecap="round"/>
                <circle cx="100" cy="100" r="9" fill="#1E2328"/>
              </g>
            </svg>
            <div class="qz-gauge-rot">CHANCE DE PREJUÍZO</div>
            <div class="qz-gauge-val">ALTA</div>
            <div class="qz-gauge-pill"><b>⏱ ${state.answers.tempoOrcamento} em cada orçamento</b>conforme o que você marcou</div>
          </div>

          <p class="qz-rot-sec">PONTOS DE ATENÇÃO:</p>
          <div class="qz-achados">
            <div class="qz-achado"><span class="qz-achado-ico">🧠</span><div><b>Cálculo no olho</b><span>Material e horas trabalhadas acabam ficando de fora.</span></div></div>
            <div class="qz-achado"><span class="qz-achado-ico">🔁</span><div><b>Baseado no serviço anterior</b><span>Você acaba repetindo a cobrança errada da obra passada.</span></div></div>
            <div class="qz-achado"><span class="qz-achado-ico">💸</span><div><b>Pedido de desconto</b><span>Quando falta detalhe no papel, o cliente aperta no preço.</span></div></div>
          </div>

          <div class="qz-preco">
            <p class="qz-preco-tit">Em <span>${uf.nome}</span>, levantar parede custa:</p>
            <div class="qz-fxs">
              <div class="qz-fx">
                <div class="qz-fx-rot">MÍNIMO</div>
                <div class="qz-fx-val">R$ ${uf.min}</div>
                <div class="qz-fx-sub">por m²<br>valor de base</div>
              </div>
              <div class="qz-fx justo">
                <div class="qz-fx-rot">JUSTO</div>
                <div class="qz-fx-val">R$ ${uf.justo}</div>
                <div class="qz-fx-sub">por m²<br>valor ideal</div>
              </div>
              <div class="qz-fx">
                <div class="qz-fx-rot">PREMIUM</div>
                <div class="qz-fx-val">R$ ${uf.prem}</div>
                <div class="qz-fx-sub">por m²<br>acabamento fino</div>
              </div>
            </div>
            <div class="qz-conta">
              <div class="qz-conta-tit">Em um serviço de 25 m²:</div>
              <div class="qz-conta-row"><span>Pedindo o mínimo</span><b>R$ ${fmtMoney(totMin)}</b></div>
              <div class="qz-conta-row justo"><span>Pedindo o justo</span><b>R$ ${fmtMoney(totJusto)}</b></div>
              <div class="qz-conta-dif">💰 + R$ ${fmtMoney(dif)} a mais pra você</div>
            </div>
          </div>

          <div class="qz-jeito">
            <p class="qz-jeito-tit">👍 A solução é simples</p>
            <p class="qz-jeito-txt" style="margin-bottom:0">O Orçaí calcula tudo pra você. Basta falar o serviço: em 40 segundos o orçamento fica pronto, já com o valor da sua cidade.</p>
          </div>
          <button type="button" id="qz-next-14" class="qz-cta pulsa">VER COMO FUNCIONA</button>
        </section>
      `;
      palco.innerHTML = html;
      const t = setTimeout(() => {
        const ptr = document.getElementById('qz-ponteiro');
        if (ptr) ptr.classList.add('alto');
      }, 150);
      timers.push(t);
      document.getElementById('qz-next-14').addEventListener('click', () => goTo(15));
      return;
    }

    if (step === 15) {
      setProgress(100, true, true);
      const uf = state.answers.estado;
      const pMin = uf.min;
      const pJusto = uf.justo;
      const pPrem = uf.prem;
      const totParede = pJusto * 25;

      html = `
        <section class="qz-tela entra">
          <h1 class="qz-h1">Olha como é simples usar o <span class="az">Orçaí</span></h1>

          <div class="qz-passos">
            <article class="qz-p">
              <div class="qz-p-head">
                <span class="qz-p-num">1</span>
                <div><div class="qz-p-eye">PASSO 1 DE 4</div><div class="qz-p-tit">Escolha o serviço e a medida</div></div>
              </div>
              <p class="qz-p-desc">Seleciona o trabalho, informa a metragem e o aplicativo já calcula os valores.</p>
              <div class="cel mini" data-tipo="falar">
                <div class="cel-tela">
                  <img src="/img/app/2-servicos-medida.webp" alt="Etapa de escolher os serviços com medida preenchida" style="width:100%;height:auto;display:block;" />
                </div>
              </div>
            </article>

            <article class="qz-p">
              <div class="qz-p-head">
                <span class="qz-p-num">2</span>
                <div><div class="qz-p-eye">PASSO 2 DE 4</div><div class="qz-p-tit">O app soma tudo, até o material</div></div>
              </div>
              <p class="qz-p-desc">Mão de obra, blocos, sacos e margem de perda. Você revisa antes de fechar.</p>
              <div class="cel mini" data-tipo="calcula">
                <div class="cel-tela">
                  <img src="/img/app/4-material.webp" alt="Etapa do material no Orçaí" style="width:100%;height:auto;display:block;" />
                </div>
              </div>
            </article>

            <article class="qz-p">
              <div class="qz-p-head">
                <span class="qz-p-num">3</span>
                <div><div class="qz-p-eye">PASSO 3 DE 4</div><div class="qz-p-tit">Você define quanto vai pedir</div></div>
              </div>
              <p class="qz-p-desc">Mínimo, justo ou premium de ${uf.nome}.</p>
              <div class="cel mini">
                <div class="cel-tela">
                  <img src="/img/app/3-preco-justo.webp" alt="Etapa de escolher o preço mínimo, justo e premium" style="width:100%;height:auto;display:block;" />
                </div>
              </div>
            </article>

            <article class="qz-p">
              <div class="qz-p-head">
                <span class="qz-p-num">4</span>
                <div><div class="qz-p-eye">PASSO 4 DE 4</div><div class="qz-p-tit">Envia o PDF direto no WhatsApp</div></div>
              </div>
              <p class="qz-p-desc">Já vai com seu nome e telefone. O cliente aprova rápido.</p>
              ${renderWhatsAppMockup(true)}
            </article>
          </div>

          <p class="qz-unico">Você paga só uma vez. Sem mensalidade: libera hoje e usa pra sempre.</p>
          <button type="button" id="qz-ir" class="qz-cta pulsa">QUERO USAR O APP →</button>
        </section>
      `;
      palco.innerHTML = html;
      document.getElementById('qz-ir').addEventListener('click', () => {
        window.location.href = '/oferta';
      });
    }
  }

  function goTo(step) {
    state.step = step;
    renderScreen(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnVoltar.addEventListener('click', () => {
    if (state.step > 1) {
      const prev = state.step === 15 ? 12 : state.step - 1;
      goTo(prev);
    }
  });

  renderScreen(1);
})();
