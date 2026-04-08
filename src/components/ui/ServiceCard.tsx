'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServiceCardProps {
  number: string
  title: string
  problem: string
  solution: string
}

export default function ServiceCard({ number, title, problem, solution }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const [bgColor, setBgColor] = useState('transparent')

  useGSAP(() => {
    if (!cardRef.current || !borderRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(borderRef.current, { scaleY: 1 })
      return
    }

    gsap.set(borderRef.current, { scaleY: 0, transformOrigin: 'top center' })
    gsap.to(borderRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: cardRef })

  const handleMouseEnter = () => {
    setBgColor('#111111')
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRef.current, {
      scale: 1.02,
      rotation: 0.5,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 0 30px rgba(0, 163, 204, 0.15)',
    })
  }

  const handleMouseLeave = () => {
    setBgColor('transparent')
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: 'none',
    })
  }

  return (
    <div
      ref={cardRef}
      className="relative p-8 border border-[#1A1A1A]"
      style={{ backgroundColor: bgColor, transition: 'background-color 0.3s ease' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left border — animates in on scroll */}
      <div
        ref={borderRef}
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00A3CC]"
        style={{ transformOrigin: 'top center' }}
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
    </div>
  )
}
