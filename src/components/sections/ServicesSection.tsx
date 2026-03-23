'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

interface Service {
  icon?: string
  title: { en?: string; ar?: string }
  problem: { en?: string; ar?: string }
  solution: { en?: string; ar?: string }
  result: { en?: string; ar?: string }
}

interface ServicesData {
  headline?: { en?: string; ar?: string }
  subheadline?: { en?: string; ar?: string }
  services?: Service[]
}

const fallbackServices: Service[] = [
  {
    icon: '🧲',
    title: { en: 'Sales Funnel Engineering', ar: 'هندسة قمع المبيعات' },
    problem: {
      en: 'Are thousands visiting your site but leaving without buying?',
      ar: 'هل يزور آلاف موقعك ويغادرون دون شراء؟',
    },
    solution: {
      en: 'We build psychological slippery slides that guide visitors step-by-step to purchase.',
      ar: 'نبني مزالق نفسية تقود الزوار خطوة بخطوة نحو الشراء.',
    },
    result: {
      en: 'A website that becomes a 24/7 hunting machine.',
      ar: 'موقع يتحول إلى آلة صيد تعمل على مدار الساعة.',
    },
  },
  {
    icon: '✍️',
    title: { en: 'Neuro-Copywriting', ar: 'الكتابة العصبية' },
    problem: {
      en: 'Does your ad copy read like a dry press release nobody reads?',
      ar: 'هل نصوص إعلاناتك تبدو مثل بيان صحفي جاف لا يقرأه أحد؟',
    },
    solution: {
      en: "We use pathological empathy to write copy that hits deep desires, making clients say: 'Oh my god, that's exactly me!'",
      ar: 'نستخدم التعاطف المرضي لكتابة نصوص تصيب الرغبات العميقة، مما يجعل العملاء يقولون: "هذا أنا بالضبط!"',
    },
    result: {
      en: 'Irresistible ad copy that accelerates purchase decisions.',
      ar: 'نصوص إعلانية لا تُقاوم تُسرّع قرارات الشراء.',
    },
  },
  {
    icon: '🎬',
    title: { en: 'Mental Movies Production', ar: 'إنتاج الأفلام الذهنية' },
    problem: {
      en: "Traditional ads no longer capture the modern consumer's goldfish attention span.",
      ar: 'الإعلانات التقليدية لم تعد تستحوذ على انتباه المستهلك العصري.',
    },
    solution: {
      en: 'We fuse sales psychology with cinematic production to create mental movies — your customer experiences owning your product before they buy it.',
      ar: 'ندمج علم نفس المبيعات مع الإنتاج السينمائي لصناعة أفلام ذهنية — يشعر عميلك بامتلاك منتجك قبل أن يشتريه.',
    },
    result: {
      en: 'Ads that steal attention and plant desire in under 5 seconds.',
      ar: 'إعلانات تسرق الانتباه وتزرع الرغبة في أقل من 5 ثوانٍ.',
    },
  },
]

const cardNumbers = ['01', '02', '03']

const blogLinks = {
  en: [
    'Read our neuromarketing sales funnel guide',
    'Explore our neuromarketing copywriting tips',
    'Discover psychology-based video marketing insights',
  ],
  ar: [
    'اقرأ دليلنا عن هندسة قمع المبيعات بالتسويق العصبي',
    'اكتشف نصائح الكتابة العصبية الإقناعية',
    'اكتشف رؤى التسويق بالفيديو النفسي',
  ],
}

export default function ServicesSection({ data, locale }: { data?: ServicesData | null; locale: string }) {
  const [expanded, setExpanded] = useState<number | null>(null)

  const headline =
    (locale === 'ar' ? data?.headline?.ar : data?.headline?.en) ||
    (locale === 'ar'
      ? 'لا نبيع خدمات تسويقية. نصنع تحولات.'
      : "We Don't Sell Marketing Services. We Create Transformations.")

  const services = data?.services?.length ? data.services : fallbackServices
  const links = locale === 'ar' ? blogLinks.ar : blogLinks.en

  return (
    <section className="relative z-10 py-32 bg-[color:var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel className="justify-center mb-4">
            {locale === 'ar' ? 'ترسانتنا' : 'OUR ARSENAL'}
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--color-white)] max-w-3xl mx-auto leading-tight">
            {headline}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const title = (locale === 'ar' ? svc.title.ar : svc.title.en) || ''
            const problem = (locale === 'ar' ? svc.problem.ar : svc.problem.en) || ''
            const solution = (locale === 'ar' ? svc.solution.ar : svc.solution.en) || ''
            const result = (locale === 'ar' ? svc.result.ar : svc.result.en) || ''
            const isOpen = expanded === i
            const cardNum = cardNumbers[i] || `0${i + 1}`

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={!isOpen ? { y: -8 } : {}}
                className={`relative bg-[color:var(--color-surface)] border rounded-lg p-8 cursor-pointer transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[color:var(--color-cyan)] shadow-[0_0_30px_rgba(0,200,255,0.1)] border-l-4'
                    : 'border-[color:var(--color-border)] hover:border-l-4 hover:border-l-[color:var(--color-cyan)] hover:shadow-[0_0_20px_rgba(0,200,255,0.08)]'
                }`}
                style={
                  isOpen
                    ? { borderLeftColor: 'var(--color-cyan)', borderLeftWidth: 4 }
                    : {}
                }
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                {/* Background number decoration */}
                <div
                  className="absolute top-4 right-4 font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: '7rem',
                    color: 'rgba(0,200,255,0.04)',
                    lineHeight: 1,
                  }}
                >
                  {cardNum}
                </div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{svc.icon || '⚡'}</div>
                  <h3 className="text-xl font-bold text-[color:var(--color-white)] mb-3">{title}</h3>
                  <p className="text-[color:var(--color-gray-400)] text-sm italic mb-4">{problem}</p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="expand"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="text-[color:var(--color-white)] text-sm mb-4 leading-relaxed">{solution}</p>
                        <div className="border-t border-[color:var(--color-border)] pt-4">
                          <span className="text-xs font-semibold text-[color:var(--color-cyan)] uppercase tracking-wider">
                            {locale === 'ar' ? 'النتيجة' : 'Result'}
                          </span>
                          <p className="text-[color:var(--color-white)] text-sm mt-1">{result}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 text-xs font-semibold text-[color:var(--color-cyan)] uppercase tracking-widest">
                    {isOpen
                      ? (locale === 'ar' ? '▲ أقل' : '▲ Less')
                      : (locale === 'ar' ? '▼ اعرف أكثر' : '▼ Learn More')}
                  </div>

                  {/* Internal blog link — stops propagation so card click doesn't toggle */}
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/${locale}/blog`}
                      className="text-[10px] text-[color:var(--color-gray-400)] hover:text-[color:var(--color-cyan)] transition-colors underline underline-offset-2"
                    >
                      {links[i] || links[0]}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
