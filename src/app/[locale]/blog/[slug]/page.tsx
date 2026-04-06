import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { staticPosts } from '@/data/static-posts'
import BlogCard from '@/components/blog/BlogCard'
import CTABanner from '@/components/sections/CTABanner'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return staticPosts.flatMap((post) =>
    ['en', 'ar'].map((locale) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = staticPosts.find((p) => p.slug === slug)
  if (!post) return {}
  const isAr = locale === 'ar'
  const title = isAr ? post.title.ar : post.title.en
  const description = isAr ? post.excerpt.ar : post.excerpt.en
  return {
    title: { absolute: `${title} | PrismaFlow` },
    description,
    alternates: { canonical: `https://prismaflow.net/${locale}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [isAr ? post.author.ar : post.author.en],
      images: [{ url: 'https://prismaflow.net/blog-og.jpg', width: 1200, height: 630 }],
    },
  }
}

function ArticleSchema({ post, locale, slug }: { post: (typeof staticPosts)[0]; locale: string; slug: string }) {
  const isAr = locale === 'ar'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isAr ? post.title.ar : post.title.en,
    description: isAr ? post.excerpt.ar : post.excerpt.en,
    image: 'https://prismaflow.net/blog-og.jpg',
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: isAr ? post.author.ar : post.author.en,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PrismaFlow',
      url: 'https://prismaflow.net',
    },
    url: `https://prismaflow.net/${locale}/blog/${slug}`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Minimal markdown-to-HTML renderer for the static body content
function renderBody(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          className="text-white font-bold mt-10 mb-4"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem' }}
        >
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={i}
          className="text-white font-bold mt-8 mb-3"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem' }}
        >
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-[#E8FF00] pl-6 my-6 italic text-[#AAAAAA] text-xl leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {line.slice(2)}
        </blockquote>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p
          key={i}
          className="text-[#E8FF00] font-bold text-base mb-2 mt-6"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Regular paragraph — handle inline **bold**
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="text-[#E8FF00]">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })
      elements.push(
        <p
          key={i}
          className="text-[#AAAAAA] text-lg leading-[1.9] mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {rendered}
        </p>
      )
    }
    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const isAr = locale === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'

  const post = staticPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const title = isAr ? post.title.ar : post.title.en
  const body = isAr ? post.body.ar : post.body.en
  const author = isAr ? post.author.ar : post.author.en
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const category = post.categories[0] || ''

  const related = staticPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <article dir={dir} className="pt-24 pb-0 bg-[#0A0A0A]">
      <ArticleSchema post={post} locale={locale} slug={slug} />

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <Link
          href={`/${locale}/blog`}
          className="text-[#555555] text-xs uppercase tracking-widest hover:text-[#E8FF00] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {isAr ? 'العودة إلى المدونة ←' : '← Back to Lab Notes'}
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 mb-12">
        {category && (
          <span
            className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {category}
          </span>
        )}

        <h1
          className="font-black text-white leading-tight tracking-[-0.02em] mb-8"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {title}
        </h1>

        <div
          className="flex flex-wrap items-center gap-3 text-[#555555] text-sm pb-10 border-b border-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {author && <span className="text-[#888888]">{author}</span>}
          {author && date && <span>·</span>}
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {post.readTime && (
            <>
              <span>·</span>
              <span>
                {isAr ? `${post.readTime} دقائق` : `${post.readTime} min read`}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6">
        {renderBody(body)}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-24 px-6 md:px-16 max-w-7xl mx-auto pb-24">
          <span
            className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {isAr ? 'مقالات ذات صلة' : 'Related Posts'}
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner locale={locale} />
    </article>
  )
}
