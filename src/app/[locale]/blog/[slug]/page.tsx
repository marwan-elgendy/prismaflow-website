import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery).catch(() => [])
  return (posts ?? []).flatMap((post: { slug: string }) =>
    ['en', 'ar'].map((locale) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) return {}
  const isAr = locale === 'ar'
  const title = (isAr ? post.title?.ar : post.title?.en) || ''
  const description = (isAr ? post.excerpt?.ar : post.excerpt?.en) || ''
  const imageUrl = post.mainImage?.asset?.url
  return {
    title: {
      absolute: `${title} | PrismaFlow`,
    },
    description,
    alternates: {
      canonical: `https://prismaflow.net/${locale}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [(isAr ? post.author?.ar : post.author?.en) || 'PrismaFlow'],
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: `${title} — PrismaFlow` }]
        : [{ url: 'https://prismaflow.net/blog-og.jpg', width: 1200, height: 630 }],
    },
  }
}

function ArticleSchema({
  title,
  description,
  imageUrl,
  publishedAt,
  author,
  slug,
  locale,
}: {
  title: string
  description: string
  imageUrl?: string
  publishedAt?: string
  author?: string
  slug: string
  locale: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl || 'https://prismaflow.net/blog-og.jpg',
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: author || 'PrismaFlow',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PrismaFlow',
      url: 'https://prismaflow.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://prismaflow.net/logo.png',
      },
    },
    url: `https://prismaflow.net/${locale}/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://prismaflow.net/${locale}/blog/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const isAr = locale === 'ar'

  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) notFound()

  const title = (isAr ? post.title?.ar : post.title?.en) || ''
  const body = isAr ? post.body?.ar : post.body?.en
  const imageUrl = post.mainImage?.asset?.url
  const imageAlt = `${title} — PrismaFlow`
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const author = (isAr ? post.author?.ar : post.author?.en) || ''
  const description = (isAr ? post.excerpt?.ar : post.excerpt?.en) || ''

  return (
    <article className="pt-24 pb-32">
      <ArticleSchema
        title={title}
        description={description}
        imageUrl={imageUrl}
        publishedAt={post.publishedAt}
        author={author}
        slug={slug}
        locale={locale}
      />

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <Link
          href={`/${locale}/blog`}
          className="text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--text)] transition-colors duration-200"
        >
          {isAr ? 'العودة إلى المدونة' : '← Back to Journal'}
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 mb-12">
        {post.categories?.length > 0 && (
          <div className="flex gap-3 mb-6 flex-wrap">
            {post.categories.map((cat: string) => (
              <span
                key={cat}
                className="text-xs uppercase tracking-widest text-[var(--prism)]"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text)] leading-tight tracking-tight mb-8">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[var(--text-dim)] pb-10 border-b border-[var(--border)]">
          {author && <span className="text-[var(--text-muted)]">{author}</span>}
          {author && date && <span>·</span>}
          {date && <time dateTime={post.publishedAt}>{date}</time>}
        </div>
      </header>

      {/* Hero image */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-6 mb-14">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              title={title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6">
        {body ? (
          <div className="prose">
            <PortableText value={body} />
          </div>
        ) : (
          <p className="text-[var(--text-muted)] text-center py-12">
            {isAr ? 'المحتوى غير متوفر.' : 'Content not available.'}
          </p>
        )}

        <footer className="mt-20 pt-10 border-t border-[var(--border)]">
          <Link
            href={`/${locale}/blog`}
            className="text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--text)] transition-colors duration-200"
          >
            {isAr ? 'العودة إلى المدونة' : '← Back to Journal'}
          </Link>
        </footer>
      </div>
    </article>
  )
}
