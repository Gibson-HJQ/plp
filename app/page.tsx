'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const heroColumns = [
  [
    { file: 'yundiao.webp', name: '云雕文学社社徽' },
    { file: 'xingzhixiang.webp', name: '星之巷文学社社徽' },
    { file: 'songyun.webp', name: '松云文学社社徽' },
    { file: 'qinghewan.webp', name: '青鹤湾文学社社徽' },
    { file: 'huqing.webp', name: '虎青新闻社社徽' },
  ],
  [
    { file: 'school-52.webp', name: '52赫兹文学社社徽' },
    { file: 'hanxiang.webp', name: '翰香文学社社徽' },
    { file: 'liuyue.webp', name: '流月文学社社徽' },
    { file: 'mubo.webp', name: '沐博文学社社徽' },
    { file: 'qingcaodi.webp', name: '青草地文学社社徽' },
  ],
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

function LetteredWord({ text }: { text: string }) {
  return <span className="lettered-word" aria-label={text}>{Array.from(text).map((letter, index) => <span aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>)}</span>
}

function LetteredPhrase({ text, className = '' }: { text: string; className?: string }) {
  return <span className={`lettered-phrase ${className}`.trim()} aria-label={text}>{text.split(' ').map((word, index) => <LetteredWord text={word} key={`${word}-${index}`} />)}</span>
}

