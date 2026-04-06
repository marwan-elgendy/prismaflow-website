'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

interface ProblemData {
  headline?: { en?: string; ar?: string }
  body?: { en?: string; ar?: string }
}

const fallback = {
  headline: {
    en: 'Are You Burning Your Budget on Ads Everyone Ignores?',
    ar: 'هل تحرق ميزانيتك على إعلانات يتجاهلها الجميع؟',
  },
  body: {
    en: "The problem isn't your product. It's generic marketing that ignores consumer psychology. Every day without neuromarketing is a day you hand your customers to your competitors.",
    ar: 'المشكلة ليست في منتجك. بل في التسويق النمطي الذي يتجاهل علم نفس المستهلك. كل يوم بدون التسويق العصبي هو يوم تسلّم فيه عملاءك لمنافسيك.',
  },
}

const painPoints = [
  {
    number: '01',
    en: { title: 'High Spend, Low Return', body: 'Ad budgets vanish into campaigns that generate impressions, not conversions.' },
    ar: { title: 'إنفاق مرتفع، عائد منخفض', body: 'تختفي ميزانيات الإعلانات في حملات تولّد مشاهدات لا تحويلات.' },
  },
  {
    number: '02',
    en: { title: 'Copy Nobody Reads', body: 'Generic messaging blends into the noise, leaving your audience unmoved and uninterested.' },
    ar: { title: 'نصوص لا يقرأها أحد', body: 'الرسائل العامة تذوب في الضجيج، وتبقي جمهورك غير متأثر وغير مهتم.' },
  },
  {
    number: '03',
    en: { title: 'Brand Lost in the Noise', body: 'Competitors capture the attention your brand deserves because psychology is on their side.' },
    ar: { title: 'علامة تجارية ضائعة', body: 'يستحوذ المنافسون على الانتباه الذي تستحقه علامتك لأن علم النفس في صفّهم.' },
  },
]

export default function ProblemSection({ data, locale }: { data?: ProblemData | null; locale: string }) {
  const headline =
    (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) ||
    fallback.headline[locale as 'en' | 'ar'] ||
    fallback.headline.en
  const body =
    (locale === 'ar' ? data?.body?.ar : data?.body?.en) ||
    fallback.body[locale as 'en' | 'ar'] ||
    fallback.body.en

  return (
    <section className="relative z-10 py-32 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial layout: text left, grid right */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Left column — editorial text */}
          <div className="lg:sticky lg:top-32">
            <SectionLabel className="mb-6">
              {locale === 'ar' ? 'التشخيص' : 'THE DIAGNOSIS'}
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--text)] mb-6">
              <TextReveal delay={0.1} stagger={0.07}>
                {headline}
              </TextReveal>
            </h2>
            <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-sm">
              {body}
            </p>
          </div>

          {/* Right column — pain points grid */}
          <div className="grid sm:grid-cols-1 gap-0 divide-y divide-[var(--border)]">
            {painPoints.map((p, i) => {
              const item = locale === 'ar' ? p.ar : p.en
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="py-8 flex gap-8 items-start group"
                >
                  <span className="text-[var(--text-dim)] text-xs font-semibold tracking-widest mt-1 shrink-0 tabular-nums">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text)] mb-2 group-hover:text-[var(--prism)] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
