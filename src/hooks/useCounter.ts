'use client'
import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(undefined)
  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration, start])
  return count
}
