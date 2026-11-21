(() => {
  function initCarousel(trackId, dotsId, total, autoMs = 0) {
    const track = document.getElementById(trackId);
    const dotsWrap = document.getElementById(dotsId);
    if (!track || !dotsWrap) return;

    const dots = [];
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dot ${i === 0 ? 'ativo' : ''}`;
      btn.setAttribute('aria-label', `Ver item ${i + 1} de ${total}`);
      btn.addEventListener('click', () => {
        const w = track.clientWidth;
        track.scrollTo({ left: w * i, behavior: 'smooth' });
        setActive(i);
        stopAuto();
      });
      dotsWrap.appendChild(btn);
      dots.push(btn);
    }

    function setActive(idx) {
      dots.forEach((d, i) => d.classList.toggle('ativo', i === idx));
    }

    track.addEventListener('scroll', () => {
      const w = track.clientWidth || 1;
      const idx = Math.round(track.scrollLeft / w);
      setActive(Math.max(0, Math.min(total - 1, idx)));
    });

    let iv = null;
    let current = 0;
    function stopAuto() {
      if (iv) {
        clearInterval(iv);
        iv = null;
      }
    }

    if (autoMs > 0) {
      iv = setInterval(() => {
        current = (current + 1) % total;
        track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
        setActive(current);
      }, autoMs);
      track.addEventListener('touchstart', stopAuto, { passive: true });
      track.addEventListener('mousedown', stopAuto);
    }
  }

  // 1. 9-item testimonials carousel
  initCarousel('pvr-trilha', 'pvr-dots', 9, 5000);

  // 2. Spoken budget phone mockup animation (#fal)
  const fal = document.getElementById('fal');
  const falTempo = document.getElementById('fal-tempo');
  if (fal && falTempo) {
    let sec = 0;
    setInterval(() => {
      sec = (sec + 1) % 7;
      if (sec >= 4) {
        fal.classList.add('pronto');
        falTempo.textContent = '0:40';
      } else {
        fal.classList.remove('pronto');
        falTempo.textContent = `0:0${sec + 1}`;
      }
    }, 1000);
  }

  // 5. 2x2 Selos highlight cycle
  const selos = document.querySelectorAll('#selos .selo-card');
  if (selos.length) {
    let sIdx = 0;
    setInterval(() => {
      sIdx = (sIdx + 1) % selos.length;
      selos.forEach((el, i) => el.classList.toggle('ativo', i === sIdx));
    }, 2000);
  }

  // 6. 6 PDF examples carousel
  initCarousel('pdf-trilha', 'pdf-dots', 6, 0);

  // 11. 8 WhatsApp screenshots carousel
  initCarousel('dep-trilha', 'dep-dots', 8, 0);

  // 9. Live Service Search (100+ services)
  const SERVICOS = [
    ['Levantar parede alvenaria de bloco', 'm²'],
    ['Levantar parede de bloco de concreto', 'm²'],
    ['Levantar parede de tijolo à vista maciço aparente', 'm²'],
    ['Assentar cobogó elemento vazado', 'm²'],
    ['Cinta de amarração cinturão', 'metro'],
    ['Levantar parede de tijolo baiano 8 furos', 'm²'],
    ['Levantar parede de drywall / gesso acartonado', 'm²'],
    ['Fechamento de vão em alvenaria', 'm²'],
    ['Muro de divisa com pilaretes', 'm²'],
    ['Muro de arrimo em bloco estrutural', 'm²'],
    ['Quebra de parede / demolição de alvenaria', 'm²'],
    ['Chapisco de parede', 'm²'],
    ['Emboço de parede', 'm²'],
    ['Reboco de parede', 'm²'],
    ['Reboco de teto / laje', 'm²'],
    ['Reboco externo em andaime', 'm²'],
    ['Reboco de muro', 'm²'],
    ['Reboco com massa pronta', 'm²'],
    ['Requadro de porta e janela', 'unidade'],
    ['Contrapiso comum', 'm²'],
    ['Contrapiso autonivelante', 'm²'],
    ['Regularização de piso', 'm²'],
    ['Piso cerâmico', 'm²'],
    ['Porcelanato 60x60', 'm²'],
    ['Porcelanato grande formato', 'm²'],
    ['Piso vinílico clicado', 'm²'],
    ['Piso laminado', 'm²'],
    ['Rodapé cerâmico ou porcelanato', 'metro'],
    ['Azulejo na parede', 'm²'],
    ['Pastilha de vidro ou porcelana', 'm²'],
    ['Revestimento 3D na parede', 'm²'],
    ['Soleira de granito ou mármore', 'unidade'],
    ['Peitoril de janela', 'unidade'],
    ['Bancada de cozinha em alvenaria', 'metro'],
    ['Nicho de banheiro embutido', 'unidade'],
    ['Box de banheiro com mureta', 'unidade'],
    ['Impermeabilização de banheiro / área molhada', 'm²'],
    ['Impermeabilização de laje com manta asfáltica', 'm²'],
    ['Forro de gesso liso (plaquinha)', 'm²'],
    ['Forro de drywall tabicado', 'm²'],
    ['Forro de PVC', 'm²'],
    ['Forro de madeira / lambri', 'm²'],
    ['Sanca de gesso aberta ou fechada', 'metro'],
    ['Cortineiro de gesso', 'metro'],
    ['Moldura de gesso', 'metro'],
    ['Calçada de concreto desempenado', 'm²'],
    ['Piso intertravado (paver)', 'm²'],
    ['Pedra portuguesa / miracema', 'm²'],
    ['Rampa de garagem em concreto frisado', 'm²'],
    ['Sapata isolada (escavação, ferragem e concreto)', 'unidade'],
    ['Viga baldrame', 'metro'],
    ['Pilar de concreto armado', 'metro'],
    ['Viga aérea de concreto', 'metro'],
    ['Laje pré-moldada treliçada', 'm²'],
    ['Escada de concreto armado', 'degrau'],
    ['Telhado colonial com estrutura de madeira', 'm²'],
    ['Telhado com telha sanduíche', 'm²'],
    ['Telhado de fibrocimento', 'm²'],
    ['Troca de telhas e manutenção', 'm²'],
    ['Instalação de calha e rufo', 'metro'],
    ['Assentamento de porta de madeira com batente', 'unidade'],
    ['Assentamento de janela / vitro', 'unidade'],
    ['Instalação de portão basculante', 'unidade'],
    ['Instalação de pia e torneira', 'unidade'],
    ['Instalação de vaso sanitário com caixa acoplada', 'unidade'],
    ['Instalação de chuveiro elétrico', 'unidade'],
    ['Ponto hidráulico de água fria', 'ponto'],
    ['Ponto de esgoto 100mm / 50mm', 'ponto'],
    ['Caixa de gordura em alvenaria', 'unidade'],
    ['Caixa d’água (instalação completa)', 'unidade'],
    ['Ponto elétrico (tomada / interruptor)', 'ponto'],
    ['Instalação de quadro de distribuição', 'unidade'],
    ['Passagem de fiação elétrica', 'metro'],
    ['Pintura látex PVA em parede (2 demãos)', 'm²'],
    ['Pintura acrílica interna / externa', 'm²'],
    ['Massa corrida PVA / acrílica', 'm²'],
    ['Textura / grafiato', 'm²'],
    ['Pintura de portão / grade em esmalte', 'm²'],
    ['Diária de pedreiro', 'diária'],
    ['Diária de ajudante / servente', 'diária'],
    ['Pequenos reparos / marido de aluguel', 'serviço'],
    ['Limpeza pós-obra', 'm²'],
    ['Assentamento de bloco estrutural', 'm²'],
    ['Verga e contraverga em janela', 'unidade'],
    ['Chumbamento de caixa de luz', 'unidade'],
    ['Instalação de ralo linear', 'unidade'],
    ['Piscina de alvenaria (estrutura)', 'm²'],
    ['Churrasqueira de alvenaria pré-moldada', 'unidade'],
    ['Fogão a lenha em alvenaria', 'unidade'],
    ['Deck de madeira / porcelanato amadeirado', 'm²'],
    ['Muro pré-moldado de concreto', 'm²'],
    ['Retirada de entulho / ensacamento', 'diária'],
    ['Rejuntamento epóxi', 'm²'],
    ['Troca de cerâmica solta', 'm²'],
    ['Nivelamento de terreno manual', 'm²'],
    ['Aterro e compactação manual', 'm²'],
    ['Fossa séptica em alvenaria', 'unidade'],
    ['Sumidouro', 'unidade'],
    ['Base para caixa d’água em alvenaria', 'unidade'],
    ['Mureta para padrão de energia', 'unidade'],
    ['Pintura epóxi em piso', 'm²']
  ];

  const input = document.getElementById('srv-input');
  const limpar = document.getElementById('srv-limpar');
  const status = document.getElementById('srv-status');
  const lista = document.getElementById('srv-lista');
  const mais = document.getElementById('srv-mais');
  const chips = document.querySelectorAll('.srv-chip');

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function renderSearch(query) {
    const q = normalize(query.trim());
    limpar.style.display = q ? 'block' : 'none';
    chips.forEach((c) => c.classList.toggle('ativo', normalize(c.dataset.q) === q));

    const filtered = q
      ? SERVICOS.filter(([nome]) => normalize(nome).includes(q))
      : SERVICOS;

    status.textContent = q
      ? `TEM NO APP · ${filtered.length} ${filtered.length === 1 ? 'serviço' : 'serviços'}`
      : `NO APP · ${SERVICOS.length} serviços prontos`;

    const slice = filtered.slice(0, 5);
    lista.innerHTML = slice.length
      ? slice.map(([n, u]) => `<li><b>${n}</b><span>${u}</span></li>`).join('')
      : '<li><span>Nenhum serviço encontrado com esse termo, mas você cria no app!</span></li>';

    const rest = filtered.length - slice.length;
    mais.textContent = rest > 0 ? `+ ${rest} outros. Continue digitando pra achar o seu.` : '';
  }

  if (input) {
    input.addEventListener('input', () => renderSearch(input.value));
    limpar.addEventListener('click', () => {
      input.value = '';
      renderSearch('');
      input.focus();
    });
    chips.forEach((c) => {
      c.addEventListener('click', () => {
        input.value = c.dataset.q;
        renderSearch(c.dataset.q);
      });
    });
    renderSearch('parede');
  }
})();
