interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="inline-block w-1.5 h-1.5 bg-[var(--prism)]"
        aria-hidden="true"
      />
      <span className="text-[var(--prism)] text-xs font-normal tracking-widest uppercase font-[family-name:var(--font-jetbrains)]">
        {children}
      </span>
    </div>
  )
}
