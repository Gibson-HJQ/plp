'use client'

import { useMemo, useState, type CSSProperties } from 'react'

type SchoolGalleryExperienceProps = {
  schoolName: string
  clubName: string
  schoolSlug: string
  images: string[]
  wallImages: string[]
  postcards: string[]
  characters: string[]
  featureImage?: string
  note: string
}

type GalleryItem = { image?: string; number: number }

function Artwork({ item, clubName, schoolSlug }: { item: GalleryItem; clubName: string; schoolSlug: string }) {
  return item.image
    ? <img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(item.image)}`} alt={`${clubName}作品 ${item.number}`} />
    : <div className="gallery-placeholder" aria-label={`预留画框 ${item.number}`}><span>{String(item.number).padStart(2, '0')}</span></div>
}

export default function SchoolGalleryExperience({ schoolName, clubName, schoolSlug, images, wallImages, postcards, characters, featureImage, note }: SchoolGalleryExperienceProps) {
  const hasFeatureLayout = schoolSlug === 'yuehua' || schoolSlug === 'wanjiang'
  const minimumItems = schoolSlug === 'yuehua' ? 4 : schoolSlug === 'wanjiang' ? 1 : 6
  const items = useMemo<GalleryItem[]>(() => Array.from({ length: Math.max(minimumItems, images.length) }, (_, index) => ({ image: images[index], number: index + 1 })), [images, minimumItems])
  const wallItems: GalleryItem[] = schoolSlug === 'no7-senior'
    ? Array.from({ length: 4 }, (_, index) => ({ image: wallImages[index], number: index + 1 }))
    : hasFeatureLayout
      ? Array.from({ length: 4 }, (_, index) => ({ number: index + 1 }))
    : items.slice(0, 4)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightsOn, setLightsOn] = useState(false)
  const hasGalleryLamp = schoolSlug === 'no7-senior' || hasFeatureLayout

  const move = (direction: number) => setActiveIndex((current) => (current + direction + items.length) % items.length)

  const circularOffset = (index: number) => {
    let offset = (index - activeIndex + items.length) % items.length
    if (offset > items.length / 2) offset -= items.length
    return offset
  }

  return <div className={`gallery-experience${hasGalleryLamp ? (lightsOn ? ' is-lit' : ' is-dim') : ''}`}>
    <section className="gallery-hero">
      <small>[ CLUB ARCHIVE ]</small>
      <div className="gallery-hero-title">
        <p>{schoolName}</p>
        <h1>{clubName}</h1>
      </div>
      {hasGalleryLamp && <button className="gallery-lamp" type="button" aria-label={lightsOn ? '关灯，恢复灰度' : '开灯，恢复色彩'} aria-pressed={lightsOn} onClick={() => setLightsOn((current) => !current)}>
        <svg viewBox="0 0 160 300" aria-hidden="true" focusable="false">
          <path className="lamp-cord" d="M80 0v153" />
          <path className="lamp-shade" d="M42 216 60 153h40l18 63z" />
          <path className="lamp-bulb" d="M64 216v9a16 16 0 0 0 32 0v-9" />
          <path className="lamp-glow" d="M36 238 20 253m104-15 16 15M80 249v23" />
        </svg>
        <span>{lightsOn ? 'LIGHT ON' : 'LIGHT OFF'}</span>
      </button>}
    </section>

    <section className={`gallery-loop-section${schoolSlug === 'no7-senior' || hasFeatureLayout ? ' gallery-loop-natural' : ''}`} aria-label={`${clubName}循环作品画廊`}>
      <div className="gallery-section-label"><span>SELECTED WORKS</span><span>USE ARROWS TO CYCLE</span></div>
      <div className="gallery-loop">
        {items.map((item, index) => {
          const offset = circularOffset(index)
          const distance = Math.abs(offset)
          const style = {
            '--gallery-shift': `${offset * 66}%`,
            '--gallery-depth': `${distance * -110}px`,
            '--gallery-scale': Math.max(.64, 1 - distance * .12),
            '--gallery-opacity': Math.max(.08, 1 - distance * .34),
            '--gallery-layer': items.length - distance,
          } as CSSProperties
          return <figure className={`gallery-loop-item${offset === 0 ? ' is-active' : ''}`} style={style} aria-label={`作品 ${item.number}`} aria-current={offset === 0 ? 'true' : undefined} key={item.image ?? `loop-empty-${index}`}>
            <span className="gallery-loop-frame"><Artwork item={item} clubName={clubName} schoolSlug={schoolSlug} /></span>
            <span className="gallery-loop-caption">{String(item.number).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          </figure>
        })}
      </div>
      <div className="gallery-loop-controls">
        <button onClick={() => move(-1)} aria-label="上一幅作品">←</button>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button onClick={() => move(1)} aria-label="下一幅作品">→</button>
      </div>
    </section>

    <section className={`gallery-hanging-section${schoolSlug === 'no7-senior' ? ' gallery-hanging-section--no7 gallery-hanging-section--natural' : ''}${hasFeatureLayout ? ' gallery-hanging-section--feature gallery-hanging-section--natural' : ''}`} aria-label="独立展出作品">
      <div className="gallery-section-label"><span>ON THE WALL</span><span>FOUR FRAMES</span></div>
      <div className="gallery-hanging-grid">
        {wallItems.map((item, index) => <figure className={`gallery-hanging-frame hanging-frame-${index + 1}`} key={item.image ?? `hanging-empty-${index}`}>
          <div className="gallery-wire" aria-hidden="true" />
          <div className="gallery-mounted-art"><Artwork item={item} clubName={clubName} schoolSlug={schoolSlug} /></div>
          <figcaption>{String(item.number).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
      {featureImage && <figure className="gallery-feature-frame">
        <div className="gallery-wire" aria-hidden="true" />
        <div className="gallery-feature-art"><img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(featureImage)}`} alt={`${clubName}社拟形象`} /></div>
        <figcaption>05</figcaption>
      </figure>}
    </section>

    {postcards.length > 0 && <section className="no7-postcards" aria-label="秋枫文学社明信片">
      <div className="gallery-section-label"><span>POSTCARDS</span><span>03 WORKS</span></div>
      <div className="no7-postcard-grid">
        {postcards.map((image, index) => <figure className="no7-postcard" key={image}>
          <img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(image)}`} alt={`${clubName}明信片 ${index + 1}`} />
          <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
    </section>}

    {characters.length > 0 && <section className="no7-characters" aria-label="秋枫文学社社拟人物">
      <div className="gallery-section-label"><span>CLUB CHARACTERS</span><span>{String(characters.length).padStart(2, '0')} PORTRAITS</span></div>
      <div className="no7-character-grid">
        {characters.map((image, index) => <figure className="no7-character" key={image}>
          <div className="no7-character-media"><img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(image)}`} alt={`${clubName}社拟人物 ${index + 1}`} /></div>
          <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
    </section>}

    <section className="gallery-inscription" aria-labelledby="gallery-inscription-title">
      <small>WORDS LEFT BEHIND</small>
      <h2 id="gallery-inscription-title">社团留字</h2>
      <p>{note}</p>
      <span>{schoolName} · {clubName}</span>
    </section>
  </div>
}
