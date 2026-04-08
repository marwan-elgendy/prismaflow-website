'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, LinkedIn } from '@/components/ui/Icons'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const footerRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/services`, label: nav('services') },
    { href: `/${locale}/blog`, label: nav('blog') },
    { href: `/${locale}/apply`, label: nav('apply') },
  ]

  const serviceLinks = [
    { href: `/${locale}/services`, label: t('link_funnel') },
    { href: `/${locale}/services`, label: t('link_copy') },
    { href: `/${locale}/services`, label: t('link_video') },
  ]

  useGSAP(() => {
    if (!footerRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.footer-item', { opacity: 1, y: 0 })
      return
    }

    gsap.from('.footer-item', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        once: true,
      },
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="bg-[#050505] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Logo + tagline + social */}
        <div className="footer-item">
          <Link href={`/${locale}`} className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img
              src="/logo-banner-transparent.png"
              alt="PrismaFlow"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-[var(--text-muted)] hover:text-[var(--prism)] transition-colors duration-[var(--duration-normal)]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-[var(--prism)] transition-colors duration-[var(--duration-normal)]"
            >
              <LinkedIn size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-item">
          <h3 className="text-[10px] font-semibold text-[var(--text-dim)] mb-5 tracking-[0.2em] uppercase font-[family-name:var(--font-space-grotesk)]">
            {t('col_company')}
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-[family-name:var(--font-inter)] transition-colors duration-[var(--duration-normal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-item">
          <h3 className="text-[10px] font-semibold text-[var(--text-dim)] mb-5 tracking-[0.2em] uppercase font-[family-name:var(--font-space-grotesk)]">
            {t('col_services')}
          </h3>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] font-[family-name:var(--font-inter)] transition-colors duration-[var(--duration-normal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] footer-item">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-[var(--text-dim)] font-[family-name:var(--font-inter)]">
            {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
