import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { aboutPageQuery } from '@/lib/queries'
import GlowText from '@/components/effects/GlowText'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isAr = locale === 'ar'

  const data = await client.fetch(aboutPageQuery).catch(() => null)

  const heroHeadline =
    (isAr ? data?.heroHeadline?.ar : data?.heroHeadline?.en) ||
    (isAr ? 'نحن هنا لإنقاذك من فخ الإعلانات النمطية' : 'We Are Here to Rescue You From the Vanilla Ad Trap')

  const heroSub =
    (isAr ? data?.heroSubtext?.ar : data?.heroSubtext?.en) ||
    (isAr
      ? 'في PrismaFlow، علامتك التجارية ليست البطل؛ عميلك هو البطل. نحن المرشد الذي يفهم الأسرار البيولوجية للسلوك البشري ليقودك إلى النصر.'
      : 'At PrismaFlow, your brand isn\'t the Hero; your customer is. We are the Guide who understands the biological secrets of human behavior to lead you to victory.')

  const storyHeadline =
    (isAr ? data?.storyHeadline?.ar : data?.storyHeadline?.en) ||
    (isAr ? 'لماذا برزما؟ لأننا نؤمن بهندسة الرغبة.' : 'Why Prisma? Because We Believe in Engineering Desire.')

  const storyBody =
    (isAr ? data?.storyBody?.ar : data?.storyBody?.en) ||
    (isAr
      ? 'تماماً كما يأخذ المنشور الزجاجي الضوء العادي ويحوّله إلى طيف رائع، نأخذ إعلاناتك العادية ونمررها عبر عدسة التسويق العصبي لخلق رغبة لا تُقاوم في اللاوعي لدى عميلك.'
      : 'Just as a glass prism takes ordinary light and turns it into a mesmerizing spectrum, we take your standard ads and pass them through the lens of Neuromarketing to create an unshakeable desire in your customer\'s subconscious.')

  const quote =
    (isAr ? data?.philosophyQuote?.ar : data?.philosophyQuote?.en) ||
    (isAr ? 'أن تكون مختلفاً أفضل من أن تكون أفضل.' : 'Being different is better than being better.')

  const ctaLabel =
    (isAr ? data?.philosophyCTA?.ar : data?.philosophyCTA?.en) ||
    (isAr ? 'ابدأ رحلتك معنا' : 'Start Your Journey With Us')

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 text-[color:var(--color-white)]">
          {heroHeadline.split('Vanilla').map((part: string, i: number) =>
            i === 0 ? (
              <span key={i}>{part}<GlowText>Vanilla</GlowText></span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>
        <p className="text-xl text-[color:var(--color-gray-400)] leading-relaxed">{heroSub}</p>
      </section>

      {/* Story */}
      <section className="py-24 bg-[color:var(--color-surface)]" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-white)] mb-8">{storyHeadline}</h2>
          <p className="text-[color:var(--color-gray-400)] text-lg leading-relaxed">{storyBody}</p>
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="py-32 px-6 text-center">
        <blockquote className="text-5xl md:text-7xl font-black text-[color:var(--color-white)] max-w-4xl mx-auto leading-tight">
          <GlowText intensity="high">&ldquo;{quote}&rdquo;</GlowText>
        </blockquote>
        <div className="mt-12">
          <Button variant="primary" size="lg" href={`/${locale}/apply`}>
            {ctaLabel}
          </Button>
        </div>
      </section>
    </div>
  )
}
