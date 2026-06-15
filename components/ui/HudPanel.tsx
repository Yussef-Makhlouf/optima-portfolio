import React from 'react';

interface HudPanelProps {
  title?: string;
  sectionCode?: string;
  status?: 'STABLE' | 'OPTIMIZING' | 'OFFLINE' | 'ACTIVE' | 'PROCESSING';
  children: React.ReactNode;
  className?: string;
}

export const HudPanel: React.FC<HudPanelProps> = ({
  title,
  sectionCode,
  status = 'STABLE',
  children,
  className = '',
}) => {
  return (
    <div className={`group relative p-4 sm:p-5 md:p-6 bg-white dark:bg-navy-mid/60 border border-primary/20 dark:border-primary/20 hover:border-primary/50 dark:hover:border-cyber/50 transition-all duration-500 hover:translate-y-[-2px] shadow-sm dark:shadow-lg ${className}`}>
      {/* HUD Corner Vector Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary group-hover:border-primary-light dark:group-hover:border-cyber transition-colors"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary group-hover:border-primary-light dark:group-hover:border-cyber transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary group-hover:border-primary-light dark:group-hover:border-cyber transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary group-hover:border-primary-light dark:group-hover:border-cyber transition-colors"></div>

      {/* Header Telemetry bar */}
      {(sectionCode || status) && (
        <div className="flex justify-between items-center border-b border-primary/10 pb-2.5 sm:pb-3 mb-3 sm:mb-4 font-mono text-[8px] sm:text-[9px] tracking-wider text-muted-dark dark:text-muted-light">
          {sectionCode ? (
            <span className="text-accent dark:text-cyber font-medium uppercase">{`[${sectionCode}]`}</span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-1.5 font-semibold">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'STABLE' || status === 'ACTIVE'
                  ? 'bg-emerald-500 dark:bg-cyber animate-pulse'
                  : 'bg-amber-500 animate-pulse'
              }`}
            ></span>
            <span>{status}</span>
          </div>
        </div>
      )}

      {title && (
        <h4 className="font-hud text-sm sm:text-base font-bold text-navy dark:text-white uppercase mb-3 sm:mb-4 tracking-[0.1em] sm:tracking-[0.15em] group-hover:text-primary-light dark:group-hover:text-cyber transition-colors break-words">
          {title}
        </h4>
      )}

      <div className="text-[13px] sm:text-sm leading-relaxed font-light">{children}</div>

      {/* Decorative Grid Line */}
      <div className="absolute bottom-1 right-6 left-6 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent"></div>
    </div>
  );
};
