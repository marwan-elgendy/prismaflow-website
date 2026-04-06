import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface Post {
  title: { en?: string; ar?: string }
  slug: string
  excerpt?: { en?: string; ar?: string }
  mainImage?: { asset?: { url?: string }; alt?: { en?: string; ar?: string } }
  publishedAt?: string
  author?: { en?: string; ar?: string }
  categories?: string[]
  readTime?: number
}

interface BlogCardProps {
  post: Post
  locale: string
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const isAr = locale === 'ar'
  const title = (isAr ? post.title.ar : post.title.en) || ''
  const excerpt = (isAr ? post.excerpt?.ar : post.excerpt?.en) || ''
  const imageUrl = post.mainImage?.asset?.url
  const imageAlt = `${title} — PrismaFlow`
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const readTime = post.readTime
    ? (isAr ? `${post.readTime} دقائق` : `${post.readTime} min read`)
    : null

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-alt)] mb-5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              title={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--surface-alt)]" />
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-[var(--text-dim)] mb-3">
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {date && readTime && <span>·</span>}
          {readTime && <span>{readTime}</span>}
        </div>

        {/* Title */}
        <h3 className="text-[var(--text)] font-bold text-lg leading-snug line-clamp-2 group-hover:text-[var(--prism)] transition-colors duration-200">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}
      </article>
    </Link>
  )
}
