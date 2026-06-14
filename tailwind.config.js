/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B5FA5',
          light: '#4A80D9',
          dark: '#1E4578',
        },
        accent: {
          DEFAULT: '#D28C64',
          light: '#E0AD8A',
          dark: '#B07048',
        },
        navy: {
          DEFAULT: '#0A0E1A',
          soft: '#0F121F',
          mid: '#141829',
        },
        cyber: {
          DEFAULT: '#00FFCC',
          dark: '#00ccaa',
        },
        surface: {
          DEFAULT: '#162427',
          card: '#1c2e32',
        },
        'off-white': '#F4F2EE',
        muted: {
          DEFAULT: '#8A9AB5',
          light: '#A8B5C8',
          dark: '#6B7A92',
        },
      },
      fontFamily: {
        display: ['var(--font-ibm-plex)', 'sans-serif'],
        serif: ['var(--font-ibm-serif)', 'serif'],
        mono: ['var(--font-ibm-mono)', 'monospace'],
        hud: ['var(--font-orbitron)', 'Orbitron', 'Michroma', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'line-draw': 'lineDraw 0.8s ease forwards',
        'counter': 'counter 1.5s ease forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-x': 'scrollX 40s linear infinite',
        'stagger-fade': 'staggerFadeIn 0.5s ease forwards',
        'scan': 'scan 3s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineDraw: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        staggerFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(0%)', opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0.3' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      gridTemplateColumns: {
        projects: 'repeat(auto-fill, minmax(340px, 1fr))',
        'project-detail': '1fr 380px',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(210, 140, 100, 0.15)',
        'primary': '0 4px 24px rgba(43, 95, 165, 0.12)',
        'cyber': '0 0 15px rgba(0, 255, 204, 0.4)',
      },
    },
  },
  plugins: [],
}
