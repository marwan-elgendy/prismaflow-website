'use client'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { useCounter } from '@/hooks/useCounter'

interface StatProps {
  prefix?: string
  target: number
  suffix?: string
  label: string
  delay: number
  start: boolean
}

function StatCounter({ prefix = '', target, suffix = '', label, delay, start }: StatProps) {
  const count = useCounter(target, 1500, start)

  return (
    <div
      style={{
        opacity: start ? 1 : 0,
        transform: start ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s var(--ease-out-expo) ${delay}ms, transform 0.6s var(--ease-out-expo) ${delay}ms`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 'clamp(3.5rem, 8vw, 8rem)',
          lineHeight: 1,
          color: '#00A3CC',
          letterSpacing: '-0.04em',
          fontWeight: 700,
        }}
      >
        {prefix}{count}{suffix}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui',
          fontSize: '0.875rem',
          color: '#666666',
          marginTop: '1rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default function ProblemSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView(0.3)

  // Merge both refs
  const setRef = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (ref as React.MutableRefObject<HTMLElement | null>).current = el
  }

  const stats = isAr
    ? [
        { prefix: '', target: 87, suffix: '%', label: 'من الإعلانات يُتجاهلها الجميع', delay: 0 },
        { prefix: '', target: 4, suffix: '', label: 'ثوانٍ لاستحواذ الانتباه', delay: 200 },
        { prefix: '$', target: 500, suffix: 'B', label: 'تُهدر سنوياً على إعلانات غير فعّالة', delay: 400 },
      ]
    : [
        { prefix: '', target: 87, suffix: '%', label: 'of ads get ignored', delay: 0 },
        { prefix: '', target: 4, suffix: '', label: 'seconds to capture attention', delay: 200 },
        { prefix: '$', target: 500, suffix: 'B', label: 'wasted annually on ineffective advertising', delay: 400 },
      ]

  const punchline = isAr
    ? 'كل يوم بدون تسويق عصبي هو يوم تسلّم فيه عملاءك لمنافسيك.'
    : 'Every day without neuromarketing is a day you hand your customers to competitors.'

  return (
    <section
      ref={setRef as React.RefCallback<HTMLElement>}
      style={{
        backgroundColor: '#0A0A0A',
        padding: '12rem 2rem',
        position: 'relative',
      }}
    >
      {/* Section label */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui',
            fontSize: '0.6875rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#00A3CC',
            marginBottom: '5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#00A3CC' }} />
          {isAr ? 'المشكلة' : 'THE PROBLEM'}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-bebas-neue), system-ui',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#F5F5F5',
            textAlign: 'center',
            marginBottom: '6rem',
            letterSpacing: '0.02em',
          }}
        >
          {isAr ? 'لماذا يتجاهلك الجمهور؟' : 'THEY IGNORE YOU'}
        </h2>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '6rem',
          }}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={i}
              prefix={stat.prefix}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
              start={inView}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: inView ? '100%' : '0%',
            height: '1px',
            backgroundColor: '#1A1A1A',
            margin: '0 auto 4rem',
            transition: 'width 1.2s var(--ease-out-expo) 0.6s',
          }}
        />

        {/* Punchline */}
        <p
          style={{
            fontFamily: 'var(--font-bebas-neue), system-ui',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            color: '#F5F5F5',
            textAlign: 'center',
            letterSpacing: '0.02em',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s var(--ease-out-expo) 1s, transform 0.8s var(--ease-out-expo) 1s',
          }}
        >
          {punchline}
        </p>
      </div>
    </section>
  )
}
