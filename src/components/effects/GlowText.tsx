import { ReactNode } from 'react'

type Intensity = 'low' | 'medium' | 'high'

const shadows: Record<Intensity, string> = {
  low: '0 0 10px rgba(0,200,255,0.3)',
  medium: '0 0 20px rgba(0,200,255,0.5)',
  high: '0 0 30px rgba(0,200,255,0.7)',
}

interface GlowTextProps {
  children: ReactNode
  intensity?: Intensity
  className?: string
}

export default function GlowText({ children, intensity = 'medium', className = '' }: GlowTextProps) {
  return (
    <span
      className={`text-[color:var(--color-cyan)] ${className}`}
      style={{ textShadow: shadows[intensity] }}
    >
      {children}
    </span>
  )
}
