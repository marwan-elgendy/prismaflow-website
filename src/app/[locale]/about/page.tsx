import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { aboutPageQuery } from '@/lib/queries'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

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
        ? 'من نحن — PrismaFlow وكالة التسويق العصبي التي تهندس الرغبة'
        : 'About PrismaFlow — The Neuromarketing Agency That Engineers Desire',
    },
    description: isAr
      ? 'تعرّف على PrismaFlow، وكالة التسويق العصبي التي تحوّل علامتك التجارية من خيار إلى ضرورة لا تُقاوم. علم النفس + الإبداع = مبيعات حقيقية.'
      : 'Meet PrismaFlow, the neuromarketing agency that turns your brand from an option into an irresistible necessity. Psychology + creativity = real sales. Learn our story.',
    alternates: {
      canonical: `https://prismaflow.net/${locale}/about`,
    },
    openGraph: {
      title: isAr
        ? 'من نحن — PrismaFlow وكالة التسويق العصبي'
        : 'About PrismaFlow — The Neuromarketing Agency That Engineers Desire',
      images: [{ url: 'https://prismaflow.net/og-image.jpg', width: 1200, height: 630 }],
    },
  }
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
    (isAr
      ? 'نحن هنا لإنقاذك من فخ الإعلانات النمطية'
      : 'We Engineer Desire, Not Just Ads.')

  const heroSub =
    (isAr ? data?.heroSubtext?.ar : data?.heroSubtext?.en) ||
    (isAr
      ? 'في PrismaFlow، علامتك التجارية ليست البطل؛ عميلك هو البطل. نحن المرشد الذي يفهم الأسرار البيولوجية للسلوك البشري.'
      : "At PrismaFlow, your brand isn't the Hero — your customer is. We are the Guide who understands the biological secrets of human behavior to lead you to victory.")

  const storyHeadline =
    (isAr ? data?.storyHeadline?.ar : data?.storyHeadline?.en) ||
    (isAr
      ? 'لماذا برزما؟ لأننا نؤمن بهندسة الرغبة.'
      : 'Why Prisma? Because We Believe in Engineering Desire.')

  const storyBody =
    (isAr ? data?.storyBody?.ar : data?.storyBody?.en) ||
    (isAr
      ? 'تماماً كما يأخذ المنشور الزجاجي الضوء العادي ويحوّله إلى طيف رائع، نأخذ إعلاناتك العادية ونمررها عبر عدسة التسويق العصبي لخلق رغبة لا تُقاوم في اللاوعي لدى عميلك.'
      : "Just as a glass prism takes ordinary light and turns it into a mesmerizing spectrum, we take your standard ads and pass them through the lens of Neuromarketing to create an unshakeable desire in your customer's subconscious.")

  const quote =
    (isAr ? data?.philosophyQuote?.ar : data?.philosophyQuote?.en) ||
    (isAr
      ? 'أن تكون مختلفاً أفضل من أن تكون أفضل.'
      : 'Being different is better than being better.')

  const ctaLabel =
    (isAr ? data?.philosophyCTA?.ar : data?.philosophyCTA?.en) ||
    (isAr ? 'ابدأ رحلتك معنا' : 'Start Your Journey With Us')

  const principles = isAr
    ? [
        { label: 'علم النفس أولاً', body: 'نبدأ بفهم كيف يفكر عملاؤك، ثم نبني الرسالة.' },
        { label: 'الفرق يصنع الانتباه', body: 'في بحر المتشابهين، الاختلاف الجريء هو أقصر طريق للتذكر.' },
        { label: 'النتائج تتكلم', body: 'كل قرار نتخذه مرتبط بمقياس نتيجة واضح.' },
      ]
    : [
        { label: 'Psychology First', body: 'We start by understanding how your customers think, then build the message.' },
        { label: 'Difference Creates Attention', body: 'In a sea of sameness, bold distinction is the shortest path to recall.' },
        { label: 'Results Speak', body: 'Every decision we make is tied to a clear outcome metric.' },
      ]

  return (
    <main className="pt-20" aria-label={isAr ? 'من نحن' : 'About PrismaFlow'}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <SectionLabel className="mb-8">
          {isAr ? 'من نحن' : 'ABOUT'}
        </SectionLabel>

        <h1
          className="font-black text-[var(--text)] leading-[0.95] tracking-[-0.03em] mb-12"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
        >
          <TextReveal delay={0.1}>{heroHeadline}</TextReveal>
        </h1>

        <div className="max-w-2xl border-t border-[var(--border)] pt-10">
          <p className="text-xl text-[var(--text-muted)] leading-relaxed">
            {heroSub}
          </p>
        </div>
      </section>

      {/* ── Story — editorial 2-col ────────────────────────────── */}
      <section className="py-24 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SectionLabel className="mb-6">
              {isAr ? 'قصتنا' : 'OUR STORY'}
            </SectionLabel>
            <h2
              className="font-black text-[var(--text)] leading-tight tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              {storyHeadline}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              {storyBody}
            </p>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              {isAr
                ? 'لم نبنِ وكالة تسويقية تقليدية. بنينا مختبراً للرغبة البشرية، يجمع بين أعمق ما أنتجه علم الأعصاب وأجرأ ما صنعه الإبداع.'
                : "We didn't build a traditional marketing agency. We built a laboratory for human desire — one that combines the deepest insights from neuroscience with the boldest tools of creative production."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Principles — 3-col ────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel className="mb-16">
          {isAr ? 'مبادئنا' : 'OUR PRINCIPLES'}
        </SectionLabel>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)]">
          {principles.map((p, i) => (
            <div key={i} className="bg-[var(--bg)] p-10">
              <span
                className="block font-black text-[var(--prism)] mb-4 leading-none"
                style={{ fontSize: '3.5rem' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{p.label}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy Quote — full-width dramatic ────────────── */}
      <section className="py-32 bg-[var(--surface-alt)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span
            className="block font-black leading-none text-[var(--border)] select-none mb-[-0.2em]"
            style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 0.8 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote
            className="font-black text-[var(--text)] leading-tight tracking-[-0.03em] relative z-10"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}
          >
            {quote}
          </blockquote>

          <cite className="block mt-8 text-[var(--text-muted)] text-sm tracking-widest uppercase not-italic">
            — PrismaFlow
          </cite>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-black text-[var(--text)] leading-tight tracking-[-0.02em] mb-10"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            {isAr ? 'مستعد لتحويل علامتك التجارية؟' : 'Ready to Transform Your Brand?'}
          </h2>
          <Button variant="primary" size="lg" href={`/${locale}/apply`}>
            {ctaLabel}
          </Button>
        </div>
      </section>

    </main>
  )
}