export default function Home() {
  const [light, setLight] = useState(false)
  const [lang, setLang] = useState('EN')
  const [expanded, setExpanded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroProgress, setHeroProgress] = useState(0)
  const [projectOffset, setProjectOffset] = useState(0)
  const pointerRef = useRef<HTMLDivElement>(null)
  const leafCanvasRef = useRef<HTMLCanvasElement>(null)
  const pointerPositionRef = useRef({ x: -1000, y: -1000 })
  const heroVisibilityRef = useRef(1)
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
        const nextHeroProgress = Math.min(1, Math.max(0, (window.scrollY - heroTransition.offsetTop) / distance))
        const leafVisibility = Math.max(0, 1 - nextHeroProgress * 2.5)
        setHeroProgress(nextHeroProgress)
        heroVisibilityRef.current = leafVisibility
        leafCanvasRef.current?.style.setProperty('opacity', `${leafVisibility * 0.78}`)
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
    let pointerFrame = 0
    let pointerX = -100
    let pointerY = -100
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      pointerPositionRef.current.x = pointerX
      pointerPositionRef.current.y = pointerY
      if (pointerFrame) return
      pointerFrame = window.requestAnimationFrame(() => {
        pointerRef.current?.style.setProperty('transform', `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`)
        pointerFrame = 0
      })
    }
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
      window.cancelAnimationFrame(pointerFrame)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = leafCanvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    type Leaf = {
      x: number
      y: number
      radius: number
      speed: number
      drift: number
      phase: number
      spin: number
      angle: number
      pushX: number
      pushY: number
      opacity: number
    }

    let width = 0
    let height = 0
    let frame = 0
    let leaves: Leaf[] = []

    const makeLeaf = (randomY = true): Leaf => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -18,
      radius: 4.2 + Math.random() * 4.8,
      speed: 0.12 + Math.random() * 0.3,
      drift: 0.1 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.016,
      angle: Math.random() * Math.PI,
      pushX: 0,
      pushY: 0,
      opacity: 0.2 + Math.random() * 0.36,
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const density = width < 700 ? 20 : Math.min(54, Math.round(width / 28))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      leaves = Array.from({ length: density }, () => makeLeaf())
    }

    const drawLeaf = (leaf: Leaf) => {
      context.save()
      context.translate(leaf.x, leaf.y)
      context.rotate(leaf.angle)
      const length = leaf.radius
      const halfWidth = length * 0.42
      context.fillStyle = `rgba(255,255,255,${leaf.opacity})`
      context.strokeStyle = `rgba(255,255,255,${Math.min(.72, leaf.opacity + .14)})`
      context.lineWidth = Math.max(0.45, length * 0.09)
      context.lineCap = 'round'
      context.beginPath()
      context.moveTo(0, -length)
      context.bezierCurveTo(halfWidth, -length * 0.52, halfWidth, length * 0.5, 0, length)
      context.bezierCurveTo(-halfWidth, length * 0.5, -halfWidth, -length * 0.52, 0, -length)
      context.fill()
      context.beginPath()
      context.moveTo(0, -length * 0.72)
      context.lineTo(0, length * 1.25)
      context.stroke()
      context.restore()
    }

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height)
      if (heroVisibilityRef.current <= 0.01) {
        frame = window.requestAnimationFrame(animate)
        return
      }
      const pointer = pointerPositionRef.current
      leaves.forEach((leaf) => {
        const dx = leaf.x - pointer.x
        const dy = leaf.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 132) {
          const force = (1 - distance / 132) * 2.15
          leaf.pushX += dx / distance * force
          leaf.pushY += dy / distance * force
        }
        leaf.pushX *= 0.955
        leaf.pushY *= 0.955
        leaf.x += Math.sin(time * 0.00032 + leaf.phase) * leaf.drift + leaf.pushX
        leaf.y += leaf.speed + leaf.pushY
        leaf.angle += leaf.spin + Math.sin(time * 0.00024 + leaf.phase) * 0.002
        if (leaf.y > height + 24 || leaf.x < -36 || leaf.x > width + 36) Object.assign(leaf, makeLeaf(false))
        drawLeaf(leaf)
      })
      frame = window.requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
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
      <canvas className="leaf-canvas" ref={leafCanvasRef} aria-hidden="true" />
      <div className="pointer-glow" ref={pointerRef} />
      <header className={scrollY > 24 ? 'nav scrolled' : 'nav'} style={heroMotionStyle}>
        <button className="brand" onClick={() => scrollTo('home')}>DRIFTPOST</button>
        <nav>
          {[['home', 'home'], ['about', 'about'], ['stack', 'club'], ['projects', 'design'], ['roadmap', 'roadmap'], ['contact', 'contact']].map(([target, label]) => <button key={target} onClick={() => scrollTo(target)}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <button aria-label="Switch Language" onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')}>{lang}</button>
          <button aria-label="Toggle theme" className="theme-toggle" onClick={() => setLight(!light)}>{light ? '☼' : '◐'}</button>
        </div>
      </header>

      <div className="hero-transition" ref={heroTransitionRef} style={heroMotionStyle}>
        <div className="hero-transition-sticky">
          <section id="about" className="about hero-about section-grid content-section">
            <div className="section-label reveal scroll-fade" data-scroll-fade="title"><small>[001]</small><h2>ABOUT</h2><div className="identity"><span className="identity-dot">♙</span><small>DRIFTPOST<br />DEVELOPER</small></div></div>
            <div className="about-copy scroll-fade" data-scroll-fade><h3 className="reveal">I&apos;m a <em>Full Stack Developer</em><br />focused on building <b>clean and<br />sustainable systems.</b></h3><p className="reveal">I&apos;m someone who loves <b>learning new things</b> and constantly tries to put what I learn into practice. I develop <i>web and desktop applications</i>. I enjoy working with simple, practical, and <b>sustainable tools.</b></p><button className="underline-button reveal" onClick={() => setExpanded(!expanded)}>Read Full Version <Arrow /></button>{expanded && <p className="expanded">I care about thoughtful interfaces, maintainable code, and tools that stay useful for years.</p>}</div>
          </section>

          <div className="hero-page">
            <section id="home" className="hero section-grid">
              <div className="hero-copy hero-fade">
                <div className="hero-kicker" aria-hidden="true"><span className="envelope-mark" /></div>
                <h1><span lang="zh-CN">漂流瓶</span><br /><em><LetteredPhrase text="DRIFTPOST" className="driftpost-lettering" /></em></h1>
                <p className="hero-manifesto"><span className="manifesto-line manifesto-year" lang="zh-CN"><LetteredPhrase text="2026" /><b><LetteredPhrase text="香笺承意" /></b></span><span className="manifesto-line"><LetteredPhrase text="We may stumble, but we always arrive." /></span><span className="manifesto-line"><LetteredPhrase text="And you, like us, will eventually reach" /><b><LetteredPhrase text="the other side." /></b></span></p>
                <div className="hero-buttons"><button className="pill primary journey-button" onClick={() => scrollTo('contact')} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--journey-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--journey-y', `${event.clientY - rect.top}px`) }}><span className="journey-button-content"><LetteredPhrase text="了解这趟旅程" className="cta-lettering" /> <Arrow /></span></button><button className="text-button order-button" onClick={() => scrollTo('projects')}><span className="explore-orbit">◌</span><LetteredPhrase text="信封订购" className="cta-lettering" /></button></div>
              </div>
              <div className="hero-collage hero-emblems" aria-label="文学社社徽展示">
                {heroColumns.map((images, columnIndex) => <div className={`hero-column hero-column-${columnIndex + 1}`} key={columnIndex}><div className="hero-column-track">{[0, 1].map((copy) => <div className="hero-column-set" aria-hidden={copy === 1} key={copy}>{images.map((image) => <div className="portrait" key={`${copy}-${image.file}`}><img src={`/assets/hero-emblems/${image.file}`} alt={copy === 0 ? image.name : ''} /></div>)}</div>)}</div></div>)}
                <div className="hero-motion-rail" aria-hidden="true"><span>SCROLL</span><i><b /></i><small>01 / 10</small></div>
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
        <footer className="reveal scroll-fade" data-scroll-fade><span>© 2026 DRIFTPOST. All rights reserved.</span><div><a href="https://github.com/xkintaro">GitHub</a><a href="https://discord.gg/NSQk27Zdkv">Discord</a><a href="https://instagram.com/xkintaro">Instagram</a><a href="https://www.linkedin.com/in/mustafa-tasal/">Linkedin</a></div></footer>
      </section>
    </main>
  )
}
