'use client'
import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.opacity = '1'

    let x = -100
    let y = -100

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      cursor.style.transform = `translate(${x - 20}px, ${y - 20}px)`
    }

    const expand = () => cursor.classList.add('is-hovering')
    const contract = () => cursor.classList.remove('is-hovering')

    const addListeners = () => {
      const targets = document.querySelectorAll('a, button')
      targets.forEach((el) => {
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', contract)
      })
    }

    window.addEventListener('mousemove', move)

    // Use MutationObserver to handle dynamic elements
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addListeners()

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', contract)
      })
    }
  }, [])

  return (
    <>
      <style>{`
        #pf-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #00A3CC;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transition:
            transform 0.1s cubic-bezier(0.16, 1, 0.3, 1),
            width 0.2s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.2s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.2s,
            margin 0.2s;
          mix-blend-mode: difference;
          will-change: transform;
        }
        #pf-cursor.is-hovering {
          width: 80px;
          height: 80px;
          margin: -20px 0 0 -20px;
          background-color: #0A0A0A;
          border: 1.5px solid #00A3CC;
        }
        @media (hover: none) {
          #pf-cursor { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          #pf-cursor { display: none; }
        }
      `}</style>
      <div id="pf-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  )
}
