'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
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
        scrolled ? 'bg-[rgba(13,13,16,0.9)] backdrop-blur-md border-b border-[color:var(--color-border)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col leading-tight">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[color:var(--color-gray-400)]">PRISMA</span>
            <span className="text-[color:var(--color-cyan)]">FLOW</span>
          </span>
          <span className="text-[10px] tracking-widest text-[color:var(--color-gray-400)] uppercase">
            Shaping The Desire
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[color:var(--color-gray-400)] hover:text-[color:var(--color-white)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/apply`}
            className="px-4 py-2 text-sm font-semibold bg-[color:var(--color-cyan)] text-[#0D0D10] rounded-sm hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] transition-all"
          >
            {t('apply')}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-[color:var(--color-gray-400)] hover:text-[color:var(--color-white)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[color:var(--color-gray-400)] hover:text-[color:var(--color-white)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/apply`}
            className="text-[color:var(--color-cyan)] font-semibold"
            onClick={() => setOpen(false)}
          >
            {t('apply')}
          </Link>
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  )
}
