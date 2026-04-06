interface IconProps {
  size?: number
  className?: string
}

const iconDefaults = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ArrowRight({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function ArrowLeft({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export function Menu({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function X({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export function ChevronDown({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function Instagram({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedIn({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Twitter({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  )
}

export function Mail({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function MapPin({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Phone({ size = 24, className = '' }: IconProps) {
  return (
    <svg {...iconDefaults} width={size} height={size} className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.76a16 16 0 006.15 6.15l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}
