'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="text-6xl font-black mb-4"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,200,255,0.6)',
          }}
        >
          ERR
        </div>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
          Something went wrong
        </h2>
        {error.digest && (
          <p className="text-xs text-[var(--text-muted)] mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
