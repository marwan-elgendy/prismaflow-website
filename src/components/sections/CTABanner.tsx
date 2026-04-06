'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/ui/TextReveal'

export default function CTABanner({ locale }: { locale: string }) {
  const isAr = locale === 'ar'

  const headline = isAr
    ? 'مستعد للسيطرة على سوقك؟'
    : 'Ready to Dominate Your Market?'

  const body = isAr
    ? 'توقف عن حرق ميزانيتك. ابدأ هندسة الرغبة اليوم.'
    : 'Stop burning your budget. Start engineering desire today.'

  const cta = isAr ? 'قدّم طلبك الآن' : 'Apply to Work With Us →'

  return (
    <section className="relative z-10 overflow-hidden bg-[var(--accent)]">
      {/* Subtle top rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent-hover)]" />

      <div className="max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-8"
        >
          <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-[var(--bg)]">
            <TextReveal delay={0.1} stagger={0.08}>
              {headline}
            </TextReveal>
          </h2>

          <p className="text-base md:text-lg text-[var(--bg)] opacity-70 max-w-md leading-relaxed">
            {body}
          </p>

          <Button
            variant="outline"
            size="lg"
            href={`/${locale}/apply`}
            className="border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
          >
            {cta}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
