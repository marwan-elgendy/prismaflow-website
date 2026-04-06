import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { applyPageQuery } from '@/lib/queries'
import ApplicationForm from '@/components/forms/ApplicationForm'

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
        ? 'اعمل مع PrismaFlow — قدم طلبك لهندسة تسويقك'
        : 'Work With PrismaFlow — Apply to Engineer Your Marketing',
    },
    description: isAr
      ? 'نعمل فقط مع العملاء الجادين. قدّم طلبك الآن لتبدأ رحلة هندسة الرغبة ومضاعفة مبيعاتك مع وكالة التسويق العصبي الرائدة.'
      : 'We only work with serious clients. Apply now to start engineering desire and multiplying your sales with the leading neuromarketing agency.',
    alternates: {
      canonical: `https://prismaflow.net/${locale}/apply`,
    },
    openGraph: {
      title: isAr ? 'قدّم طلبك | PrismaFlow' : 'Apply Now | PrismaFlow',
      images: [{ url: 'https://prismaflow.net/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const data = await client.fetch(applyPageQuery).catch(() => null)

  const headline =
    (isAr ? data?.headline?.ar : data?.headline?.en) ||
    (isAr
      ? "لنهندس رغبة عملائك معاً"
      : "Let's Engineer Your Customers' Desire Together")

  const exclusionText =
    (isAr ? data?.exclusionText?.ar : data?.exclusionText?.en) ||
    (isAr
      ? 'في PrismaFlow، نحن لا نعمل مع الجميع. إذا كنت تبحث عن وكالة لتصميم صور لامعة من أجل إعجابات وهمية، فنحن لسنا الخيار المناسب. لكن إذا كنت مستعداً للتوقف عن حرق ميزانيتك واستخدام علم نفس الإقناع لمضاعفة مبيعاتك — فأنت في المكان الصحيح.'
      : "At PrismaFlow, we don't work with everyone. If you're looking for an agency to design flashy images for vanity metrics, we're not the right fit. But if you're ready to stop burning your budget and use persuasion psychology to multiply your sales — you're in the right place.")

  const criteria = isAr
    ? [
        { label: 'صاحب عمل جاد', desc: 'لديك منتج أو خدمة حقيقية وعملاء تخدمهم.' },
        { label: 'مستعد للاستثمار', desc: 'تفهم أن التسويق الفعّال يتطلب ميزانية ورؤية.' },
        { label: 'تريد نتائج قابلة للقياس', desc: 'هدفك الأرقام، ليس الانطباعات.' },
      ]
    : [
        { label: 'Serious business owner', desc: 'You have a real product or service and customers to serve.' },
        { label: 'Ready to invest', desc: 'You understand that effective marketing requires budget and vision.' },
        { label: 'Results-driven', desc: 'Your goal is measurable outcomes, not impressions.' },
      ]

  return (
    <main className="pt-24 pb-32">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <p className="text-xs uppercase tracking-widest text-[var(--text-dim)] mb-4">
          {isAr ? 'تقديم طلب' : 'Apply'}
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-[var(--text)] leading-tight tracking-tight max-w-3xl">
          {headline}
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-12">
              {exclusionText}
            </p>

            <div className="space-y-8">
              <p className="text-xs uppercase tracking-widest text-[var(--text-dim)]">
                {isAr ? 'الملف المثالي للعميل' : 'The ideal client profile'}
              </p>
              {criteria.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-[var(--text-dim)] text-sm font-mono mt-0.5 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--text)] mb-1">{item.label}</p>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-dim)]">
                {isAr
                  ? 'نراجع كل طلب بعناية. إذا كنت مناسباً، سنتواصل معك خلال 48 ساعة.'
                  : 'We review every application carefully. If you\'re a fit, we\'ll reach out within 48 hours.'}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <ApplicationForm locale={locale} />
          </div>
        </div>
      </div>
    </main>
  )
}
