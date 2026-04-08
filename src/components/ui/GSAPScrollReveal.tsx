'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Picks up all .sr-reveal elements on the page and animates them
 * with GSAP ScrollTrigger (opacity 0→1, y: 30→0).
 */
export default function GSAPScrollReveal() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all sr-reveal elements immediately
      gsap.set('.sr-reveal', { opacity: 1, y: 0 })
      return
    }

    const elements = document.querySelectorAll('.sr-reveal')
    elements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })
  }, [])

  return null
}
