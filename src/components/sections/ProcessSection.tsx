'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

interface Step {
  number: string
  title: { en?: string; ar?: string }
  description: { en?: string; ar?: string }
}

interface ProcessData {
  headline?: { en?: string; ar?: string }
  steps?: Step[]
}

const fallbackSteps = [
  {
    number: '01',
    title: { en: 'Uncover', ar: 'الكشف' },
    description: {
      en: 'We dive into the subconscious to awaken deep-seated desires.',
      ar: 'نغوص في اللاوعي لإيقاظ الرغبات العميقة الكامنة.',
    },
  },
  {
    number: '02',
    title: { en: 'Engineer', ar: 'الهندسة' },
    description: {
      en: 'We design a psychological path that slides hesitant leads into a purchase decision.',
      ar: 'نصمم مساراً نفسياً يُزلق العملاء المترددين نحو قرار الشراء.',
    },
  },
  {
    number: '03',
    title: { en: 'Dominate', ar: 'السيطرة' },
    description: {
      en: 'We grant you the Orange Ticket to make your brand unforgettable.',
      ar: 'نمنحك التذكرة البرتقالية لتجعل علامتك التجارية لا تُنسى.',
    },
  },
]

function AnimatedConnector() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-12 left-0 right-0 w-full pointer-events-none"
      height="2"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="connector-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="#00C8FF" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#00C8FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.line
        x1="20%"
        y1="1"
        x2="80%"
        y2="1"
        stroke="url(#connector-grad)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
        }}
      />
    </svg>
  )
}

export default function ProcessSection({ data, locale }: { data?: ProcessData | null; locale: string }) {
  const headline =
    (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) ||
    (locale === 'ar'
      ? 'PrismaFlow تملك خريطة الطريق إلى عقل المشتري'
      : 'PrismaFlow Holds the Roadmap to the Buyer\'s Mind')

  const steps = data?.steps?.length ? data.steps : fallbackSteps

  return (
    <section className="relative z-10 py-32 bg-[color:var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel className="justify-center mb-4">
            {locale === 'ar' ? 'الخطة' : 'THE PLAN'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--color-white)] max-w-3xl mx-auto leading-tight">
            {headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Animated SVG connector line */}
          <AnimatedConnector />

          {steps.map((step, i) => {
            const title = (locale === 'ar' ? step.title.ar : step.title.en) || ''
            const desc = (locale === 'ar' ? step.description.ar : step.description.en) || ''
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-lg p-8 hover:border-[color:var(--color-cyan)] transition-colors"
              >
                <div
                  className="text-8xl font-black leading-none mb-4 select-none"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(0,200,255,0.4)',
                    textShadow: '0 0 20px rgba(0,200,255,0.1)',
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-white)] mb-2">{title}</h3>
                <p className="text-[color:var(--color-gray-400)] leading-relaxed">{desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
