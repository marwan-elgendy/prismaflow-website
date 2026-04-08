'use client'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface Testimonial {
  quote: { en: string; ar: string }
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote: {
      en: "They didn't just rebrand us — they rewired how our market perceives us. Three months in, conversion jumped 340%.",
      ar: 'لم يعيدوا تسمية علامتنا فحسب — بل أعادوا برمجة كيف يرانا السوق. بعد ثلاثة أشهر، قفزت نسبة التحويل بنسبة 340%.',
    },
    name: 'Ahmed Al-Rashid',
    role: 'CEO, Meridian Foods',
  },
  {
    quote: {
      en: 'Working with PrismaFlow felt like being handed a psychological superpower. They see what competitors miss.',
      ar: 'العمل مع PrismaFlow كان كأنني حصلت على قوة نفسية خارقة. يرون ما يفوت المنافسين.',
    },
    name: 'Sara Khoury',
    role: 'CMO, NorthStar Ventures',
  },
  {
    quote: {
      en: 'Our ad spend dropped 60% and results tripled. Because now every peso is designed to persuade.',
      ar: 'انخفض إنفاقنا الإعلاني بنسبة 60% وتضاعفت النتائج ثلاث مرات. لأن كل ريال الآن مصمم للإقناع.',
    },
    name: 'Carlos Vega',
    role: 'Founder, Aura Wellness',
  },
]

export default function TestimonialsSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const progressBarRef = useRef<HTMLSpanElement>(null)
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const progressAnimRef = useRef<gsap.core.Tween | null>(null)

  // Auto-advance
  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [hovered])

  // Progress bar animation via GSAP
  useEffect(() => {
    if (!progressBarRef.current) return

    // Kill previous animation
    if (progressAnimRef.current) {
      progressAnimRef.current.kill()
      progressAnimRef.current = null
    }

    if (hovered) {
      // Leave bar at current position (paused)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressBarRef.current.style.width = '100%'
      return
    }

    // Reset and animate
    gsap.set(progressBarRef.current, { width: '0%' })
    progressAnimRef.current = gsap.to(progressBarRef.current, {
      width: '100%',
      duration: 4,
      ease: 'none',
    })
  }, [current, hovered])

  // Dot scale animation on current change
  useGSAP(() => {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (i === current) {
        gsap.to(dot, { scaleX: 3, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(dot, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
      }
    })
  }, [current])

  const handleDotClick = (idx: number) => {
    setCurrent(idx)
  }

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        padding: '8rem 2rem',
        borderTop: '1px solid #1A1A1A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.015,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <p
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui',
            fontSize: '0.6875rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#00A3CC',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#00A3CC' }} />
          {isAr ? 'أصداء' : 'ECHOES'}
        </p>

        {/* Testimonial container */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ position: 'relative', minHeight: '280px' }}
        >
          {testimonials.map((item, idx) => {
            const isActive = idx === current
            const quote = isAr ? item.quote.ar : item.quote.en

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.8s ease',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Opening quote mark */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-bebas-neue), system-ui',
                    fontSize: '6rem',
                    lineHeight: 0.8,
                    color: '#1A1A1A',
                    marginBottom: '1.5rem',
                    userSelect: 'none',
                  }}
                >
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontFamily: 'var(--font-bebas-neue), system-ui',
                    fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                    lineHeight: 1.1,
                    color: '#F5F5F5',
                    letterSpacing: '0.01em',
                    marginBottom: '2.5rem',
                    fontStyle: 'normal',
                  }}
                >
                  {quote}
                </blockquote>

                {/* Attribution */}
                <p
                  style={{
                    fontFamily: 'var(--font-inter), system-ui',
                    fontSize: '1rem',
                    color: '#888888',
                  }}
                >
                  — {item.name},{' '}
                  <span style={{ color: '#555555' }}>{item.role}</span>
                </p>
              </div>
            )
          })}
        </div>

        {/* Dot indicators + progress line */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '4rem',
            paddingTop: '10rem',
            alignItems: 'center',
          }}
        >
          {testimonials.map((_, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <button
                ref={el => { dotRefs.current[idx] = el }}
                onClick={() => handleDotClick(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                style={{
                  width: '24px',
                  height: '8px',
                  backgroundColor: idx === current ? '#00A3CC' : '#2A2A2A',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'block',
                  overflow: 'hidden',
                  position: 'relative',
                  transformOrigin: 'left center',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {/* Progress line inside active dot */}
                {idx === current && (
                  <span
                    ref={progressBarRef}
                    style={{
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '0%',
                      background: 'rgba(255,255,255,0.4)',
                    }}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
