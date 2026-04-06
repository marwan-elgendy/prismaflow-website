import Link from 'next/link'
import { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
}

const variantClasses: Record<Variant, string> = {
  outline:
    'bg-transparent border border-[#333333] text-[var(--text)] uppercase tracking-wider font-[family-name:var(--font-clash)] font-semibold ' +
    'hover:border-[var(--text)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-[var(--duration-normal)]',
  primary:
    'bg-[var(--prism)] text-[var(--bg)] uppercase tracking-wider font-[family-name:var(--font-clash)] font-semibold ' +
    'hover:bg-[var(--bg)] hover:text-[var(--prism)] hover:scale-[1.02] border border-[var(--prism)] ' +
    'active:scale-[0.98] transition-all duration-[var(--duration-normal)]',
  secondary:
    'bg-transparent border border-[#333333] text-[var(--text)] uppercase tracking-wider font-[family-name:var(--font-clash)] font-semibold ' +
    'hover:border-[var(--text)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-[var(--duration-normal)]',
  ghost:
    'bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[var(--duration-normal)]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
