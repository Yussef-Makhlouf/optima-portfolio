'use client'

import { useState } from 'react'

interface Props {
  cloneUrl: string
}

export function CloneConsole({ cloneUrl }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`git clone ${cloneUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="border border-primary/15 dark:border-cyber/15 bg-white dark:bg-navy-mid/40 p-3 sm:p-4 relative group transition-all duration-300 hover:border-primary/30 dark:hover:border-cyber/30">
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-primary/45 dark:border-cyber/45" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-primary/45 dark:border-cyber/45" />

      <div className="font-mono text-[7px] sm:text-[8px] text-primary/50 dark:text-cyber/50 tracking-[0.15em] sm:tracking-[0.2em] mb-2 flex justify-between items-center select-none">
        <span>CLONE PROTOCOL</span>
        <span className="text-emerald-500 dark:text-cyber animate-pulse">ACTIVE</span>
      </div>

      <div
        onClick={handleCopy}
        className="relative p-2 sm:p-2.5 bg-gray-50/80 dark:bg-navy/80 border border-primary/10 dark:border-cyber/10 rounded-sm cursor-pointer hover:border-primary/30 dark:hover:border-cyber/30 transition-all duration-300 overflow-hidden flex items-center justify-between gap-2 group/btn min-h-[40px] sm:min-h-0"
      >
        <code className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-muted-dark/80 dark:text-muted-light/80 select-all truncate break-all pr-2">
          git clone {cloneUrl}
        </code>
        <div className="shrink-0 flex items-center gap-1 font-mono text-[7px] sm:text-[8px] px-1.5 py-0.5 sm:py-1 border border-primary/30 dark:border-cyber/30 rounded-sm bg-primary/5 dark:bg-cyber/5 text-primary/70 dark:text-cyber group-hover/btn:bg-primary/10 dark:group-hover/btn:bg-cyber/10 transition-colors min-h-[28px] sm:min-h-0">
          {copied ? (
            <span className="text-emerald-500 dark:text-cyber">[COPIED]</span>
          ) : (
            <span>[COPY]</span>
          )}
        </div>
        
        {/* Laser line trace on hover */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary dark:bg-cyber -translate-y-full group-hover/btn:animate-scan" />
      </div>
    </div>
  )
}
