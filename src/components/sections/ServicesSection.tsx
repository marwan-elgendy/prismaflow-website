'use client'
import { useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface Service {
  number: string
  title: { en: string; ar: string }
  problem: { en: string; ar: string }
  solution: { en: string; ar: string }
}

const services: Service[] = [
  {
    number: '01',
    title: {
      en: 'Sales Funnel Engineering',
      ar: 'هندسة قمع المبيعات',
    },
    problem: {
      en: 'Your funnel leaks at every stage',
      ar: 'قمعك يتسرب في كل مرحلة',
    },
    solution: {
      en: 'We map the psychological journey and eliminate every point of resistance',
      ar: 'نرسم الرحلة النفسية ونزيل كل نقطة مقاومة',
    },
  },
  {
    number: '02',
    title: {
      en: 'Neuro-Copywriting',
      ar: 'الكتابة العصبية',
    },
    problem: {
      en: 'Words that describe, not persuade',
      ar: 'كلمات تصف ولا تقنع',
    },
    solution: {
      en: 'We write copy that speaks to the subconscious first, rationale second',
      ar: 'نكتب نصوصاً تخاطب اللاوعي أولاً والعقل ثانياً',
    },
  },
  {
    number: '03',
    title: {
      en: 'Mental Movies',
      ar: 'الأفلام الذهنية',
    },
    problem: {
      en: 'Your brand is forgettable',
      ar: 'علامتك التجارية منسية',
    },
    solution: {
      en: 'We engineer multi-sensory brand memories that stick unconsciously',
      ar: 'نهندس ذكريات علامة متعددة الحواس تعلق دون وعي',
    },
  },
]

interface ServiceCardProps {
  service: Service
  locale: string
  index: number
}

function ServiceCard({ service, locale, index }: ServiceCardProps) {
  const isAr = locale === 'ar'
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView(0.2)

  const mergeRef = (el: HTMLElement | null) => {
    (cardRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (ref as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <div
      ref={mergeRef as React.RefCallback<HTMLDivElement>}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        border: '1px solid #1A1A1A',
        backgroundColor: hovered ? '#111111' : 'transparent',
        padding: '2.5rem',
        transform: hovered ? 'scale(1.01) rotate(0.5deg)' : 'scale(1) rotate(0deg)',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        marginTop: inView ? '0' : '24px',
        willChange: 'opacity, margin-top',
        // Use CSS transition for fade-up
        animationDelay: `${index * 0.12}s`,
      }}
    >
      {/* Left border draw */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          height: '100%',
          backgroundColor: '#E8FF00',
          transformOrigin: 'top',
          transform: inView ? 'scaleY(1)' : 'scaleY(0)',
          transition: `transform 0.4s var(--ease-out-expo) ${index * 0.12 + 0.1}s`,
        }}
      />

      {/* Number */}
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.75rem',
          color: '#E8FF00',
          marginBottom: '1.5rem',
          letterSpacing: '0.1em',
        }}
      >
        {service.number}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-bebas-neue), system-ui',
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          color: '#F5F5F5',
          lineHeight: 1,
          letterSpacing: '0.02em',
          marginBottom: '1.25rem',
        }}
      >
        {isAr ? service.title.ar : service.title.en}
      </h3>

      {/* Problem */}
      <p
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui',
          fontSize: '0.875rem',
          color: '#555555',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}
      >
        {isAr ? service.problem.ar : service.problem.en}
      </p>

      {/* Solution */}
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui',
          fontSize: '1rem',
          color: '#F5F5F5',
          lineHeight: 1.7,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}
      >
        {isAr ? service.solution.ar : service.solution.en}
      </p>
    </div>
  )
}

export default function ServicesSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        padding: '8rem 2rem',
        borderTop: '1px solid #1A1A1A',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontSize: '0.6875rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E8FF00',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#E8FF00' }} />
            {isAr ? 'ترسانتنا' : 'THE ARSENAL'}
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
            {isAr ? 'ترسانة الإقناع' : 'THE PERSUASION ARSENAL'}
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              locale={locale}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
