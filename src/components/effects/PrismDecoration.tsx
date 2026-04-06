interface PrismDecorationProps {
  className?: string
  size?: number
}

export default function PrismDecoration({ className = '', size = 320 }: PrismDecorationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ animation: 'spin-slow 20s linear infinite' }}
    >
      {/* Outer triangle */}
      <polygon
        points="160,20 300,280 20,280"
        stroke="#E8FF00"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      {/* Inner light rays */}
      <line x1="160" y1="20" x2="100" y2="280" stroke="#E8FF00" strokeWidth="1" opacity="0.4" />
      <line x1="160" y1="20" x2="160" y2="280" stroke="#E8FF00" strokeWidth="1" opacity="0.5" />
      <line x1="160" y1="20" x2="220" y2="280" stroke="#E8FF00" strokeWidth="1" opacity="0.4" />
      <line x1="160" y1="20" x2="80" y2="280" stroke="#00D4FF" strokeWidth="0.75" opacity="0.3" />
      <line x1="160" y1="20" x2="240" y2="280" stroke="#00D4FF" strokeWidth="0.75" opacity="0.3" />
      {/* Horizontal refraction lines */}
      <line x1="117" y1="140" x2="203" y2="140" stroke="#E8FF00" strokeWidth="0.75" opacity="0.35" />
      <line x1="104" y1="180" x2="216" y2="180" stroke="#00D4FF" strokeWidth="0.75" opacity="0.25" />
      <line x1="130" y1="100" x2="190" y2="100" stroke="#E8FF00" strokeWidth="0.75" opacity="0.25" />
      {/* Inner triangle */}
      <polygon
        points="160,70 260,260 60,260"
        stroke="#E8FF00"
        strokeWidth="0.75"
        fill="none"
        opacity="0.25"
      />
    </svg>
  )
}
