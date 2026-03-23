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
}

interface BlogCardProps {
  post: Post
  locale: string
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const title = (locale === 'ar' ? post.title.ar : post.title.en) || ''
  const excerpt = (locale === 'ar' ? post.excerpt?.ar : post.excerpt?.en) || ''
  const imageUrl = post.mainImage?.asset?.url
  const imageAlt = (locale === 'ar' ? post.mainImage?.alt?.ar : post.mainImage?.alt?.en) || title
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const readMore = locale === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <article className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-lg overflow-hidden hover:border-[color:var(--color-cyan)] hover:-translate-y-1 transition-all duration-300">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        {!imageUrl && (
          <div className="h-48 bg-gradient-to-br from-[color:var(--color-border)] to-[color:var(--color-bg)] flex items-center justify-center">
            <span className="text-4xl opacity-20">✍️</span>
          </div>
        )}

        <div className="p-6">
          {post.categories?.length && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {post.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 rounded bg-[rgba(0,200,255,0.1)] text-[color:var(--color-cyan)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-[color:var(--color-white)] font-bold text-lg mb-2 line-clamp-2 leading-snug">
            {title}
          </h3>
          {excerpt && (
            <p className="text-[color:var(--color-gray-400)] text-sm leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-[color:var(--color-gray-400)]">
            <span>{date}</span>
            <span className="text-[color:var(--color-cyan)] group-hover:underline">{readMore}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
