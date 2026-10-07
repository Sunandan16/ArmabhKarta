import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-brand-primary)',
          hover: 'var(--color-brand-light)',
          light: 'var(--color-brand-light)',
        },
        secondary: 'var(--color-brand-light)',
        surface: 'var(--color-brand-soft)',
        muted: '#6B7280',
        success: '#22C55E',
        warning: '#EAB308',
        error: '#EF4444',
        brand: {
          primary: 'var(--color-brand-primary)',
          light: 'var(--color-brand-light)',
          soft: 'var(--color-brand-soft)',
          cream: 'var(--color-brand-cream)',
          white: 'var(--color-brand-white)',
          navy: 'var(--color-brand-navy)',
          muted: 'var(--color-brand-muted)',
          border: 'var(--color-brand-border)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
        'warm-sm': 'var(--shadow-warm-sm)',
        'warm-md': 'var(--shadow-warm-md)',
        'warm-lg': 'var(--shadow-warm-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
