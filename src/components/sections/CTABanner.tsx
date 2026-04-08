'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [btnHovered, setBtnHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<SVGLineElement>(null)

  const headline = isAr ? 'مستعد لتصبح لا يُقاوم؟' : 'Ready to be irresistible?'
  const subline = isAr
    ? 'توقف عن حرق ميزانيتك. ابدأ هندسة الرغبة اليوم.'
    : 'Stop burning your budget. Start engineering desire today.'
  const cta = isAr ? 'قدّم طلبك الآن' : 'Apply Now →'

  useGSAP(() => {
    if (!sectionRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      if (dividerRef.current) gsap.set(dividerRef.current, { strokeDashoffset: 0 })
      gsap.set('.cta-headline', { opacity: 1, y: 0 })
      gsap.set('.cta-subline', { opacity: 1, y: 0 })
      gsap.set('.cta-button-wrap', { opacity: 1, scale: 1 })
      return
    }

    const triggerDefaults = {
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
    }

    // SVG divider line
    if (dividerRef.current) {
      gsap.set(dividerRef.current, { strokeDashoffset: 1200 })
      gsap.to(dividerRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: triggerDefaults,
      })
    }

    // Headline
    gsap.from('.cta-headline', {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: triggerDefaults,
    })

    // Subline
    gsap.from('.cta-subline', {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: triggerDefaults,
    })

    // Button wrapper
    gsap.from('.cta-button-wrap', {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: triggerDefaults,
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef}>
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
            strokeDashoffset="1200"
          />
        </svg>
      </div>

      <section
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
            className="cta-headline"
            style={{
              fontFamily: 'var(--font-bebas-neue), system-ui',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: 0.9,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
            }}
          >
            {headline}
          </h2>

          {/* Subline */}
          <p
            className="cta-subline"
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui',
              fontSize: '1.25rem',
              color: '#0A0A0A',
              opacity: 0.7,
              marginBottom: '3rem',
              maxWidth: '520px',
              margin: '0 auto 3rem',
              lineHeight: 1.5,
            }}
          >
            {subline}
          </p>

          {/* Button */}
          <div className="cta-button-wrap">
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
    </div>
  )
}
