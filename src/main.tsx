import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domMax, m, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Compass, GraduationCap,
  House, Library, MapPin, Menu, X, Cpu, Palette, Languages, Scale, Activity, Atom, Feather,
} from 'lucide-react'
import { UniversityJourney } from '@/components/university-journey'
import { Link000 } from '@/components/ui/skiper-ui/skiper40'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { CampusMouseFollow } from '@/components/ui/skiper-ui/skiper61'
import './styles.css'

const site = 'https://tashenev.edu.kz'
const asset = import.meta.env.BASE_URL
const sections = [
  ['about', 'Об университете'], ['education', 'Обучение'],
  ['students', 'Студентам'], ['contacts', 'Контакты'],
]
const fields = [
  { icon: Cpu, id: 8, name: 'Искусственный интеллект и инновации', topics: 'IT и цифровые технологии' },
  { icon: Palette, id: 2, name: 'Искусство и гуманитарное образование', topics: 'Дизайн, мода и художественный труд' },
  { icon: Languages, id: 3, name: 'Мировые языки', topics: 'Иностранные языки и филология' },
  { icon: Scale, id: 4, name: 'Экономика и право', topics: 'Менеджмент и юриспруденция' },
  { icon: GraduationCap, id: 1, name: 'Педагогические науки' }, { icon: Activity, id: 5, name: 'Физическая культура и спорт' },
  { icon: Atom, id: 10, name: 'Естественные науки' }, { icon: Feather, id: 9, name: 'Казахская филология и литература' },
]
const resources = [
  { name: 'Platonus', description: 'Личный кабинет', icon: GraduationCap, href: 'https://platonus.tashenev.kz/v7/#/pps-main/index' },
  { name: 'Электронная библиотека', description: 'Книги и учебные материалы', icon: Library, href: 'https://library.tashenev.edu.kz/' },
  { name: 'Путеводитель студента', description: 'Справочник по учёбе · PDF', icon: BookOpen, href: site + '/docs/Academ/anyktama.pdf' },
  { name: 'Студенческий дом', description: 'Проживание в общежитии', icon: House, href: site + '/ru/student-house' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="Tashenev University — в начало">
    <span className="brand-mark"><img src={asset + 'tashenev-logo.png'} alt="" width="904" height="276" /></span>
    <span>TASHENEV{' '}<small>UNIVERSITY</small></span>
  </a>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  return <header id="top" tabIndex={-1} className="header" onBlur={e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false)
  }} onKeyDown={e => {
    if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); button.current?.focus() }
  }}>
    <div className="shell header-inner">
      <Brand />
      <button ref={button} className="menu-button" aria-controls="site-nav" aria-expanded={menuOpen}
        type="button" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />} Меню</button>
      <nav id="site-nav" className="site-nav" aria-label="Основная навигация" data-open={menuOpen}>
        {sections.map(([id, label]) => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}><TextRoll>{label}</TextRoll></a>)}
        <a className="nav-action" href={site + '/ru/faculties'}><TextRoll>Факультеты</TextRoll><ArrowUpRight size={17} aria-hidden="true" /></a>
      </nav>
    </div>
  </header>
}

const gallery = [
  { id: 'graduation', label: 'Выпускной', width: 1600, alt: 'Выпускники Ташенева с дипломами и цветами на церемонии в Шымкенте' },
  { id: 'campus', label: 'Кампус', width: 1280, alt: 'Главный вход в университет Ташенева' },
  { id: 'library', label: 'Библиотека', width: 960, alt: 'Студентки работают в читальном зале' },
]

// Adapted from Magic UI's Interactive Hover Button, listed on 21st.dev.
function StudyLink() {
  return <a className="primary" href="#education">
    <span className="cta-dot" aria-hidden="true" /><span className="cta-label">Выбрать направление</span>
    <span className="cta-hover" aria-hidden="true">Выбрать направление <ArrowRight size={17} /></span>
  </a>
}

