import { ReactNode } from 'react'

type BadgeVariant = 'prism' | 'muted'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  prism: 'bg-[var(--prism-glow)] text-[var(--prism)] border border-[var(--prism)]/25',
  muted: 'bg-[var(--surface-alt)] text-[var(--text-muted)] border border-[var(--border)]',
}

export default function Badge({ children, variant = 'prism', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
