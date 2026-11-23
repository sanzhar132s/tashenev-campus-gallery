import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link000 } from '@/components/ui/skiper-ui/skiper40'

export function UniversityJourney() {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start 0.95', 'end 0.6'],
  })
  // Skiper19 (Skiper UI): bind the SVG stroke directly to local scroll progress.
  const remaining = useTransform(scrollYProgress, [0, 1], [1, 0])

  // The three arches trace the silhouette of the university's main entrance.
  const arches = 'M4 72 C65 72 92 20 153 28 C203 34 194 85 161 84 C136 83 142 53 173 53 C228 53 246 90 307 90 H336 Q354 90 354 71 V55 A33 33 0 0 1 420 55 V85 Q420 91 426 91 Q432 91 432 85 V47 A42 42 0 0 1 516 47 V85 Q516 91 522 91 Q528 91 528 85 V55 A33 33 0 0 1 594 55 V70 Q594 90 614 90 H644 C721 90 714 29 778 29 C822 29 846 65 896 65'
  return (
    <section id="about" ref={section} className="about section-space shell" tabIndex={-1} aria-labelledby="about-title">
      <div className="history-photo"><img src={import.meta.env.BASE_URL + 'campus-graded.jpg'} alt="Фасад университета в Шымкенте" width="1280" height="853" loading="lazy" /></div>
      <div className="history-copy">
        <p className="kicker">Об университете</p>
        <h2 id="about-title">Из Жетысая<br />в Шымкент</h2>
        <p>В 1998 году в Жетысае открылся университет «Сырдария». Его основали, чтобы молодёжь юга Казахстана могла получить высшее образование ближе к дому.</p>
        <p>В 2022 году университет переехал в Шымкент и получил имя Жумабека Ташенева. Сегодня здесь учатся на программах бакалавриата и магистратуры.</p>
        <Link000 className="story-link" href="https://tashenev.edu.kz/ru/about">История университета <ArrowUpRight size={18} aria-hidden="true" /></Link000>
      </div>
      <svg className="history-route" viewBox="0 0 900 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="route-track" d={arches} />
        <m.path className="route-ink" d={arches} pathLength="1" style={{ strokeDashoffset: remaining }} />
      </svg>
    </section>
  )
}
