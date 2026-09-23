'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { gallerySchools } from './gallery/gallery-data'

const heroColumns = [
  [
    { file: 'jiangfeng.png', name: '江风文学社社徽' },
    { file: 'yundiao.webp', name: '云雕文学社社徽' },
    { file: 'xingzhixiang.webp', name: '星之巷文学社社徽' },
    { file: 'qinghewan.webp', name: '青鹤湾文学社社徽' },
    { file: 'huqing.webp', name: '虎青新闻社社徽' },
  ],
  [
    { file: 'qiufeng.png', name: '秋枫文学社社徽' },
    { file: 'school-52.webp', name: '52赫兹文学社社徽' },
    { file: 'hanxiang.webp', name: '翰香文学社社徽' },
    { file: 'liuyue.webp', name: '流月文学社社徽' },
    { file: 'mubo.webp', name: '沐博文学社社徽' },
    { file: 'qingcaodi.webp', name: '青草地文学社社徽' },
  ],
]

type Club = { school: string; club: string; logo?: string; square?: boolean }

const clubs: Club[] = [
  { school: '东莞市万江中学', club: '江风文学社', logo: 'jiangfeng.png' },
  { school: '东莞市第七高级中学', club: '秋枫文学社', logo: 'qiufeng.png' },
  { school: '东莞市海逸外国语学校', club: '海逸文学社（待确认）' },
  { school: '东莞理工学校', club: '竹韵诗词社' },
  { school: '东莞市石龙中学', club: '乳雁文学社' },
  { school: '东莞市南城开心实验学校', club: '52Herz文学社', logo: 'school-52.webp' },
  { school: '东莞市厚街中学', club: '沙砾文学社' },
  { school: '东莞市第十三高级中学', club: '墨笙文学社' },
  { school: '东莞市实验中学', club: '守望者文学社' },
  { school: '东莞市虎门中学', club: '春蕾文学社' },
  { school: '东莞市电子科技学校（中职代表）', club: '浪潮文学社' },
  { school: '东莞外国语学校', club: '候鸟文学社' },
  { school: '东莞市长安中学', club: '莲峰文学社' },
  { school: '东莞市东方明珠学校', club: '长庚文学社' },
  { school: '东莞市第八高级中学', club: '山风文学社' },
  { school: '东莞市东华高级中学（东城校区）', club: '旗峰文学社' },
  { school: '东莞市翰林高级学校', club: '兰襟文学社' },
  { school: '东莞市济川中学', club: '沐博文学社', logo: 'mubo.webp' },
  { school: '东莞市第六高级中学', club: '翰香文学社', logo: 'hanxiang.webp' },
  { school: '东莞中学松山湖学校', club: '松云文学社' },
  { school: '东莞市虎门外语学校', club: '青年通讯社', logo: 'huqing.webp' },
  { school: '东莞中学', club: '云雕文学社', logo: 'yundiao.webp' },
  { school: '东莞市粤华学校', club: '流月文学社', logo: 'liuyue.webp' },
  { school: '东莞市第二高级中学', club: '旗峰文学社' },
  { school: '东莞市东华松山湖高级中学', club: '辞故文学社' },
  { school: '东莞市海德双语学校', club: '拾遗文学社' },
  { school: '东莞市第五高级中学', club: '汉苑文学社' },
  { school: '东莞市翰林实验学校', club: '伴路文学社' },
  { school: '东莞市常平中学', club: '青鹤湾文学社', logo: 'qinghewan.webp' },
  { school: '东莞市第四高级中学', club: '芜春文学社' },
  { school: '东莞市第一中学', club: '繁蕊文学社' },
  { school: '东莞市北辰高级中学', club: '星之巷文学社', logo: 'xingzhixiang.webp' },
  { school: '东莞市东华高级中学（生态园校区）', club: '燕岭文学社' },
  { school: '东莞市光明中学', club: '景行文学社' },
  { school: '东莞高级中学', club: '青草地文学社', logo: 'qingcaodi.webp' },
  { school: '东莞市商业学校（莞城校区）', club: '玉鸣吟诵社' },
  { school: '东莞市海德实验学校', club: '海燕文学社' },
  { school: '东莞市电子商贸学校', club: '朝霞文学社' },
  { school: '东莞市弘林高级中学', club: '南亦书舍文学社' },
  { school: '东莞松山湖未来学校', club: '未星文学社' },
  { school: '东莞市东晖实验学校', club: '青葵文学社' },
  { school: '东莞市商业学校（东城校区）', club: '听雨文学社', logo: 'tingyu.png', square: true },
]

