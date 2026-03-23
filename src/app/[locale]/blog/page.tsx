import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'
import BlogGrid from '@/components/blog/BlogGrid'
import GlowText from '@/components/effects/GlowText'

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const posts = await client.fetch(allPostsQuery).catch(() => [])

  return (
    <div className="pt-20">
      <section className="py-24 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-black text-[color:var(--color-white)]">
          {isAr ? 'مدونة ' : 'The '}
          <GlowText>{isAr ? 'التسويق العصبي' : 'Neuromarketing Blog'}</GlowText>
        </h1>
        <p className="mt-4 text-[color:var(--color-gray-400)] text-lg">
          {isAr
            ? 'رؤى تسويقية مدعومة بعلم الأعصاب'
            : 'Neuroscience-backed marketing insights'}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <BlogGrid posts={posts ?? []} locale={locale} />
      </section>
    </div>
  )
}
