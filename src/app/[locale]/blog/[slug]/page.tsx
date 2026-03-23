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
  const title = (locale === 'ar' ? post.title.ar : post.title.en) || ''
  const description = (locale === 'ar' ? post.excerpt?.ar : post.excerpt?.en) || ''
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const isAr = locale === 'ar'

  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  if (!post) notFound()

  const title = (isAr ? post.title.ar : post.title.en) || ''
  const body = isAr ? post.body?.ar : post.body?.en
  const imageUrl = post.mainImage?.asset?.url
  const imageAlt = (isAr ? post.mainImage?.alt?.ar : post.mainImage?.alt?.en) || title
  const date = post.publishedAt ? formatDate(post.publishedAt, locale) : ''
  const author = (isAr ? post.author?.ar : post.author?.en) || ''

  return (
    <article className="pt-20 pb-32">
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
          {date && <span>{date}</span>}
        </div>
      </div>

      {imageUrl && (
        <div className="relative h-64 md:h-96 max-w-5xl mx-auto mb-16 overflow-hidden rounded-lg mx-6">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
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
            {isAr ? '→ العودة للمدونة' : '← Back to Blog'}
          </Link>
        </div>
      </div>
    </article>
  )
}
