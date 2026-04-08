'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ServiceCardProps {
  number: string
  title: string
  problem: string
  solution: string
}

export default function ServiceCard({ number, title, problem, solution }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative p-8 border border-[#1A1A1A] bg-transparent"
      whileHover={{ backgroundColor: '#111111', scale: 1.01, rotate: 0.5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Left border — animates in on scroll */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00A3CC] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      />

      {/* Number */}
      <span
        className="block text-[#00A3CC] text-xs mb-4 tracking-widest"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {number}
      </span>

      {/* Title */}
      <h3
        className="font-bold text-white mb-6 leading-tight"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2rem, 3vw, 2.5rem)',
        }}
      >
        {title}
      </h3>

      {/* Problem */}
      <p
        className="text-[#888888] text-sm italic mb-4"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {problem}
      </p>

      {/* Solution */}
      <p
        className="text-[#F5F5F5] text-base leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {solution}
      </p>
    </motion.div>
  )
}
