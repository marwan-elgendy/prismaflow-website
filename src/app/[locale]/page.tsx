import { client } from '@/lib/sanity'
import { homePageQuery, recentPostsQuery, siteSettingsQuery } from '@/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'
import BlogCard from '@/components/blog/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
import { getTranslations } from 'next-intl/server'

// JSON-LD Organization schema
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PrismaFlow',
    url: 'https://prismaflow.net',
    description:
      'Neuromarketing agency using neuroscience and psychology to engineer desire and grow brands.',
    sameAs: [
      'https://instagram.com/prismaflow',
      'https://linkedin.com/company/prismaflow',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('hero')

  const [homeData, recentPosts] = await Promise.allSettled([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(recentPostsQuery).catch(() => null),
  ])

  const home = homeData.status === 'fulfilled' ? homeData.value : null
  const posts = recentPosts.status === 'fulfilled' ? (recentPosts.value ?? []) : []

  return (
    <>
      <OrganizationSchema />
      <HeroSection
        data={home?.hero}
        locale={locale}
        primaryCTALabel={t('cta_primary')}
        secondaryCTALabel={t('cta_secondary')}
      />
      <ProblemSection data={home?.problemSection} locale={locale} />
      <ProcessSection data={home?.processSection} locale={locale} />
      <ServicesSection data={null} locale={locale} />
      <TestimonialsSection data={home?.socialProof?.testimonials} locale={locale} />

      {/* Recent blog posts */}
      {posts.length > 0 && (
        <section className="relative z-10 py-24 bg-[color:var(--color-bg)]">
          <div className="max-w-7xl mx-auto px-6">
            <SectionLabel className="mb-4">{locale === 'ar' ? 'أحدث المقالات' : 'LATEST INSIGHTS'}</SectionLabel>
            <h2 className="text-3xl font-bold text-[color:var(--color-white)] mb-12">
              {locale === 'ar' ? 'من المدونة' : 'From the Blog'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Parameters<typeof BlogCard>[0]['post']) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner locale={locale} />
    </>
  )
}
