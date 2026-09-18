'use client'

import { useMemo, useState, type CSSProperties } from 'react'

type SchoolGalleryExperienceProps = {
  schoolName: string
  clubName: string
  schoolSlug: string
  images: string[]
  wallImages: string[]
  postcards: string[]
  scenes: string[]
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

const toGalleryItems = (list: string[]): GalleryItem[] => list.map((image, index) => ({ image, number: index + 1 }))

export default function SchoolGalleryExperience({ schoolName, clubName, schoolSlug, images, wallImages, postcards, scenes, characters, featureImage, note }: SchoolGalleryExperienceProps) {
  const hasFeatureLayout = schoolSlug === 'yuehua' || schoolSlug === 'wanjiang'
  const minimumItems = schoolSlug === 'yuehua' ? 4 : schoolSlug === 'wanjiang' ? 1 : 4
  // The loop shows exactly the gallery's own scrolling pieces.
  const items = useMemo<GalleryItem[]>(
    () => images.length > 0 ? toGalleryItems(images) : Array.from({ length: minimumItems }, (_, index) => ({ number: index + 1 })),
    [images, minimumItems],
  )
  // Wall pieces come only from the gallery's own wall images; feature-layout galleries
  // (yuehua / wanjiang) keep their four empty frames when no wall art exists yet.
  const wallItems: GalleryItem[] = wallImages.length > 0
    ? toGalleryItems(wallImages)
    : hasFeatureLayout
      ? Array.from({ length: 4 }, (_, index) => ({ number: index + 1 }))
      : []
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightsOn, setLightsOn] = useState(false)
  const hasGalleryLamp = schoolSlug === 'no7-senior' || hasFeatureLayout || schoolSlug === 'tingyu'

  const move = (direction: number) => setActiveIndex((current) => (current + direction + items.length) % items.length)

  const circularOffset = (index: number) => {
    let offset = (index - activeIndex + items.length) % items.length
    if (offset > items.length / 2) offset -= items.length
    return offset
  }

  return <div className={`gallery-experience${hasGalleryLamp ? (lightsOn ? ' is-lit' : ' is-dim') : ''}`}>
    {hasGalleryLamp && !lightsOn && <span className="lamp-hint" aria-hidden="true">
      <span className="lamp-hint-text">点击</span>
      <svg className="lamp-hint-line" viewBox="0 0 140 58" fill="none" focusable="false" aria-hidden="true">
        <path d="M4 7 C 28 -3, 100 16, 133 44" />
        <path d="M139 51 L 128 46 M139 51 L 133 36" />
      </svg>
    </span>}
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

    <section className={`gallery-loop-section${schoolSlug === 'no7-senior' || hasFeatureLayout || schoolSlug === 'tingyu' ? ' gallery-loop-natural' : ''}`} aria-label={`${clubName}循环作品画廊`}>
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

    {wallItems.length > 0 && <section className={`gallery-hanging-section${schoolSlug === 'no7-senior' ? ' gallery-hanging-section--no7 gallery-hanging-section--natural' : ''}${hasFeatureLayout ? ' gallery-hanging-section--feature gallery-hanging-section--natural' : ''}${schoolSlug === 'tingyu' ? ' gallery-hanging-section--tingyu' : ''}`} aria-label="独立展出作品">
      <div className="gallery-section-label"><span>ON THE WALL</span><span>{String(wallItems.length).padStart(2, '0')} FRAMES</span></div>
      <div className="gallery-hanging-grid">
        {wallItems.map((item, index) => <figure className={`gallery-hanging-frame hanging-frame-${index + 1}`} key={item.image ?? `hanging-empty-${index}`}>
          <div className="gallery-wire" aria-hidden="true" />
          <div className="gallery-mounted-art"><Artwork item={item} clubName={clubName} schoolSlug={schoolSlug} /></div>
          <figcaption>{String(item.number).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
    </section>}

    {featureImage && <section className="gallery-character" aria-label={`${clubName}社拟人物`}>
      <div className="gallery-section-label"><span>CHARACTER</span><span>01 PIECE</span></div>
      <figure className="gallery-character-figure">
        <img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(featureImage)}`} alt={`${clubName}社拟形象`} />
        <figcaption>01</figcaption>
      </figure>
    </section>}

    {postcards.length > 0 && <section className="no7-postcards" aria-label={`${clubName}${schoolSlug === 'tingyu' ? '社拟人物' : '明信片'}`}>
      <div className="gallery-section-label"><span>{schoolSlug === 'tingyu' ? 'CHARACTER' : 'POSTCARDS'}</span><span>{String(postcards.length).padStart(2, '0')} WORKS</span></div>
      <div className="no7-postcard-grid">
        {postcards.map((image, index) => <figure className="no7-postcard" key={image}>
          <img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(image)}`} alt={`${clubName}${schoolSlug === 'tingyu' ? '社拟人物' : '明信片'} ${index + 1}`} />
          <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
        </figure>)}
      </div>
    </section>}

    {scenes.length > 0 && <section className="gallery-scenes" aria-label={`${clubName}文创与活动现场`}>
      <div className="gallery-section-label"><span>IN THE FIELD</span><span>{String(scenes.length).padStart(2, '0')} RECORDS</span></div>
      <div className="gallery-scene-grid">
        {scenes.map((image, index) => <figure className="gallery-scene" key={image}>
          <span className="gallery-scene-media"><img src={`/assets/galleries/${schoolSlug}/${encodeURIComponent(image)}`} alt={`${clubName}文创与活动现场 ${index + 1}`} /></span>
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
