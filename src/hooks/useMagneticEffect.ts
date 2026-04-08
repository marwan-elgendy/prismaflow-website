import { useEffect, useRef } from 'react'

/**
 * Applies a subtle magnetic pull toward the cursor when it is near the element.
 *
 * @param proximity  - distance (px) at which the effect activates (default 80)
 * @param maxShift   - maximum pixel displacement (default 5)
 */
export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  proximity = 80,
  maxShift = 5
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.style.transition = 'transform 0.3s ease'

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < proximity) {
        const factor = ((proximity - dist) / proximity) * 0.4
        const moveX = Math.max(-maxShift, Math.min(maxShift, dx * factor))
        const moveY = Math.max(-maxShift, Math.min(maxShift, dy * factor))
        el.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        el.style.transform = ''
      }
    }

    const handleMouseLeave = () => {
      el.style.transform = ''
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      el.style.transform = ''
      el.style.transition = ''
    }
  }, [proximity, maxShift])

  return ref
}
