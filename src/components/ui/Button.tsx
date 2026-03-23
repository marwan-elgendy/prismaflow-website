import Link from 'next/link'
import { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
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
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-cyan)] text-[#0D0D10] font-semibold hover:shadow-[0_0_20px_rgba(0,200,255,0.5)] hover:scale-105 transition-all duration-200',
  outline:
    'border border-[color:var(--color-cyan)] text-[color:var(--color-cyan)] hover:shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:scale-105 transition-all duration-200',
  ghost:
    'text-[color:var(--color-white)] hover:underline transition-all duration-200',
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
  const classes = `inline-flex items-center justify-center rounded-sm font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

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
