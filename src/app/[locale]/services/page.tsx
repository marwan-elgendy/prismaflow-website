import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { servicesPageQuery } from '@/lib/queries'
import ServicesSection from '@/components/sections/ServicesSection'
import CTABanner from '@/components/sections/CTABanner'
import GlowText from '@/components/effects/GlowText'

// JSON-LD Service schemas
function ServiceSchemas({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const services = [
    {
      name: isAr ? 'هندسة قمع المبيعات' : 'Sales Funnel Engineering',
      description: isAr
        ? 'نبني مسارات مبيعات نفسية تقود الزوار خطوة بخطوة نحو قرار الشراء.'
        : 'We build psychological sales funnels that guide visitors step-by-step to purchase decisions.',
      serviceType: isAr ? 'هندسة قمع المبيعات' : 'Sales Funnel Engineering',
    },
    {
      name: isAr ? 'الكتابة العصبية' : 'Neuro-Copywriting',
      description: isAr
        ? 'نستخدم التعاطف المرضي لكتابة نصوص تصيب الرغبات العميقة وتُسرّع قرارات الشراء.'
        : 'We use pathological empathy to write copy that hits deep desires and accelerates purchase decisions.',
      serviceType: isAr ? 'كتابة إقناعية' : 'Persuasion Copywriting',
    },
    {
      name: isAr ? 'إنتاج الأفلام الذهنية' : 'Mental Movies Production',
      description: isAr
        ? 'ندمج علم نفس المبيعات مع الإنتاج السينمائي لصناعة إعلانات تسرق الانتباه وتزرع الرغبة.'
        : 'We fuse sales psychology with cinematic production to create ads that steal attention and plant desire.',
      serviceType: isAr ? 'إنتاج فيديو تسويقي' : 'Video Marketing Production',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': services.map((svc) => ({
      '@type': 'Service',
      name: svc.name,
      description: svc.description,
      serviceType: svc.serviceType,
      provider: {
        '@type': 'Organization',
        name: 'PrismaFlow',
        url: 'https://prismaflow.net',
      },
      areaServed: 'MENA',
      url: `https://prismaflow.net/${locale}/services`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

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
        ? 'خدمات التسويق العصبي — مسارات المبيعات والكتابة الإقناعية | PrismaFlow'
        : 'Neuromarketing Services — Sales Funnels, Copywriting & Video | PrismaFlow',
    },
    description: isAr
      ? 'هندسة قمع المبيعات، الكتابة العصبية، وإنتاج الأفلام الذهنية. خدمات مبنية على علم نفس المستهلك لمضاعفة مبيعاتك. قدّم طلبك الآن.'
      : 'Sales Funnel Engineering, Neuro-Copywriting, and Mental Movies Production. Services built on consumer psychology to double your sales. Apply now.',
    alternates: {
      canonical: `https://prismaflow.net/${locale}/services`,
    },
    openGraph: {
      title: isAr
        ? 'خدمات التسويق العصبي | PrismaFlow'
        : 'Neuromarketing Services | PrismaFlow',
      images: [{ url: 'https://prismaflow.net/og-image.jpg', width: 1200, height: 630 }],
    },
  }
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
      <ServiceSchemas locale={locale} />
      <section className="py-32 text-center px-6" aria-label={isAr ? 'خدمات التسويق العصبي' : 'Neuromarketing services overview'}>
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
