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
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-3">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[var(--text)]">PRISMA</span>
              <span className="text-[var(--prism)]">FLOW</span>
            </span>
          </div>
          <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
            {t('tagline')}
          </p>
          <div className="flex gap-4">
            {(['Instagram', 'LinkedIn', 'Facebook'] as const).map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xs font-semibold text-[var(--text-dim)] mb-4 tracking-widest uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs font-semibold text-[var(--text-dim)] mb-2 tracking-widest uppercase">
            {t('newsletter_heading')}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
            {t('newsletter_sub')}
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('newsletter_placeholder')}
              className="form-input flex-1 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-[var(--accent)] text-[var(--bg)] rounded-sm hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
            >
              {t('newsletter_cta')}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] px-6 py-4">
        <p className="text-center text-xs text-[var(--text-dim)]">{t('rights')}</p>
      </div>
    </footer>
  )
}
