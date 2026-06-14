import React from 'react';

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'cyber' | 'outline';
}

export const GlitchButton: React.FC<GlitchButtonProps> = ({
  label,
  onClick,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cyber':
        return 'border-primary text-primary hover:text-white dark:border-cyber dark:text-cyber dark:hover:text-navy';
      case 'outline':
        return 'border-muted text-muted hover:border-primary hover:text-primary dark:hover:border-cyber dark:hover:text-cyber';
      default:
        return 'border-primary text-primary hover:border-primary-light dark:text-off-white dark:hover:border-cyber';
    }
  };

  const getSwipeColor = () => {
    switch (variant) {
      case 'cyber':
        return 'bg-primary/15 dark:bg-cyber/15';
      case 'outline':
        return 'bg-primary/10 dark:bg-cyber/10';
      default:
        return 'bg-primary/15 dark:bg-cyber/10';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group relative px-6 py-3 bg-transparent font-mono text-[11px] uppercase tracking-[0.25em] border overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${className}`}
      {...props}
    >
      {/* Hover Background Swipe */}
      <div className={`absolute inset-0 ${getSwipeColor()} -translate-x-[102%] group-hover:translate-x-0 transition-transform duration-500 ease-out`}></div>

      {/* Laser Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary dark:bg-cyber -translate-y-full group-hover:animate-scan"></div>

      <span className="relative z-10 flex items-center justify-center gap-2">
        <span>{label}</span>
        <span className="text-primary dark:text-cyber group-hover:translate-x-1.5 transition-transform duration-300">
          →
        </span>
      </span>

      {/* Micro Accents */}
      <span className="absolute top-0 right-0 w-1 h-1 bg-primary dark:bg-cyber"></span>
      <span className="absolute bottom-0 left-0 w-1 h-1 bg-primary dark:bg-cyber"></span>
    </button>
  );
};
