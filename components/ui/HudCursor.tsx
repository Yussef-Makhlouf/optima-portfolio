'use client';

import React, { useState, useEffect } from 'react';

export const HudCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('SYS');

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        setIsHovered(true);
        // Set dynamic tag label if data-label exists, otherwise SELECT
        const customLabel = target.getAttribute('data-cursor-label') || 'SELECT';
        setHoverLabel(customLabel);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {isHovered ? (
        /* Target Locked Box cursor state */
        <div className="relative w-10 h-10 border border-cyber/80 flex items-center justify-center animate-[pulse_1s_infinite]">
          {/* Box corner notches */}
          <span className="absolute top-[-2px] left-[-2px] w-1.5 h-1.5 bg-cyber"></span>
          <span className="absolute top-[-2px] right-[-2px] w-1.5 h-1.5 bg-cyber"></span>
          <span className="absolute bottom-[-2px] left-[-2px] w-1.5 h-1.5 bg-cyber"></span>
          <span className="absolute bottom-[-2px] right-[-2px] w-1.5 h-1.5 bg-cyber"></span>

          {/* Core tiny crosshair */}
          <span className="w-1 h-1 bg-cyber rounded-full"></span>

          {/* Subtext info telemetry tag */}
          <span className="absolute top-[-16px] left-0 font-mono text-[8px] bg-navy/90 text-cyber border border-cyber/30 px-1 py-0.2 tracking-wider uppercase">
            {`[${hoverLabel}]`}
          </span>
        </div>
      ) : (
        /* Default HUD Reticle cursor state */
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Main Ring overlay */}
          <div className="absolute inset-0 rounded-full border border-primary/20 scale-90"></div>

          {/* Vertical and Horizontal Target crosshair indicators */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyber/40 -translate-x-1/2 scale-y-110"></div>
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyber/40 -translate-y-1/2 scale-x-110"></div>

          {/* Tiny center dot */}
          <span className="w-1 h-1 bg-cyber rounded-full animate-ping"></span>
        </div>
      )}
    </div>
  );
};
