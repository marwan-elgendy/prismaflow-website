import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'
import BlogGrid from '@/components/blog/BlogGrid'
import GlowText from '@/components/effects/GlowText'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === 'ar'
  return {
    title: {
      absolute: isAr
        ? 'مدونة التسويق العصبي — علم النفس والإقناع وسلوك المستهلك | PrismaFlow'
        : 'Neuromarketing Blog — Psychology, Persuasion & Consumer Behavior | PrismaFlow',
    },
    description: isAr
      ? 'رؤى تسويقية مدعومة بعلم الأعصاب. تعلّم كيفية استخدام علم النفس والإقناع لمضاعفة مبيعاتك وسيطرة على سوقك.'
      : 'Neuroscience-backed marketing insights. Learn how to use psychology and persuasion to double your sales and dominate your market.',
    alternates: {
      canonical: `https://prismaflow.net/${locale}/blog`,
    },
    openGraph: {
      title: isAr ? 'مدونة التسويق العصبي | PrismaFlow' : 'Neuromarketing Blog | PrismaFlow',
      images: [{ url: 'https://prismaflow.net/blog-og.jpg', width: 1200, height: 630 }],
    },
  }
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
