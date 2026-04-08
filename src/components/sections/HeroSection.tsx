'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

const EN_HEADLINE = 'ENGINEER DESIRE.'
const AR_HEADLINE = 'هندسة الرغبة.'
const EN_SUBLINE = 'Neuromarketing Agency — We engineer desire that doubles sales'
const AR_SUBLINE = 'وكالة التسويق العصبي — نهندس الرغبة ونضاعف المبيعات'
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

  const [showContent, setShowContent] = useState(false)
  const primaryCtaRef = useMagneticEffect<HTMLAnchorElement>(80, 5)

  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const prismSvgRef = useRef<SVGSVGElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const floatRef1 = useRef<HTMLDivElement>(null)
  const floatRef2 = useRef<HTMLDivElement>(null)
  const floatRef3 = useRef<HTMLDivElement>(null)
  const floatRef4 = useRef<HTMLDivElement>(null)
  const scrollArrowRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show everything immediately
      if (headlineRef.current) {
        headlineRef.current.querySelectorAll('span').forEach((s) => {
          ;(s as HTMLElement).style.opacity = '1'
        })
      }
      if (sublineRef.current) {
        sublineRef.current.style.opacity = '1'
        sublineRef.current.style.transform = 'none'
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1'
        ctaRef.current.style.transform = 'none'
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = '1'
      }
      setShowContent(true)
      return
    }

    const tl = gsap.timeline()

    // 1. Stagger chars
    const chars = headlineRef.current?.querySelectorAll('span')
    if (chars && chars.length > 0) {
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: 'power2.out',
        },
        0.2
      )
    }

    // 2. Subline
    tl.to(
      sublineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '>-0.1'
    )

    // 3. CTAs
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '>-0.5'
    )

    // 4. Scroll indicator
    tl.to(
      scrollIndicatorRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '>-0.3'
    )

    // 5. On complete, trigger fade-in for subline (no more scramble - buggy RAF race condition)
    tl.call(() => {
      setShowContent(true)
      // Fade in subline cleanly — no more character scramble
      if (sublineRef.current) {
        gsap.to(sublineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1,
        })
      }
    })

    // Prism SVG spin
    if (prismSvgRef.current) {
      gsap.set(prismSvgRef.current, { transformOrigin: '50% 50%' })
      gsap.to(prismSvgRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    // Background glow pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.06,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        startAt: { opacity: 0.01 },
      })
    }

    // Scroll arrow bounce
    if (scrollArrowRef.current) {
      gsap.to(scrollArrowRef.current, {
        y: -8,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    // Floating shapes
    if (floatRef1.current) {
      gsap.to(floatRef1.current, { y: -20, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }
    if (floatRef2.current) {
      gsap.to(floatRef2.current, { y: -20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 })
    }
    if (floatRef3.current) {
      gsap.to(floatRef3.current, { y: -20, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })
    }
    if (floatRef4.current) {
      gsap.to(floatRef4.current, { y: -20, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3 })
    }
  }, { scope: containerRef })

  const primaryLabel = primaryCTALabel || (isAr ? 'قدّم طلبك الآن' : 'Apply Now →')
  const secondaryLabel = secondaryCTALabel || (isAr ? 'اكتشف المزيد' : 'See How It Works')

  return (
    <section
      ref={containerRef}
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
      {/* Radial gradient glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,163,204,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.01,
        }}
      />

      {/* Floating ambient elements */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Circle 1 */}
        <div
          ref={floatRef1}
          style={{
            position: 'absolute',
            top: '15%',
            left: isAr ? 'auto' : '8%',
            right: isAr ? '8%' : 'auto',
            width: '48px',
            height: '48px',
            border: '1px solid #00A3CC',
            borderRadius: '50%',
            opacity: 0.12,
          }}
        />
        {/* Square */}
        <div
          ref={floatRef2}
          style={{
            position: 'absolute',
            top: '65%',
            left: isAr ? 'auto' : '12%',
            right: isAr ? '12%' : 'auto',
            width: '20px',
            height: '20px',
            background: '#00A3CC',
            opacity: 0.1,
          }}
        />
        {/* Circle 2 */}
        <div
          ref={floatRef3}
          style={{
            position: 'absolute',
            top: '35%',
            left: isAr ? '18%' : 'auto',
            right: isAr ? 'auto' : '20%',
            width: '12px',
            height: '12px',
            background: '#00A3CC',
            borderRadius: '50%',
            opacity: 0.15,
          }}
        />
        {/* Diamond */}
        <div
          ref={floatRef4}
          style={{
            position: 'absolute',
            bottom: '25%',
            left: isAr ? '5%' : 'auto',
            right: isAr ? 'auto' : '8%',
            width: '14px',
            height: '14px',
            border: '1px solid #00A3CC',
            opacity: 0.12,
            transform: 'rotate(45deg)',
          }}
        />
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
          ref={prismSvgRef}
          width="640"
          height="640"
          viewBox="0 0 640 640"
          fill="none"
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
          paddingTop: '6rem',
          paddingBottom: '6rem',
          width: '100%',
        }}
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          aria-label={headline}
          style={{
            fontFamily: 'var(--font-bebas-neue), system-ui',
            fontSize: 'clamp(3.5rem, 18vw, 12rem)',
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
                opacity: 0,
                display: 'inline-block',
                transform: 'translateY(10px)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subline with scramble effect */}
        <p
          ref={sublineRef}
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui',
            fontSize: '1.5rem',
            color: '#888888',
            marginBottom: '3rem',
            maxWidth: '640px',
            lineHeight: 1.5,
            opacity: 0,
            transform: 'translateY(12px)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {sublineTarget}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: 0,
            transform: 'translateY(16px)',
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
        ref={scrollIndicatorRef}
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
          opacity: 0,
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
          ref={scrollArrowRef}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
        >
          <path d="M1 1L7 7L13 1" stroke="#00A3CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
