'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProcessStepProps {
  number: string
  title: string
  description: string
  delay?: number
}

export default function ProcessStep({ number, title, description, delay = 0 }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background decorative number */}
      <span
        className="absolute top-0 left-0 font-black text-[#1A1A1A] select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8rem',
          lineHeight: 0.85,
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Content — offset to sit over the faint number */}
      <div className="relative pt-16 pl-2">
        <h3
          className="font-bold text-white text-3xl mb-3"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {title}
        </h3>
        <p
          className="text-[#888888] text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}
