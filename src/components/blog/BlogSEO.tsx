interface BlogSEOProps {
  title: string
  author?: string
  publishedAt?: string
  categories?: string[]
  locale: string
  slug: string
}

function estimateReadingTime(title: string): number {
  // Estimate ~250 words/min; use title length as a rough proxy for short content
  const words = title.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 250))
}

export default function BlogSEO({ title, author, publishedAt, categories, locale, slug }: BlogSEOProps) {
  const isAr = locale === 'ar'
  const readTime = estimateReadingTime(title)
  const readTimeLabel = isAr ? `${readTime} دقيقة قراءة` : `${readTime} min read`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://prismaflow.net/${locale}/blog/${slug}`)}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} — https://prismaflow.net/${locale}/blog/${slug}`)}`

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-[color:var(--color-gray-400)] mb-8">
      {/* Reading time */}
      <span className="flex items-center gap-1">
        <span aria-hidden="true">⏱</span>
        <span>{readTimeLabel}</span>
      </span>

      {/* Author with schema markup */}
      {author && (
        <span
          itemScope
          itemType="https://schema.org/Person"
          className="flex items-center gap-1"
        >
          <span aria-hidden="true">✍️</span>
          <span itemProp="name">{author}</span>
        </span>
      )}

      {/* Published date */}
      {publishedAt && (
        <time
          dateTime={publishedAt}
          className="flex items-center gap-1"
        >
          <span aria-hidden="true">📅</span>
          <span>
            {new Date(publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </time>
      )}

      {/* Category tags */}
      {categories?.length ? (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/${locale}/blog`}
              className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity"
              style={{
                background: 'rgba(0,200,255,0.10)',
                color: '#00C8FF',
                border: '1px solid rgba(0,200,255,0.2)',
              }}
              aria-label={isAr ? `تصفح مقالات ${cat}` : `Browse ${cat} articles`}
            >
              {cat}
            </a>
          ))}
        </div>
      ) : null}

      {/* Social share — pure href, no JS */}
      <div className="flex items-center gap-3 ms-auto">
        <span className="text-[10px] uppercase tracking-wider opacity-60">
          {isAr ? 'شارك:' : 'Share:'}
        </span>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[color:var(--color-cyan)] transition-colors"
          aria-label={isAr ? 'شارك على X (تويتر)' : 'Share on X (Twitter)'}
        >
          𝕏
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[color:var(--color-cyan)] transition-colors"
          aria-label={isAr ? 'شارك على واتساب' : 'Share on WhatsApp'}
        >
          💬
        </a>
      </div>
    </div>
  )
}
