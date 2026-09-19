import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { gallerySchools } from '../gallery-data'
import SchoolGalleryExperience from '../school-gallery-experience'

const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i

type GalleryPageProps = {
  params: { school: string }
}

export function generateStaticParams() {
  return gallerySchools.map((school) => ({ school: school.slug }))
}

export function generateMetadata({ params }: GalleryPageProps): Metadata {
  const school = gallerySchools.find((item) => item.slug === params.school)
  return {
    title: school ? `${school.club} | DriftPost Gallery` : 'DriftPost Gallery',
    description: school ? `${school.name}${school.club}文创作品画廊` : 'DriftPost school gallery',
  }
}

export default function SchoolGallery({ params }: GalleryPageProps) {
  const school = gallerySchools.find((item) => item.slug === params.school)
  if (!school) notFound()

  const galleryDirectory = path.join(process.cwd(), 'public', 'assets', 'galleries', school.slug)
  const allImages = fs.existsSync(galleryDirectory)
    ? fs.readdirSync(galleryDirectory).filter((file) => imagePattern.test(file)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
    : []
  const isNo7 = school.slug === 'no7-senior'
  const isYuehua = school.slug === 'yuehua'
  const isWanjiang = school.slug === 'wanjiang'
  const isTingyu = school.slug === 'tingyu'
  // Galleries that use prefixed filenames to drive their sections.
  const usesPrefixedSections = isNo7 || isTingyu || isWanjiang
  const images = isNo7 || isYuehua || isWanjiang || isTingyu ? allImages.filter((file) => /^\d{2}-/.test(file)) : allImages
  const wallImages = usesPrefixedSections ? allImages.filter((file) => /^wall-\d{2}-/.test(file)) : []
  const postcards = usesPrefixedSections ? allImages.filter((file) => /^postcard-\d{2}-/.test(file)) : []
  const scenes = isTingyu || isWanjiang ? allImages.filter((file) => /^scene-\d{2}-/.test(file)) : []
  const characters = isNo7
    ? ['character-01.jpg', 'character-02-white.png', 'character-03-white.png'].filter((file) => allImages.includes(file))
    : []
  const featureImage = (isYuehua || isWanjiang || isTingyu) && allImages.includes('character-05.png') ? 'character-05.png' : undefined
  // 江风 hangs its club characters side by side, then its merch on a second row;
  // the others show the one piece.
  const featureImages = isWanjiang
    ? ['character-06.png', 'character-05.png', 'character-07.png', 'character-08-merch.jpg'].filter((file) => allImages.includes(file))
    : featureImage ? [featureImage] : []
  const footerQr = isWanjiang && allImages.includes('footer-01-wechat-qr.jpg') ? 'footer-01-wechat-qr.jpg' : undefined
  const notePath = path.join(galleryDirectory, 'note.txt')
  const note = fs.existsSync(notePath)
    ? fs.readFileSync(notePath, 'utf8').trim()
    : '此处将镌刻历届社团成员名单，或留存当届社长写给后来者的话。'

  return (
    <main className="school-gallery">
      <header className="gallery-nav">
        <Link className="gallery-brand" href="/en">DRIFTPOST</Link>
        <Link className="gallery-back" href="/en?gallery=1#projects"><span aria-hidden="true">←</span> 返回画廊选择</Link>
      </header>

      <SchoolGalleryExperience schoolName={school.name} clubName={school.club} schoolSlug={school.slug} images={images} wallImages={wallImages} postcards={postcards} scenes={scenes} characters={characters} featureImages={featureImages} footerQr={footerQr} note={note} />

      <footer className="gallery-footer"><span>DRIFTPOST SCHOOL ARCHIVE</span><Link href="/en">BACK TO HOME ↗</Link></footer>
    </main>
  )
}
