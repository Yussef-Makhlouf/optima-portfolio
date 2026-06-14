'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-off-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-navy/5 dark:border-off-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo symbol - switches between dark/light */}
          <div className="relative w-7 h-7 transition-transform duration-300 group-hover:rotate-45">
            <Image
              src={theme === 'dark' ? '/logos/optima-05-symbol-light.svg' : '/logos/optima-04-symbol-dark.svg'}
              alt="Optima"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display font-bold text-sm tracking-widest uppercase text-navy dark:text-off-white">
            OPTIMA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                pathname === href
                  ? 'text-accent dark:text-accent'
                  : 'text-muted dark:text-muted hover:text-accent dark:hover:text-accent'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="btn-ghost"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
            Hire Us
          </Link>
        </div>

        {/* Mobile: hamburger + theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 text-muted hover:text-accent transition-colors"
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-px bg-accent transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-px bg-accent transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-accent transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-off-white/98 dark:bg-navy/98 backdrop-blur-md border-b border-navy/5 dark:border-off-white/5 px-6 py-6 flex flex-col gap-4 animate-fade-in">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-sm tracking-widest uppercase text-muted dark:text-muted hover:text-accent dark:hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary w-full justify-center text-xs">
            Hire Us
          </Link>
        </div>
      )}
    </nav>
  )
}
