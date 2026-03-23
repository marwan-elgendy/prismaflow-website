export function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getLocalizedValue(
  obj: { en?: string; ar?: string } | null | undefined,
  locale: string
): string {
  if (!obj) return ''
  return locale === 'ar' ? (obj.ar || obj.en || '') : (obj.en || obj.ar || '')
}
