import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { servicesPageQuery } from '@/lib/queries'
import ServicesSection from '@/components/sections/ServicesSection'
import CTABanner from '@/components/sections/CTABanner'
import GlowText from '@/components/effects/GlowText'

export const metadata: Metadata = {
  title: 'Services',
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const data = await client.fetch(servicesPageQuery).catch(() => null)

  const headline =
    (isAr ? data?.headline?.ar : data?.headline?.en) ||
    (isAr ? 'كيف نهندس رغبتك' : 'How We Engineer Your Desire')

  return (
    <div className="pt-20">
      <section className="py-32 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black text-[color:var(--color-white)] leading-tight">
          {isAr ? 'كيف نهندس ' : 'How We '}
          <GlowText intensity="high">{isAr ? 'رغبتك' : 'Engineer Your Desire'}</GlowText>
        </h1>
        <p className="mt-6 text-[color:var(--color-gray-400)] text-xl max-w-2xl mx-auto">
          {headline}
        </p>
      </section>

      <ServicesSection data={data} locale={locale} />
      <CTABanner locale={locale} />
    </div>
  )
}
