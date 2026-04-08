'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
}

export default function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    const numEl = numRef.current
    if (!container || !numEl) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      numEl.textContent = String(value)
      return
    }

    const counter = { val: 0 }

    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: 'expo.out',
      onUpdate: () => {
        numEl.textContent = String(Math.floor(counter.val))
      },
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      <div
        className="text-[#00A3CC] leading-none tabular-nums"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(4rem, 8vw, 8rem)',
        }}
      >
        <span ref={numRef}>0</span>
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
