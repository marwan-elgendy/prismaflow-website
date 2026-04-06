'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import TextReveal from '@/components/ui/TextReveal'

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
    title: { en: 'Sales Funnel Engineering', ar: 'هندسة قمع المبيعات' },
    problem: {
      en: 'Thousands visit your site — almost none convert.',
      ar: 'آلاف يزورون موقعك — لا أحد تقريباً يشتري.',
    },
    solution: {
      en: 'We build psychological purchase paths — frictionless funnels that guide visitors step-by-step to a confident buying decision.',
      ar: 'نبني مسارات شراء نفسية — قنوات سلسة تقود الزوار خطوة بخطوة نحو قرار شراء واثق.',
    },
    result: {
      en: 'Your website becomes a 24/7 revenue machine.',
      ar: 'يتحول موقعك إلى آلة إيرادات تعمل على مدار الساعة.',
    },
  },
  {
    title: { en: 'Neuro-Copywriting', ar: 'الكتابة العصبية' },
    problem: {
      en: 'Your copy reads like a press release. Nobody cares.',
      ar: 'نصوصك تبدو كبيان صحفي. لا أحد يهتم.',
    },
    solution: {
      en: "We use pathological empathy to write copy that hits deep desires — making your customers say: 'Oh my god, that's exactly me!'",
      ar: 'نستخدم التعاطف العميق لكتابة نصوص تصيب الرغبات العميقة — تجعل عملاءك يقولون: "هذا أنا بالضبط!"',
    },
    result: {
      en: 'Irresistible messaging that accelerates every purchase decision.',
      ar: 'رسائل لا تُقاوم تُسرّع كل قرار شراء.',
    },
  },
  {
    title: { en: 'Mental Movies Production', ar: 'إنتاج الأفلام الذهنية' },
    problem: {
      en: "Traditional ads can't capture the modern consumer's attention.",
      ar: 'الإعلانات التقليدية عاجزة عن استحواذ انتباه المستهلك الحديث.',
    },
    solution: {
      en: 'We fuse sales psychology with cinematic craft to create mental movies — your customer experiences owning your product before they buy it.',
      ar: 'ندمج علم نفس المبيعات مع الصناعة السينمائية لصناعة أفلام ذهنية — يشعر عميلك بامتلاك منتجك قبل أن يشتريه.',
    },
    result: {
      en: 'Ads that steal attention and plant desire in under 5 seconds.',
      ar: 'إعلانات تسرق الانتباه وتزرع الرغبة في أقل من 5 ثوانٍ.',
    },
  },
]

const cardNumbers = ['01', '02', '03']

interface ServiceCardProps {
  service: Service
  index: number
  locale: string
  cardNum: string
}

function ServiceCard({ service, index, locale, cardNum }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const isAr = locale === 'ar'

  const title = (isAr ? service.title.ar : service.title.en) || ''
  const problem = (isAr ? service.problem.ar : service.problem.en) || ''
  const solution = (isAr ? service.solution.ar : service.solution.en) || ''
  const result = (isAr ? service.result.ar : service.result.en) || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered
          ? 'perspective(1000px) rotateX(-2deg) rotateY(2deg) translateY(-6px)'
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      className="relative bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden cursor-default group"
    >
      {/* Background number */}
      <div
        className="absolute bottom-0 right-4 font-black leading-none select-none pointer-events-none text-[var(--surface-alt)] transition-opacity duration-300"
        style={{ fontSize: '10rem', lineHeight: 1, opacity: hovered ? 0 : 1 }}
        aria-hidden="true"
      >
        {cardNum}
      </div>

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[22rem]">
        {/* Card number + divider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-semibold tracking-widest text-[var(--text-dim)] tabular-nums">
            {cardNum}
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--text)] mb-3 leading-tight tracking-tight">
          {title}
        </h3>

        {/* Problem (always visible) */}
        <p className="text-[var(--text-muted)] text-sm italic mb-6 leading-relaxed">
          {problem}
        </p>

        {/* Hover-revealed details */}
        <div
          style={{
            maxHeight: hovered ? '300px' : '0px',
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease',
          }}
        >
          <p className="text-[var(--text)] text-sm leading-relaxed mb-5">
            {solution}
          </p>
          <div className="border-t border-[var(--border)] pt-4 mb-5">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--prism)]">
              {isAr ? 'النتيجة' : 'Result'}
            </span>
            <p className="text-[var(--text)] text-sm mt-1.5 font-medium">
              {result}
            </p>
          </div>
        </div>

        {/* Bottom link */}
        <div className="mt-auto pt-2">
          <Link
            href={`/${locale}/blog`}
            className="text-[10px] tracking-widest uppercase font-semibold text-[var(--text-dim)] hover:text-[var(--prism)] transition-colors duration-200"
          >
            {isAr ? 'اقرأ المقالات ←' : 'Read our research →'}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection({ data, locale }: { data?: ServicesData | null; locale: string }) {
  const isAr = locale === 'ar'
  const headline =
    (isAr ? data?.headline?.ar : data?.headline?.en) ||
    (isAr
      ? 'لا نبيع خدمات تسويقية. نصنع تحولات.'
      : "We Don't Sell Marketing Services. We Create Transformations.")

  const services = data?.services?.length ? data.services : fallbackServices

  return (
    <section className="relative z-10 py-32 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <SectionLabel className="mb-6">
              {isAr ? 'ترسانتنا' : 'OUR ARSENAL'}
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight text-[var(--text)]">
              <TextReveal delay={0.1} stagger={0.07}>
                {headline}
              </TextReveal>
            </h2>
          </div>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm lg:ml-auto">
            {isAr
              ? 'حوّم فوق كل خدمة لاكتشاف كيف نهندس الرغبة لعلامتك التجارية.'
              : 'Hover over each service to discover how we engineer desire for your brand.'}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ServiceCard
              key={i}
              service={svc}
              index={i}
              locale={locale}
              cardNum={cardNumbers[i] || `0${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
