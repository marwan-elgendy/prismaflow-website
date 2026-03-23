'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

// TODO: Wire to backend (e.g., email service, CRM, or API route) before going live

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

  const labels = {
    fullName: isAr ? 'الاسم الكامل' : 'Full Name',
    phone: isAr ? 'رقم الهاتف' : 'Phone Number',
    email: isAr ? 'البريد الإلكتروني' : 'Email Address',
    website: isAr ? 'رابط موقعك أو صفحتك (اختياري)' : 'Website or Social Media Link (optional)',
    challenge: isAr ? 'ما هو أكبر تحدٍّ تسويقي تواجهه الآن؟' : 'What is your biggest marketing challenge right now?',
    goal: isAr ? 'ما هو هدفك المالي/المبيعاتي للربع القادم؟' : 'What is your financial/sales goal for next quarter?',
    submit: isAr ? 'أرسل طلبك' : 'Submit Application',
    success: isAr ? 'تم إرسال طلبك! سنتواصل معك قريباً.' : "Application submitted! We'll be in touch soon.",
  }

  const inputClass =
    'w-full bg-[color:var(--color-bg)] border border-[color:var(--color-border)] text-[color:var(--color-white)] placeholder-[color:var(--color-gray-400)] px-4 py-3 rounded-sm focus:outline-none focus:border-[color:var(--color-cyan)] transition-colors text-sm'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application form data:', form)
    setSubmitted(true)
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

      <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
        {labels.submit}
      </Button>
    </form>
  )
}
