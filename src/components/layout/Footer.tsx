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
    <footer className="relative z-10 bg-[color:var(--color-surface)] border-t-2 border-[color:var(--color-cyan)]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
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
      <div className="border-t border-[color:var(--color-border)] px-6 py-4">
        <p className="text-center text-xs text-[color:var(--color-gray-400)]">{t('rights')}</p>
      </div>
    </footer>
  )
}
