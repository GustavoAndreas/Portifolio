import { useState } from 'react';
import './App.css';


const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
];

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Fundo de estrelas */}
      <div className="stars" />

      {/* Navbar */}
      <header className="topbar">
        <button
          className="icon-button menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className="nav-links desktop-nav">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={
                'nav-link' + (activeTab === section.id ? ' nav-link-active' : '')
              }
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <button className="icon-button theme-toggle" aria-label="Theme toggle">
          ☀
        </button>
      </header>

      {/* Menu móvel */}
      {menuOpen && (
        <nav className="nav-links mobile-nav">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={
                'nav-link' + (activeTab === section.id ? ' nav-link-active' : '')
              }
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      )}

      <main className="main">

        {/* HERO / ABOUT */}
        <section id="about" className="hero-section">
          <div className="hero-inner">
            <h1 className="hero-name">
              <span className="gradient-text">Gustavo Andreas</span>
            </h1>

            <p className="hero-text">
              Passionate developer focused on turning real-world problems into simple,
              functional solutions. Student of Computer Science and Mechatronics, combining
              code, design and purpose to build useful and meaningful projects.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="primary-btn">
                Contact Me!
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
              >
                <img
                  src="/github-logo.svg"
                  alt="GitHub"
                  className="github-logo-img"
                />
              </a>

              <a
                href="#blog"
                className="secondary-btn"
              >
                My Blog Site
              </a>
            </div>
          </div>
        </section>

        {/* Outras seções só como placeholder por enquanto */}
        <section id="skills" className="section">
          <h2 className="section-title">Skills</h2>
          <p className="section-text">Em breve: lista organizada de tecnologias e ferramentas.</p>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <p className="section-text">Em breve: cards com seus projetos mais importantes.</p>
        </section>

        <section id="experience" className="section">
          <h2 className="section-title">Experience</h2>
          <p className="section-text">Em breve: experiências profissionais, estágios e freelas.</p>
        </section>

        <section id="education" className="section">
          <h2 className="section-title">Education</h2>
          <p className="section-text">
            Em breve: sua graduação, cursos técnicos, cursos livres relevantes.
          </p>
        </section>

        <section id="certifications" className="section">
          <h2 className="section-title">Certifications</h2>
          <p className="section-text">Em breve: certificações e formações complementares.</p>
        </section>

        <section id="contact" className="section">
          <h2 className="section-title">Contact</h2>
          <p className="section-text">
            Coloque aqui seu e-mail, LinkedIn, GitHub e outros meios de contato.
          </p>
        </section>

        <section id="blog" className="section">
          <h2 className="section-title">Blog</h2>
          <p className="section-text">Se quiser, depois linkamos para um blog real.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
