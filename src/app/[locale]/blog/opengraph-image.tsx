import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PrismaFlow Neuromarketing Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0D10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'rgba(0,200,255,0.8)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          PRISMAFLOW
        </div>

        {/* Blog title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: 900,
            textShadow: '0 0 40px rgba(0,200,255,0.4)',
          }}
        >
          Neuromarketing Blog
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 20,
            letterSpacing: '0.05em',
          }}
        >
          Psychology · Persuasion · Consumer Behavior
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #00C8FF, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
