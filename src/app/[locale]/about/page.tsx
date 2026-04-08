import type { Metadata } from 'next'
import CTABanner from '@/components/sections/CTABanner'
import StatCounter from '@/components/ui/StatCounter'
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
      ? 'تعرّف على PrismaFlow، وكالة التسويق العصبي التي تحوّل علامتك التجارية من خيار إلى ضرورة لا تُقاوم.'
      : 'Meet PrismaFlow, the neuromarketing agency that turns your brand from an option into an irresistible necessity.',
    alternates: { canonical: `https://prismaflow.net/${locale}/about` },
    openGraph: {
      title: isAr
        ? 'من نحن — PrismaFlow'
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
  const dir = isAr ? 'rtl' : 'ltr'

  return (
    <main dir={dir} className="pt-20 bg-[#0A0A0A]">

      {/* ── HERO — full viewport ─────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <span
          className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-8"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {isAr ? 'من نحن' : 'ABOUT'}
        </span>

        <h1
          className="font-black text-white leading-[0.9] tracking-[-0.03em] mb-12"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          }}
        >
          <TextReveal delay={0.1}>
            {isAr
              ? 'نهندس الرغبة، لا الإعلانات.'
              : 'We Engineer Desire, Not Just Ads.'}
          </TextReveal>
        </h1>

        <p
          className="text-[#888888] max-w-xl text-lg leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {isAr
            ? 'وكالة التسويق العصبي التي تحوّل علامتك التجارية من خيار إلى ضرورة لا تُقاوم.'
            : 'The neuromarketing agency that turns your brand from an option into an irresistible necessity.'}
        </p>

        {/* Geometric prism decoration */}
        <div className="absolute right-0 top-0 w-1/2 h-screen pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/4 right-[-10%] w-96 h-96 border border-[#00A3CC] opacity-5"
            style={{ transform: 'rotate(45deg)' }}
          />
          <div
            className="absolute top-1/3 right-[5%] w-64 h-64 border border-[#00A3CC] opacity-10"
            style={{ transform: 'rotate(30deg)' }}
          />
        </div>
      </section>

      {/* ── STORY — two columns ──────────────────────────────── */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: large pull quote */}
          <div>
            <p
              className="italic leading-tight"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F5F5F5',
              }}
            >
              {isAr
                ? <>تماماً كما يأخذ المنشور الزجاجي الضوء العادي ويحوّله إلى طيف — نفعل ذلك مع <span style={{ color: '#00A3CC' }}>رغبتك.</span></>
                : <>Just as a prism takes ordinary light and turns it into a spectrum — we do that with <span style={{ color: '#00A3CC' }}>desire.</span></>}
            </p>
          </div>

          {/* Right: body text */}
          <div className="space-y-6">
            <p
              className="leading-[1.8] text-[#AAAAAA]"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}
            >
              {isAr
                ? 'لم نبنِ وكالة تسويقية تقليدية. بنينا مختبراً للرغبة البشرية، يجمع بين أعمق ما أنتجه علم الأعصاب وأجرأ ما صنعه الإبداع.'
                : "We didn't build a traditional marketing agency. We built a laboratory for human desire — one that combines the deepest insights from neuroscience with the boldest tools of creative production."}
            </p>
            <p
              className="leading-[1.8] text-[#AAAAAA]"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}
            >
              {isAr
                ? 'في PrismaFlow، علامتك التجارية ليست البطل؛ عميلك هو البطل. نحن المرشد الذي يفهم الأسرار البيولوجية للسلوك البشري لقيادتك نحو النصر.'
                : "At PrismaFlow, your brand isn't the Hero — your customer is. We are the Guide who understands the biological secrets of human behavior to lead you to victory."}
            </p>
            <p
              className="leading-[1.8] text-[#AAAAAA]"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}
            >
              {isAr
                ? 'ثلاث سنوات من البحث. خمسون حملة ناجحة. نتيجة واحدة لا تتغير: علم الأعصاب يتغلب دائماً على التخمين.'
                : 'Three years of research. Fifty successful campaigns. One result that never changes: neuroscience always beats guesswork.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY — full-bleed #111111 ─────────────────── */}
      <section className="py-32 bg-[#111111]">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <span
            className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-16"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {isAr ? 'فلسفتنا' : 'OUR PHILOSOPHY'}
          </span>

          <div className="grid md:grid-cols-3 gap-px bg-[#1A1A1A]">
            {/* 1 */}
            <div className="bg-[#111111] p-10">
              <span
                className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                01
              </span>
              <h3
                className="font-bold text-white text-2xl mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {isAr ? 'علم الأعصاب أولاً' : 'Neuroscience First'}
              </h3>
              <p
                className="text-[#888888] leading-relaxed text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isAr
                  ? 'نستخدم أبحاث الدماغ، لا الحدس. كل قرار مدعوم بعلم نفس المستهلك الموثّق.'
                  : 'We use brain research, not gut feelings. Every decision is backed by documented consumer psychology.'}
              </p>
            </div>

            {/* 2 */}
            <div className="bg-[#111111] p-10">
              <span
                className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                02
              </span>
              <h3
                className="font-bold text-white text-2xl mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {isAr ? 'علم النفس العميق' : 'Psychology Deep'}
              </h3>
              <p
                className="text-[#888888] leading-relaxed text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isAr
                  ? 'التحيزات المعرفية هي مادتنا الخام. نعرف كيف يقرر الدماغ — ونصمم لذلك.'
                  : 'Cognitive biases are our raw material. We know how the brain decides — and we design for that.'}
              </p>
            </div>

            {/* 3 */}
            <div className="bg-[#111111] p-10">
              <span
                className="block text-[#00A3CC] text-xs uppercase tracking-widest mb-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                03
              </span>
              <h3
                className="font-bold text-white text-2xl mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {isAr ? 'مقيّد بالأخلاق' : 'Ethics Bound'}
              </h3>
              <p
                className="text-[#888888] leading-relaxed text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isAr
                  ? 'نُقنع بأخلاقية، ولا نتلاعب أبداً. الفرق هو كل شيء.'
                  : 'We persuade ethically, never manipulatively. The difference is everything.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS — 3 stat counters ────────────────────────── */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <StatCounter
            value={50}
            suffix="+"
            label={isAr ? 'حملة أُطلقت' : 'Campaigns Launched'}
          />
          <StatCounter
            value={340}
            suffix="%"
            label={isAr ? 'متوسط زيادة التحويل' : 'Avg Conversion Increase'}
          />
          <StatCounter
            value={3}
            label={isAr ? 'سنوات من البحث' : 'Years of Research'}
          />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTABanner locale={locale} />
    </main>
  )
}
