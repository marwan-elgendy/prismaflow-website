'use client'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'

const steps = [
  {
    number: '01',
    title: { en: 'Diagnose', ar: 'التشخيص' },
    description: {
      en: 'We map your market\'s unconscious decision-making patterns using neuroscience research.',
      ar: 'نرسم خريطة أنماط اتخاذ القرار اللاواعية في سوقك باستخدام أبحاث علم الأعصاب.',
    },
  },
  {
    number: '02',
    title: { en: 'Engineer', ar: 'الهندسة' },
    description: {
      en: 'We design the cognitive path: stimuli, friction points, emotional triggers.',
      ar: 'نصمم المسار الإدراكي: المحفزات، ونقاط الاحتكاك، والمشغلات العاطفية.',
    },
  },
  {
    number: '03',
    title: { en: 'Amplify', ar: 'التضخيم' },
    description: {
      en: 'We deploy multi-channel campaigns that bypass rational resistance.',
      ar: 'نطلق حملات متعددة القنوات تتجاوز المقاومة العقلانية.',
    },
  },
]

function SVGConnector({ inView, isRtl }: { inView: boolean; isRtl: boolean }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '4rem',
        left: 0,
        right: 0,
        width: '100%',
        height: '2px',
        overflow: 'visible',
        pointerEvents: 'none',
        display: 'none',
      }}
      className="pf-process-line"
    >
      <line
        x1={isRtl ? '75%' : '25%'}
        y1="1"
        x2={isRtl ? '25%' : '75%'}
        y2="1"
        stroke="#00A3CC"
        strokeWidth="1.5"
        strokeDasharray="2000"
        strokeDashoffset={inView ? '0' : '2000'}
        style={{
          transition: inView ? 'stroke-dashoffset 1.4s var(--ease-out-expo) 0.6s' : 'none',
          opacity: 0.4,
        }}
      />
    </svg>
  )
}

export default function ProcessSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView(0.3)

  const mergeRef = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (ref as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <section
      ref={mergeRef as React.RefCallback<HTMLElement>}
      style={{
        backgroundColor: '#0A0A0A',
        padding: '8rem 2rem',
        borderTop: '1px solid #1A1A1A',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '6rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontSize: '0.6875rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#00A3CC',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#00A3CC' }} />
            {isAr ? 'البروتوكول' : 'THE PROTOCOL'}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas-neue), system-ui',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#F5F5F5',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {isAr ? 'خريطة الطريق إلى عقل المشتري' : 'THE ROADMAP TO THE BUYER\'S MIND'}
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* SVG connector line — shown on md+ via inline style override in CSS */}
          <SVGConnector inView={inView} isRtl={isAr} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '3rem',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  paddingTop: '1rem',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.6s var(--ease-out-expo) ${i * 0.2}s, transform 0.6s var(--ease-out-expo) ${i * 0.2}s`,
                }}
              >
                {/* Large muted step number */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 'clamp(5rem, 10vw, 8rem)',
                    lineHeight: 1,
                    color: '#1A1A1A',
                    letterSpacing: '-0.04em',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    userSelect: 'none',
                  }}
                >
                  {step.number}
                </div>

                {/* Chartreuse accent dot */}
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#00A3CC',
                    marginBottom: '1.25rem',
                    transform: inView ? 'scale(1)' : 'scale(0)',
                    transition: `transform 0.4s var(--ease-out-expo) ${i * 0.2 + 0.3}s`,
                  }}
                />

                <h3
                  style={{
                    fontFamily: 'var(--font-bebas-neue), system-ui',
                    fontSize: '2rem',
                    color: '#F5F5F5',
                    letterSpacing: '0.02em',
                    marginBottom: '1rem',
                  }}
                >
                  {isAr ? step.title.ar : step.title.en}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-inter), system-ui',
                    fontSize: '0.9375rem',
                    color: '#666666',
                    lineHeight: 1.7,
                  }}
                >
                  {isAr ? step.description.ar : step.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .pf-process-line { display: block !important; }
        }
      `}</style>
    </section>
  )
}
