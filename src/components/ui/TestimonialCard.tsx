'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

export default function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <blockquote
        className="text-white italic leading-tight"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 400,
        }}
      >
        {quote}
      </blockquote>

      <div
        className="mt-10 pt-8 border-t border-[#1A1A1A]"
      >
        <p
          className="font-bold text-white text-base"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {author}
        </p>
        <p
          className="text-[#888888] text-sm mt-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {role}, {company}
        </p>
      </div>
    </motion.div>
  )
}
