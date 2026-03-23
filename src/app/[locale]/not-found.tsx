import Link from 'next/link'
import GlowText from '@/components/effects/GlowText'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div
          className="text-[160px] md:text-[200px] font-black leading-none mb-4 select-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,200,255,0.3)',
            textShadow: '0 0 60px rgba(0,200,255,0.05)',
          }}
        >
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--color-white)] mb-4">
          Page <GlowText intensity="medium">Not Found</GlowText>
        </h1>
        <p className="text-[color:var(--color-gray-400)] mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-[color:var(--color-cyan)] text-[#0D0D10] rounded-sm font-semibold hover:shadow-[0_0_20px_rgba(0,200,255,0.5)] hover:scale-105 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
