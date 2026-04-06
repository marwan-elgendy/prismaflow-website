'use client'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

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
      en: 'PrismaFlow transformed our marketing from generic noise into laser-focused desire engineering. Sales doubled in three months.',
      ar: 'حوّل PrismaFlow تسويقنا من ضجيج عام إلى هندسة رغبة دقيقة. تضاعفت المبيعات في ثلاثة أشهر.',
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
      en: "The copy they wrote made our clients say 'that's exactly me!' — conversion rates went through the roof.",
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
  const isAr = locale === 'ar'
  const testimonials = data?.length ? data : fallback
  const sectionHeadline = isAr
    ? 'عملاء سيطروا على أسواقهم معنا'
    : 'Clients Who Dominated Their Markets With Us'

  return (
    <section className="relative z-10 py-32 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel className="mb-6">
            {isAr ? 'شهادات العملاء' : 'CLIENT WINS'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--text)] max-w-xl">
            <TextReveal delay={0.1} stagger={0.07}>
              {sectionHeadline}
            </TextReveal>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)]">
          {testimonials.map((t, i) => {
            const quote = (isAr ? t.quote.ar : t.quote.en) || ''
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-[var(--surface)] p-8 md:p-10 flex flex-col gap-8"
              >
                {/* Large opening quote mark */}
                <span
                  className="text-6xl leading-none font-black text-[var(--border)] select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <blockquote className="text-lg md:text-xl text-[var(--text)] font-medium leading-relaxed flex-1">
                  {quote}
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-[var(--border)] pt-6">
                  <p className="text-sm font-bold text-[var(--text)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5 tracking-wide">{t.company}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
