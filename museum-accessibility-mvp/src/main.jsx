import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { objects, ui } from './content'
import './styles.css'

function Arrow({ direction = 'right' }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={`arrow arrow-${direction}`}><path d="M3 12h17m-7-7 7 7-7 7" /></svg>
}

function App() {
  const [language, setLanguage] = useState('pl')
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const detailRef = useRef(null)
  const listRef = useRef(null)
  const t = ui[language]
  const active = selected === null ? null : objects[selected]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = `${t.title} — ${language === 'pl' ? 'przykładowa wystawa cyfrowa' : 'sample digital exhibit'}`
  }, [language, t.title])

  useEffect(() => {
    if (active) requestAnimationFrame(() => detailRef.current?.focus())
  }, [selected])

  function choose(index) {
    setSelected(index)
    setMenuOpen(false)
    requestAnimationFrame(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function closeStory() {
    setSelected(null)
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      listRef.current?.focus()
    })
  }

  function reset() {
    setSelected(null)
    setLanguage('pl')
    setLargeText(false)
    setHighContrast(false)
    setMenuOpen(false)
    setAnnouncement(ui.pl.resetNotice)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    requestAnimationFrame(() => document.getElementById('start')?.focus())
  }

  return <div className={`site ${largeText ? 'large-text' : ''} ${highContrast ? 'high-contrast' : ''}`}>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="dark-shell" id="start" tabIndex="-1">
      <header className="site-header">
        <a className="wordmark" href="#start" aria-label="Atelier Karbownik — start">ATELIER <span>/</span> KARBOWNIK</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="header-controls" onClick={() => setMenuOpen(!menuOpen)}>{t.menu}<span aria-hidden="true">☰</span></button>
        <div className={`header-controls ${menuOpen ? 'open' : ''}`} id="header-controls">
          <nav aria-label={language === 'pl' ? 'Główna nawigacja' : 'Main navigation'}>
            <a href="#exhibit" onClick={() => setMenuOpen(false)}>{t.exhibit}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.about}</a>
          </nav>
          <div className="utilities">
            <div className="language-control" role="group" aria-label={t.language}>
              <button type="button" lang="pl" aria-label="Polski" aria-pressed={language === 'pl'} onClick={() => setLanguage('pl')}>PL</button>
              <span aria-hidden="true">|</span>
              <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            </div>
            <button className="utility-button text-size" type="button" aria-label={t.size} aria-pressed={largeText} onClick={() => setLargeText(!largeText)}><span aria-hidden="true">A<span>A</span></span></button>
            <button className="utility-button" type="button" aria-label={t.contrast} aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}><span className="contrast-icon" aria-hidden="true" /></button>
            <button className="reset-button" type="button" onClick={reset}>{t.reset}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="page-title">
          <img className="hero-image" src="/images/lantern-hero.png" alt="" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="sample-note">{t.sample}</p>
            <h1 id="page-title">{t.title}</h1>
            <p className="translated-title"><span aria-hidden="true" />{t.englishTitle}</p>
            <p className="hero-intro">{t.intro}</p>
            <a className="primary-link" href="#exhibit">{t.discover}<Arrow /></a>
          </div>
          <div className="hero-side" aria-hidden="true">{language === 'pl' ? <>LUDZIE<br />PRZEDMIOTY<br />ŚWIATŁO<br />HISTORIE</> : <>PEOPLE<br />OBJECTS<br />LIGHT<br />STORIES</>}</div>
        </section>

        <section className="object-rail" id="exhibit" aria-labelledby="objects-title">
          <h2 className="sr-only" id="objects-title">{t.choose}</h2>
          <div className="rail-inner" ref={listRef} tabIndex="-1">
            {objects.map((object, index) => <button key={object.id} type="button" className={`object-link ${selected === index ? 'selected' : ''}`} onClick={() => choose(index)} aria-current={selected === index ? 'true' : undefined}>
              <span className="object-number">{String(index + 1).padStart(2, '0')}</span>
              <img src={object.image} alt="" loading="lazy" />
              <span className="object-label"><strong>{object[language].name}</strong><small>{object[language].subtitle}</small></span>
              <Arrow />
            </button>)}
          </div>
        </section>

        {active && <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-heading"><p className="section-label">{t.object} {String(selected + 1).padStart(2, '0')} / 04</p><button className="plain-link" type="button" onClick={closeStory}>{t.close} <span aria-hidden="true">×</span></button></div>
          <div className="story-grid">
            <div className="story-media"><img src={active.image} alt={active[language].alt} /><details><summary>{t.description}</summary><p>{active[language].media}</p></details></div>
            <div className="story-copy"><h2 id="story-title" ref={detailRef} tabIndex="-1">{active[language].name}</h2><p className="story-lead">{active[language].lead}</p>{active[language].paragraphs.map((p, index) => <p key={index}>{p}</p>)}<div className="reflection"><span>{t.reflect}</span><p>{active[language].question}</p></div><div className="story-navigation"><button type="button" disabled={selected === 0} onClick={() => choose(selected - 1)}><Arrow direction="left" />{t.previous}</button><button type="button" disabled={selected === objects.length - 1} onClick={() => choose(selected + 1)}>{t.next}<Arrow /></button></div></div>
          </div>
        </section>}

        <section className="about-exhibit" aria-labelledby="more-title"><div className="about-heading"><p className="section-label">{t.exhibit}</p><h2 id="more-title">{t.more}</h2></div><p>{t.aboutText}</p><div className="line-art" aria-hidden="true"><span /></div></section>
        <section className="project-info" id="about" aria-labelledby="project-title"><div><p className="section-label">{t.about}</p><h2 id="project-title">{t.project}</h2><p>{t.projectText}</p></div><div><h3>{t.kiosk}</h3><p>{t.kioskText}</p></div></section>
      </main>
      <footer><span>ATELIER <b>/</b> KARBOWNIK</span><span>{t.footer}</span><a href="#start">↑ {language === 'pl' ? 'Na górę' : 'Back to top'}</a></footer>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
