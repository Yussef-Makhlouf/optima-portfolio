'use client'
import { useState, useEffect } from 'react'

export function LogoLoader() {
  const [phase, setPhase] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Phase 0: crosshair draws (0ms)
    // Phase 1: symbol appears (400ms)
    // Phase 2: wordmark slides in (900ms)
    // Phase 3: tagline fades (1300ms)
    // Phase 4: dismiss (2200ms)
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setDismissed(true), 2800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-navy transition-opacity duration-500 ${
        phase >= 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(210, 140, 100, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(210, 140, 100, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,95,165,0.12)_0%,transparent_60%)]" />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-accent/20 loader-bracket-tl" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-accent/20 loader-bracket-tr" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-accent/20 loader-bracket-bl" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-accent/20 loader-bracket-br" />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Crosshair SVG - draws itself */}
        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="text-accent"
          >
            {/* Outer ring */}
            <circle
              cx="40" cy="40" r="16"
              stroke="currentColor"
              strokeWidth="1.5"
              className="loader-circle"
            />
            {/* Inner dot */}
            <circle
              cx="40" cy="40" r="4"
              fill="currentColor"
              opacity="0.4"
              className="loader-dot"
            />
            {/* Crosshair lines */}
            <line x1="40" y1="0" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" className="loader-line loader-line-1" />
            <line x1="40" y1="58" x2="40" y2="80" stroke="currentColor" strokeWidth="1.5" className="loader-line loader-line-2" />
            <line x1="0" y1="40" x2="22" y2="40" stroke="currentColor" strokeWidth="1.5" className="loader-line loader-line-3" />
            <line x1="58" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1.5" className="loader-line loader-line-4" />

            {/* Rotating tick marks */}
            <g className="loader-ticks">
              <line x1="40" y1="6" x2="40" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="40" y1="70" x2="40" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="6" y1="40" x2="10" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="70" y1="40" x2="74" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Wordmark */}
        <div
          className={`overflow-hidden transition-all duration-600 ${
            phase >= 2 ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-accent/60 loader-line-h" />
            <span className="font-display font-bold text-xl tracking-[0.35em] uppercase text-off-white">
              OPTIMA
            </span>
            <span className="w-8 h-px bg-accent/60 loader-line-h" />
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-500 ${
            phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted text-center">
            Digital Transformations
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-px bg-off-white/5 mt-2 overflow-hidden">
          <div className="h-full bg-accent/60 loader-progress" />
        </div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="loader-scan-line" />
      </div>
    </div>
  )
}
