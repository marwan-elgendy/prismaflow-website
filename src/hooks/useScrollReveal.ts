import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container element.
 * All descendants with class "sr-reveal" inside the container
 * get class "revealed" added when they enter the viewport.
 *
 * Usage:
 *   const sectionRef = useScrollReveal()
 *   return <section ref={sectionRef}>
 *     <h2 className="sr-reveal">Heading</h2>
 *   </section>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll<HTMLElement>('.sr-reveal')
    if (!targets.length) return

    const observers: IntersectionObserver[] = []

    targets.forEach((el) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            observer.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [threshold])

  return ref
}
