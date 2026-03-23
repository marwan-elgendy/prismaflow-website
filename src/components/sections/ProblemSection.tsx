'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import GlowText from '@/components/effects/GlowText'

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
    en: "The problem isn't your product; it's the generic Vanilla marketing that ignores customer psychology. Every day without Neuromarketing is a day you hand your customers to your competitors on a silver platter.",
    ar: 'المشكلة ليست في منتجك؛ بل في التسويق النمطي الذي يتجاهل علم نفس العملاء. كل يوم بدون التسويق العصبي هو يوم تسلّم فيه عملاءك لمنافسيك على طبق من ذهب.',
  },
}

const painPoints = [
  {
    en: { problem: 'High ad spend, low ROI', solution: 'Psychology-driven campaigns' },
    ar: { problem: 'إنفاق إعلاني مرتفع، عائد منخفض', solution: 'حملات مدفوعة بعلم النفس' },
  },
  {
    en: { problem: 'Generic copy nobody reads', solution: 'Neuro-copy that compels action' },
    ar: { problem: 'نصوص عامة لا يقرأها أحد', solution: 'نصوص عصبية تحفز على الفعل' },
  },
  {
    en: { problem: 'Brand lost in the noise', solution: 'Unforgettable brand identity' },
    ar: { problem: 'علامة تجارية ضائعة في الضجيج', solution: 'هوية علامة تجارية لا تُنسى' },
  },
]

export default function ProblemSection({ data, locale }: { data?: ProblemData | null; locale: string }) {
  const headline = (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) || fallback.headline[locale as 'en' | 'ar'] || fallback.headline.en
  const body = (locale === 'ar' ? data?.body?.ar : data?.body?.en) || fallback.body[locale as 'en' | 'ar'] || fallback.body.en

  return (
    <section className="relative z-10 py-32 bg-[color:var(--color-surface)]" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel className="justify-center mb-4">
            {locale === 'ar' ? 'المشكلة' : 'THE PROBLEM'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--color-white)] max-w-3xl mx-auto leading-tight">
            {headline}
          </h2>
          <p className="mt-6 text-[color:var(--color-gray-400)] text-lg max-w-2xl mx-auto leading-relaxed">
            {body}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((p, i) => {
            const item = locale === 'ar' ? p.ar : p.en
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="rounded-lg border border-[color:var(--color-border)] p-6 bg-[color:var(--color-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <p className="text-[color:var(--color-gray-400)] text-sm line-through">{item.problem}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[color:var(--color-cyan)] text-lg">✓</span>
                  <p className="text-[color:var(--color-white)] text-sm font-medium">
                    <GlowText intensity="low">{item.solution}</GlowText>
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
