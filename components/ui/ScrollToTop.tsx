'use client'
import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-40 w-11 h-11 flex items-center justify-center border border-navy/10 dark:border-off-white/10 bg-off-white/90 dark:bg-navy/90 backdrop-blur-md text-muted hover:text-accent hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-gold group"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:-translate-y-0.5"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
