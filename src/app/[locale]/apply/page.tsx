import type { Metadata } from 'next'
import WizardForm from '@/components/forms/WizardForm'

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
      ? 'نعمل فقط مع العملاء الجادين. قدّم طلبك الآن لتبدأ رحلة هندسة الرغبة ومضاعفة مبيعاتك.'
      : 'We only work with serious clients. Apply now to start engineering desire and multiplying your sales.',
    alternates: { canonical: `https://prismaflow.net/${locale}/apply` },
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
  const dir = isAr ? 'rtl' : 'ltr'

  return (
    <main dir={dir} className="pt-20 bg-[#0A0A0A] min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <span
          className="block text-[#E8FF00] text-xs uppercase tracking-widest mb-8"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {isAr ? 'قدّم طلبك' : 'APPLY'}
        </span>
        <h1
          className="font-black text-white leading-[0.85] tracking-[-0.03em] mb-6"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
          }}
        >
          {isAr ? 'قدّم.' : 'Apply.'}
        </h1>
        <p
          className="text-[#888888] text-xl max-w-lg"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {isAr
            ? 'نراجع كل طلب شخصياً.'
            : 'We review every submission personally.'}
        </p>
      </section>

      {/* ── WIZARD FORM ──────────────────────────────────────── */}
      <section className="pb-32 px-6 md:px-16 max-w-3xl mx-auto">
        <WizardForm locale={locale} />
      </section>
    </main>
  )
}
