'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

interface Testimonial {
  name: string
  company: string
  quote: { en?: string; ar?: string }
}

const fallback: Testimonial[] = [
  {
    name: 'Ahmed Al-Rashidi',
    company: 'TechStart MENA',
    quote: {
      en: 'PrismaFlow transformed our marketing from generic noise into laser-focused desire engineering. Sales doubled in 3 months.',
      ar: 'حوّل PrismaFlow تسويقنا من ضجيج عام إلى هندسة رغبة دقيقة. تضاعفت المبيعات في 3 أشهر.',
    },
  },
  {
    name: 'Sara Mansouri',
    company: 'Luxe Boutique',
    quote: {
      en: "I was skeptical about neuromarketing. Now I can't imagine running a campaign without it. The results speak for themselves.",
      ar: 'كنت متشككة في التسويق العصبي. الآن لا أستطيع تخيّل تشغيل حملة بدونه. النتائج تتحدث عن نفسها.',
    },
  },
  {
    name: 'Khalid Nouri',
    company: 'Atlas Consulting',
    quote: {
      en: 'The copy they wrote made our clients say "that\'s exactly me!" — conversion rates went through the roof.',
      ar: 'النصوص التي كتبوها جعلت عملاءنا يقولون "هذا أنا بالضبط!" — ارتفعت معدلات التحويل بشكل ملحوظ.',
    },
  },
]

export default function TestimonialsSection({
  data,
  locale,
}: {
  data?: Testimonial[] | null
  locale: string
}) {
  const testimonials = data?.length ? data : fallback

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
            {locale === 'ar' ? 'شهادات العملاء' : 'CLIENT WINS'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--color-white)] max-w-3xl mx-auto leading-tight">
            {locale === 'ar'
              ? 'عملاء سيطروا على أسواقهم معنا'
              : 'Clients Who Dominated Their Markets With Us'}
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((t, i) => {
            const quote = (locale === 'ar' ? t.quote.ar : t.quote.en) || ''
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="min-w-[300px] md:min-w-0 bg-[color:var(--color-bg)] border border-[color:var(--color-border)] rounded-lg p-8"
              >
                <blockquote className="text-[color:var(--color-gray-400)] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--color-cyan-glow)] border border-[rgba(0,200,255,0.3)] flex items-center justify-center text-[color:var(--color-cyan)] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[color:var(--color-white)] text-sm font-semibold">{t.name}</p>
                    <p className="text-[color:var(--color-gray-400)] text-xs">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