function Hero() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(0)
  const frames = useRef<(HTMLImageElement | null)[]>([])
  useEffect(() => {
    let current = true
    const next = frames.current[active]
    next?.decode().then(() => {
      if (current) setVisible(active)
    }).catch(() => {
      if (current && next.naturalWidth) setVisible(active)
    })
    return () => { current = false }
  }, [active])
  const reduced = useReducedMotion()
  const photo = gallery[active]
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([])
  return <>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-panel" role="tabpanel" id="hero-photo" aria-labelledby={'photo-tab-' + photo.id}>
        <CampusMouseFollow>
          {gallery.map((item, i) =>
            <img key={item.id} ref={el => { frames.current[i] = el }}
              className={'gallery-frame frame-' + item.id} data-visible={visible === i}
              src={asset + item.id + '-graded.jpg'}
              srcSet={`${asset}${item.id}-graded-small.jpg 700w, ${asset}${item.id}-graded.jpg ${item.width}w`}
              sizes="(max-width: 650px) 100vw, 80vw" fetchPriority={i === 0 ? 'high' : 'low'}
              width={item.width} height={Math.round(item.width * 2 / 3)}
              aria-hidden={visible !== i} alt={item.alt} />)}
        </CampusMouseFollow>
      </div>
      <div className="hero-copy">
        <p className="location"><MapPin size={15} aria-hidden="true" /> Шымкент, Казахстан</p>
        <h1 id="hero-title" lang="en">Tashenev<br />University<span className="title-dot" aria-hidden="true">.</span></h1>
        <p className="hero-name">Университет имени Жумабека<br />Ахметулы Ташенева</p>
        <StudyLink />
      </div>
      <div className="gallery-tabs" role="tablist" aria-label="Фотографии университета">
        {gallery.map((item, i) =>
          <button key={item.id} id={'photo-tab-' + item.id} role="tab" type="button"
            aria-controls="hero-photo" aria-selected={active === i} tabIndex={active === i ? 0 : -1}
            ref={el => { tabButtons.current[i] = el }} onClick={() => setActive(i)}
            onKeyDown={e => {
              const next = { ArrowRight: (i + 1) % gallery.length, ArrowLeft: (i + gallery.length - 1) % gallery.length, Home: 0, End: gallery.length - 1 }[e.key]
              if (next === undefined) return
              e.preventDefault()
              setActive(next)
              tabButtons.current[next]?.focus()
            }}>
            {active === i && <m.span className="selected-photo" aria-hidden="true"
              layoutId={reduced ? undefined : 'selected-photo'} style={{ borderRadius: 999 }}
              transition={{ type: 'spring', bounce: 0.12, duration: 0.35 }} />}
            <img className="tab-thumb" src={asset + item.id + '-thumb.jpg'} width="32" height="24" alt="" />
            <span className="tab-label">{item.label}</span>
          </button>)}
      </div>
    </section>
    <nav className="quick-links shell" aria-label="Программы и корпуса">
      {([
        [GraduationCap, 'Бакалавриат', 'Программы первого высшего', '/ru/bachelor'],
        [BookOpen, 'Магистратура', 'Программы для выпускников', '/ru/magistracy'],
        [Compass, 'Карта корпусов', 'Адреса учебных зданий', '/ru/building-map'],
      ] as const).map(([Icon, title, detail, href]) =>
        <a key={href} href={site + href}><span className="quick-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
          <span><strong>{title}</strong><small>{detail}</small></span><ArrowUpRight size={17} aria-hidden="true" /></a>)}
    </nav>
  </>
}

function Education() {
  return <section className="education section-space" id="education" tabIndex={-1} aria-labelledby="education-title">
    <div className="shell">
      <p className="kicker">Образование</p>
      <div className="section-heading"><h2 id="education-title">Направления обучения</h2>
        <Link000 className="story-link" href={site + '/ru/faculties'}>Все факультеты <ArrowUpRight size={17} aria-hidden="true" /></Link000>
      </div>
      <ul className="fields" role="list">{fields.map(({ id, name, topics, icon: Icon }) =>
        <li key={id} className="field-item">
          <a href={site + '/ru/faculties/' + id}>
            <span className="field-symbol"><Icon size={24} strokeWidth={1.65} aria-hidden="true" /></span>
            <span className="field-text"><strong className="field-name">{name}</strong>{topics && <small>{topics}</small>}</span>
            <ArrowUpRight className="field-arrow" size={18} aria-hidden="true" />
          </a>
        </li>)}</ul>
    </div>
  </section>
}

function Students() {
  return <section className="students section-space shell" id="students" tabIndex={-1} aria-labelledby="students-title">
    <div className="student-photo"><img loading="lazy" width="960" height="640" src={asset + 'library-graded.jpg'} alt="Студентки читают в библиотеке университета" /></div>
    <div className="student-content"><p className="kicker">Студентам</p><h2 id="students-title">Сервисы студента</h2>
      <ul className="resources" role="list">{resources.map(({ href, name, description, icon: Icon }) =>
        <li key={href}><a href={href}><Icon aria-hidden="true" size={22} strokeWidth={1.6} />
          <span><strong>{name}</strong><small>{description}</small></span><ArrowUpRight size={18} aria-hidden="true" /></a></li>)}</ul>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer" id="contacts" tabIndex={-1} aria-labelledby="contacts-title">
    <div className="shell"><div className="footer-top">
      <div><p className="kicker">Контакты</p><h2 id="contacts-title">Связаться с нами</h2></div>
      </div>
      <address className="contacts">
        <div><span>Телефон университета</span><a href="tel:+77761047070">+7 (776) 104-70-70</a></div>
        <div><span>Электронная почта</span><a href="mailto:info@tashenev.edu.kz">info@tashenev.edu.kz</a></div>
        <div><span>Адрес университета</span><a href={site + '/ru/building-map'}>Шымкент, пр. Кунаева, 21 <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </address>
      <div className="footer-bottom"><Brand /><a href="https://skiper-ui.com/">Анимации · Skiper UI</a><a href="#top">Наверх <ArrowUp size={16} aria-hidden="true" /></a></div>
    </div>
  </footer>
}

function App() {
  return <>
    <a className="skip-link" href="#main">Перейти к содержанию</a><Header />
    <main id="main" tabIndex={-1}><Hero /><Education /><UniversityJourney /><Students /></main>
    <Footer />
  </>
}

createRoot(document.getElementById('root')!).render(<LazyMotion features={domMax}><App /></LazyMotion>)
