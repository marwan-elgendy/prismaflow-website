export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-2xl px-6">
        {/* Title skeleton */}
        <div className="h-12 rounded bg-[color:var(--color-surface)] animate-pulse mx-auto w-3/4" />
        <div className="h-8 rounded bg-[color:var(--color-surface)] animate-pulse mx-auto w-1/2" />

        {/* Content skeletons */}
        <div className="mt-12 space-y-3">
          <div className="h-4 rounded bg-[color:var(--color-surface)] animate-pulse w-full" />
          <div className="h-4 rounded bg-[color:var(--color-surface)] animate-pulse w-5/6" />
          <div className="h-4 rounded bg-[color:var(--color-surface)] animate-pulse w-4/6" />
        </div>

        {/* Card skeletons */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-lg bg-[color:var(--color-surface)] animate-pulse border border-[color:var(--color-border)]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
