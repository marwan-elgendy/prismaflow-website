'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const toggle = () => {
    const next = locale === 'en' ? 'ar' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    router.push(newPath)
  }

  const nextLocale = locale === 'en' ? 'ar' : 'en'
  const ariaLabel = locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
      aria-label={ariaLabel}
      lang={nextLocale}
    >
      <span className={locale === 'en' ? 'text-[var(--prism)]' : ''} aria-current={locale === 'en' ? 'true' : undefined}>EN</span>
      <span className="text-[var(--text-dim)]" aria-hidden="true">|</span>
      <span className={locale === 'ar' ? 'text-[var(--prism)]' : ''} aria-current={locale === 'ar' ? 'true' : undefined}>AR</span>
    </button>
  )
}
