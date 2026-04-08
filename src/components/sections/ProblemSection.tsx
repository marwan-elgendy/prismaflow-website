'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProblemSection({ locale, data }: { locale: string; data?: unknown }) {
  const isAr = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)

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

  useGSAP(() => {
    if (!sectionRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Show all immediately
      gsap.set('.problem-label', { opacity: 1, x: 0 })
      gsap.set('.problem-headline', { opacity: 1, y: 0 })
      gsap.set('.problem-stat-item', { opacity: 1, y: 0 })
      gsap.set('.problem-divider', { width: '100%' })
      gsap.set('.problem-punchline', { opacity: 1, y: 0 })
      stats.forEach((stat, i) => {
        const el = sectionRef.current?.querySelector(`.stat-num-${i}`)
        if (el) el.textContent = String(stat.target)
      })
      return
    }

    const triggerDefaults = {
      start: 'top 80%',
      once: true,
    }

    // Section label
    gsap.from('.problem-label', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
    })

    // Headline
    gsap.from('.problem-headline', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
    })

    // Stat items: fade + slide up, staggered
    gsap.from('.problem-stat-item', {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
    })

    // Counter roll for each stat
    stats.forEach((stat, i) => {
      const el = sectionRef.current?.querySelector(`.stat-num-${i}`) as HTMLElement | null
      if (!el) return

      const counter = { val: 0 }
      gsap.to(counter, {
        val: stat.target,
        duration: 1.5,
        ease: 'expo.out',
        delay: (stat.delay / 1000),
        onUpdate: () => {
          el.textContent = String(Math.floor(counter.val))
        },
        scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
      })
    })

    // Divider
    gsap.from('.problem-divider', {
      width: '0%',
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.6,
      scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
    })

    // Punchline
    gsap.from('.problem-punchline', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1,
      scrollTrigger: { trigger: sectionRef.current, ...triggerDefaults },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: '12rem 2rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <p
          className="problem-label"
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
          className="problem-headline"
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
            <div
              key={i}
              className="problem-stat-item"
              style={{ textAlign: 'center' }}
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
                <span>{stat.prefix}</span>
                <span className={`stat-num-${i}`}>0</span>
                <span>{stat.suffix}</span>
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
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="problem-divider"
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#1A1A1A',
            margin: '0 auto 4rem',
          }}
        />

        {/* Punchline */}
        <p
          className="problem-punchline"
          style={{
            fontFamily: 'var(--font-bebas-neue), system-ui',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            color: '#F5F5F5',
            textAlign: 'center',
            letterSpacing: '0.02em',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {punchline}
        </p>
      </div>
    </section>
  )
}
