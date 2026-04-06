interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--prism)]" />
      <span className="text-[var(--prism)] text-xs font-semibold tracking-widest uppercase">
        {children}
      </span>
    </div>
  )
}
