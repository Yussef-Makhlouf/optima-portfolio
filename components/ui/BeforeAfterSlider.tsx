'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  alt?: string
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', alt = '' }: Props) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = (x / rect.width) * 100
    setPosition(Math.max(2, Math.min(98, pct)))
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updatePosition(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updatePosition(e.touches[0].clientX)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX)
    const handleTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX)
    const handleEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, updatePosition])

  return (
    <div className="w-full">
      {/* Label pills */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/40">
          {beforeLabel}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-accent">
          {afterLabel}
        </span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] overflow-hidden rounded-sm cursor-ew-resize select-none border border-navy/8 dark:border-off-white/8"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${beforeLabel} to ${afterLabel} comparison`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(2, p - 2))
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(98, p + 2))
        }}
      >
        {/* AFTER image (bottom layer) */}
        <img
          src={afterSrc}
          alt={`${alt} - ${afterLabel}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* BEFORE image (top layer, clipped from right via clip-path) */}
        <img
          src={beforeSrc}
          alt={`${alt} - ${beforeLabel}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-accent shadow-lg shadow-accent/20 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          {/* Handle circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-off-white dark:bg-navy border-2 border-accent flex items-center justify-center shadow-xl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)" />
            </svg>
          </div>
        </div>

        {/* Subtle loading shimmer */}
        <div className="absolute inset-0 bg-navy/5 dark:bg-off-white/5 pointer-events-none" />
      </div>

      {/* Position indicator */}
      <div className="flex items-center justify-center mt-3 gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy/10 dark:via-off-white/10 to-transparent" />
        <span className="font-mono text-[10px] text-muted/40 tracking-widest">
          DRAG TO COMPARE
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy/10 dark:via-off-white/10 to-transparent" />
      </div>
    </div>
  )
}
