import { ReactNode } from 'react'

type BadgeVariant = 'cyan' | 'gray'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  cyan: 'bg-[rgba(0,200,255,0.12)] text-[color:var(--color-cyan)] border border-[rgba(0,200,255,0.25)]',
  gray: 'bg-[color:var(--color-surface)] text-[color:var(--color-gray-400)] border border-[color:var(--color-border)]',
}

export default function Badge({ children, variant = 'cyan', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
