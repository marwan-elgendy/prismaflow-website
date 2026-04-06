import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { servicesPageQuery } from '@/lib/queries'
import CTABanner from '@/components/sections/CTABanner'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

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

interface ServiceDetail {
  number: string
  title: string
  problemLabel: string
  problem: string
  solutionLabel: string
  solution: string
  resultLabel: string
  result: string
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

  const services: ServiceDetail[] = isAr
    ? [
        {
          number: '01',
          title: 'هندسة قمع المبيعات',
          problemLabel: 'التشخيص',
          problem: 'هل يزور آلاف موقعك ويغادرون دون شراء؟ المشكلة ليست في المنتج — بل في المسار.',
          solutionLabel: 'العلاج',
          solution: 'نبني مزالق نفسية تقود الزوار خطوة بخطوة نحو الشراء. كل نقطة تلامس مصممة لإزالة الاحتكاك وتضخيم الرغبة.',
          resultLabel: 'النتيجة',
          result: 'موقع يتحول إلى آلة صيد تعمل على مدار الساعة — تحوّل الغرباء إلى عملاء ومشترين متكررين.',
        },
        {
          number: '02',
          title: 'الكتابة العصبية',
          problemLabel: 'التشخيص',
          problem: 'هل نصوص إعلاناتك تبدو مثل بيان صحفي جاف لا يقرأه أحد؟ الكلمات الخاطئة تُسكت العلامة التجارية.',
          solutionLabel: 'العلاج',
          solution: 'نستخدم التعاطف المرضي لكتابة نصوص تصيب الرغبات العميقة، مما يجعل العملاء يقولون: "هذا أنا بالضبط!" كل كلمة مبنية على علم النفس الإدراكي.',
          resultLabel: 'النتيجة',
          result: 'نصوص إعلانية لا تُقاوم تُسرّع قرارات الشراء وتحوّل القراء إلى مشترين.',
        },
        {
          number: '03',
          title: 'إنتاج الأفلام الذهنية',
          problemLabel: 'التشخيص',
          problem: 'الإعلانات التقليدية لم تعد تستحوذ على انتباه المستهلك العصري. خمس ثوانٍ لكسب الاهتمام أو خسارته إلى الأبد.',
          solutionLabel: 'العلاج',
          solution: 'ندمج علم نفس المبيعات مع الإنتاج السينمائي لصناعة أفلام ذهنية — يشعر عميلك بامتلاك منتجك قبل أن يشتريه.',
          resultLabel: 'النتيجة',
          result: 'إعلانات تسرق الانتباه وتزرع الرغبة في أقل من 5 ثوانٍ — قابلة للمشاركة، لا تُنسى، تُولّد مبيعات.',
        },
      ]
    : [
        {
          number: '01',
          title: 'Sales Funnel Engineering',
          problemLabel: 'The Problem',
          problem: 'Thousands visit your site and leave without buying. The issue isn\'t your product — it\'s the path you\'re putting them on.',
          solutionLabel: 'The Solution',
          solution: 'We build psychological slippery slides that guide visitors step-by-step to purchase. Every touchpoint is designed to remove friction and amplify desire.',
          resultLabel: 'The Result',
          result: 'A website that becomes a 24/7 hunting machine — converting strangers into first-time buyers and repeat customers.',
        },
        {
          number: '02',
          title: 'Neuro-Copywriting',
          problemLabel: 'The Problem',
          problem: "Your ad copy reads like a dry press release nobody reads. Wrong words silence a brand before it ever gets a chance to speak.",
          solutionLabel: 'The Solution',
          solution: "We use pathological empathy to write copy that hits deep desires, making clients say: 'Oh my god, that's exactly me!' Every word is built on cognitive psychology.",
          resultLabel: 'The Result',
          result: 'Irresistible ad copy that accelerates purchase decisions and turns readers into buyers.',
        },
        {
          number: '03',
          title: 'Mental Movies Production',
          problemLabel: 'The Problem',
          problem: "Traditional ads no longer capture the modern consumer's goldfish attention span. You have five seconds to earn attention or lose it forever.",
          solutionLabel: 'The Solution',
          solution: 'We fuse sales psychology with cinematic production to create mental movies — your customer experiences owning your product before they ever buy it.',
          resultLabel: 'The Result',
          result: 'Ads that steal attention and plant desire in under 5 seconds — shareable, memorable, and revenue-generating.',
        },
      ]

  return (
    <main className="pt-20" aria-label={isAr ? 'خدمات التسويق العصبي' : 'Neuromarketing services'}>
      <ServiceSchemas locale={locale} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <SectionLabel className="mb-8">
          {isAr ? 'ترسانتنا' : 'OUR ARSENAL'}
        </SectionLabel>

        <h1
          className="font-black text-[var(--text)] leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
        >
          <TextReveal delay={0.1}>
            {isAr ? 'كيف نهندس رغبتك' : 'How We Engineer Your Desire'}
          </TextReveal>
        </h1>

        <div className="mt-12 max-w-2xl border-t border-[var(--border)] pt-10">
          <p className="text-xl text-[var(--text-muted)] leading-relaxed">
            {isAr
              ? 'ثلاث خدمات. فلسفة واحدة. كل قرار مبني على علم نفس المستهلك وليس على التخمين.'
              : 'Three services. One philosophy. Every decision built on consumer psychology, not guesswork.'}
          </p>
        </div>
      </section>

      {/* ── Service Sections ───────────────────────────────────── */}
      {services.map((svc, i) => {
        const isEven = i % 2 === 1
        return (
          <section
            key={svc.number}
            className={`py-24 ${isEven ? 'bg-[var(--surface-alt)]' : 'bg-[var(--bg)]'}`}
            aria-label={svc.title}
          >
            <div
              className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center ${
                isEven ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Text side */}
              <div>
                <div className="flex items-baseline gap-4 mb-8">
                  <span
                    className="font-black text-[var(--prism)] leading-none"
                    style={{ fontSize: '4rem' }}
                    aria-hidden="true"
                  >
                    {svc.number}
                  </span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>

                <h2
                  className="font-black text-[var(--text)] leading-tight tracking-[-0.02em] mb-12"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                >
                  {svc.title}
                </h2>

                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)] block mb-2">
                      {svc.problemLabel}
                    </span>
                    <p className="text-[var(--text-muted)] leading-relaxed">{svc.problem}</p>
                  </div>

                  <div className="border-l-2 border-[var(--prism)] pl-6">
                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--prism)] block mb-2">
                      {svc.solutionLabel}
                    </span>
                    <p className="text-[var(--text)] leading-relaxed">{svc.solution}</p>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)] block mb-2">
                      {svc.resultLabel}
                    </span>
                    <p className="text-[var(--text-muted)] leading-relaxed">{svc.result}</p>
                  </div>
                </div>
              </div>

              {/* Visual side — large decorative number */}
              <div
                className="flex items-center justify-center min-h-[320px] bg-[var(--surface)] rounded-sm relative overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-black text-[var(--border)] select-none"
                  style={{ fontSize: 'clamp(8rem, 18vw, 14rem)', lineHeight: 1 }}
                >
                  {svc.number}
                </span>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, var(--prism-glow) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ────────────────────────────────────────────────── */}
      <CTABanner locale={locale} />
    </main>
  )
}
