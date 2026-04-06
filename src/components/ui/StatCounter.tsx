'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
}

export default function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!inView || hasStarted) return
    setHasStarted(true)

    const duration = 1800
    const steps = 60
    const increment = value / steps
    let current = 0
    let frame = 0

    const tick = () => {
      frame++
      current = Math.min(value, Math.floor((value * frame) / steps))
      setCount(current)
      if (current < value) {
        setTimeout(tick, duration / steps)
      }
    }

    tick()
  }, [inView, hasStarted, value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div
        className="text-[#E8FF00] leading-none tabular-nums"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(4rem, 8vw, 8rem)',
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-[#888888] text-sm uppercase tracking-widest text-center"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </div>
    </div>
  )
}
