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
      className="flex items-center gap-1 text-sm font-medium text-[color:var(--color-gray-400)] hover:text-[color:var(--color-cyan)] transition-colors"
      aria-label={ariaLabel}
      lang={nextLocale}
    >
      <span className={locale === 'en' ? 'text-[color:var(--color-cyan)]' : ''} aria-current={locale === 'en' ? 'true' : undefined}>EN</span>
      <span className="text-[color:var(--color-gray-600)]" aria-hidden="true">|</span>
      <span className={locale === 'ar' ? 'text-[color:var(--color-cyan)]' : ''} aria-current={locale === 'ar' ? 'true' : undefined}>AR</span>
    </button>
  )
}