const siteClubs = clubs.filter((club) => club.logo)
const activityOnlyClubs = clubs.filter((club) => !club.logo)

type OrderSchool = { name: string; url: string; qr?: string }

const orderSchools: OrderSchool[] = [
  { name: '东莞市万江中学', url: '' },
  { name: '东莞市第七高级中学', url: '' },
  { name: '东莞中学', url: 'https://xtfvzrr0.jsjform.com/f/ZmoVtk', qr: '/assets/order-qr/yundiao.png' },
  { name: '东莞高级中学', url: 'https://xtfvzrr0.jsjform.com/f/A0WyO7', qr: '/assets/order-qr/qingcaodi.png' },
  { name: '东莞市虎门外语学校', url: 'https://xtfvzrr0.jsjform.com/f/icpD1B', qr: '/assets/order-qr/humen.png' },
  { name: '东莞市第六高级中学', url: 'https://xtfvzrr0.jsjform.com/f/S4ggaG', qr: '/assets/order-qr/hanxiang.png' },
  { name: '东莞市常平中学', url: 'https://xtfvzrr0.jsjform.com/f/F1wGDU', qr: '/assets/order-qr/qinghewan.png' },
  { name: '东莞市粤华学校', url: 'https://xtfvzrr0.jsjform.com/f/ukG9pM', qr: '/assets/order-qr/liuyue.png' },
  { name: '东莞市济川中学', url: '' },
  { name: '东莞市南城开心实验学校', url: '' },
  { name: '东莞市北辰高级中学', url: '' },
  { name: '东莞市商业学校（东城校区）', url: '' },
]

type Project = { type: string; year: string; title: string; image: string; cardClass?: string; gallery?: string }

const projects: Project[] = [
  { type: '信封设计', year: '2026', title: '听雨', image: '/assets/projects/tingyu-poster.jpg', cardClass: 'project-card--tingyu', gallery: 'tingyu' },
  { type: '信封设计', year: '2026', title: '星之巷', image: '/assets/projects/xingzhixiang-poster.webp' },
  { type: '信封设计', year: '2026', title: '青草地', image: '/assets/projects/qingcaodi-poster.webp' },
]

const roadmap = [
  { year: '2019–2022', text: '尝试、号召、启程。', tags: [] },
  { year: '2023', theme: '鸿雁锦书', period: '9月—12月', quote: '“云中谁寄锦书来，雁字回时，月满西楼” ——李清照《一剪梅》', text: '覆盖全市48所普通高中，累计交换信件量达22万封，参与人数约6–7万，相关推文阅读量达10万+。', tags: [] },
  { year: '2024', theme: '闲潭梦落', period: '10月—12月', quote: '“昨夜闲潭梦落花，可怜春半不还家” ——张若虚《春江花月夜》', text: '吸引全市51所普高及中职学子参与。活动公众号推文累计阅读30万次，用户16万，信件数量达28万封，正成为东莞“文化强市”重要力量，构建高中生校园“时代记忆”。', tags: [] },
  { year: '2025', theme: '焉问鱼沉', period: '10月—12月', quote: '“渐行渐远渐无书，水阔鱼沉何处问” ——欧阳修《木兰花》', text: '覆盖全市51所高中、中职院校；首次联动东莞展览馆开设“漂流瓶驿站”，并增设“我眼中的城市文明”专项书信征文活动。', tags: [] },
  { year: '2026', theme: '香笺承意', period: '10月—12月', quote: '“香笺一纸，写尽回纹机上意” ——苏轼《减字木兰花·得书》', text: '拟开展书信撰写、校际交换及收尾工作，并联动东莞展览馆设置“漂流瓶驿站”，举办“我眼中的校园文化”专项书信征文与“我眼中的城市文明”明信片（信封）设计比赛。', tags: [] },
]

const ticker = 'LETTERS ACROSS DISTANCE  •  WORDS WITH INTENTION  •  AUTUMN CORRESPONDENCE  •  CONNECTION BEYOND CAMPUSES  •  RELAY BORN OF PASSION  •  ROMANCE BELONGING TO STUDENTS  •  '

