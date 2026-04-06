import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'
import { getTranslations } from 'next-intl/server'

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
        ? 'PrismaFlow — وكالة التسويق العصبي | هندسة الرغبة ومضاعفة المبيعات'
        : 'PrismaFlow — Neuromarketing Agency | Engineer Desire, Double Sales',
    },
    description: isAr
      ? 'وكالة التسويق العصبي الرائدة في منطقة MENA. نهندس الرغبة ونضاعف مبيعاتك باستخدام علم الأعصاب وعلم النفس. قدّم طلبك اليوم.'
      : 'The leading neuromarketing agency for EN & MENA markets. We engineer desire and double sales using neuroscience and consumer psychology. Apply today.',
    alternates: {
      canonical: `https://prismaflow.net/${locale}`,
    },
    openGraph: {
      title: isAr
        ? 'PrismaFlow — وكالة التسويق العصبي | هندسة الرغبة ومضاعفة المبيعات'
        : 'PrismaFlow — Neuromarketing Agency | Engineer Desire, Double Sales',
      description: isAr
        ? 'وكالة التسويق العصبي الرائدة في منطقة MENA. نهندس الرغبة ونضاعف مبيعاتك.'
        : 'The leading neuromarketing agency. We engineer desire and double sales.',
      images: [{ url: 'https://prismaflow.net/og-image.jpg', width: 1200, height: 630, alt: 'PrismaFlow Neuromarketing Agency' }],
    },
  }
}

function StructuredDataSchemas({ locale }: { locale: string }) {
  const isAr = locale === 'ar'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PrismaFlow',
    url: 'https://prismaflow.net',
    logo: 'https://prismaflow.net/logo.png',
    foundingDate: '2023',
    description: isAr
      ? 'وكالة تسويق عصبي رائدة تستخدم علم الأعصاب وعلم النفس لهندسة الرغبة وتنمية العلامات التجارية.'
      : 'Neuromarketing agency using neuroscience and psychology to engineer desire and grow brands.',
    sameAs: [
      'https://instagram.com/prismaflow',
      'https://linkedin.com/company/prismaflow',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      url: 'https://prismaflow.net/en/apply',
    },
    areaServed: [
      { '@type': 'Place', name: 'Middle East and North Africa' },
      { '@type': 'Place', name: 'United Arab Emirates' },
      { '@type': 'Place', name: 'Saudi Arabia' },
      { '@type': 'Place', name: 'United States' },
    ],
    knowsAbout: [
      'Neuromarketing',
      'Consumer Psychology',
      'Sales Funnel Engineering',
      'Persuasion Marketing',
      'Behavioral Economics',
    ],
  }

  const faqItems = isAr
    ? [
        {
          question: 'ما هو التسويق العصبي؟',
          answer: 'التسويق العصبي يطبّق علم الأعصاب وعلم النفس لفهم كيفية اتخاذ المستهلكين لقرارات الشراء.',
        },
        {
          question: 'كيف تستخدم PrismaFlow التسويق العصبي؟',
          answer: 'تهندس PrismaFlow الرغبة من خلال تحليل الدوافع اللاواعية وتصميم مسارات شراء نفسية.',
        },
        {
          question: 'ما هي الخدمات التي تقدمها PrismaFlow؟',
          answer: 'نقدم هندسة قمع المبيعات، والكتابة العصبية، وإنتاج الأفلام الذهنية.',
        },
      ]
    : [
        {
          question: 'What is neuromarketing?',
          answer: 'Neuromarketing applies neuroscience and psychology to understand how consumers make buying decisions.',
        },
        {
          question: 'How does PrismaFlow use neuromarketing?',
          answer: "PrismaFlow engineers desire by analyzing your target audience's subconscious motivations.",
        },
        {
          question: 'What services does PrismaFlow offer?',
          answer: 'We offer Sales Funnel Engineering, Neuro-Copywriting, and Mental Movies Production.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('hero')

  return (
    <>
      <StructuredDataSchemas locale={locale} />
      <HeroSection
        locale={locale}
        primaryCTALabel={t('cta_primary')}
        secondaryCTALabel={t('cta_secondary')}
      />
      <ProblemSection locale={locale} />
      <ServicesSection locale={locale} />
      <ProcessSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <CTABanner locale={locale} />
    </>
  )
}
