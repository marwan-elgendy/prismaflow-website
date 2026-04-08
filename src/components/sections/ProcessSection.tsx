'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: { en: 'Diagnose', ar: 'التشخيص' },
    description: {
      en: "We map your market's unconscious decision-making patterns using neuroscience research.",
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

function SVGConnector({
  lineRef,
  isRtl,
}: {
  lineRef: React.RefObject<SVGLineElement | null>
  isRtl: boolean
}) {
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
        ref={lineRef}
        x1={isRtl ? '75%' : '25%'}
        y1="1"
        x2={isRtl ? '25%' : '75%'}
        y2="1"
        stroke="#00A3CC"
        strokeWidth="1.5"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        style={{ opacity: 0.4 }}
      />
    </svg>
  )
}

export default function ProcessSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      gsap.set('.process-label', { opacity: 1, x: 0 })
      gsap.set('.process-headline', { opacity: 1, y: 0 })
      gsap.set('.process-step', { opacity: 1, y: 0 })
      gsap.set('.step-number', { opacity: 1, scale: 1 })
      gsap.set('.step-dot', { scale: 1 })
      if (lineRef.current) gsap.set(lineRef.current, { strokeDashoffset: 0 })
      return
    }

    const triggerDefaults = {
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
    }

    // Section label
    gsap.from('.process-label', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: triggerDefaults,
    })

    // Section headline
    gsap.from('.process-headline', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: triggerDefaults,
    })

    // Steps
    gsap.from('.process-step', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // Step numbers
    gsap.from('.step-number', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // Step dots
    gsap.from('.step-dot', {
      scale: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      delay: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // SVG connector line
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
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
            className="process-label"
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
            className="process-headline"
            style={{
              fontFamily: 'var(--font-bebas-neue), system-ui',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#F5F5F5',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {isAr ? 'خريطة الطريق إلى عقل المشتري' : "THE ROADMAP TO THE BUYER'S MIND"}
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* SVG connector line — shown on md+ via inline style override in CSS */}
          <SVGConnector lineRef={lineRef} isRtl={isAr} />

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
                className="process-step"
                style={{ paddingTop: '1rem' }}
              >
                {/* Large muted step number */}
                <div
                  aria-hidden="true"
                  className="step-number"
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

                {/* Cyan accent dot */}
                <div
                  className="step-dot"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#00A3CC',
                    marginBottom: '1.25rem',
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
