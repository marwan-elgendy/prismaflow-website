import type { Metadata } from 'next'
import CTABanner from '@/components/sections/CTABanner'
import TextReveal from '@/components/ui/TextReveal'

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
      provider: { '@type': 'Organization', name: 'PrismaFlow', url: 'https://prismaflow.net' },
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
      ? 'هندسة قمع المبيعات، الكتابة العصبية، وإنتاج الأفلام الذهنية. خدمات مبنية على علم نفس المستهلك لمضاعفة مبيعاتك.'
      : 'Sales Funnel Engineering, Neuro-Copywriting, and Mental Movies Production. Services built on consumer psychology to double your sales.',
    alternates: { canonical: `https://prismaflow.net/${locale}/services` },
    openGraph: {
      title: isAr ? 'خدمات التسويق العصبي | PrismaFlow' : 'Neuromarketing Services | PrismaFlow',
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
  const dir = isAr ? 'rtl' : 'ltr'

  const services = isAr
    ? [
        {
          number: '01',
          name: 'هندسة قمع المبيعات',
          problem: 'هل يزور آلاف موقعك ويغادرون دون شراء؟ المشكلة ليست في المنتج — بل في المسار.',
          howLabel: 'كيف يعمل',
          how: [
            'تحليل نفسي كامل لرحلة العميل الحالية',
            'تصميم مزالق نفسية تُقلل الاحتكاك في كل خطوة',
            'نصوص مخصصة لكل مرحلة من مراحل القمع',
            'اختبار A/B مستمر لتحسين معدل التحويل',
          ],
          result: 'موقع يتحوّل إلى آلة صيد تعمل على مدار الساعة — تحوّل الغرباء إلى عملاء ومشترين متكررين.',
        },
        {
          number: '02',
          name: 'الكتابة العصبية',
          problem: 'هل نصوص إعلاناتك تبدو مثل بيان صحفي جاف؟ الكلمات الخاطئة تُسكت العلامة التجارية.',
          howLabel: 'كيف يعمل',
          how: [
            'بحث معمّق عن "نقاط الألم" الحقيقية للعميل',
            'كتابة تعتمد على محفز "هذا أنا بالضبط!"',
            'تفعيل النفور من الخسارة في كل نداء للفعل',
            'لغة حسية تنشّط الجهاز الحوفي في الدماغ',
          ],
          result: 'نصوص إعلانية لا تُقاوم تُسرّع قرارات الشراء وتحوّل القراء إلى مشترين.',
        },
        {
          number: '03',
          name: 'إنتاج الأفلام الذهنية',
          problem: 'الإعلانات التقليدية لم تعد تستحوذ على انتباه المستهلك. خمس ثوانٍ لكسب الاهتمام أو خسارته إلى الأبد.',
          howLabel: 'كيف يعمل',
          how: [
            'تصميم الخطاف البصري الأول في الثواني الثلاث الأولى',
            'دمج علم نفس المبيعات مع الإنتاج السينمائي',
            'إنشاء "أفلام ذهنية" يشعر فيها العميل بامتلاك المنتج',
            'تحسين الإعلانات لكل منصة ومرحلة من القمع',
          ],
          result: 'إعلانات تسرق الانتباه وتزرع الرغبة في أقل من 5 ثوانٍ — قابلة للمشاركة، لا تُنسى، تُولّد مبيعات.',
        },
      ]
    : [
        {
          number: '01',
          name: 'Sales Funnel Engineering',
          problem: "Thousands visit your site and leave without buying. The issue isn't your product — it's the path you're putting them on.",
          howLabel: 'How it works',
          how: [
            'Full psychological audit of your current customer journey',
            'Design of psychological slippery slides that reduce friction at every step',
            'Custom copy for each stage of the funnel',
            'Continuous A/B testing to optimize conversion rates',
          ],
          result: 'A website that becomes a 24/7 hunting machine — converting strangers into first-time buyers and repeat customers.',
        },
        {
          number: '02',
          name: 'Neuro-Copywriting',
          problem: "Your ad copy reads like a dry press release nobody reads. Wrong words silence a brand before it ever gets a chance to speak.",
          howLabel: 'How it works',
          how: [
            "Deep research into your customer's real pain points and desires",
            "Copy built around the \"That's exactly me!\" trigger",
            'Loss aversion activation in every call-to-action',
            "Sensory language that activates the brain's limbic system",
          ],
          result: 'Irresistible ad copy that accelerates purchase decisions and turns readers into buyers.',
        },
        {
          number: '03',
          name: 'Mental Movies Production',
          problem: "Traditional ads no longer capture the modern consumer's attention. You have five seconds to earn it or lose it forever.",
          howLabel: 'How it works',
          how: [
            'Visual hook design engineered for the first 3 seconds',
            'Sales psychology fused with cinematic production',
            'Mental movie creation — your customer experiences owning your product before buying',
            'Ad optimization for each platform and funnel stage',
          ],
          result: 'Ads that steal attention and plant desire in under 5 seconds — shareable, memorable, and revenue-generating.',
        },
      ]

  return (
    <main dir={dir} className="pt-20 bg-[#0A0A0A]">
      <ServiceSchemas locale={locale} />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto text-center">
        <h1
          className="font-black text-white leading-[0.9] tracking-[-0.03em] mb-8"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
          }}
        >
          <TextReveal delay={0.1}>
            {isAr ? 'الترسانة' : 'The Arsenal'}
          </TextReveal>
        </h1>
        <p
          className="text-[#888888] text-xl max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {isAr
            ? 'ثلاث خدمات. فلسفة واحدة. كل قرار مبني على علم نفس المستهلك، لا على التخمين.'
            : 'Three services. One philosophy. Every decision built on consumer psychology, not guesswork.'}
        </p>
      </section>

      {/* ── SERVICES DEEP-DIVE ───────────────────────────────── */}
      {services.map((svc, i) => (
        <div key={svc.number}>
          <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="mb-12">
              <span
                className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {svc.number}
              </span>
              <h2
                className="font-bold text-white leading-tight mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                }}
              >
                {svc.name}
              </h2>
              <p
                className="text-[#888888] text-xl max-w-2xl"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {svc.problem}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* How it works */}
              <div>
                <span
                  className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-6"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {svc.howLabel}
                </span>
                <ul className="space-y-4">
                  {svc.how.map((item, j) => (
                    <li key={j} className="flex gap-4 items-start">
                      <span
                        className="text-[#E8FF00] shrink-0 mt-0.5"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                      >
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <p
                        className="text-[#F5F5F5] text-base leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected result */}
              <div className="border border-[#1A1A1A] p-8 flex flex-col gap-6">
                <span
                  className="block text-[#E8FF00] text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {isAr ? 'النتيجة المتوقعة' : 'Expected Result'}
                </span>
                <p
                  className="font-bold text-[#E8FF00] text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {svc.result}
                </p>
              </div>
            </div>
          </section>

          {i < services.length - 1 && (
            <div className="max-w-7xl mx-auto px-6 md:px-16">
              <div className="h-px bg-[#E8FF00] opacity-20" />
            </div>
          )}
        </div>
      ))}

      {/* ── CASE STUDY TEASER ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="border-l-4 border-[#E8FF00] pl-8 py-4">
          <span
            className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {isAr ? 'من عملائنا' : 'CLIENT RESULT'}
          </span>
          <blockquote
            className="text-white text-2xl md:text-3xl leading-snug font-bold mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {isAr
              ? '"رفعنا معدل التحويل من ١.٢٪ إلى ٤.١٪ في ثلاثة أشهر. نفس الميزانية. علم نفس مختلف."'
              : '"We went from 1.2% to 4.1% conversion in three months. Same budget. Different psychology."'}
          </blockquote>
          <cite
            className="text-[#888888] text-sm not-italic"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {isAr ? '— مؤسس شركة SaaS، دبي' : '— SaaS founder, Dubai'}
          </cite>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTABanner locale={locale} />
    </main>
  )
}
