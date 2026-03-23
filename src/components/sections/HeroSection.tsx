'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import GlowText from '@/components/effects/GlowText'
import { ChevronDown } from 'lucide-react'

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
    headline: 'Double Your Sales and Dominate Consumer Decisions via',
    highlight: 'Neuromarketing',
    subheadline:
      "We don't design ads for likes. We use psychology to Engineer Desire, turning your brand from an option into an irresistible necessity.",
  },
  ar: {
    headline: 'ضاعف مبيعاتك وسيطر على قرارات المستهلكين عبر',
    highlight: 'التسويق العصبي',
    subheadline:
      'لا نصمم إعلانات للإعجابات. نستخدم علم النفس لهندسة الرغبة، ونحوّل علامتك التجارية من خيار إلى ضرورة لا تُقاوم.',
  },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HeroSection({ data, locale, primaryCTALabel, secondaryCTALabel }: HeroSectionProps) {
  const f = fallback[locale as 'en' | 'ar'] || fallback.en
  const headline =
    (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) || f.headline
  const subheadline =
    (locale === 'ar' ? data?.subheadline?.ar : data?.subheadline?.en) || f.subheadline
  const primaryCTA =
    (locale === 'ar' ? data?.primaryCTA?.ar : data?.primaryCTA?.en) || primaryCTALabel
  const secondaryCTA =
    (locale === 'ar' ? data?.secondaryCTA?.ar : data?.secondaryCTA?.en) || secondaryCTALabel

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orb */}
      <motion.div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="initial" animate="animate">
          <motion.div variants={fadeUp} className="mb-6">
            <Badge variant="cyan">
              {locale === 'ar' ? 'وكالة التسويق العصبي' : 'Neuromarketing Agency'}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-bold leading-tight mb-6 text-[color:var(--color-white)]"
          >
            {headline}{' '}
            <GlowText intensity="high">{f.highlight}</GlowText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[color:var(--color-gray-400)] max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href={`/${locale}/apply`}>
              {primaryCTA}
            </Button>
            <Button variant="outline" size="lg" href={`/${locale}/landing`}>
              {secondaryCTA}
            </Button>
          </motion.div>

          {/* Horizontal rule with domain */}
          <motion.div variants={fadeUp} className="relative mt-14 flex items-center justify-center">
            <div
              className="absolute inset-x-0 top-1/2 h-px"
              style={{ background: 'rgba(0,200,255,0.4)' }}
            />
            <span
              className="relative px-4 text-[10px] tracking-[0.3em] uppercase font-medium"
              style={{
                background: 'var(--color-bg)',
                color: 'rgba(0,200,255,0.6)',
              }}
            >
              PRISMAFLOW.NET
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative prism SVG */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          <polygon points="100,0 200,300 0,300" stroke="#00C8FF" strokeWidth="1" fill="none" />
          <polygon points="100,40 175,270 25,270" stroke="#00C8FF" strokeWidth="0.5" fill="rgba(0,200,255,0.03)" />
          <line x1="100" y1="0" x2="70" y2="300" stroke="#00C8FF" strokeWidth="0.3" />
          <line x1="100" y1="0" x2="130" y2="300" stroke="#00C8FF" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} style={{ color: 'rgba(0,200,255,0.5)' }} />
      </motion.div>
    </section>
  )
}
