import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface Post {
  title: { en?: string; ar?: string }
  slug: string
  excerpt?: { en?: string; ar?: string }
  publishedAt?: string
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
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const category = post.categories?.[0] || ''

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <article className="p-6 border border-[#1A1A1A] bg-transparent transition-all duration-300 group-hover:border-[#E8FF00] group-hover:-translate-y-1 flex flex-col gap-3">
        {/* Category */}
        {category && (
          <span
            className="text-[#E8FF00] text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h3
          className="font-bold text-white text-xl leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-[#888888] text-sm leading-relaxed line-clamp-2 flex-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Date */}
        {date && (
          <time
            className="text-[#555555] text-xs block mt-auto"
            style={{ fontFamily: 'var(--font-body)' }}
            dateTime={post.publishedAt}
          >
            {date}
          </time>
        )}
      </article>
    </Link>
  )
}
