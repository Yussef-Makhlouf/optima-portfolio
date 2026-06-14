'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
}>({
  theme: 'dark',
  toggle: () => {},
})

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('optima-theme') as Theme | null
    if (stored) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    localStorage.setItem('optima-theme', theme)
  }, [theme, mounted])

  const toggle = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  if (!mounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-navy">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-accent animate-pulse">
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="0" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="30" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
