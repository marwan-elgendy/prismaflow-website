'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const logoRef = useRef<HTMLAnchorElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Logo entrance
    gsap.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.1,
    })

    // Nav links stagger
    if (navLinksRef.current) {
      const links = navLinksRef.current.querySelectorAll('a')
      gsap.from(links, {
        y: -10,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.2,
      })
    }

    // CTA button
    gsap.from(ctaRef.current, {
      x: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.4,
    })
  }, [])

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/blog`, label: t('blog') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.98)] backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-[rgba(10,10,10,0.85)] backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          ref={logoRef}
          href={`/${locale}`}
          className="flex items-center hover:opacity-80 transition-opacity z-50 relative"
        >
          <img
            src="/logo-transparent.png"
            alt="PrismaFlow"
            className="h-9 w-auto object-contain"
            style={{ filter: 'brightness(1000%)' }}
          />
        </Link>

        {/* Desktop nav */}
        <div ref={navLinksRef} className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link-hover relative text-xs tracking-wider uppercase pb-0.5 transition-colors duration-[var(--duration-normal)] ${
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--prism)]" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            ref={ctaRef}
            href={`/${locale}/apply`}
            className="px-5 py-2.5 text-xs tracking-wider uppercase font-[family-name:var(--font-clash)] font-semibold bg-[var(--prism)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--prism)] border border-[var(--prism)] transition-all duration-[var(--duration-normal)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('apply')}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-[73px] bg-[var(--bg)] z-40 flex flex-col px-6 pt-12 pb-8"
          >
            <div className="flex flex-col gap-0">
              {links.map((l, i) => {
                const isActive = pathname === l.href
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      className={`block py-5 text-[2.75rem] leading-none font-[family-name:var(--font-clash)] font-bold border-b border-[var(--border)] transition-colors ${
                        isActive
                          ? 'text-[var(--prism)]'
                          : 'text-[var(--text)] hover:text-[var(--prism)]'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.25 }}
              >
                <Link
                  href={`/${locale}/apply`}
                  className="block py-5 text-[2.75rem] leading-none font-[family-name:var(--font-clash)] font-bold border-b border-[var(--border)] text-[var(--prism)]"
                  onClick={() => setOpen(false)}
                >
                  {t('apply')}
                </Link>
              </motion.div>
            </div>
            <div className="mt-10">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
