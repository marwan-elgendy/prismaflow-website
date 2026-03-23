'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  fullName: string
  phone: string
  email: string
  website: string
  challenge: string
  goal: string
}

export default function ApplicationForm({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [form, setForm] = useState<FormData>({
    fullName: '', phone: '', email: '', website: '', challenge: '', goal: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const labels = {
    fullName: isAr ? 'الاسم الكامل' : 'Full Name',
    phone: isAr ? 'رقم الهاتف' : 'Phone Number',
    email: isAr ? 'البريد الإلكتروني' : 'Email Address',
    website: isAr ? 'رابط موقعك أو صفحتك (اختياري)' : 'Website or Social Media Link (optional)',
    challenge: isAr ? 'ما هو أكبر تحدٍّ تسويقي تواجهه الآن؟' : 'What is your biggest marketing challenge right now?',
    goal: isAr ? 'ما هو هدفك المالي/المبيعاتي للربع القادم؟' : 'What is your financial/sales goal for next quarter?',
    submit: isAr ? 'أرسل طلبك' : 'Submit Application',
    submitting: isAr ? 'جارٍ الإرسال...' : 'Submitting...',
    success: isAr ? 'تم إرسال طلبك! سنتواصل معك قريباً.' : "Application submitted! We'll be in touch soon.",
    errorGeneric: isAr ? 'حدث خطأ. يرجى المحاولة مجدداً.' : 'Something went wrong. Please try again.',
  }

  const inputClass = 'form-input'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      setError(labels.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-[color:var(--color-cyan)] text-xl font-semibold">{labels.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.fullName} *</label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.phone} *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.email} *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.website}</label>
        <input
          type="url"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.challenge} *</label>
        <textarea
          required
          rows={4}
          value={form.challenge}
          onChange={(e) => setForm({ ...form, challenge: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className="block text-sm text-[color:var(--color-gray-400)] mb-2">{labels.goal} *</label>
        <textarea
          required
          rows={4}
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p role="alert" className="text-red-400 text-sm text-center">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={`w-full justify-center ${loading ? 'opacity-70 pointer-events-none' : ''}`}
      >
        {loading ? labels.submitting : labels.submit}
      </Button>
    </form>
  )
}
