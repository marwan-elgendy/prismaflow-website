'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

const EN_HEADLINE = 'ENGINEER DESIRE.'
const AR_HEADLINE = 'هندسة الرغبة.'
const EN_SUBLINE = 'Neuromarketing Agency — We engineer desire that doubles sales'
const AR_SUBLINE = 'وكالة التسويق العصبي — نهندس الرغبة ونضاعف المبيعات'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

interface HeroSectionProps {
  locale: string
  data?: unknown
  primaryCTALabel?: string
  secondaryCTALabel?: string
}

export default function HeroSection({ locale, primaryCTALabel, secondaryCTALabel }: HeroSectionProps) {
  const isAr = locale === 'ar'
  const headline = isAr ? AR_HEADLINE : EN_HEADLINE
  const sublineTarget = isAr ? AR_SUBLINE : EN_SUBLINE

  const [visibleChars, setVisibleChars] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [scrambledSubline, setScrambledSubline] = useState(sublineTarget)
  const scrambleRafRef = useRef<number>(0)
  const primaryCtaRef = useMagneticEffect<HTMLAnchorElement>(80, 5)

  // Headline char-by-char reveal
  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setVisibleChars(i)
        if (i >= headline.length) {
          clearInterval(interval)
          setShowContent(true)
        }
      }, 25)
      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(delay)
  }, [headline.length])

  // Text scramble on subline when showContent becomes true
  useEffect(() => {
    if (!showContent) return
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let iteration = 0
    let lastTime = 0
    const text = sublineTarget

    const scramble = (timestamp: number) => {
      if (timestamp - lastTime < 30) {
        scrambleRafRef.current = requestAnimationFrame(scramble)
        return
      }
      lastTime = timestamp

      const result = text.split('').map((char, idx) => {
        if (char === ' ' || char === '—') return char
        if (idx < iteration) return char
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join('')

      setScrambledSubline(result)

      if (iteration < text.length) {
        iteration += 2
        scrambleRafRef.current = requestAnimationFrame(scramble)
      } else {
        setScrambledSubline(text)
      }
    }

    // Small delay so subline fade-in starts first
    const timeout = setTimeout(() => {
      scrambleRafRef.current = requestAnimationFrame(scramble)
    }, 100)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(scrambleRafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showContent])

  const primaryLabel = primaryCTALabel || (isAr ? 'قدّم طلبك الآن' : 'Apply Now →')
  const secondaryLabel = secondaryCTALabel || (isAr ? 'اكتشف المزيد' : 'See How It Works')

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,255,0,0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating ambient elements */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Circle 1 */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: isAr ? 'auto' : '8%',
          right: isAr ? '8%' : 'auto',
          width: '48px',
          height: '48px',
          border: '1px solid #00A3CC',
          borderRadius: '50%',
          opacity: 0.12,
          animation: 'pf-float-1 6s ease-in-out infinite',
        }} />
        {/* Square */}
        <div style={{
          position: 'absolute',
          top: '65%',
          left: isAr ? 'auto' : '12%',
          right: isAr ? '12%' : 'auto',
          width: '20px',
          height: '20px',
          background: '#00A3CC',
          opacity: 0.1,
          animation: 'pf-float-2 8s ease-in-out infinite',
          animationDelay: '1s',
        }} />
        {/* Circle 2 */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: isAr ? '18%' : 'auto',
          right: isAr ? 'auto' : '20%',
          width: '12px',
          height: '12px',
          background: '#00A3CC',
          borderRadius: '50%',
          opacity: 0.15,
          animation: 'pf-float-3 7s ease-in-out infinite',
          animationDelay: '2s',
        }} />
        {/* Diamond */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: isAr ? '5%' : 'auto',
          right: isAr ? 'auto' : '8%',
          width: '14px',
          height: '14px',
          border: '1px solid #00A3CC',
          opacity: 0.12,
          transform: 'rotate(45deg)',
          animation: 'pf-float-1 9s ease-in-out infinite',
          animationDelay: '3s',
        }} />
      </div>

      {/* Prism SVG decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: isAr ? 'auto' : '-8%',
          left: isAr ? '-8%' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="640"
          height="640"
          viewBox="0 0 640 640"
          fill="none"
          style={{ animation: 'pf-prism-spin 20s linear infinite' }}
        >
          <polygon points="320,20 610,520 30,520" stroke="#00A3CC" strokeWidth="1.5" fill="none" />
          <polygon points="320,80 550,490 90,490" stroke="#00A3CC" strokeWidth="0.8" fill="none" />
          <polygon points="320,140 490,460 150,460" stroke="#00A3CC" strokeWidth="0.5" fill="none" />
          <polygon points="320,200 430,430 210,430" stroke="#00A3CC" strokeWidth="0.3" fill="none" />
          <line x1="320" y1="20" x2="320" y2="520" stroke="#00A3CC" strokeWidth="0.5" opacity="0.5" />
          <line x1="30" y1="520" x2="610" y2="520" stroke="#00A3CC" strokeWidth="0.5" opacity="0.5" />
          <line x1="320" y1="20" x2="610" y2="520" stroke="#00A3CC" strokeWidth="0.3" opacity="0.3" />
          <line x1="320" y1="20" x2="30" y2="520" stroke="#00A3CC" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          paddingTop: '9rem',
          paddingBottom: '9rem',
          width: '100%',
        }}
      >
        {/* Headline */}
        <h1
          aria-label={headline}
          style={{
            fontFamily: 'var(--font-bebas-neue), system-ui',
            fontSize: 'clamp(4.5rem, 20vw, 12rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: '#F5F5F5',
            margin: 0,
            marginBottom: '2.5rem',
          }}
        >
          {headline.split('').map((char, idx) => (
            <span
              key={idx}
              style={{
                opacity: idx < visibleChars ? 1 : 0,
                transition: 'opacity 0.05s ease',
                display: 'inline',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subline with scramble effect */}
        <p
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui',
            fontSize: '1.5rem',
            color: '#888888',
            marginBottom: '3rem',
            maxWidth: '640px',
            lineHeight: 1.5,
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {scrambledSubline}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s var(--ease-out-expo) 0.15s, transform 0.8s var(--ease-out-expo) 0.15s',
          }}
        >
          <Link
            ref={primaryCtaRef}
            href={`/${locale}/apply`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.25rem',
              background: '#00A3CC',
              color: '#0A0A0A',
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontWeight: 700,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {primaryLabel}
          </Link>
          <Link
            href={`/${locale}/landing`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.25rem',
              border: '1px solid rgba(245,245,245,0.3)',
              color: '#F5F5F5',
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.7)'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.3)'
              e.currentTarget.style.color = '#F5F5F5'
            }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: showContent ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.5625rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3A3A3A',
          }}
        >
          {isAr ? 'تمرير' : 'scroll'}
        </span>
        <div
          style={{
            width: '1px',
            height: '2.5rem',
            background: 'linear-gradient(to bottom, #3A3A3A, transparent)',
          }}
        />
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          style={{ animation: 'pf-bounce 2s ease-in-out infinite' }}
        >
          <path d="M1 1L7 7L13 1" stroke="#00A3CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
