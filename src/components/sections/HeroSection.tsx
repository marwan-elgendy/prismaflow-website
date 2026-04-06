'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/ui/TextReveal'

interface HeroData {
  headline?: { en?: string; ar?: string }
  subheadline?: { en?: string; ar?: string }
  primaryCTA?: { en?: string; ar?: string }
  secondaryCTA?: { en?: string; ar?: string }
}

interface HeroSectionProps {
  data?: HeroData | null
  locale: string
  primaryCTALabel: string
  secondaryCTALabel: string
}

const fallback = {
  en: {
    headline: 'Engineer Desire. Double Sales.',
    subheadline:
      "We don't design ads for likes. We use neuroscience and psychology to turn your brand from an option into an irresistible necessity.",
  },
  ar: {
    headline: 'هندسة الرغبة. مضاعفة المبيعات.',
    subheadline:
      'لا نصمم إعلانات للإعجابات. نستخدم علم الأعصاب وعلم النفس لتحويل علامتك التجارية من خيار إلى ضرورة لا تُقاوم.',
  },
}

export default function HeroSection({ data, locale, primaryCTALabel, secondaryCTALabel }: HeroSectionProps) {
  const f = fallback[locale as 'en' | 'ar'] || fallback.en
  const headline = (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) || f.headline
  const subheadline = (locale === 'ar' ? data?.subheadline?.ar : data?.subheadline?.en) || f.subheadline
  const primaryCTA = (locale === 'ar' ? data?.primaryCTA?.ar : data?.primaryCTA?.en) || primaryCTALabel
  const secondaryCTA = (locale === 'ar' ? data?.secondaryCTA?.ar : data?.secondaryCTA?.en) || secondaryCTALabel

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] mb-8 font-medium"
        >
          {locale === 'ar' ? 'وكالة التسويق العصبي' : 'Neuromarketing Agency'}
        </motion.p>

        {/* Giant headline */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight text-[var(--text)] mb-10 max-w-4xl">
          <TextReveal delay={0.2} stagger={0.08}>
            {headline}
          </TextReveal>
        </h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: locale === 'ar' ? 'right' : 'left' }}
          className="h-px bg-[var(--border)] max-w-xl mb-10"
        />

        {/* Subheadline + CTAs in a row on large screens */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg md:text-xl text-[var(--text-muted)] max-w-lg leading-relaxed"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 shrink-0"
          >
            <Button variant="primary" size="lg" href={`/${locale}/apply`}>
              {primaryCTA}
            </Button>
            <Button variant="outline" size="lg" href={`/${locale}/landing`}>
              {secondaryCTA}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--text-dim)] font-medium">
            {locale === 'ar' ? 'تمرير' : 'scroll'}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--border)] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
