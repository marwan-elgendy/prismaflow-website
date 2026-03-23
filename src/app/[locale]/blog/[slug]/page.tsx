import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { formatDate } from '@/lib/utils'
import GlowText from '@/components/effects/GlowText'

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
        ? [{ url: imageUrl, width: 1200, height: 630, alt: `${title} — PrismaFlow Neuromarketing Blog` }]
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
  const imageAlt = `${title} — PrismaFlow Neuromarketing Blog`
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const author = (isAr ? post.author?.ar : post.author?.en) || ''
  const description = (isAr ? post.excerpt?.ar : post.excerpt?.en) || ''

  return (
    <article className="pt-20 pb-32">
      <ArticleSchema
        title={title}
        description={description}
        imageUrl={imageUrl}
        publishedAt={post.publishedAt}
        author={author}
        slug={slug}
        locale={locale}
      />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        {post.categories?.length && (
          <div className="flex gap-2 justify-center mb-4">
            {post.categories.map((cat: string) => (
              <span key={cat} className="text-xs px-3 py-1 rounded-full bg-[rgba(0,200,255,0.1)] text-[color:var(--color-cyan)]">
                {cat}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-[color:var(--color-white)] leading-tight mb-6">
          <GlowText intensity="low">{title}</GlowText>
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-[color:var(--color-gray-400)]">
          {author && <span>{author}</span>}
          {date && <span>·</span>}
          {date && (
            <time dateTime={post.publishedAt}>{date}</time>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="relative h-64 md:h-96 max-w-5xl mx-auto mb-16 overflow-hidden rounded-lg px-6">
          <Image
            src={imageUrl}
            alt={imageAlt}
            title={title}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6">
        {body ? (
          <div className="prose prose-invert prose-lg max-w-none text-[color:var(--color-gray-400)] leading-relaxed">
            <PortableText value={body} />
          </div>
        ) : (
          <p className="text-[color:var(--color-gray-400)] text-center py-12">
            {isAr ? 'المحتوى غير متوفر.' : 'Content not available.'}
          </p>
        )}

        <div className="mt-16 pt-8 border-t border-[color:var(--color-border)]">
          <Link
            href={`/${locale}/blog`}
            className="text-[color:var(--color-cyan)] hover:underline text-sm"
          >
            {isAr ? '→ العودة إلى مدونة التسويق العصبي' : '← Back to Neuromarketing Blog'}
          </Link>
        </div>
      </div>
    </article>
  )
}
