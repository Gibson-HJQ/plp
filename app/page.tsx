'use client'

import { useEffect, useRef, useState } from 'react'

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

const clubs = [
  { name: '东莞中学云雕文学社', logo: 'yundiao.webp' },
  { name: '东莞中学松山湖学校松云文学社', logo: 'songyun.webp' },
  { name: '东莞高级中学青草地文学社', logo: 'qingcaodi.webp' },
  { name: '东莞市虎门外语学校青年通讯社', logo: 'huqing.webp' },
  { name: '东莞市第六高级中学翰香文学社', logo: 'hanxiang.webp' },
  { name: '东莞市常平中学青鹤湾文学社', logo: 'qinghewan.webp' },
  { name: '东莞市粤华学校流月文学社', logo: 'liuyue.webp' },
  { name: '东莞市济川中学沐博文学社', logo: 'mubo.webp' },
  { name: '东莞市南城开心实验学校52Herz文学社', logo: 'school-52.webp' },
  { name: '东莞市北辰高级中学星之巷文学社', logo: 'xingzhixiang.webp' },
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

const ticker = 'LETTERS ACROSS DISTANCE  •  WORDS WITH INTENTION  •  AUTUMN CORRESPONDENCE  •  CONNECTION BEYOND CAMPUSES  •  RELAY BORN OF PASSION  •  ROMANCE BELONGING TO STUDENTS  •  '

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
  const pageProgressRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const leafCanvasRef = useRef<HTMLCanvasElement>(null)
  const pointerPositionRef = useRef({ x: -1000, y: -1000 })
  const projectsRef = useRef<HTMLElement>(null)
  const projectTrackRef = useRef<HTMLDivElement>(null)
  const heroTransitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fadeElements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-fade]'))
    const aboutElements = Array.from(document.querySelectorAll<HTMLElement>('.about-stage-item'))
    aboutElements.forEach((element) => {
      element.style.removeProperty('opacity')
      element.style.removeProperty('--about-stage-y')
      element.style.removeProperty('--about-stage-scale')
      element.style.removeProperty('pointer-events')
    })
    const updateScrollFades = () => {
      const viewportHeight = window.innerHeight
      fadeElements.forEach((element) => {
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
        const lift = title ? 30 : 22
        element.style.setProperty('--section-visibility', visibility.toFixed(3))
        element.style.setProperty('--section-lift', `${((1 - visibility) * lift).toFixed(2)}px`)
      })
    }

    let scrollFrame = 0
    let displayedHeroProgress = 0
    let displayedExitProgress = 0
    let aboutPhase = ''
    let lastFrameTime = performance.now()
    const updateScroll = (frameTime = performance.now()) => {
      scrollFrame = 0
      const elapsed = Math.min(40, Math.max(1, frameTime - lastFrameTime))
      const blend = 1 - Math.exp(-elapsed / 135)
      lastFrameTime = frameTime
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scrollY = window.scrollY
      pageProgressRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`)
      navRef.current?.classList.toggle('scrolled', scrollY > 24)

      const heroTransition = heroTransitionRef.current
      if (heroTransition) {
        const distance = Math.max(1, heroTransition.offsetHeight - window.innerHeight)
        const targetProgress = Math.min(1, Math.max(0, (scrollY - heroTransition.offsetTop) / distance))
        displayedHeroProgress += (targetProgress - displayedHeroProgress) * blend
        const progress = displayedHeroProgress
        heroTransition.style.setProperty('--hero-shift', `${progress * -8}%`)
        heroTransition.style.setProperty('--hero-scale', `${1 - progress * .02}`)
        heroTransition.style.setProperty('--about-shift', `${(1 - progress) * 100}%`)
        heroTransition.style.setProperty('--about-progress', `${progress}`)
        const transitionRect = heroTransition.getBoundingClientRect()
        const targetExitProgress = Math.min(1, Math.max(0, (window.innerHeight - transitionRect.bottom) / (window.innerHeight * .7)))
        displayedExitProgress += (targetExitProgress - displayedExitProgress) * blend
        const exitProgress = displayedExitProgress
        heroTransition.style.setProperty('--about-exit', `${exitProgress}`)
        const nextAboutPhase = targetExitProgress >= .72 ? 'after' : targetProgress >= .34 ? 'visible' : 'before'
        if (nextAboutPhase !== aboutPhase) {
          aboutPhase = nextAboutPhase
          heroTransition.dataset.aboutPhase = nextAboutPhase
        }
        const nav = navRef.current
        nav?.style.setProperty('--nav-height', `${88 - progress * 20}px`)
        nav?.style.setProperty('--nav-pad', `${3.2 + progress * .8}vw`)
        nav?.style.setProperty('--nav-gap', `${30 - progress * 6}px`)
        nav?.style.setProperty('--nav-scale', `${1 - progress * .12}`)
        if (Math.abs(targetProgress - displayedHeroProgress) > .0005 || Math.abs(targetExitProgress - displayedExitProgress) > .0005) {
          scrollFrame = window.requestAnimationFrame(updateScroll)
        }
      }

      const projectSection = projectsRef.current
      const projectTrack = projectTrackRef.current
      if (projectSection && projectTrack) {
        const distance = Math.max(1, projectSection.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, (scrollY - projectSection.offsetTop) / distance))
        const horizontalDistance = Math.max(0, projectTrack.scrollWidth - window.innerWidth)
        projectTrack.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`
      }
      updateScrollFades()
    }
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll)
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
    updateScroll()
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
      window.cancelAnimationFrame(scrollFrame)
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
      radius: 6.8 + Math.random() * 5.8,
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
      const density = width < 700 ? 12 : Math.min(36, Math.round(width / 40))
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
      const leafColor = light ? [168, 48, 42] : [212, 168, 75]
      context.fillStyle = `rgba(${leafColor[0]},${leafColor[1]},${leafColor[2]},${leaf.opacity * .38})`
      context.strokeStyle = `rgba(${leafColor[0]},${leafColor[1]},${leafColor[2]},${Math.min(.7, leaf.opacity + .14)})`
      context.lineWidth = Math.max(0.5, length * 0.075)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.beginPath()
      context.moveTo(0, -length * 1.3)
      context.bezierCurveTo(-length * .04, -length * 1.02, -length * .2, -length * .76, -length * .39, -length * .66)
      context.bezierCurveTo(-length * .34, -length * .53, -length * .36, -length * .43, -length * .49, -length * .37)
      context.lineTo(-length * 1.02, -length * .17)
      context.bezierCurveTo(-length * .86, -length * .02, -length * .75, length * .06, -length * .75, length * .19)
      context.bezierCurveTo(-length * .75, length * .3, -length * .83, length * .38, -length * 1.01, length * .42)
      context.bezierCurveTo(-length * .72, length * .4, -length * .5, length * .51, -length * .38, length * .72)
      context.bezierCurveTo(-length * .27, length * .61, -length * .13, length * .57, 0, length * .59)
      context.bezierCurveTo(length * .13, length * .57, length * .27, length * .61, length * .38, length * .72)
      context.bezierCurveTo(length * .5, length * .51, length * .72, length * .4, length * 1.01, length * .42)
      context.bezierCurveTo(length * .83, length * .38, length * .75, length * .3, length * .75, length * .19)
      context.bezierCurveTo(length * .75, length * .06, length * .86, -length * .02, length * 1.02, -length * .17)
      context.lineTo(length * .49, -length * .37)
      context.bezierCurveTo(length * .36, -length * .43, length * .34, -length * .53, length * .39, -length * .66)
      context.bezierCurveTo(length * .2, -length * .76, length * .04, -length * 1.02, 0, -length * 1.3)
      context.closePath()
      context.fill()
      context.stroke()
      context.beginPath()
      context.moveTo(0, -length * 1.18)
      context.bezierCurveTo(-length * .02, -length * .55, length * .01, length * .12, 0, length * .59)
      context.bezierCurveTo(-length * .01, length * .76, length * .01, length * .95, 0, length * 1.09)
      context.moveTo(0, length * .42)
      context.quadraticCurveTo(-length * .38, length * .02, -length * .88, -length * .12)
      context.moveTo(-length * .36, length * .06)
      context.quadraticCurveTo(-length * .58, length * .18, -length * .78, length * .2)
      context.moveTo(0, length * .42)
      context.quadraticCurveTo(length * .38, length * .02, length * .88, -length * .12)
      context.moveTo(length * .36, length * .06)
      context.quadraticCurveTo(length * .58, length * .18, length * .78, length * .2)
      context.stroke()
      context.restore()
    }

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height)
      const pointer = pointerPositionRef.current
      leaves.forEach((leaf) => {
        const dx = leaf.x - pointer.x
        const dy = leaf.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 132) {
          const force = (1 - distance / 132) * 1.28
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

    let active = true
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active && !frame) frame = window.requestAnimationFrame(animate)
      if (!active && frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    }, { rootMargin: '120px 0px' })
    resize()
    visibilityObserver.observe(canvas)
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
      visibilityObserver.disconnect()
    }
  }, [light])

  const scrollTo = (id: string) => {
    if (id === 'about' && heroTransitionRef.current) {
      const section = heroTransitionRef.current
      window.scrollTo({ top: section.offsetTop + section.offsetHeight - window.innerHeight, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className={light ? 'site light' : 'site'}>
      <div className="page-progress" ref={pageProgressRef} />
      <div className="pointer-glow" ref={pointerRef} />
      <header className="nav" ref={navRef}>
        <button className="brand" onClick={() => scrollTo('home')}>DRIFTPOST</button>
        <nav>
          {[['home', 'home'], ['about', 'about'], ['stack', 'club'], ['projects', 'design'], ['roadmap', 'roadmap'], ['contact', 'contact']].map(([target, label]) => <button key={target} onClick={() => scrollTo(target)}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <button aria-label="Switch Language" onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')}>{lang}</button>
          <button aria-label="Toggle theme" className="theme-toggle" onClick={() => setLight(!light)}>{light ? '☼' : '◐'}</button>
        </div>
      </header>

      <div className="hero-transition" ref={heroTransitionRef}>
        <div className="hero-transition-sticky">
          <section id="about" className="about hero-about section-grid content-section">
            <div className="section-label">
              <div className="about-title-stage about-stage-item">
                <small>[001]</small>
                <h2>ABOUT</h2>
              </div>
              <div className="about-icon-stage about-stage-item"><img className="about-writing-image" src="/assets/about/hand-writing.png" alt="执笔写信的手" /></div>
            </div>
            <div className="about-copy">
              <h3 className="about-headline-stage about-stage-item">在打字方便的时代，<br />写信依旧是学生的浪漫</h3>
              <div className="about-body-stage">
                <p className="about-body-line-1 about-stage-item">自2019年始，我们有了一个<strong>约定</strong>。每逢秋深，东莞五十余所高中与中职的少年援笔书怀，将祝福与思念封入素笺；再经一场跨越全城的<strong>接力</strong>——统一收集、校际交换、逐一送达——由<strong>各校文学社</strong>，把每一份心意，稳稳送到对方手中。这便是<strong>漂流瓶</strong>活动，全东莞市规模最大的校际书信交流。</p>
                <p className="about-body-line-2 about-stage-item">活动每年以一个诗词主题启程：2023 年「鸿雁锦书」、2024 年「闲潭梦落」、2025 年「焉问鱼沉」、2026 年「香笺承意」。</p>
                <p className="about-body-line-3 about-stage-item"><strong>那些难能面诉的话，都借由书信来抵达。</strong></p>
              </div>
              <button className="underline-button about-button-stage about-stage-item" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>Read Full <Arrow /></button>
              {expanded && <p className="expanded about-expanded">那些信纸在不同校园之间辗转，也让素未谋面的少年，在同一座城市里彼此抵达。</p>}
            </div>
          </section>

          <div className="hero-page">
            <canvas className="leaf-canvas" ref={leafCanvasRef} aria-hidden="true" />
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

      <section id="stack" className="stack club-section content-section">
        <div className="section-heading club-heading reveal scroll-fade" data-scroll-fade="title"><small>[002]</small><h2>SCHOOL &amp; CLUB</h2></div>
        <ul className="club-list scroll-fade" data-scroll-fade>
          {clubs.map((club, index) => <li className="club-item reveal" key={club.name}>
            <span className="club-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="club-emblem"><img src={`/assets/hero-emblems/${club.logo}`} alt="" /></span>
            <span className="club-name">{club.name}</span>
          </li>)}
        </ul>
      </section>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="projects" className="projects" ref={projectsRef}>
        <div className="projects-sticky">
          <div className="project-track" ref={projectTrackRef}>
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
