import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { landingPageQuery } from '@/lib/queries'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Desire Engineering Map — Free Download',
  robots: { index: false },
}

const triggers = [
  { en: 'The Fear of Loss trigger that makes inaction painful', ar: 'محفز الخوف من الخسارة الذي يجعل التقاعس مؤلماً' },
  { en: 'The Social Proof loop that builds unstoppable momentum', ar: 'حلقة الإثبات الاجتماعي التي تبني زخماً لا يُوقف' },
  { en: 'The Identity Mirror — making your brand part of their self-image', ar: 'مرآة الهوية — جعل علامتك التجارية جزءاً من صورتهم الذاتية' },
  { en: 'The Scarcity Engine that turns hesitation into urgency', ar: 'محرك الندرة الذي يحوّل التردد إلى إلحاح' },
  { en: 'The Curiosity Gap that makes clicking irresistible', ar: 'فجوة الفضول التي تجعل النقر لا يُقاوم' },
]

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const data = await client.fetch(landingPageQuery).catch(() => null)

  const headline =
    (isAr ? data?.headline?.ar : data?.headline?.en) ||
    (isAr
      ? 'احصل على خريطة هندسة الرغبة مجاناً'
      : 'Get the Free Desire Engineering Map')

  const subheadline =
    (isAr ? data?.subheadline?.ar : data?.subheadline?.en) ||
    (isAr
      ? 'المحفزات النفسية الـ5 التي تجعل العملاء يشترون بدون تفكير'
      : 'The 5 psychological triggers that make customers buy without thinking')

  const ctaLabel =
    (isAr ? data?.ctaLabel?.ar : data?.ctaLabel?.en) ||
    (isAr ? 'احصل على الخريطة مجاناً' : 'Get the Free Map')

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg)]">

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-3xl mx-auto w-full">
        {/* Logo */}
        <div className="mb-10">
          <span className="text-2xl font-bold">
            <span className="text-[var(--text)]">PRISMA</span>
            <span className="text-[var(--prism)]">FLOW</span>
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-[var(--text)] leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-xl text-[var(--text-muted)] mb-10">{subheadline}</p>

        <LeadCaptureForm locale={locale} ctaLabel={ctaLabel} />

        {/* Triggers teaser */}
        <div className="mt-20 w-full text-left rtl:text-right">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-6 text-center">
            {isAr ? 'ماذا ستتعلم:' : "What's Inside:"}
          </h2>
          <ul className="space-y-3">
            {triggers.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-5 py-4"
              >
                <span className="text-[var(--prism)] font-bold mt-0.5">0{i + 1}</span>
                <span className="text-[var(--text-muted)] text-sm">{isAr ? t.ar : t.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
