'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  const links = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/services`, label: nav('services') },
    { href: `/${locale}/blog`, label: nav('blog') },
    { href: `/${locale}/apply`, label: nav('apply') },
  ]

  return (
    <footer className="relative z-10 bg-[color:var(--color-surface)] border-t-2 border-[color:var(--color-cyan)] overflow-hidden">
      {/* PRISMAFLOW watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black tracking-[0.15em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: 'rgba(255,255,255,0.05)',
          }}
        >
          PRISMAFLOW
        </span>
      </div>

      {/* Neural network SVG decoration */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="320" height="260" viewBox="0 0 320 260" fill="none">
          {/* Nodes */}
          <circle cx="20" cy="50" r="3" fill="#00C8FF" />
          <circle cx="80" cy="20" r="3" fill="#00C8FF" />
          <circle cx="140" cy="60" r="3" fill="#00C8FF" />
          <circle cx="200" cy="30" r="3" fill="#00C8FF" />
          <circle cx="260" cy="70" r="3" fill="#00C8FF" />
          <circle cx="300" cy="20" r="3" fill="#00C8FF" />
          <circle cx="50" cy="120" r="3" fill="#00C8FF" />
          <circle cx="110" cy="100" r="3" fill="#00C8FF" />
          <circle cx="170" cy="140" r="3" fill="#00C8FF" />
          <circle cx="230" cy="110" r="3" fill="#00C8FF" />
          <circle cx="290" cy="130" r="3" fill="#00C8FF" />
          <circle cx="30" cy="190" r="3" fill="#00C8FF" />
          <circle cx="100" cy="170" r="3" fill="#00C8FF" />
          <circle cx="160" cy="210" r="3" fill="#00C8FF" />
          <circle cx="240" cy="180" r="3" fill="#00C8FF" />
          <circle cx="310" cy="200" r="3" fill="#00C8FF" />
          <circle cx="70" cy="240" r="3" fill="#00C8FF" />
          <circle cx="190" cy="250" r="3" fill="#00C8FF" />
          <circle cx="270" cy="240" r="3" fill="#00C8FF" />
          {/* Connections */}
          <line x1="20" y1="50" x2="80" y2="20" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="80" y1="20" x2="140" y2="60" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="140" y1="60" x2="200" y2="30" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="200" y1="30" x2="260" y2="70" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="260" y1="70" x2="300" y2="20" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="20" y1="50" x2="50" y2="120" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="80" y1="20" x2="110" y2="100" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="140" y1="60" x2="110" y2="100" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="140" y1="60" x2="170" y2="140" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="200" y1="30" x2="230" y2="110" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="260" y1="70" x2="290" y2="130" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="50" y1="120" x2="110" y2="100" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="110" y1="100" x2="170" y2="140" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="170" y1="140" x2="230" y2="110" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="230" y1="110" x2="290" y2="130" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="50" y1="120" x2="30" y2="190" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="110" y1="100" x2="100" y2="170" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="170" y1="140" x2="160" y2="210" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="230" y1="110" x2="240" y2="180" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="290" y1="130" x2="310" y2="200" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="30" y1="190" x2="100" y2="170" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="100" y1="170" x2="160" y2="210" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="160" y1="210" x2="240" y2="180" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="240" y1="180" x2="310" y2="200" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="30" y1="190" x2="70" y2="240" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="160" y1="210" x2="190" y2="250" stroke="#00C8FF" strokeWidth="0.5" />
          <line x1="240" y1="180" x2="270" y2="240" stroke="#00C8FF" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-3">
            <span className="text-2xl font-bold">
              <span className="text-[color:var(--color-gray-400)]">PRISMA</span>
              <span className="text-[color:var(--color-cyan)]">FLOW</span>
            </span>
          </div>
          <p className="text-[color:var(--color-gray-400)] text-sm mb-6">{t('tagline')}</p>
          <div className="flex gap-4">
            {[
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'Facebook', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-[color:var(--color-gray-400)] hover:text-[color:var(--color-cyan)] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-white)] mb-4 tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[color:var(--color-gray-400)] hover:text-[color:var(--color-cyan)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-white)] mb-2 tracking-wide uppercase">
            {t('newsletter_heading')}
          </h3>
          <form className="flex gap-2 mt-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('newsletter_placeholder')}
              className="flex-1 px-3 py-2 text-sm bg-[color:var(--color-bg)] border border-[color:var(--color-border)] text-[color:var(--color-white)] placeholder-[color:var(--color-gray-400)] focus:outline-none focus:border-[color:var(--color-cyan)] rounded-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-[color:var(--color-cyan)] text-[#0D0D10] rounded-sm hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all"
            >
              {t('newsletter_cta')}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-[color:var(--color-border)] px-6 py-4">
        <p className="text-center text-xs text-[color:var(--color-gray-400)]">{t('rights')}</p>
      </div>
    </footer>
  )
}
