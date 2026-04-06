'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function LeadCaptureForm({ locale, ctaLabel }: { locale: string; ctaLabel?: string }) {
  const isAr = locale === 'ar'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputClass = 'form-input'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, locale }),
      })
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--prism)] text-xl font-semibold">
          {isAr ? '🎉 شكراً! سيصلك الدليل قريباً.' : '🎉 Thanks! The guide is on its way.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        required
        placeholder={isAr ? 'اسمك' : 'Your Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        required
        placeholder={isAr ? 'بريدك الإلكتروني' : 'Your Email Address'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={`w-full justify-center ${loading ? 'opacity-70 pointer-events-none' : ''}`}
      >
        {loading
          ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...')
          : (ctaLabel || (isAr ? 'احصل على الدليل مجاناً' : 'Get the Free Guide'))}
      </Button>
    </form>
  )
}
