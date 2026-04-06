'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  /** Delay before first word animates (seconds) */
  delay?: number
  /** Stagger between words (seconds) */
  stagger?: number
  /** Animate once when in view, or on every entry */
  once?: boolean
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -10% 0px' })

  const words = children.split(' ')

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: '30%' }}
            animate={inView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '30%' }}
            transition={{
              duration: 0.4,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
