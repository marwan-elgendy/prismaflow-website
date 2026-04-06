import Link from 'next/link'

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
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
          Page <span className="text-[var(--prism)]">Not Found</span>
        </h1>
        <p className="text-[var(--text-muted)] mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-[var(--accent)] text-[var(--bg)] rounded-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
