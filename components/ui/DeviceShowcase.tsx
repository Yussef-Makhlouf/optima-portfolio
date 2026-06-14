'use client'

import { useState } from 'react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface Props {
  imageSrc: string
  projectTitle: string
  liveUrl?: string | null
}

const DEVICE_CONFIG: Record<DeviceType, { label: string; icon: string; code: string }> = {
  desktop: { label: 'DESKTOP', icon: '⬜', code: 'DSK' },
  tablet:  { label: 'TABLET',  icon: '◱',  code: 'TAB' },
  mobile:  { label: 'MOBILE',  icon: '▯',  code: 'MOB' },
}

export function DeviceShowcase({ imageSrc, projectTitle, liveUrl }: Props) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop')
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="w-full">
      {/* ── Device Selector Bar ─────────────────────────── */}
      <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
        <div className="flex items-center gap-0.5 md:gap-1 flex-1 md:flex-none">
          {(Object.keys(DEVICE_CONFIG) as DeviceType[]).map((device) => {
            const cfg = DEVICE_CONFIG[device]
            const active = activeDevice === device
            return (
              <button
                key={device}
                onClick={() => { setActiveDevice(device); setImgLoaded(false) }}
                className={`
                  relative px-2 md:px-4 py-1.5 md:py-2 font-mono text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase transition-all duration-300
                  border overflow-hidden
                  ${active
                    ? 'border-primary bg-primary/10 text-primary dark:border-cyber dark:bg-cyber/10 dark:text-cyber'
                    : 'border-primary/20 bg-transparent text-muted-dark/50 hover:border-primary/40 hover:text-muted-dark dark:border-cyber/20 dark:text-muted-light/50 dark:hover:border-cyber/40 dark:hover:text-muted-light'}
                `}
              >
                {/* active indicator bar */}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary dark:bg-cyber" />
                )}
                <span className="mr-1 text-[7px] md:text-[8px]">{cfg.icon}</span>
                <span className="hidden sm:inline">{cfg.label}</span>
                <span className="sm:hidden">{cfg.label.slice(0, 3)}</span>
              </button>
            )
          })}
        </div>

        <div className="font-mono text-[8px] md:text-[9px] text-primary/50 dark:text-cyber/50 tracking-wider hidden sm:block">
          {`VP // ${DEVICE_CONFIG[activeDevice].code}_RENDER`}
        </div>
      </div>

      {/* ── Device Frame ────────────────────────────────── */}
      <div className="flex items-center justify-center w-full transition-all duration-500 overflow-x-auto">

        {/* DESKTOP */}
        {activeDevice === 'desktop' && (
          <div className="w-full max-w-5xl mx-auto min-w-[280px]">
            {/* Monitor */}
            <div className="relative border-2 border-primary/20 dark:border-cyber/25 rounded-sm shadow-xl dark:shadow-[0_0_30px_rgba(0,255,204,0.06)] overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-white dark:bg-navy-mid border-b border-primary/10 dark:border-cyber/15 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2 md:gap-3">
                {/* Traffic lights */}
                <div className="flex gap-1 md:gap-1.5">
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-amber-400/70" />
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-emerald-400/70" />
                </div>
                {/* URL bar */}
                <div className="flex-1 max-w-[200px] md:max-w-md mx-auto">
                  <div className="bg-gray-100 dark:bg-navy/60 border border-primary/10 dark:border-cyber/10 rounded-sm px-2 md:px-3 py-0.5 md:py-1 flex items-center gap-1.5 md:gap-2">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    <span className="font-mono text-[7px] md:text-[9px] text-primary/60 dark:text-cyber/60 truncate">
                      {liveUrl ?? `https://${projectTitle.toLowerCase().replace(/\s+/g, '-')}.vercel.app`}
                    </span>
                  </div>
                </div>
                {/* HUD code */}
                <span className="font-mono text-[7px] md:text-[8px] text-primary/30 dark:text-cyber/30 hidden md:block tracking-wider">
                  {`[${DEVICE_CONFIG.desktop.code}::1920×1080]`}
                </span>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[16/9] bg-off-white dark:bg-navy-soft overflow-hidden">
                <div className={`absolute inset-0 bg-white dark:bg-navy-mid flex items-center justify-center transition-opacity duration-500 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <div className="flex gap-0.5 md:gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary dark:bg-cyber rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span className="font-mono text-[8px] md:text-[9px] text-primary/50 dark:text-cyber/50 tracking-wider">LOADING_FRAME</span>
                  </div>
                </div>
                <img
                  src={imageSrc}
                  alt={`${projectTitle} desktop view`}
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                />
                {/* Scan line overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 dark:via-cyber/30 to-transparent animate-scan" />
                </div>
              </div>
              {/* Status bar */}
              <div className="bg-white dark:bg-navy-mid border-t border-primary/10 dark:border-cyber/10 px-3 md:px-4 py-1 md:py-1.5 flex items-center justify-between">
                <span className="font-mono text-[7px] md:text-[8px] text-muted-dark/40 dark:text-muted-light/40 tracking-wider uppercase truncate">{projectTitle}</span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                  <span className="font-mono text-[7px] md:text-[8px] text-emerald-400/60 tracking-wider">LIVE</span>
                </div>
              </div>
            </div>
            {/* Monitor stand */}
            <div className="flex justify-center">
              <div className="w-16 md:w-24 h-2 md:h-3 bg-primary/5 dark:bg-cyber/10 border-x border-b border-primary/15 dark:border-cyber/20" />
            </div>
            <div className="flex justify-center">
              <div className="w-24 md:w-40 h-1 md:h-1.5 bg-primary/5 dark:bg-cyber/5 border border-primary/10 dark:border-cyber/15" />
            </div>
          </div>
        )}

        {/* TABLET */}
        {activeDevice === 'tablet' && (
          <div className="w-full max-w-[260px] sm:max-w-sm mx-auto">
            <div className="relative border-[8px] sm:border-[10px] border-gray-100 dark:border-navy-mid rounded-2xl shadow-xl dark:shadow-[0_0_40px_rgba(0,255,204,0.05)] overflow-hidden">
              {/* Tablet chrome */}
              <div className="bg-gray-100 dark:bg-navy-mid py-1.5 sm:py-2 flex items-center justify-center gap-2 sm:gap-3 border-b border-primary/5 dark:border-cyber/10">
                <div className="w-4 sm:w-6 h-1 sm:h-1.5 bg-primary/20 dark:bg-cyber/20 rounded-full" />
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary/30 dark:bg-cyber/30" />
              </div>
              {/* Screen */}
              <div className="relative aspect-[3/4] bg-off-white dark:bg-navy-soft overflow-hidden">
                <div className={`absolute inset-0 bg-white dark:bg-navy-mid flex items-center justify-center transition-opacity duration-500 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <div className="flex gap-0.5 md:gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary dark:bg-cyber rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span className="font-mono text-[8px] md:text-[9px] text-primary/50 dark:text-cyber/50 tracking-wider">LOADING</span>
                  </div>
                </div>
                <img
                  src={imageSrc}
                  alt={`${projectTitle} tablet view`}
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
              {/* Home bar */}
              <div className="bg-gray-100 dark:bg-navy-mid py-2 sm:py-3 flex items-center justify-center border-t border-primary/5 dark:border-cyber/10">
                <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-primary/20 dark:bg-cyber/20 rounded-full" />
              </div>
              {/* HUD frame corners */}
              <span className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-l border-primary/40 dark:border-cyber/40 pointer-events-none" />
              <span className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-r border-primary/40 dark:border-cyber/40 pointer-events-none" />
              <span className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-l border-primary/40 dark:border-cyber/40 pointer-events-none" />
              <span className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-r border-primary/40 dark:border-cyber/40 pointer-events-none" />
            </div>
            <div className="text-center mt-2 md:mt-3 font-mono text-[8px] md:text-[9px] text-primary/40 dark:text-cyber/40 tracking-widest">
              {`[TAB :: 768×1024]`}
            </div>
          </div>
        )}

        {/* MOBILE */}
        {activeDevice === 'mobile' && (
          <div className="w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[220px] mx-auto">
            <div className="relative border-[6px] xs:border-[8px] sm:border-[10px] border-gray-100 dark:border-navy-mid rounded-[1.5rem] xs:rounded-[2rem] shadow-xl dark:shadow-[0_0_40px_rgba(0,255,204,0.05)] overflow-hidden">
              {/* Notch */}
              <div className="bg-gray-100 dark:bg-navy-mid py-1.5 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-2 border-b border-primary/5 dark:border-cyber/10">
                <div className="w-5 sm:w-8 h-0.5 sm:h-1 bg-primary/20 dark:bg-cyber/20 rounded-full" />
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary/40 dark:bg-cyber/40" />
              </div>
              {/* Screen */}
              <div className="relative aspect-[9/19] bg-off-white dark:bg-navy-soft overflow-hidden">
                <div className={`absolute inset-0 bg-white dark:bg-navy-mid flex items-center justify-center transition-opacity duration-500 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-0.5 sm:gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-primary dark:bg-cyber rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <img
                  src={imageSrc}
                  alt={`${projectTitle} mobile view`}
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
              {/* Home indicator */}
              <div className="bg-gray-100 dark:bg-navy-mid py-1.5 sm:py-2 flex items-center justify-center border-t border-primary/5 dark:border-cyber/10">
                <div className="w-7 sm:w-10 h-0.5 sm:h-1 bg-primary/20 dark:bg-cyber/20 rounded-full" />
              </div>
            </div>
            <div className="text-center mt-2 md:mt-3 font-mono text-[7px] sm:text-[8px] md:text-[9px] text-primary/40 dark:text-cyber/40 tracking-widest">
              {`[MOB :: 390×844]`}
            </div>
          </div>
        )}
      </div>

      {/* Live URL row */}
      {liveUrl && (
        <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 px-2">
          <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-r from-transparent to-primary/20 dark:to-cyber/20 w-full" />
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 font-mono text-[8px] md:text-[10px] text-primary/70 dark:text-cyber/70 hover:text-primary dark:hover:text-cyber tracking-wider uppercase border border-primary/20 dark:border-cyber/20 px-2.5 md:px-3 py-1 md:py-1.5 hover:border-primary/50 dark:hover:border-cyber/50 hover:bg-primary/5 dark:hover:bg-cyber/5 transition-all duration-300"
          >
            <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
            OPEN_LIVE ↗
          </a>
          <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-l from-transparent to-primary/20 dark:to-cyber/20 w-full" />
        </div>
      )}
    </div>
  )
}
