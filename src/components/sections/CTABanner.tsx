'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import GlowText from '@/components/effects/GlowText'

export default function CTABanner({ locale }: { locale: string }) {
  const isAr = locale === 'ar'

  return (
    <section className="relative z-10 py-32 overflow-hidden" style={{ background: '#0D0D10' }}>
      {/* Mesh gradient — radial spots at corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 0% 0%, rgba(0,200,255,0.05), transparent),
            radial-gradient(ellipse 50% 60% at 100% 100%, rgba(0,200,255,0.05), transparent),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,200,255,0.04), transparent)
          `,
        }}
      />

      {/* Full-width diagonal cyan gradient line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="diag-line" x1="0" y1="0" x2="1440" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C8FF" stopOpacity="0" />
              <stop offset="35%" stopColor="#00C8FF" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#00C8FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00C8FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="380" x2="1440" y2="20" stroke="url(#diag-line)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[color:var(--color-white)] mb-6 leading-tight">
            {isAr ? 'مستعد' : 'Ready to'}{' '}
            <GlowText intensity="high">{isAr ? 'للسيطرة على سوقك؟' : 'Dominate Your Market?'}</GlowText>
          </h2>
          <p className="text-[color:var(--color-gray-400)] text-lg mb-10">
            {isAr
              ? 'توقف عن حرق ميزانيتك. ابدأ هندسة الرغبة اليوم.'
              : "Stop burning your budget. Start engineering desire today."}
          </p>
          <Button variant="primary" size="lg" href={`/${locale}/apply`}>
            {isAr ? 'قدّم طلبك لهندسة تسويقك' : 'Apply to Engineer Your Marketing →'}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
