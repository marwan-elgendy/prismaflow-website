'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const toggle = () => {
    const next = locale === 'en' ? 'ar' : 'en'
    // Replace the current locale segment with the new one
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-sm font-medium text-[color:var(--color-gray-400)] hover:text-[color:var(--color-cyan)] transition-colors"
      aria-label="Toggle language"
    >
      <span className={locale === 'en' ? 'text-[color:var(--color-cyan)]' : ''}>EN</span>
      <span className="text-[color:var(--color-gray-600)]">|</span>
      <span className={locale === 'ar' ? 'text-[color:var(--color-cyan)]' : ''}>AR</span>
    </button>
  )
}
