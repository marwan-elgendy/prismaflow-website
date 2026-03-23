import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { applyPageQuery } from '@/lib/queries'
import ApplicationForm from '@/components/forms/ApplicationForm'
import GlowText from '@/components/effects/GlowText'

export const metadata: Metadata = {
  title: 'Work With Us',
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
      ? 'في PrismaFlow، نحن لا نعمل مع الجميع. إذا كنت تبحث عن وكالة لتصميم صور لامعة من أجل إعجابات وهمية، فنحن لسنا الخيار المناسب. لكن إذا كنت مستعداً للتوقف عن حرق ميزانيتك واستخدام علم نفس الإقناع لمضاعفة مبيعاتك — املأ الطلب أدناه.'
      : "At PrismaFlow, we don't work with everyone. If you're looking for an agency to design flashy images for fake likes, we're not the right fit. But if you're ready to stop burning your budget and use persuasion psychology to multiply your sales — fill out the application below.")

  return (
    <div className="pt-20 pb-32">
      <section className="py-24 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-[color:var(--color-white)] leading-tight mb-8">
          <GlowText intensity="medium">{headline}</GlowText>
        </h1>
        <div className="max-w-2xl mx-auto bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-8 text-left rtl:text-right">
          <p className="text-[color:var(--color-gray-400)] leading-relaxed">{exclusionText}</p>
        </div>
      </section>

      <div className="px-6">
        <ApplicationForm locale={locale} />
      </div>
    </div>
  )
}
