'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'

export default function CTABanner({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [ref, inView] = useInView(0.3)
  const [btnHovered, setBtnHovered] = useState(false)
  const dividerRef = useRef<SVGLineElement>(null)
  const [dividerAnimated, setDividerAnimated] = useState(false)

  // Trigger divider draw animation when section enters view
  useEffect(() => {
    if (inView && !dividerAnimated) setDividerAnimated(true)
  }, [inView, dividerAnimated])

  const headline = isAr ? 'مستعد لتصبح لا يُقاوم؟' : 'Ready to be irresistible?'
  const subline = isAr
    ? 'توقف عن حرق ميزانيتك. ابدأ هندسة الرغبة اليوم.'
    : 'Stop burning your budget. Start engineering desire today.'
  const cta = isAr ? 'قدّم طلبك الآن' : 'Apply Now →'

  return (
    <>
      {/* Animated divider — draws left to right on scroll */}
      <div
        aria-hidden="true"
        style={{ background: '#0A0A0A', lineHeight: 0 }}
      >
        <svg
          width="100%"
          height="2"
          viewBox="0 0 1200 2"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <line
            ref={dividerRef}
            x1="0"
            y1="1"
            x2="1200"
            y2="1"
            stroke="#00A3CC"
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset={dividerAnimated ? '0' : '1200'}
            style={{
              transition: dividerAnimated
                ? 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
            }}
          />
        </svg>
      </div>

      <section
        ref={ref as unknown as React.Ref<HTMLElement>}
        style={{
          backgroundColor: '#00A3CC',
          padding: '8rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-bebas-neue), system-ui',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: 0.9,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo)',
            }}
          >
            {headline}
          </h2>

          {/* Subline */}
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontSize: '1.25rem',
              color: '#0A0A0A',
              opacity: inView ? 0.7 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s var(--ease-out-expo) 0.15s, transform 0.8s var(--ease-out-expo) 0.15s',
              marginBottom: '3rem',
              maxWidth: '520px',
              margin: '0 auto 3rem',
              lineHeight: 1.5,
            }}
          >
            {subline}
          </p>

          {/* Button */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s var(--ease-out-expo) 0.3s, transform 0.8s var(--ease-out-expo) 0.3s',
            }}
          >
            <Link
              href={`/${locale}/apply`}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '1.125rem 2.5rem',
                backgroundColor: btnHovered ? 'transparent' : '#0A0A0A',
                border: '2px solid #0A0A0A',
                color: btnHovered ? '#0A0A0A' : '#FFFFFF',
                fontFamily: 'var(--font-space-grotesk), system-ui',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transform: btnHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
              }}
            >
              {cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
