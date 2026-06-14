'use client'
import { useState } from 'react'

interface Props {
  title: string
  url?: string | null
  imageSrc: string
  imageAlt: string
}

export function BrowserFrame({ title, url, imageSrc, imageAlt }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  return (
    <div className="w-full">
      {/* Browser Chrome */}
      <div className="border border-navy/10 dark:border-off-white/10 bg-white dark:bg-navy-soft rounded-t-sm overflow-hidden shadow-2xl shadow-navy/10 dark:shadow-off-white/5">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-navy/5 dark:border-off-white/5 bg-navy/[0.02] dark:bg-off-white/[0.02]">
          {/* Window controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>

          {/* URL bar */}
          <div className="flex-1 mx-4 max-w-xl">
            <div className="flex items-center gap-2 bg-off-white dark:bg-navy/50 border border-navy/8 dark:border-off-white/8 rounded-sm px-3 py-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/40 flex-shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="font-mono text-[10px] text-muted/60 dark:text-muted/40 truncate">
                {url || `https://${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.optima.dev`}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full border border-navy/10 dark:border-off-white/10 flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-navy/20 dark:bg-off-white/20" />
              </div>
              <div className="w-4 h-4 rounded-full border border-navy/10 dark:border-off-white/10 flex items-center justify-center">
                <div className="w-0.5 h-1.5 bg-navy/20 dark:bg-off-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Browser content area */}
        <div className="relative bg-navy dark:bg-navy">
          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-navy dark:bg-navy">
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="font-mono text-[10px] text-off-white/30 tracking-widest uppercase">Loading</span>
              </div>
            </div>
          )}

          {/* Screenshot */}
          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          </div>

          {/* Reflection effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(244,242,238,0) 50%, rgba(244,242,238,0.02) 100%)',
            }}
          />
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-navy/5 dark:border-off-white/5 bg-navy/[0.02] dark:bg-off-white/[0.02]">
          <span className="font-mono text-[9px] text-muted/40 tracking-wider uppercase">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <span className="font-mono text-[9px] text-muted/40 tracking-wider uppercase">Live</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-primary/50 to-transparent rounded-b-sm" />
    </div>
  )
}
