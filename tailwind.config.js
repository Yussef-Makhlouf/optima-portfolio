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
      },
      gridTemplateColumns: {
        projects: 'repeat(auto-fill, minmax(340px, 1fr))',
        'project-detail': '1fr 380px',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(210, 140, 100, 0.15)',
        'primary': '0 4px 24px rgba(43, 95, 165, 0.12)',
      },
    },
  },
  plugins: [],
}
