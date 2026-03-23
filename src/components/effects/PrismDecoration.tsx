interface PrismDecorationProps {
  size?: number
  opacity?: number
}

export default function PrismDecoration({ size = 240, opacity = 0.15 }: PrismDecorationProps) {
  const w = size
  const h = Math.round(size * 1.3)
  const cx = w / 2

  // Triangle points
  const top = `${cx},0`
  const bl = `0,${h}`
  const br = `${w},${h}`

  // Sinusoidal wave paths through the triangle
  const waves = Array.from({ length: 5 }, (_, i) => {
    const t = (i + 1) / 6
    // Interpolate a horizontal band inside the triangle at fraction t
    // At fraction t: left x = t*(w/2→0) i.e. w/2*(1-t), right x = w/2 + w/2*t = w/2*(1+t)
    const lx = (w / 2) * (1 - t)
    const rx = (w / 2) * (1 + t)
    const y = h * t
    const amplitude = ((rx - lx) / 2) * 0.22
    const freq = 3

    const steps = 40
    const pts = Array.from({ length: steps + 1 }, (_, j) => {
      const px = lx + ((rx - lx) * j) / steps
      const py = y + Math.sin((j / steps) * Math.PI * freq * 2) * amplitude
      return `${j === 0 ? 'M' : 'L'}${px.toFixed(2)},${py.toFixed(2)}`
    })
    return pts.join(' ')
  })

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <filter id="prism-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="prism-clip">
          <polygon points={`${top} ${br} ${bl}`} />
        </clipPath>
      </defs>

      {/* Outline triangle */}
      <polygon
        points={`${top} ${br} ${bl}`}
        stroke="#00C8FF"
        strokeWidth="1"
        fill="none"
      />

      {/* Inner triangle */}
      <polygon
        points={`${cx},${h * 0.12} ${w * 0.88},${h * 0.88} ${w * 0.12},${h * 0.88}`}
        stroke="#00C8FF"
        strokeWidth="0.5"
        fill="rgba(0,200,255,0.03)"
      />

      {/* Wave lines clipped inside triangle */}
      <g clipPath="url(#prism-clip)" filter="url(#prism-glow)">
        {waves.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#00C8FF"
            strokeWidth="0.8"
            fill="none"
            opacity={0.6 - i * 0.08}
          />
        ))}
      </g>
    </svg>
  )
}
