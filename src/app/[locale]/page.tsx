import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { homePageQuery, recentPostsQuery } from '@/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'
import BlogCard from '@/components/blog/BlogCard'
import SectionLabel from '@/components/ui/SectionLabel'
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

// Enhanced JSON-LD Organization + FAQPage schema
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
          answer: 'التسويق العصبي يطبّق علم الأعصاب وعلم النفس لفهم كيفية اتخاذ المستهلكين لقرارات الشراء. يستخدم محفزات مثل العواطف والدليل الاجتماعي والندرة لخلق تسويق لا يُقاوم.',
        },
        {
          question: 'كيف تستخدم PrismaFlow التسويق العصبي؟',
          answer: 'تهندس PrismaFlow الرغبة من خلال تحليل الدوافع اللاواعية لجمهورك المستهدف، وتصميم مسارات شراء نفسية، وإنشاء حملات تتجاوز المقاومة العقلانية.',
        },
        {
          question: 'ما هي الخدمات التي تقدمها PrismaFlow؟',
          answer: 'نقدم هندسة قمع المبيعات، والكتابة العصبية، وإنتاج الأفلام الذهنية — كلها مبنية على مبادئ علم نفس المستهلك المُثبتة.',
        },
        {
          question: 'هل تعملون مع الأسواق الناطقة بالعربية؟',
          answer: 'نعم. تتخصص PrismaFlow في الأسواق العربية والإنجليزية، مع خبرة عميقة في علم نفس المستهلك في منطقة MENA وإنشاء حملات ثنائية اللغة.',
        },
        {
          question: 'كيف أبدأ مع PrismaFlow؟',
          answer: 'أكمل نموذج الطلب على موقعنا. نراجع كل طلب ونعمل فقط مع العملاء الذين نؤمن بقدرتنا على تحقيق نتائج قابلة للقياس لهم.',
        },
      ]
    : [
        {
          question: 'What is neuromarketing?',
          answer: 'Neuromarketing applies neuroscience and psychology to understand how consumers make buying decisions. It uses triggers like emotions, social proof, and scarcity to create irresistible marketing.',
        },
        {
          question: 'How does PrismaFlow use neuromarketing?',
          answer: "PrismaFlow engineers desire by analyzing your target audience's subconscious motivations, designing psychological purchase paths, and creating campaigns that bypass rational resistance.",
        },
        {
          question: 'What services does PrismaFlow offer?',
          answer: 'We offer Sales Funnel Engineering, Neuro-Copywriting, and Mental Movies Production — all built on proven consumer psychology principles.',
        },
        {
          question: 'Do you work with Arabic-speaking markets?',
          answer: 'Yes. PrismaFlow specializes in both English and Arabic markets, with deep expertise in MENA consumer psychology and bilingual campaign creation.',
        },
        {
          question: 'How do I get started with PrismaFlow?',
          answer: 'Fill out our application form. We review every submission and only work with clients we believe we can deliver measurable results for.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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

  const [homeData, recentPosts] = await Promise.allSettled([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(recentPostsQuery).catch(() => null),
  ])

  const home = homeData.status === 'fulfilled' ? homeData.value : null
  const posts = recentPosts.status === 'fulfilled' ? (recentPosts.value ?? []) : []

  return (
    <>
      <StructuredDataSchemas locale={locale} />
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
        <section className="relative z-10 py-24 bg-[var(--bg)]" aria-label={locale === 'ar' ? 'أحدث المقالات' : 'Latest blog posts'}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionLabel className="mb-4">{locale === 'ar' ? 'أحدث المقالات' : 'LATEST INSIGHTS'}</SectionLabel>
            <h2 className="text-3xl font-bold text-[var(--text)] mb-12">
              {locale === 'ar' ? 'من مدونة التسويق العصبي' : 'From the Neuromarketing Blog'}
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
