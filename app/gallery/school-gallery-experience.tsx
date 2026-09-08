'use client'

import { useMemo, useState, type CSSProperties } from 'react'

type SchoolGalleryExperienceProps = {
  schoolName: string
  clubName: string
  schoolSlug: string
  images: string[]
  note: string
}

type GalleryItem = { image?: string; number: number }

function Artwork({ item, clubName, schoolSlug }: { item: GalleryItem; clubName: string; schoolSlug: string }) {
  return item.image
    ? <img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(item.image)}`} alt={`${clubName}作品 ${item.number}`} />
    : <div className="gallery-placeholder" aria-label={`预留画框 ${item.number}`}><span>{String(item.number).padStart(2, '0')}</span></div>
}

export default function SchoolGalleryExperience({ schoolName, clubName, schoolSlug, images, note }: SchoolGalleryExperienceProps) {
  const items = useMemo<GalleryItem[]>(() => Array.from({ length: Math.max(6, images.length) }, (_, index) => ({ image: images[index], number: index + 1 })), [images])
  const [activeIndex, setActiveIndex] = useState(0)

  const move = (direction: number) => setActiveIndex((current) => (current + direction + items.length) % items.length)

  const circularOffset = (index: number) => {
    let offset = (index - activeIndex + items.length) % items.length
    if (offset > items.length / 2) offset -= items.length
    return offset
  }

  return <>
    <section className="gallery-hero">
      <small>[ CLUB ARCHIVE ]</small>
      <div className="gallery-hero-title">
        <p>{schoolName}</p>
        <h1>{clubName}</h1>
      </div>
    </section>

    <section className="gallery-loop-section" aria-label={`${clubName}循环作品画廊`}>
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

    <section className="gallery-hanging-section" aria-label="独立展出作品">
      <div className="gallery-section-label"><span>ON THE WALL</span><span>FOUR FRAMES</span></div>
      <div className="gallery-hanging-grid">
        {items.slice(0, 4).map((item, index) => <figure className={`gallery-hanging-frame hanging-frame-${index + 1}`} key={item.image ?? `hanging-empty-${index}`}>
          <div className="gallery-wire" aria-hidden="true" />
          <div className="gallery-mounted-art"><Artwork item={item} clubName={clubName} schoolSlug={schoolSlug} /></div>
          <figcaption>{String(item.number).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="gallery-inscription" aria-labelledby="gallery-inscription-title">
      <small>WORDS LEFT BEHIND</small>
      <h2 id="gallery-inscription-title">社团留字</h2>
      <p>{note}</p>
      <span>{schoolName} · {clubName}</span>
    </section>
  </>
}