function Arrow() {
  return <span className="arrow" aria-hidden="true"><svg viewBox="0 0 16 16" focusable="false"><path d="M3 13 13 3M5 3h8v8" /></svg></span>
}

function ArrowRight() {
  return <span className="scroll-label-arrow" aria-hidden="true"><svg viewBox="0 0 18 12" focusable="false"><path d="M1 6h15m-5-5 5 5-5 5" /></svg></span>
}

function LetteredWord({ text }: { text: string }) {
  return <span className="lettered-word" aria-label={text}>{Array.from(text).map((letter, index) => <span aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>)}</span>
}

function LetteredPhrase({ text, className = '' }: { text: string; className?: string }) {
  return <span className={`lettered-phrase ${className}`.trim()} aria-label={text}>{text.split(' ').map((word, index) => <LetteredWord text={word} key={`${word}-${index}`} />)}</span>
}

export default function Home() {
  const [light, setLight] = useState(false)
  const [season, setSeason] = useState<'autumn' | 'winter'>('autumn')
  const [expanded, setExpanded] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [schoolMenuOpen, setSchoolMenuOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState('')
  const [orderNotice, setOrderNotice] = useState('')
  const [orderQrSchool, setOrderQrSchool] = useState('')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [gallerySchoolMenuOpen, setGallerySchoolMenuOpen] = useState(false)
  const [selectedGallerySchool, setSelectedGallerySchool] = useState('')
  const [buildNotice, setBuildNotice] = useState('')
  const pageProgressRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const leafCanvasRef = useRef<HTMLCanvasElement>(null)
  const pointerPositionRef = useRef({ x: -1000, y: -1000 })
  const projectsRef = useRef<HTMLElement>(null)
  const projectTrackRef = useRef<HTMLDivElement>(null)
  const heroTransitionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const contactPanelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('gallery') !== '1') return
    setGallerySchoolMenuOpen(false)
    setSelectedGallerySchool('')
    setGalleryOpen(true)
    window.history.replaceState(null, '', `${window.location.pathname}#projects`)
  }, [])

  useEffect(() => {
    if (!orderOpen && !galleryOpen && !buildNotice) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (galleryOpen) {
        if (gallerySchoolMenuOpen) setGallerySchoolMenuOpen(false)
        else setGalleryOpen(false)
      } else if (buildNotice) setBuildNotice('')
      else if (schoolMenuOpen) setSchoolMenuOpen(false)
      else setOrderOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [orderOpen, galleryOpen, schoolMenuOpen, gallerySchoolMenuOpen, buildNotice])

  const openOrderDialog = () => {
    setSchoolMenuOpen(false)
    setSelectedSchool('')
    setOrderNotice('')
    setOrderQrSchool('')
    setOrderOpen(true)
  }

  const submitOrder = () => {
    const school = orderSchools.find((item) => item.name === selectedSchool)
    if (!school) return
    if (school.qr) {
      setOrderQrSchool(school.name)
      setSchoolMenuOpen(false)
      return
    }
    if (!school.url) {
      setOrderNotice('该学校的订购链接待开放')
      return
    }
    window.location.assign(school.url)
  }

  const openGalleryDialog = () => {
    setGallerySchoolMenuOpen(false)
    setSelectedGallerySchool('')
    setGalleryOpen(true)
  }

  const openSelectedGallery = () => {
    const school = gallerySchools.find((item) => item.name === selectedGallerySchool)
    if (!school) return
    window.location.assign(`/gallery/${school.slug}`)
  }

  const openProject = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (project.gallery) return
    event.preventDefault()
    setBuildNotice(project.title)
  }

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
    let displayedTimelineTop = 0
    let displayedTimelineBottom = 0
    let displayedContactShift = 54
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
        const aboutFocusTargets = Array.from(heroTransition.querySelectorAll<HTMLElement>('.hero-about .section-label, .hero-about .about-copy'))
        const aboutRects = aboutFocusTargets.map((element) => element.getBoundingClientRect())
        aboutFocusTargets.forEach((element, index) => {
          const rect = aboutRects[index]
          element.classList.toggle('is-focus-visible', rect.top < window.innerHeight && rect.bottom > 0)
        })
        const aboutIntersectsViewport = aboutRects.some((rect) => rect.top < window.innerHeight && rect.bottom > 0)
        const nextAboutPhase = aboutIntersectsViewport ? 'visible' : aboutRects.length > 0 && aboutRects.every((rect) => rect.bottom <= 0) ? 'after' : 'before'
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
        if (window.innerWidth <= 800) {
          projectTrack.style.transform = 'none'
        } else {
          const distance = Math.max(1, projectSection.offsetHeight - window.innerHeight)
          const progress = Math.min(1, Math.max(0, (scrollY - projectSection.offsetTop) / distance))
          const horizontalDistance = Math.max(0, projectTrack.scrollWidth - window.innerWidth)
          projectTrack.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`
        }
      }
      const timeline = timelineRef.current
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const height = Math.max(1, rect.height)
        const targetVisibleTop = Math.min(1, Math.max(0, -rect.top / height))
        const targetVisibleBottom = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / height))
        const timelineBlend = 1 - Math.exp(-elapsed / 240)
        displayedTimelineTop += (targetVisibleTop - displayedTimelineTop) * timelineBlend
        displayedTimelineBottom += (targetVisibleBottom - displayedTimelineBottom) * timelineBlend
        const visibleTop = displayedTimelineTop
        const visibleBottom = displayedTimelineBottom
        const edgeFade = Math.min(.07, 90 / height)
        let clearTop = Math.min(1, visibleTop + edgeFade)
        let clearBottom = Math.max(0, visibleBottom - edgeFade)
        if (clearTop > clearBottom) clearTop = clearBottom = (visibleTop + visibleBottom) / 2
        timeline.style.setProperty('--timeline-visible-top', `${(visibleTop * 100).toFixed(3)}%`)
        timeline.style.setProperty('--timeline-clear-top', `${(clearTop * 100).toFixed(3)}%`)
        timeline.style.setProperty('--timeline-clear-bottom', `${(clearBottom * 100).toFixed(3)}%`)
        timeline.style.setProperty('--timeline-visible-bottom', `${(visibleBottom * 100).toFixed(3)}%`)
        if ((Math.abs(targetVisibleTop - displayedTimelineTop) > .0004 || Math.abs(targetVisibleBottom - displayedTimelineBottom) > .0004) && !scrollFrame) {
          scrollFrame = window.requestAnimationFrame(updateScroll)
        }
      }
      const contactPanel = contactPanelRef.current
      if (contactPanel) {
        const rect = contactPanel.getBoundingClientRect()
        const layoutTop = rect.top + scrollY - displayedContactShift
        const contactProgress = Math.min(1, Math.max(0, (scrollY + window.innerHeight - layoutTop) / (window.innerHeight * .72)))
        const targetContactShift = 54 - contactProgress * 90
        const contactBlend = 1 - Math.exp(-elapsed / 170)
        displayedContactShift += (targetContactShift - displayedContactShift) * contactBlend
        contactPanel.style.setProperty('--contact-panel-shift', `${displayedContactShift.toFixed(2)}px`)
        if (Math.abs(targetContactShift - displayedContactShift) > .05 && !scrollFrame) {
          scrollFrame = window.requestAnimationFrame(updateScroll)
        }
      }
      updateScrollFades()
    }
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll)
    }
    let pointerFrame = 0
    let pointerX = -100
    let pointerY = -100
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    // Only devices with a real hover-capable pointer may disturb the particles. Some mobile
    // and in-app browsers report a finger drag as a synthetic mouse move with buttons === 0,
    // so event.pointerType/buttons alone cannot reliably distinguish scrolling from hovering.
    const parkPointer = () => {
      pointerPositionRef.current.x = -1000
      pointerPositionRef.current.y = -1000
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) { parkPointer(); return }
      if (event.buttons !== 0) { parkPointer(); return }
      if (event.pointerType !== 'mouse') { parkPointer(); return }
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
    // Whenever a press ends (or is cancelled) the pointer reference is parked, so nothing
    // keeps reacting to a finger that is no longer there.
    const onPointerEnd = () => parkPointer()
    const onPointerDown = () => parkPointer()
    const projectScroller = projectsRef.current?.querySelector<HTMLElement>('.projects-sticky')
    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    projectScroller?.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    // Belt and braces: some in-app browsers (WeChat / WKWebView) do not always dispatch
    // pointer events for touch, so a touch directly parks the pointer too.
    window.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerDown, { passive: true })
    window.addEventListener('touchend', onPointerEnd, { passive: true })
    window.addEventListener('touchcancel', onPointerEnd, { passive: true })
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.reveal, .reveal-line').forEach((element) => observer.observe(element))
    const focusObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle('is-focus-visible', entry.isIntersecting)
    }), { threshold: 0.01 })
    document.querySelectorAll('.focus-reveal-item').forEach((element) => focusObserver.observe(element))
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      projectScroller?.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      window.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchmove', onPointerDown)
      window.removeEventListener('touchend', onPointerEnd)
      window.removeEventListener('touchcancel', onPointerEnd)
      window.cancelAnimationFrame(scrollFrame)
      window.cancelAnimationFrame(pointerFrame)
      observer.disconnect()
      focusObserver.disconnect()
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
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)')
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
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      // Mobile address bars change the viewport height while the user scrolls. Rebuilding all
      // particles for those height-only resizes makes the field visibly jump; a width change
      // still covers rotation and genuine layout changes.
      if (coarsePointer.matches && width && nextWidth === width && nextHeight !== height) return
      width = nextWidth
      height = nextHeight
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
      if (season === 'winter') {
        const snowColor = light ? [14, 14, 14] : [244, 244, 244]
        context.strokeStyle = `rgba(${snowColor[0]},${snowColor[1]},${snowColor[2]},${Math.min(.72, leaf.opacity + .16)})`
        context.lineWidth = Math.max(.65, length * .075)
        context.lineCap = 'round'
        for (let arm = 0; arm < 6; arm += 1) {
          context.save()
          context.rotate(arm * Math.PI / 3)
          context.beginPath()
          context.moveTo(0, 0)
          context.lineTo(0, -length)
          context.moveTo(0, -length * .58)
          context.lineTo(-length * .24, -length * .76)
          context.moveTo(0, -length * .58)
          context.lineTo(length * .24, -length * .76)
          context.stroke()
          context.restore()
        }
        context.restore()
        return
      }
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

    let previousFrame = 0
    const animate = (time: number) => {
      // normalise the simulation to 60fps so a slow frame cannot inject a huge push
      const step = previousFrame ? Math.min(3, Math.max(0.25, (time - previousFrame) / 16.667)) : 1
      previousFrame = time
      context.clearRect(0, 0, width, height)
      const pointer = pointerPositionRef.current
      leaves.forEach((leaf) => {
        const dx = leaf.x - pointer.x
        const dy = leaf.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 132) {
          const force = (1 - distance / 132) * 1.28
          leaf.pushX += dx / distance * force * step
          leaf.pushY += dy / distance * force * step
        }
        // the push is bounded, so a fast pointer can never fling a leaf across the screen
        const pushLength = Math.hypot(leaf.pushX, leaf.pushY)
        if (pushLength > 6) {
          leaf.pushX = leaf.pushX / pushLength * 6
          leaf.pushY = leaf.pushY / pushLength * 6
        }
        leaf.pushX *= 0.955
        leaf.pushY *= 0.955
        leaf.x += (Math.sin(time * 0.00032 + leaf.phase) * leaf.drift + leaf.pushX) * step
        leaf.y += (leaf.speed + leaf.pushY) * step
        leaf.angle += (leaf.spin + Math.sin(time * 0.00024 + leaf.phase) * 0.002) * step
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
  }, [light, season])

  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
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
          {[['about', 'about'], ['stack', 'club'], ['projects', 'design'], ['roadmap', 'roadmap'], ['contact', 'contact']].map(([target, label]) => <button key={target} onClick={() => scrollTo(target)}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <button className="season-toggle" aria-label={season === 'autumn' ? '切换为冬季模式' : '切换为秋季模式'} title={season === 'autumn' ? '当前：秋季，点击切换冬季' : '当前：冬季，点击切换秋季'} onClick={() => setSeason(season === 'autumn' ? 'winter' : 'autumn')}>
            {season === 'autumn'
              ? <svg className="season-icon season-icon--autumn" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 1.7 1.5 3.1 3.2-1-.6 3.4 3.4.6-2.3 2.7 2.7 2.2-3.3 1.2.8 3.4-3.2-.9-1.1 3.3-1.9-2.8-2.8 2-.1-3.5-3.5-.2 2.1-2.8-2.8-2 3.1-1.5-1.2-3.2 3.5.3z"/><path d="m11.2 13.2 1.1 8.6"/></svg>
              : <svg className="season-icon season-icon--winter" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9.3 4.8 12 7.5l2.7-2.7M9.3 19.2 12 16.5l2.7 2.7M4.1 10.1l3.7-.7-.7-3.7M16.9 18.3l.7-3.7 3.7.7M4.1 13.9l3.7.7-.7 3.7M16.9 5.7l.7 3.7 3.7-.7"/></svg>}
          </button>
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
              {expanded && <p className="expanded about-expanded">人无法两次踏入同一条河流，却能在一张泛黄的纸页里，与年少的自己阔别重逢。</p>}
            </div>
          </section>

          <div className="hero-page">
            <canvas className="leaf-canvas" ref={leafCanvasRef} aria-hidden="true" />
            <section id="home" className="hero section-grid">
              <div className="hero-copy hero-fade">
                <div className="hero-kicker" aria-hidden="true"><span className="envelope-mark" /></div>
                <h1><span lang="zh-CN">漂流瓶</span><br /><em><LetteredPhrase text="DRIFTPOST" className="driftpost-lettering" /></em></h1>
                <p className="hero-manifesto"><span className="manifesto-line manifesto-year" lang="zh-CN"><LetteredPhrase text="2026" /><b><LetteredPhrase text="香笺承意" /></b></span><span className="manifesto-line"><LetteredPhrase text="We may stumble, but we always arrive." /></span><span className="manifesto-line"><LetteredPhrase text="And you, like us, will eventually reach" /><b><LetteredPhrase text="the other side." /></b></span></p>
                <div className="hero-buttons"><button className="pill primary journey-button" onClick={() => scrollTo('about')} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--journey-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--journey-y', `${event.clientY - rect.top}px`) }}><span className="journey-button-content"><LetteredPhrase text="了解这趟旅程" className="cta-lettering" /> <Arrow /></span></button><button className="text-button order-button" onClick={openOrderDialog}><span className="explore-orbit">◌</span><LetteredPhrase text="信封订购" className="cta-lettering" /></button></div>
              </div>
              <div className="hero-collage hero-emblems" aria-label="文学社社徽展示">
                {heroColumns.map((images, columnIndex) => <div className={`hero-column hero-column-${columnIndex + 1}`} key={columnIndex}><div className="hero-column-track">{[0, 1].map((copy) => <div className="hero-column-set" aria-hidden={copy === 1} key={copy}>{images.map((image) => <div className="portrait" key={`${copy}-${image.file}`}><img src={`/assets/hero-emblems/${image.file}`} alt={copy === 0 ? image.name : ''} /></div>)}</div>)}</div></div>)}
                <div className="hero-motion-rail" aria-hidden="true"><span>SCROLL</span><i><b /></i><small>01 / {String(siteClubs.length).padStart(2, '0')}</small></div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="stack" className="stack club-section content-section">
        <div className="section-heading club-heading focus-reveal-item"><small>[002]</small><h2>SCHOOLS &amp; CLUBS</h2><p>本届活动共有 {clubs.length} 所学校与校区参与，其中 {siteClubs.length} 个社团已上线网站。</p></div>
        <div className="club-groups">
          <section className="club-group club-group-featured focus-reveal-item" aria-labelledby="site-clubs-title">
            <div className="club-group-heading"><div><small>ONLINE CLUBS</small><h3 id="site-clubs-title">已上线网站的社团</h3></div><span>{String(siteClubs.length).padStart(2, '0')} / {String(clubs.length).padStart(2, '0')}</span></div>
            <ul className="club-list club-list-featured">
              {siteClubs.map((club, index) => <li className="club-item" key={club.school}>
                <span className="club-number">{String(index + 1).padStart(2, '0')}</span>
                <span className={`club-emblem${club.square ? ' club-emblem-square' : ''}`}><img src={`/assets/hero-emblems/${club.logo}`} alt="" /></span>
                <span className="club-name"><strong>{club.school}</strong><small>{club.club}</small></span>
              </li>)}
            </ul>
          </section>
          <section className="club-group club-group-community focus-reveal-item" aria-labelledby="activity-clubs-title">
            <div className="club-group-heading"><div><small>ACTIVITY PARTICIPANTS</small><h3 id="activity-clubs-title">其他活动参与学校</h3></div><span>{String(activityOnlyClubs.length).padStart(2, '0')} / {String(clubs.length).padStart(2, '0')}</span></div>
            <p className="club-group-note">同样参与漂流瓶活动，目前未上线网站。</p>
            <ul className="club-list club-list-community">
              {activityOnlyClubs.map((club, index) => <li className="club-item club-item-plain" key={club.school}>
                <span className="club-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="club-name"><strong>{club.school}</strong><small>{club.club}</small></span>
              </li>)}
            </ul>
          </section>
        </div>
      </section>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="projects" className="projects" ref={projectsRef}>
        <div className="projects-sticky">
          <div className="project-track" ref={projectTrackRef}>
            <div className="projects-intro scroll-fade" data-scroll-fade="project-title"><small>[003]</small><h2>DESIGN</h2><p className="projects-subtitle">高中文创画廊</p><p className="projects-description">收录各校文学社精心设计的文创作品，<br />这里是我们留给时光的小小存档。</p><small className="scroll-label">SCROLL TO EXPLORE <ArrowRight /></small></div>
            {projects.map((project) => <article className={`project-card scroll-fade${project.cardClass ? ` ${project.cardClass}` : ''}`} data-scroll-fade="horizontal" key={project.title}><a className="project-link" href={project.gallery ? `/gallery/${project.gallery}` : '/gallery/'} aria-haspopup={project.gallery ? undefined : 'dialog'} aria-label={project.gallery ? `进入${project.title}画廊` : `${project.title}画廊还在建设中`} onClick={(event) => openProject(event, project)}><div className="project-image"><img src={project.image} alt={project.title} /><div className="project-overlay"><span>{project.gallery ? 'VIEW PROJECT' : 'COMING SOON'}</span><Arrow /></div></div></a><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div><h3>{project.title}</h3></article>)}
            <div className="project-end scroll-fade" data-scroll-fade="horizontal"><button className="project-more-button" type="button" aria-label="查看更多文创作品" onClick={openGalleryDialog}>MORE <Arrow /></button></div>
          </div>
        </div>
      </section>

      <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>

      <section id="roadmap" className="roadmap content-section">
        <div className="center-heading roadmap-heading focus-reveal-item"><small>[004]</small><h2>ROADMAP</h2><p>时间只会带走从未被认真对待过的事物。</p></div>
        <div className="timeline" ref={timelineRef}>{roadmap.map((item, i) => <article className="timeline-item" key={item.year}><div className="timeline-dot" /><div className="timeline-card focus-reveal-item"><small>0{i + 1}</small><h3>{item.year}</h3>{item.theme && <div className="timeline-event-meta"><strong>{item.theme}</strong><span>{item.period}</span></div>}{item.quote && <blockquote>{item.quote}</blockquote>}<p>{item.text}</p>{item.tags.length > 0 && <div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}</div></article>)}</div>
        <div className="roadmap-outro" aria-hidden="true"><span>ROAD MAP</span></div>
      </section>

      <section id="contact" className="contact-panel" ref={contactPanelRef}>
        <div className="ticker"><span>{ticker}</span><span>{ticker}</span></div>
        <div className="contact content-section">
          <div className="center-heading reveal scroll-fade" data-scroll-fade><small>[006]</small><h2>CONTACT</h2><p>任何想法，联系我们</p></div>
          <div className="contact-links reveal scroll-fade" data-scroll-fade><a href="mailto:driftpost@163.com"><span>SEND AN EMAIL</span><b>driftpost@163.com</b><Arrow /></a><div className="contact-channel"><span>微信公众号</span><b>莞字文鸣</b><span className="arrow contact-channel-spacer" aria-hidden="true">↗</span></div></div>
          <footer className="reveal scroll-fade" data-scroll-fade><span>© 2026 DRIFTPOST. All rights reserved.</span></footer>
        </div>
      </section>

      {orderOpen && <div className="order-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setSchoolMenuOpen(false); setOrderOpen(false) } }}>
        <section className="order-dialog" role="dialog" aria-modal="true" aria-labelledby="order-dialog-title">
          <button className="order-dialog-close" aria-label="关闭订购窗口" onClick={() => { setSchoolMenuOpen(false); setOrderOpen(false) }}>×</button>
          <small>DRIFTPOST ORDER</small>
          <h2 id="order-dialog-title">信封订购</h2>
          {orderQrSchool ? <div className="order-qr-view">
            <p>{orderQrSchool}<br />请使用微信扫描二维码进入订购表单。</p>
            <div className="order-qr-frame"><img src={orderSchools.find((school) => school.name === orderQrSchool)?.qr} alt={`${orderQrSchool}信封订购二维码`} /></div>
            <button className="order-dialog-submit" onClick={() => setOrderQrSchool('')}>返回学校选择</button>
          </div> : <>
            <p>选择你所在的学校，我们会带你前往对应的订购页面。</p>
            <span className="order-school-label" id="order-school-label">所在学校</span>
            <div className="order-school-picker">
              <button className="order-school-trigger" id="order-school-trigger" aria-labelledby="order-school-label order-school-trigger" aria-haspopup="listbox" aria-expanded={schoolMenuOpen} onClick={() => setSchoolMenuOpen(!schoolMenuOpen)} autoFocus><span>{selectedSchool || '请选择学校'}</span><b aria-hidden="true">⌄</b></button>
              {schoolMenuOpen && <div className="order-school-menu" role="listbox" aria-labelledby="order-school-label">
                {orderSchools.map((school) => <button className={selectedSchool === school.name ? 'selected' : ''} role="option" aria-selected={selectedSchool === school.name} onClick={() => { setSelectedSchool(school.name); setOrderNotice(''); setOrderQrSchool(''); setSchoolMenuOpen(false) }} key={school.name}>{school.name}<span aria-hidden="true">{selectedSchool === school.name ? '✓' : ''}</span></button>)}
              </div>}
            </div>
            <button className="order-dialog-submit" disabled={!selectedSchool} onClick={submitOrder}>{orderSchools.find((school) => school.name === selectedSchool)?.qr ? '显示订购二维码' : '立即订购'} <Arrow /></button>
            <p className="order-dialog-notice" role="status">{orderNotice}</p>
          </>}
        </section>
      </div>}

      {galleryOpen && <div className="order-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setGallerySchoolMenuOpen(false); setGalleryOpen(false) } }}>
        <section className="order-dialog gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title">
          <button className="order-dialog-close" aria-label="关闭画廊选择窗口" onClick={() => { setGallerySchoolMenuOpen(false); setGalleryOpen(false) }}>×</button>
          <small>DRIFTPOST GALLERY</small>
          <h2 id="gallery-dialog-title">选择学校画廊</h2>
          <p>选择一所学校，进入对应文学社的文创作品画廊。</p>
          <span className="order-school-label" id="gallery-school-label">学校</span>
          <div className="order-school-picker">
            <button className="order-school-trigger" id="gallery-school-trigger" aria-labelledby="gallery-school-label gallery-school-trigger" aria-haspopup="listbox" aria-expanded={gallerySchoolMenuOpen} onClick={() => setGallerySchoolMenuOpen(!gallerySchoolMenuOpen)} autoFocus><span>{selectedGallerySchool || '请选择学校'}</span><b aria-hidden="true">⌄</b></button>
            {gallerySchoolMenuOpen && <div className="order-school-menu" role="listbox" aria-labelledby="gallery-school-label">
              {gallerySchools.map((school) => <button className={selectedGallerySchool === school.name ? 'selected' : ''} role="option" aria-selected={selectedGallerySchool === school.name} onClick={() => { setSelectedGallerySchool(school.name); setGallerySchoolMenuOpen(false) }} key={school.slug}>{school.name}<span aria-hidden="true">{selectedGallerySchool === school.name ? '✓' : ''}</span></button>)}
            </div>}
          </div>
          <button className="order-dialog-submit" disabled={!selectedGallerySchool} onClick={openSelectedGallery}>进入画廊 <Arrow /></button>
        </section>
      </div>}

      {buildNotice && <div className="order-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBuildNotice('') }}>
        <section className="order-dialog build-notice-dialog" role="dialog" aria-modal="true" aria-labelledby="build-notice-title">
          <button className="order-dialog-close" aria-label="关闭画廊建设中提示" onClick={() => setBuildNotice('')} autoFocus>×</button>
          <small>DRIFTPOST GALLERY</small>
          <h2 id="build-notice-title">画廊建设中</h2>
          <p><b>{buildNotice}</b>的文创作品画廊还在建设中，完成后会在这里与大家见面。</p>
          <button className="order-dialog-submit" onClick={() => { setBuildNotice(''); openGalleryDialog() }}>看看其他画廊 <Arrow /></button>
        </section>
      </div>}
    </main>
  )
}
