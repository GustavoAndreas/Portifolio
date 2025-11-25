import { useEffect, useMemo, useState } from 'react';
import './App.css';

// CDN map for technology logos (loaded at runtime)
const ICONS = {
  html: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML' },
  css: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS' },
  javascript: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
  react: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  git: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
  figma: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' },
  illustrator: { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg', alt: 'Illustrator' },
  photoshop: { src: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', alt: 'Photoshop' },
  canva: { src: 'https://cdn.simpleicons.org/canva', alt: 'Canva' },
  capcut: { src: 'https://cdn.simpleicons.org/capcut', alt: 'CapCut' },
  firebase: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', alt: 'Firebase' },
  python: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
  pytorch: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', alt: 'PyTorch' },
  opencv: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', alt: 'OpenCV' },
  mediapipe: { src: 'https://cdn.simpleicons.org/mediapipe', alt: 'MediaPipe' },
  rest: { src: 'https://cdn.simpleicons.org/postman', alt: 'REST' },
  data: { src: 'https://cdn.simpleicons.org/plotly', alt: 'Data Viz' },
  map: { src: 'https://cdn.simpleicons.org/googlemaps', alt: 'Logística' },
  googlemeet: { src: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg', alt: 'Google Meet' },
  jira: { src: 'https://cdn.simpleicons.org/jira/0052cc', alt: 'Jira' },
  miro: { src: 'https://cdn.simpleicons.org/miro/ffd02f', alt: 'Miro' },
  clockify: { src: 'https://cdn.simpleicons.org/clockify', alt: 'Clockify' },
  googlesheets: { src: 'https://cdn.simpleicons.org/googlesheets', alt: 'Google Sheets' },
  whatsapp: { src: 'https://cdn.simpleicons.org/whatsapp', alt: 'Comunicação' },
  trello: { src: 'https://cdn.simpleicons.org/trello', alt: 'Trello' },
  instagram: { src: 'https://cdn.simpleicons.org/instagram/E4405F', alt: 'Instagram' },
  notion: { src: 'https://cdn.simpleicons.org/notion/ffffff', alt: 'Notion' },
  vscode: { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', alt: 'VS Code' },
};

const aboutImage = '/images/about/main-1.jpg';

const NAV_ITEMS = [
  { id: 'about', label: 'Sobre' },
  { id: 'experience', label: 'Experiência' },
  { id: 'projects', label: 'Projetos' },
  { id: 'courses', label: 'Formação' },
  { id: 'interests', label: 'Cursos' },
  { id: 'languages', label: 'Idiomas' },
  { id: 'volunteering', label: 'Voluntariados' },
  { id: 'contact', label: 'Contatos' },
];

const experiences = [
  {
    role: 'Beets Jr - Empresa Júnior de Computação (UFSCar)',
    period: '2025 - atual',
    summary:
      'Desenvolvimento web, dashboards e integrações para clientes reais, aplicando metodologias ágeis e foco em UX.',
    tags: [],
    icons: ['html', 'css', 'javascript', 'react', 'git', 'figma', 'firebase', 'googlemeet', 'jira', 'miro', 'clockify', 'instagram', 'canva', 'notion'],
    media: [
      '/images/experience/beets-4.jpg',
      '/images/experience/beets-1.jpg',
      '/images/experience/beets-2.jpg',
      '/images/experience/beets-3.jpg',
    ],
    facts: [
      'Dashboards para clientes reais, com feedbacks rápidos e iteração constante.',
      'Integrei Google Sheets, Firebase e React para agilizar entregas.',
      'Facilitação remota com Meet, Miro e Jira para times.',
    ],
  },
  {
    role: 'Dominum Wear - Fundador',
    period: '2023 - atual',
    summary:
      'Gestão de produto e operação de uma marca autoral de roupas. Marketing, atendimento ao cliente e controle de produção.',
    tags: [],
    icons: ['googlesheets', 'whatsapp', 'instagram', 'photoshop', 'illustrator', 'canva'],
    media: [
      '/images/experience/dominum-1.jpg',
      '/images/experience/dominum-2.jpg',
      '/images/experience/dominum-3.jpg',
      '/images/experience/dominum-4.jpg',
    ],
    facts: [
      'Experiência completa: produto, marketing e suporte ao cliente.',
      'Uso planilhas para operação e estoque; criação visual em Adobe/Canva.',
      'Atendimento ativo em Instagram e WhatsApp.',
    ],
  },
  {
    role: 'Imaculada Tour - Fundador',
    period: '2022 - atual',
    summary:
      'Organização de caravanas religiosas, comunicação com clientes, logística e acompanhamento de grupos.',
    tags: [],
    icons: ['googlesheets', 'whatsapp', 'instagram', 'photoshop', 'illustrator', 'canva'],
    media: [
      '/images/experience/imaculada-1.jpg',
      '/images/experience/imaculada-2.jpg',
      '/images/experience/imaculada-3.jpg',
      '/images/experience/imaculada-4.jpg',
    ],
    facts: [
      'Coordeno caravanas, comunicação e pagamentos com equipes remotas.',
      'Crio materiais visuais e formulários para captação e organização.',
      'Monitoro listas e confirmações em planilhas compartilhadas.',
    ],
  },
  {
    role: 'SeCoT - Organização (Semana da Computação, UFSCar)',
    period: '2025 - atual',
    summary:
      'Planejamento, design e divulgação de evento de computação. Recepção de palestrantes e resolução de problemas em tempo real.',
    tags: [],
    icons: ['trello', 'html', 'css', 'javascript', 'figma', 'instagram', 'notion'],
    media: [
      '/images/experience/secot-1.jpg',
      '/images/experience/secot-2.jpg',
      '/images/experience/secot-3.jpg',
      '/images/experience/secot-4.jpg',
    ],
    facts: [
      'Organização e recepção de palestrantes em evento acadêmico.',
      'Materiais visuais e site rápido em HTML/CSS/JS.',
      'Divulgação em redes e acompanhamento com trello.',
    ],
  },
];

const projects = [
  {
    title: 'Sistema de Estoques Beets Jr - BeetStock',
    year: '2025',
    description:
      'Dashboard de estoques para a Beets Jr, com autenticação, gráficos e integrações simples para romaneios e produtos.',
    tags: [],
    icons: ['react', 'firebase', 'figma', 'git', 'jira', 'clockify', 'googlemeet', 'vscode'],
    media: [
      '/images/projects/estoque-1.jpg',
      '/images/projects/estoque-2.jpg'
    ],
    facts: [
      'Painéis de estoque e romaneio com autenticação.',
      'Integração via Firebase e endpoints REST simples.',
      'Protótipo validado com equipe da Beets Jr.',
    ],
  },
  {
    title: 'Sistema de Romaneios - Chopp 5Beer',
    year: '2025',
    description:
      'Automatiza lançamentos e gera alertas de abastecimento para pequenos negócios, com painéis e notificações.',
    tags: [],
    icons: ['react', 'firebase', 'figma'],
    media: [
      '/images/projects/beer-1.jpg',
      '/images/projects/beer-2.jpg',
    ],
    facts: [
      'Alertas de abastecimento a partir de romaneios.',
      'Painéis de acompanhamento para operações.',
      'Integração simples com APIs e Firebase.',
    ],
  },
  {
    title: 'Prototipação do site da Estat Jr',
    year: '2025',
    description:
      'Protótipo do novo site da Estat Jr em parceria: Beets Jr prototipou, Estat Jr solicitou e Atria HR implementará.',
    tags: [],
    icons: ['figma', 'clockify', 'notion', 'googlemeet'],
    media: [
      '/images/projects/estat-1.jpg',
      '/images/projects/estat-2.jpg',
    ],
    facts: [
      'Workshops rápidos com Estat Jr para captar requisitos.',
      'Prototipação colaborativa no Figma com sprints curtos.',
      'Handover alinhado com Atria HR para implementação.',
    ],
  },
  {
    title: 'Sistema de Estoque Dominum (em fase de prototipação)',
    year: 'Em prototipação',
    description:
      'Sistema de estoque para a marca Dominum, focado em controle de itens, lançamentos e alertas de reposição.',
    tags: [],
    icons: ['react', 'html', 'rest', 'firebase', 'figma'],
    media: [
      '/images/projects/dominum-1.jpg',    
    ],
    facts: [
      'Prototipação inicial focada em estoque e alertas.',
      'Integração planejada com APIs simples e Firebase.',
      'Painéis para visibilidade rápida de entradas e saídas.',
    ],
  },
];

const inProgress = [];

const courses = [
  {
    title: 'Bacharelado em Ciência da Computação',
    place: 'UFSCar',
    period: '2024 - atual',
    detail: 'Base sólida em algoritmos, estruturas de dados, IA e engenharia de software.',
  },
  {
    title: 'Técnico em Mecatrônica',
    place: 'Formação técnica',
    period: 'Concluído',
    detail: 'Automação, circuitos, lógica aplicada e integração hardware/software.',
  },
];

const complementary = [
  {
    title: 'Conceitos da Tecnologia 5G',
    provider: 'Instituto de Pesquisa FACENS',
    contents: ['Arquitetura e espectro 5G', 'Latência e aplicações', 'Rede sem fio e casos de uso'],
    certificate: null,
  },
  {
    title: 'Introdução à Ciência da Computação com Python',
    provider: 'Coursera',
    contents: ['Lógica e algoritmos', 'Python básico', 'Estruturas de dados e funções'],
    certificate: null,
  },
  {
    title: 'Programação Orientada a Objetos (POO)',
    provider: 'Fundação Bradesco',
    contents: ['Classes e objetos', 'Encapsulamento', 'Herança e polimorfismo'],
    certificate: null,
  },
  {
    title: 'Cursando Desenvolvimento Web Completo - 20 cursos + 20 projetos',
    provider: 'Udemy',
    contents: ['HTML, CSS, JS', 'Frameworks e projetos práticos', 'Deploy e boas práticas'],
    certificate: null,
  },
  {
    title: 'Cursando Visão Computacional: O Guia Completo',
    provider: 'Udemy',
    contents: ['OpenCV aplicado', 'Pré-processamento de imagens', 'Detecção e reconhecimento'],
    certificate: null,
  },
  {
    title: 'Cursando C# Completo - Programação Orientada a Objetos + Projetos',
    provider: 'Udemy',
    contents: ['Sintaxe C#', 'POO aplicada', 'Projetos práticos em C#'],
    certificate: null,
  },
];

const languages = [
  {
    title: 'Inglês',
    level: 'Intermediário (B2 – Cambridge Placement Test, indicação para C1 Advanced)',
    detail: 'Autodidata; estudos contínuos com materiais online e prática diária.',
  },
  {
    title: 'Espanhol',
    level: 'Básico',
    detail: '1,5 anos no Centro de Estudo de Línguas (CEL) Estadão.',
  },
];

const interests = [
  'Produto e UX',
  'Suporte técnico e atendimento',
  'IA e visão computacional',
  'Automação e sistemas embarcados',
  'Eventos e educação em tecnologia',
];

const volunteering = [
  {
    title: 'Acólito - Santuário São Judas Tadeu',
    period: '2023 - atual',
    summary: 'Apoio litúrgico e organização das celebrações no santuário.',
    media: [
      '/images/volunteering/acolito-1.jpg',
      '/images/volunteering/acolito-2.jpg',
    ],
    icons: [],
  },
  {
    title: 'Grupo Jovem Chamas do Altíssimo - Líder do ministério de Organização e Suporte',
    period: '2023 - atual',
    summary: 'Organização de eventos e suporte operacional em atividades do grupo jovem.',
    media: [
      '/images/volunteering/chamas-1.jpg',
      '/images/volunteering/chamas-2.jpg',
    ],
    icons: [],
  },
  {
    title: 'Confraria Caminho da Imaculada - Líder de Comunicação',
    period: '2021 - atual',
    summary: 'Organização de eventos e apoio à capelania em encontros e redes sociais.',
    media: [
      '/images/volunteering/confraria-1.jpg',
      '/images/volunteering/confraria-2.jpg',
    ],
    icons: [],
  },
];

function MediaCarousel({ items = [], altPrefix, size = 'md' }) {
  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasItems = items && items.length > 0;
  const current = hasItems ? items[index % items.length] : null;
  const showControls = hasItems && items.length > 1;

  const handlePrev = () => {
    if (!hasItems) return;
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (!hasItems) return;
    setIndex((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    setIndex(0);
    setErrored(false);
    setLightboxOpen(false);
  }, [items, items?.length]);

  useEffect(() => {
    setErrored(false);
  }, [index]);

  useEffect(() => {
    function onKey(e) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, items]);

  return (
    <>
      <div className={'media-frame media-' + size}>
        {hasItems && current && !errored ? (
          <>
            <img
              src={current}
              alt={altPrefix ? `${altPrefix} ${index + 1}` : 'Imagem'}
              className="media-img"
              loading="lazy"
              onError={() => setErrored(true)}
              onClick={() => setLightboxOpen(true)}
            />
            {showControls && (
              <div className="media-controls" role="group" aria-label={`Imagens de ${altPrefix || 'item'}`}>
                <button className="media-btn" onClick={handlePrev} aria-label="Imagem anterior">
                  ‹
                </button>
                <button className="media-btn" onClick={handleNext} aria-label="Próxima imagem">
                  ›
                </button>
              </div>
            )}
            {showControls && (
              <div className="media-dots" aria-hidden="true">
                {items.map((_, dotIdx) => (
                  <span key={dotIdx} className={'media-dot' + (dotIdx === index ? ' active' : '')} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="media-placeholder" aria-hidden="true" />
        )}
      </div>

      {lightboxOpen && hasItems && current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Visualizando ${altPrefix || 'imagem'}`}>
          <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)} />
          <div className="lightbox-inner">
            <img
              src={current}
              alt={altPrefix ? `${altPrefix} ${index + 1}` : 'Imagem ampliada'}
              className="lightbox-img"
              loading="lazy"
            />
            <button className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Fechar imagem">
              ×
            </button>
            {showControls && (
              <div className="lightbox-nav" role="group" aria-label="Navegação de imagens">
                <button className="media-btn" onClick={handlePrev} aria-label="Imagem anterior">
                  ‹
                </button>
                <button className="media-btn" onClick={handleNext} aria-label="Próxima imagem">
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.54 2 12.09c0 4.46 2.87 8.24 6.84 9.58.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.89 1.54 2.34 1.1 2.9.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.13-4.56-5 0-1.1.39-2 .1-2.7 0 0 .83-.27 2.74 1.02A9.38 9.38 0 0 1 12 7.5c.84 0 1.68.12 2.47.34 1.9-1.29 2.73-1.02 2.73-1.02.55 1.35.2 2.35.1 2.7 0 3.88-2.34 4.73-4.57 4.98.36.31.68.92.68 1.86 0 1.35-.01 2.44-.01 2.77 0 .27.18.58.69.48A10.1 10.1 0 0 0 22 12.09C22 6.54 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TechIcons({ items }) {
  if (!items || items.length === 0) return null;
  const bgIcons = new Set(['jira']);
  return (
    <div className="icon-row">
      {items.map((key) => {
        const icon = ICONS[key];
        if (!icon) return null;
        const needsBg = bgIcons.has(key);
        return (
          <span className="tech-icon-pill" key={key} title={icon.alt}>
            <img
              src={icon.src}
              alt={icon.alt}
              className={'tech-icon' + (needsBg ? ' tech-icon-bg' : '')}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="sr-only">{icon.alt}</span>
          </span>
        );
      })}
    </div>
  );
}

function FactCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return <div className="placeholder" aria-hidden="true" />;

  return (
    <div className="fact-carousel">
      <p className="fact-text">{items[index]}</p>
      <div className="fact-dots" role="tablist" aria-label="Fatos">
        {items.map((_, dotIdx) => (
          <button
            key={dotIdx}
            className={'fact-dot' + (dotIdx === index ? ' active' : '')}
            onClick={() => setIndex(dotIdx)}
            aria-label={`Ir para fato ${dotIdx + 1}`}
            aria-pressed={dotIdx === index}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    function onScroll() {
      const scrollPos = window.scrollY + 140;
      let current = activeTab;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollPos >= top) current = id;
      }

      if (current !== activeTab) {
        setActiveTab(current);
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeTab, sectionIds]);

  function handleNavClick(id) {
    setActiveTab(id);
    setMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="app">
      <div className="stars" />

      <header className="topbar">
        <div className="brand">Gustavo Andreas</div>

        <button
          className="icon-button menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="menu-lines" aria-hidden />
        </button>

        <nav className="nav-links desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={'nav-link' + (activeTab === item.id ? ' nav-link-active' : '')}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <nav className="nav-links mobile-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={'nav-link' + (activeTab === item.id ? ' nav-link-active' : '')}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <main className="main">
        <section id="hero" className="hero-section">
          <div className="hero-inner">
            <h1 className="hero-name">
              <span className="gradient-text">Gustavo Andreas</span>
            </h1>
            <p className="hero-subtitle">
              Estudante de Ciência da Computação que transforma problemas reais em soluções funcionais, unindo base técnica, prototipação e cuidado com a experiência do usuário.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="primary-btn">
                Contact Me
              </a>
              <a
                href="https://github.com/GustavoAndreas"
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
              >
                <GithubIcon />
              </a>
              <a href="#projects" className="secondary-btn">
                Ver projetos
              </a>
            </div>
            <div className="status-pill">Currently | Computer Science @ UFSCar</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <h2 className="section-title">Sobre mim</h2>
          </div>
          <div className="two-col">
            <div className="text-block">
              <p>
                Sou Gustavo Andreas, estudante de Ciência da Computação. Trabalho criando soluções que conectam base técnica, prototipação e experiência do usuário para transformar necessidades reais em processos e produtos funcionais, claros e confiáveis.
              </p>
            </div>
            <div className="media-frame media-lg">
              <img src={aboutImage} alt="Sobre mim" className="media-img" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-header">
            <h2 className="section-title">Experiência</h2>
          </div>
          <div className="experience-list">
            {experiences.map((job, idx) => (
              <div key={job.role} className={'item-row' + (idx % 2 ? ' reverse' : '')}>
                <MediaCarousel items={job.media} altPrefix={job.role} size="lg" />
                <div className="item-content">
                  <h3>
                    {job.role} <span className="item-period">{job.period}</span>
                  </h3>
                  <p className="item-text">{job.summary}</p>
                  <TechIcons items={job.icons} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-header">
            <h2 className="section-title">Projetos</h2>
            <p className="section-kicker">IA, visão computacional e web</p>
          </div>
          <div className="projects-list">
            {projects.map((project, idx) => (
              <div key={project.title} className={'item-row' + (idx % 2 ? ' reverse' : '')}>
                <MediaCarousel items={project.media} altPrefix={project.title} />
                <div className="item-content">
                  <h3>
                    {project.title} <span className="item-period">{project.year}</span>
                  </h3>
                  <p className="item-text">{project.description}</p>
                  <TechIcons items={project.icons} />
                  <div className="link-placeholder">Espaço para link</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {inProgress.length > 0 && (
          <section id="in-progress" className="section">
            <div className="section-header">
              <h2 className="section-title">Em andamento</h2>
              <p className="section-kicker">Projetos evoluindo</p>
            </div>
            <div className="projects-list">
              {inProgress.map((item, idx) => (
                <div key={item.title} className={'item-row' + (idx % 2 ? ' reverse' : '')}>
                  <MediaCarousel items={item.media} altPrefix={item.title} />
                  <div className="item-content">
                    <h3>
                      {item.title} <span className="item-period">Em andamento</span>
                    </h3>
                    <p className="item-text">{item.focus}</p>
                    <TechIcons items={item.icons} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="courses" className="section">
          <div className="section-header">
            <h2 className="section-title">Formação</h2>
            <p className="section-kicker">Faculdade e técnico</p>
          </div>
          <div className="courses-block">
            {courses.map((course) => (
              <div key={course.title} className="info-card">
                <p className="label">{course.place}</p>
                <p className="value">{course.title}</p>
                <p className="item-text">{course.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="interests" className="section">
          <div className="section-header">
            <h2 className="section-title">Cursos</h2>
          </div>
          <div className="courses-grid section-body">
            {complementary.map((item) => (
              <div key={item.title} className="course-card">
                <div className="course-card-head">
                  <p className="value">{item.title}</p>
                  <p className="label">{item.provider}</p>
                </div>
                <ul className="course-list">
                  {item.contents?.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                {item.certificate && (
                  <button className="cert-link" type="button" onClick={() => setCertificateUrl(item.certificate)}>
                    Ver certificado
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="languages" className="section">
          <div className="section-header">
            <h2 className="section-title">Idiomas</h2>
          </div>
          <div className="courses-grid section-body">
            {languages.map((item) => (
              <div key={item.title} className="course-card">
                <div className="course-card-head">
                  <p className="value">{item.title}</p>
                  <p className="label">{item.level}</p>
                </div>
                {item.detail && <p className="item-text">{item.detail}</p>}
              </div>
            ))}
          </div>
        </section>

        <section id="volunteering" className="section">
          <div className="section-header">
            <h2 className="section-title">Voluntariados</h2>
          </div>
          <div className="projects-list">
            {volunteering.map((item, idx) => (
              <div key={item.title} className={'item-row' + (idx % 2 ? ' reverse' : '')}>
                <MediaCarousel items={item.media} altPrefix={item.title} />
                <div className="item-content">
                  <h3>
                    {item.title} <span className="item-period">{item.period}</span>
                  </h3>
                  <p className="item-text">{item.summary}</p>
                  <TechIcons items={item.icons} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-header">
            <h2 className="section-title">Contatos</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <p className="label">Email</p>
              <a className="value link" href="mailto:gustavosantos@estudante.ufscar.br">
                gustavosantos@estudante.ufscar.br
              </a>
            </div>
            <div className="contact-card">
              <p className="label">LinkedIn</p>
              <a className="value link" href="https://www.linkedin.com/in/gustavo-andreas" target="_blank" rel="noreferrer">
                /gustavo-andreas
              </a>
            </div>
            <div className="contact-card">
              <p className="label">GitHub</p>
              <a className="value link" href="https://github.com/GustavoAndreas" target="_blank" rel="noreferrer">
                /GustavoAndreas
              </a>
            </div>
            <div className="contact-card">
              <p className="label">Telefone</p>
              <a className="value link" href="tel:+5515991424861">
                +55 (15) 99142-4861
              </a>
            </div>
          </div>
        </section>
      </main>

      {certificateUrl && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Certificado">
          <div className="lightbox-backdrop" onClick={() => setCertificateUrl(null)} />
          <div className="lightbox-inner cert-lightbox">
            <iframe src={certificateUrl} title="Certificado" className="cert-iframe" />
            <button className="lightbox-close" onClick={() => setCertificateUrl(null)} aria-label="Fechar certificado">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



