interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[color:var(--color-cyan)] shadow-[0_0_8px_rgba(0,200,255,0.8)]" />
      <span className="text-[color:var(--color-cyan)] text-xs font-semibold tracking-widest uppercase">
        {children}
      </span>
    </div>
  )
}
