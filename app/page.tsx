'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const heroColumns = [
  ['kintaro-1.webp', 'makise-kurisu-2.webp', 'atam-1.webp'],
  ['atam-2.webp', 'makise-kurisu-1.webp', 'kintaro-2.webp'],
]

const stackGroups = [
  { number: '01', title: 'Frontend Technologies', items: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'], icons: ['react','nextjs','tailwindcss','bootstrap','framermotion','typescript','javascript','html5','css3'] },
  { number: '02', title: 'Backend Technologies', items: ['Node.js', 'PHP', 'Laravel', 'ASP.NET', 'Rust', 'C#', 'Python', 'Discord.js'], icons: ['nodejs','php','laravel','aspnet','rust','csharp','python','discordjs'] },
  { number: '03', title: 'Databases & ORMs', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Neon'], icons: ['postgresql','mysql','mongodb','prisma','neon'] },
  { number: '04', title: 'Tools & Infrastructure', items: ['Git', 'Vercel', 'Tauri'], icons: ['git','vercel','tauri'] },
]

const projects = [
  { type: 'Media Tool', year: '2026', title: 'Aether Media', image: '/assets/projects/aether-media.jpg' },
  { type: 'Library', year: '2026', title: 'Aether JS', image: '/assets/projects/aether-js.jpg' },
  { type: 'Web Application', year: '2025', title: 'File Manager', image: '/assets/projects/file-manager.jpg' },
]

const roadmap = [
  { year: '2022', text: 'I first got introduced to software development in high school. I learned the fundamentals and logic of programming using C# in an object-oriented programming class.', tags: ['C#'] },
  { year: '2023', text: 'I started developing static and dynamic websites by learning HTML, CSS, and ASP.NET. During this period, I also learned how to use databases in my projects.', tags: ['HTML', 'CSS', 'ASP.NET', 'MySQL'] },
  { year: '2024', text: 'It was my last year of high school. I significantly improved my UI development skills with CSS and continued working with ASP.NET at my internship.', tags: ['HTML', 'CSS', 'ASP.NET', 'MySQL'] },
  { year: '2025', text: 'After high school, I turned to modern technologies like React, Node.js, Tailwind CSS, and MongoDB. During this period, I developed many websites and applications. Additionally, I started writing various tools in Python for my personal use.', tags: ['React', 'Node.js', 'Tailwind', 'MongoDB'] },
  { year: '2026', text: 'I started working as an intern at PostAjans, where I focused mainly on Laravel. In addition, I develop web projects using Next.js in my free time and build various personal projects utilizing technologies like Tauri and FFmpeg.', tags: ['Laravel', 'Next.js', 'PostgreSQL'] },
]

const ticker = 'RADICAL TRANSPARENCY  •  INTENTIONAL MINIMALISM  •  ARCHITECTURAL INTEGRITY  •  FIRST PRINCIPLES THINKING  •  PERFORMANCE WITHOUT COMPROMISE  •  SCALABLE VISION  •  '

function Arrow() { return <span className="arrow">↗</span> }

export default function Home() {
  const [light, setLight] = useState(false)
  const [lang, setLang] = useState('EN')
  const [expanded, setExpanded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroProgress, setHeroProgress] = useState(0)
  const [projectOffset, setProjectOffset] = useState(0)
  const [pointer, setPointer] = useState({ x: -100, y: -100 })
  const projectsRef = useRef<HTMLElement>(null)
  const projectTrackRef = useRef<HTMLDivElement>(null)
  const heroTransitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScrollFades = () => {
      const viewportHeight = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-scroll-fade]').forEach((element) => {
        const rect = element.getBoundingClientRect()
        const mode = element.dataset.scrollFade
        const horizontal = mode === 'horizontal'
        const projectTitle = mode === 'project-title'
        const title = mode === 'title' || projectTitle
        const enter = horizontal
          ? Math.min(1, Math.max(0, (window.innerWidth * 0.94 - rect.left) / (window.innerWidth * 0.2)))
          : Math.min(1, Math.max(0, (viewportHeight * 0.98 - rect.top) / (viewportHeight * (title ? 0.48 : 0.3))))
        const exit = horizontal
          ? Math.min(1, Math.max(0, (rect.right - window.innerWidth * 0.06) / (window.innerWidth * 0.2)))
          : Math.min(1, Math.max(0, (rect.bottom - viewportHeight * 0.06) / (viewportHeight * (title ? 0.32 : 0.24))))
        const horizontalTitleExit = projectTitle
          ? Math.min(1, Math.max(0, (rect.right - window.innerWidth * 0.04) / (window.innerWidth * 0.24)))
          : 1
        const visibility = Math.min(enter, exit, horizontalTitleExit)
        const blur = title ? 10 : 7
        const lift = title ? 30 : 22
        element.style.setProperty('--section-visibility', visibility.toFixed(3))
        element.style.setProperty('--section-blur', `${((1 - visibility) * blur).toFixed(2)}px`)
        element.style.setProperty('--section-lift', `${((1 - visibility) * lift).toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(window.scrollY)
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)

      const heroTransition = heroTransitionRef.current
      if (heroTransition) {
        const distance = Math.max(1, heroTransition.offsetHeight - window.innerHeight)
        setHeroProgress(Math.min(1, Math.max(0, (window.scrollY - heroTransition.offsetTop) / distance)))
      }

      const projectSection = projectsRef.current
      const projectTrack = projectTrackRef.current
      if (projectSection && projectTrack) {
        const distance = Math.max(1, projectSection.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, (window.scrollY - projectSection.offsetTop) / distance))
        const horizontalDistance = Math.max(0, projectTrack.scrollWidth - window.innerWidth)
        setProjectOffset(progress * horizontalDistance)
      }
      updateScrollFades()
      window.requestAnimationFrame(updateScrollFades)
    }
    const onPointerMove = (event: PointerEvent) => setPointer({ x: event.clientX, y: event.clientY })
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.reveal, .reveal-line').forEach((element) => observer.observe(element))
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    if (id === 'about' && heroTransitionRef.current) {
      const section = heroTransitionRef.current
      window.scrollTo({ top: section.offsetTop + section.offsetHeight - window.innerHeight, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroMotionStyle = {
    '--hero-turn': heroProgress,
    '--hero-blur': `${heroProgress * 4}px`,
    '--hero-shift': `${heroProgress * -8}%`,
    '--hero-scale': 1 - heroProgress * 0.02,
    '--about-shift': `${(1 - heroProgress) * 100}%`,
    '--about-blur': `${(1 - heroProgress) * 2}px`,
    '--nav-height': `${88 - heroProgress * 20}px`,
    '--nav-pad': `${3.2 + heroProgress * 0.8}vw`,
    '--nav-gap': `${30 - heroProgress * 6}px`,
    '--nav-scale': 1 - heroProgress * 0.12,
  } as CSSProperties

  return (
    <main className={light ? 'site light' : 'site'}>
      <div className="page-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="pointer-glow" style={{ left: pointer.x, top: pointer.y }} />
      <header className={scrollY > 24 ? 'nav scrolled' : 'nav'} style={heroMotionStyle}>
        <button className="brand" onClick={() => scrollTo('home')}>KINTARO</button>
        <nav>
          {['home','about','stack','projects','roadmap','contact'].map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
        </nav>
        <div className="nav-actions">
          <button aria-label="Switch Language" onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')}>{lang}</button>
          <button aria-label="Toggle theme" className="theme-toggle" onClick={() => setLight(!light)}>{light ? '☼' : '◐'}</button>
        </div>
      </header>

      <div className="hero-transition" ref={heroTransitionRef} style={heroMotionStyle}>
        <div className="hero-transition-sticky">
          <section id="about" className="about hero-about section-grid content-section">
            <div className="section-label reveal scroll-fade" data-scroll-fade="title"><small>[001]</small><h2>ABOUT</h2><div className="identity"><span className="identity-dot">♙</span><small>KINTARO<br />DEVELOPER</small></div></div>
            <div className="about-copy scroll-fade" data-scroll-fade><h3 className="reveal">I&apos;m a <em>Full Stack Developer</em><br />focused on building <b>clean and<br />sustainable systems.</b></h3><p className="reveal">I&apos;m someone who loves <b>learning new things</b> and constantly tries to put what I learn into practice. I develop <i>web and desktop applications</i>. I enjoy working with simple, practical, and <b>sustainable tools.</b></p><button className="underline-button reveal" onClick={() => setExpanded(!expanded)}>Read Full Version <Arrow /></button>{expanded && <p className="expanded">I care about thoughtful interfaces, maintainable code, and tools that stay useful for years.</p>}</div>
          </section>

          <div className="hero-page">
            <section id="home" className="hero section-grid">
              <div className="hero-copy hero-fade">
                <div className="hero-kicker" aria-hidden="true"><i /><i /><i /><i /></div>
                <h1>KINTARO<br /><em>PORTFOLIO</em></h1>
                <p>I&apos;m someone who loves <b>learning new things</b> and constantly tries to put what I learn into practice. I develop <i>web and desktop applications</i>. I enjoy working with simple, practical, and sustainable tools.</p>
                <div className="hero-buttons"><button className="pill primary" onClick={() => scrollTo('contact')}>CONTACT ME <Arrow /></button><button className="text-button" onClick={() => scrollTo('projects')}><span className="explore-orbit">◌</span>EXPLORE PROJECTS</button></div>
              </div>
              <div className="hero-collage" aria-label="Portrait gallery">
                {heroColumns.map((images, columnIndex) => <div className={`hero-column hero-column-${columnIndex + 1}`} key={columnIndex}><div className="hero-column-track">{[0, 1].map((copy) => <div className="hero-column-set" aria-hidden={copy === 1} key={copy}>{images.map((image) => <div className="portrait" key={`${copy}-${image}`}><img src={`/assets/hero-slider/${image}`} alt={copy === 0 ? 'Portrait' : ''} /></div>)}</div>)}</div></div>)}
                <div className="hero-motion-rail" aria-hidden="true"><span>SCROLL</span><i><b /></i><small>01 / 06</small></div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="stack" className="stack content-section">
        <div className="section-heading reveal scroll-fade" data-scroll-fade="title"><small>[002]</small><h2>STACK</h2></div>
        <div className="stack-groups scroll-fade" data-scroll-fade>{stackGroups.map((group) => <div className="stack-group reveal" key={group.number}><div className="group-title"><span>{group.number}</span><h3>{group.title}</h3></div><div className="stack-items">{group.items.map((item, i) => { const icon = group.icons[i]; return <div className="stack-item" key={item}><img src={`/assets/stack/${icon}.${icon === 'neon' ? 'png' : 'svg'}`} alt="" />{item}</div> })}</div></div>)}</div>
      </section>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="projects" className="projects" ref={projectsRef}>
        <div className="projects-sticky">
          <div className="project-track" ref={projectTrackRef} style={{ transform: `translate3d(${-projectOffset}px, 0, 0)` }}>
            <div className="projects-intro scroll-fade" data-scroll-fade="project-title"><small>[003]</small><h2>PROJECTS</h2><p>A collection of <em>experiments,</em><br /><em>products,</em> and <em>digital<br />artifacts</em> forged in the <b>void.</b></p><small className="scroll-label">SCROLL TO EXPLORE &nbsp; →</small></div>
            {projects.map((project) => <article className="project-card scroll-fade" data-scroll-fade="horizontal" key={project.title}><div className="project-image"><img src={project.image} alt={project.title} /><div className="project-overlay"><span>VIEW PROJECT</span><Arrow /></div></div><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div><h3>{project.title}</h3></article>)}
            <div className="project-end scroll-fade" data-scroll-fade="horizontal" aria-label="End of projects">END</div>
          </div>
        </div>
      </section>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="roadmap" className="roadmap content-section">
        <div className="center-heading reveal scroll-fade" data-scroll-fade><small>[004]</small><h2>ROADMAP</h2><p>A roadmap where I share the experiences I&apos;ve gained throughout my<br />software journey and the technologies I&apos;ve learned.</p></div>
        <div className="timeline reveal-line scroll-fade" data-scroll-fade>{roadmap.map((item, i) => <article className="timeline-item reveal" key={item.year}><div className="timeline-dot" /><div className="timeline-card"><small>0{i + 1}</small><h3>{item.year}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      </section>

      <section id="contact" className="contact content-section">
        <div className="center-heading reveal scroll-fade" data-scroll-fade><small>[005]</small><h2>CONTACT</h2><p>Whether we start fresh to bring a project to life or take an existing system<br />further.</p></div>
        <div className="contact-links reveal scroll-fade" data-scroll-fade><a href="mailto:mustafw42@gmail.com"><span>SEND AN EMAIL</span><b>mustafw42@gmail.com</b><Arrow /></a><a href="tel:Notaddedyet"><span>DIRECT LINE</span><b>Not added yet.</b><Arrow /></a></div>
        <footer className="reveal scroll-fade" data-scroll-fade><span>© 2026 KINTARO. All rights reserved.</span><div><a href="https://github.com/xkintaro">GitHub</a><a href="https://discord.gg/NSQk27Zdkv">Discord</a><a href="https://instagram.com/xkintaro">Instagram</a><a href="https://www.linkedin.com/in/mustafa-tasal/">Linkedin</a></div></footer>
      </section>
    </main>
  )
}
