'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

interface Step {
  number: string
  title: { en?: string; ar?: string }
  description: { en?: string; ar?: string }
}

interface ProcessData {
  headline?: { en?: string; ar?: string }
  steps?: Step[]
}

const fallbackSteps: Step[] = [
  {
    number: '01',
    title: { en: 'Uncover', ar: 'الكشف' },
    description: {
      en: 'We dive into the subconscious to identify the deep-seated desires and hidden objections that drive — or block — purchase decisions.',
      ar: 'نغوص في اللاوعي لتحديد الرغبات العميقة والاعتراضات الخفية التي تحرّك — أو تعيق — قرارات الشراء.',
    },
  },
  {
    number: '02',
    title: { en: 'Engineer', ar: 'الهندسة' },
    description: {
      en: 'We design a psychological purchase path — a frictionless slide that moves hesitant leads toward a confident yes.',
      ar: 'نصمم مساراً نفسياً للشراء — مزلقاً سلساً يُحرّك العملاء المترددين نحو قرار شراء واثق.',
    },
  },
  {
    number: '03',
    title: { en: 'Dominate', ar: 'السيطرة' },
    description: {
      en: "We make your brand unforgettable. Competitors become irrelevant. Your market position becomes unassailable.",
      ar: 'نجعل علامتك التجارية لا تُنسى. يصبح المنافسون غير ذوي صلة. تصبح مكانتك في السوق لا تُنتزع.',
    },
  },
]

function ConnectingLine({ isRtl }: { isRtl: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-[3.25rem] inset-x-0 w-full pointer-events-none"
      height="2"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <motion.line
        x1={isRtl ? '75%' : '25%'}
        y1="1"
        x2={isRtl ? '25%' : '75%'}
        y2="1"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  )
}

export default function ProcessSection({ data, locale }: { data?: ProcessData | null; locale: string }) {
  const isRtl = locale === 'ar'
  const headline =
    (isRtl ? data?.headline?.ar : data?.headline?.en) ||
    (isRtl
      ? 'PrismaFlow تملك خريطة الطريق إلى عقل المشتري'
      : "PrismaFlow Holds the Roadmap to the Buyer's Mind")

  const steps = data?.steps?.length ? data.steps : fallbackSteps

  return (
    <section className="relative z-10 py-32 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel className="mb-6">
            {isRtl ? 'المسار' : 'THE ROADMAP'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--text)] max-w-2xl">
            <TextReveal delay={0.1} stagger={0.07}>
              {headline}
            </TextReveal>
          </h2>
        </div>

        {/* Steps — horizontal grid with animated connector */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          <ConnectingLine isRtl={isRtl} />

          {steps.map((step, i) => {
            const title = (isRtl ? step.title.ar : step.title.en) || ''
            const desc = (isRtl ? step.description.ar : step.description.en) || ''

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.18, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pt-4"
              >
                {/* Large muted number */}
                <div
                  className="text-[7rem] font-black leading-none select-none mb-6 text-[var(--border)]"
                  style={{ letterSpacing: '-0.04em' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Accent dot */}
                <div className="w-2 h-2 rounded-full bg-[var(--prism)] mb-4" />

                <h3 className="text-2xl font-bold text-[var(--text)] mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
