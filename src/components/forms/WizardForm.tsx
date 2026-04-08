'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  company: string
  challenge: string
  budget: string
  email: string
}

const STEPS = ['name', 'company', 'challenge', 'budget', 'email'] as const
type Step = (typeof STEPS)[number]

const BUDGET_OPTIONS = [
  { value: 'under-10k', label: 'Under $10K' },
  { value: '10k-50k', label: '$10K – $50K' },
  { value: '50k-100k', label: '$50K – $100K' },
  { value: '100k-plus', label: '$100K+' },
]

const QUESTIONS: Record<Step, { en: string; ar: string }> = {
  name: { en: 'What is your name?', ar: 'ما اسمك؟' },
  company: { en: 'What is your company?', ar: 'ما اسم شركتك؟' },
  challenge: { en: 'What is your biggest challenge right now?', ar: 'ما أكبر تحدٍّ تواجهه الآن؟' },
  budget: { en: 'What is your monthly ad budget?', ar: 'ما ميزانيتك الإعلانية الشهرية؟' },
  email: { en: 'What is your email?', ar: 'ما بريدك الإلكتروني؟' },
}

const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
}

export default function WizardForm({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    challenge: '',
    budget: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const step = STEPS[currentStep]
  const progress = Math.round(((currentStep) / STEPS.length) * 100)
  const question = QUESTIONS[step][isAr ? 'ar' : 'en']
  const isLastStep = currentStep === STEPS.length - 1
  const isValid = formData[step]?.trim() !== ''

  const handleNext = () => {
    if (!isValid) return
    if (isLastStep) {
      setSubmitted(true)
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 'challenge') {
      e.preventDefault()
      handleNext()
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-xl">
          <p
            className="text-[#00A3CC] text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {isAr ? 'تم التقديم' : 'Application received'}
          </p>
          <h2
            className="text-white font-black leading-tight"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
            }}
          >
            {isAr ? 'سنتواصل معك.' : 'We will be in touch.'}
          </h2>
          <p
            className="text-[#888888] mt-6 text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {isAr
              ? 'نراجع كل طلب شخصياً. إن كنت مناسباً، ستسمع منا خلال ٤٨ ساعة.'
              : "We review every application personally. If you're a fit, you'll hear from us within 48 hours."}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[#00A3CC] text-xs"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {progress}%
          </span>
          <span
            className="text-[#555555] text-xs"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {currentStep + 1} / {STEPS.length}
          </span>
        </div>
        <div className="h-px bg-[#1A1A1A] relative">
          <motion.div
            className="absolute top-0 left-0 h-px bg-[#00A3CC]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question + input */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <label
            className="block text-[#888888] text-sm mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
            htmlFor={`field-${step}`}
          >
            {question}
          </label>

          {step === 'challenge' ? (
            <div className="wizard-input-wrap">
              <textarea
                id={`field-${step}`}
                value={formData.challenge}
                onChange={(e) => setFormData((d) => ({ ...d, challenge: e.target.value }))}
                onKeyDown={handleKeyDown}
                rows={5}
                required
                placeholder={isAr ? 'اكتب هنا...' : 'Type your answer...'}
                className="w-full bg-[#111111] border border-[#333333] text-white px-5 py-4 text-lg outline-none focus:border-[#00A3CC] transition-colors duration-200 resize-none"
                style={{ fontFamily: 'var(--font-body)', borderRadius: 0 }}
              />
            </div>
          ) : step === 'budget' ? (
            <div className="wizard-input-wrap">
              <select
                id={`field-${step}`}
                value={formData.budget}
                onChange={(e) => setFormData((d) => ({ ...d, budget: e.target.value }))}
                required
                className="w-full bg-[#111111] border border-[#333333] text-white px-5 py-4 text-lg outline-none focus:border-[#00A3CC] transition-colors duration-200 appearance-none cursor-pointer"
                style={{ fontFamily: 'var(--font-body)', borderRadius: 0 }}
              >
                <option value="" disabled>
                  {isAr ? 'اختر...' : 'Select...'}
                </option>
                {BUDGET_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="wizard-input-wrap">
              <input
                id={`field-${step}`}
                type={step === 'email' ? 'email' : 'text'}
                value={formData[step]}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, [step]: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                required
                placeholder={isAr ? 'اكتب هنا...' : 'Type your answer...'}
                className="w-full bg-[#111111] border border-[#333333] text-white px-5 py-4 text-lg outline-none focus:border-[#00A3CC] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-body)', borderRadius: 0 }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          className={`${!isValid ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {isLastStep
            ? (isAr ? 'إرسال الطلب' : 'Submit Application')
            : (isAr ? 'التالي →' : 'Next →')}
        </Button>

        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s - 1)}
            className="text-[#555555] text-sm hover:text-[#888888] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {isAr ? '← رجوع' : '← Back'}
          </button>
        )}
      </div>
    </div>
  )
}
