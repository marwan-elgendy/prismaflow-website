'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import GlowText from '@/components/effects/GlowText'

export default function CTABanner({ locale }: { locale: string }) {
  const isAr = locale === 'ar'

  return (
    <section className="relative z-10 py-32 bg-[color:var(--color-bg)] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,200,255,0.06), transparent)',
        }}
      />

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
            {isAr ? 'قدّم طلبك الآن' : 'Apply Now →'}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
