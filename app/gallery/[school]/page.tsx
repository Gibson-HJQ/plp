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
  const images = fs.existsSync(galleryDirectory)
    ? fs.readdirSync(galleryDirectory).filter((file) => imagePattern.test(file)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
    : []
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

      <SchoolGalleryExperience schoolName={school.name} clubName={school.club} schoolSlug={school.slug} images={images} note={note} />

      <footer className="gallery-footer"><span>DRIFTPOST SCHOOL ARCHIVE</span><Link href="/en">BACK TO HOME ↗</Link></footer>
    </main>
  )
}
