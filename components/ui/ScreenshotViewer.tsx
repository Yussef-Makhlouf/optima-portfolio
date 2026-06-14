'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ScreenshotItem {
  src: string
  alt: string
  label?: string
}

interface Props {
  screenshots: ScreenshotItem[]
  projectTitle: string
  liveUrl?: string | null
}

export function ScreenshotViewer({ screenshots, projectTitle, liveUrl }: Props) {
  const [active, setActive] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((index: number) => {
    if (index === active) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setIsTransitioning(false)
    }, 180)
  }, [active])

  const goNext = useCallback(() => goTo((active + 1) % screenshots.length), [active, screenshots.length, goTo])
  const goPrev = useCallback(() => goTo((active - 1 + screenshots.length) % screenshots.length), [active, screenshots.length, goTo])

  useEffect(() => {
    if (!isFullscreen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFullscreen, goNext, goPrev])

  useEffect(() => {
    if (!stripRef.current) return
    const thumb = stripRef.current.children[active] as HTMLElement
    thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  if (!screenshots.length) return null

  const current = screenshots[active]

  return (
    <>
      <div className="w-full space-y-4">
        {/* ── Main viewport ───────────────────────────── */}
        <div className="relative group border border-primary/15 dark:border-cyber/15 overflow-hidden bg-white dark:bg-navy-mid">
          {/* HUD corner brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary dark:border-cyber z-10 pointer-events-none" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary dark:border-cyber z-10 pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary dark:border-cyber z-10 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary dark:border-cyber z-10 pointer-events-none" />

          {/* Top HUD bar */}
          <div className="flex items-center justify-between bg-off-white/90 dark:bg-navy-soft/90 backdrop-blur-sm border-b border-primary/10 dark:border-cyber/10 px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-navy/50 border border-primary/10 dark:border-cyber/10 rounded-sm px-3 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                <span className="font-mono text-[9px] text-primary/60 dark:text-cyber/60 tracking-wider truncate max-w-[280px]">
                  {liveUrl ?? `https://${projectTitle.toLowerCase().replace(/\s+/g, '-')}.vercel.app`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-primary/40 dark:text-cyber/40 tracking-widest">
                {`${String(active + 1).padStart(2,'0')} / ${String(screenshots.length).padStart(2,'0')}`}
              </span>
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center justify-center w-6 h-6 border border-primary/20 dark:border-cyber/20 hover:border-primary/60 dark:hover:border-cyber/60 hover:bg-primary/5 dark:hover:bg-cyber/5 text-primary/50 dark:text-cyber/50 hover:text-primary dark:hover:text-cyber transition-all duration-200"
                title="Fullscreen"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Screenshot area */}
          <div className="relative aspect-[16/9] overflow-hidden cursor-pointer" onClick={() => setIsFullscreen(true)}>
            <img
              src={current.src}
              alt={current.alt}
              className={`w-full h-full object-cover object-top transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[1.01]' : 'opacity-100 scale-100'} group-hover:scale-[1.01]`}
            />
            {/* Scan line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 dark:via-cyber/30 to-transparent animate-scan pointer-events-none" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/0 dark:bg-navy/0 group-hover:bg-primary/10 dark:group-hover:bg-navy/20 transition-colors duration-300 flex items-end justify-start p-4 pointer-events-none">
              <span className="font-mono text-[9px] text-primary dark:text-cyber/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-navy/80 px-2 py-1 border border-primary/20 dark:border-cyber/20">
                [CLICK TO EXPAND]
              </span>
            </div>
            {/* Prev / next arrows */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 border border-primary/30 dark:border-cyber/30 bg-white/70 dark:bg-navy/70 hover:border-primary dark:hover:border-cyber hover:bg-primary/10 dark:hover:bg-cyber/10 text-primary/60 dark:text-cyber/60 hover:text-primary dark:hover:text-cyber flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 border border-primary/30 dark:border-cyber/30 bg-white/70 dark:bg-navy/70 hover:border-primary dark:hover:border-cyber hover:bg-primary/10 dark:hover:bg-cyber/10 text-primary/60 dark:text-cyber/60 hover:text-primary dark:hover:text-cyber flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </>
            )}
          </div>

          {/* Bottom status bar */}
          {current.label && (
            <div className="bg-off-white dark:bg-navy-soft border-t border-primary/10 dark:border-cyber/10 px-4 py-2">
              <span className="font-mono text-[9px] text-primary/60 dark:text-cyber/60 tracking-wider uppercase">{current.label}</span>
            </div>
          )}
        </div>

        {/* ── Thumbnail strip ──────────────────────────── */}
        {screenshots.length > 1 && (
          <div
            ref={stripRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {screenshots.map((shot, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`
                  flex-shrink-0 w-20 h-14 relative overflow-hidden border transition-all duration-200
                  ${i === active
                    ? 'border-primary shadow-[0_0_8px_rgba(43,95,165,0.2)] dark:border-cyber dark:shadow-[0_0_8px_rgba(0,255,204,0.3)]'
                    : 'border-primary/15 dark:border-cyber/15 opacity-50 hover:opacity-80 hover:border-primary/40 dark:hover:border-cyber/40'}
                `}
              >
                <img src={shot.src} alt={shot.alt} className="w-full h-full object-cover object-top" />
                {i === active && (
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary dark:bg-cyber" />
                )}
                <span className="absolute top-1 left-1 font-mono text-[7px] text-white bg-primary/80 dark:text-cyber dark:bg-navy/80 px-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── Progress dots ────────────────────────────── */}
        {screenshots.length > 1 && (
          <div className="flex items-center justify-center gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 ${i === active ? 'w-4 h-1.5 bg-primary dark:bg-cyber' : 'w-1.5 h-1.5 rounded-full bg-primary/20 hover:bg-primary/50 dark:bg-cyber/25 dark:hover:bg-cyber/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Fullscreen lightbox ──────────────────────── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[200] bg-white/95 dark:bg-navy/98 backdrop-blur-lg flex flex-col items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-primary/10 dark:border-cyber/10">
            <span className="font-hud text-[10px] tracking-[0.2em] text-primary dark:text-cyber uppercase">{projectTitle}</span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-primary/50 dark:text-cyber/50 tracking-wider">
                {`${String(active + 1).padStart(2,'0')} / ${String(screenshots.length).padStart(2,'0')}`}
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-8 h-8 border border-primary/30 dark:border-cyber/30 hover:border-primary dark:hover:border-cyber text-primary/60 dark:text-cyber/60 hover:text-primary dark:hover:text-cyber flex items-center justify-center transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative max-w-6xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[active].src}
              alt={screenshots[active].alt}
              className={`max-w-full max-h-[80vh] object-contain transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>

          {/* Nav arrows */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-primary/30 dark:border-cyber/30 hover:border-primary dark:hover:border-cyber bg-white/80 dark:bg-navy/80 hover:bg-primary/10 dark:hover:bg-cyber/10 text-primary/60 dark:text-cyber/60 hover:text-primary dark:hover:text-cyber flex items-center justify-center transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-primary/30 dark:border-cyber/30 hover:border-primary dark:hover:border-cyber bg-white/80 dark:bg-navy/80 hover:bg-primary/10 dark:hover:bg-cyber/10 text-primary/60 dark:text-cyber/60 hover:text-primary dark:hover:text-cyber flex items-center justify-center transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </>
          )}

          {/* HUD corners */}
          <span className="absolute top-16 left-4 w-3 h-3 border-t border-l border-primary/40 dark:border-cyber/40 pointer-events-none" />
          <span className="absolute top-16 right-4 w-3 h-3 border-t border-r border-primary/40 dark:border-cyber/40 pointer-events-none" />
          <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-primary/40 dark:border-cyber/40 pointer-events-none" />
          <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-primary/40 dark:border-cyber/40 pointer-events-none" />
        </div>
      )}
    </>
  )
}
