/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: forest green — single restrained accent, OKLCH hue 155
        // primary-600 gives ≥5:1 contrast on white for WCAG AA compliance
        primary: {
          50:  'oklch(0.975 0.018 155)',
          100: 'oklch(0.945 0.040 155)',
          200: 'oklch(0.893 0.072 155)',
          300: 'oklch(0.820 0.105 155)',
          400: 'oklch(0.720 0.130 155)',
          500: 'oklch(0.600 0.140 155)',
          600: 'oklch(0.450 0.130 155)',
          700: 'oklch(0.360 0.105 155)',
          800: 'oklch(0.268 0.075 155)',
          900: 'oklch(0.182 0.048 155)',
          950: 'oklch(0.115 0.025 155)',
        },
        // Secondary: cool slate — reserved for semantic use only
        secondary: {
          50:  'oklch(0.972 0.012 240)',
          100: 'oklch(0.938 0.025 240)',
          200: 'oklch(0.882 0.048 240)',
          300: 'oklch(0.805 0.082 240)',
          400: 'oklch(0.705 0.112 240)',
          500: 'oklch(0.580 0.118 240)',
          600: 'oklch(0.478 0.105 240)',
          700: 'oklch(0.382 0.082 240)',
          800: 'oklch(0.282 0.055 240)',
          900: 'oklch(0.188 0.032 240)',
          950: 'oklch(0.122 0.018 240)',
        },
        // Neutral: very slightly green-tinted for subconscious palette cohesion
        neutral: {
          50:  'oklch(0.975 0.008 155)',
          100: 'oklch(0.945 0.008 155)',
          200: 'oklch(0.900 0.008 155)',
          300: 'oklch(0.825 0.009 155)',
          400: 'oklch(0.695 0.010 155)',
          500: 'oklch(0.570 0.010 155)',
          600: 'oklch(0.462 0.010 155)',
          700: 'oklch(0.362 0.009 155)',
          800: 'oklch(0.255 0.008 155)',
          900: 'oklch(0.172 0.006 155)',
          950: 'oklch(0.108 0.005 155)',
        },
      },
      fontFamily: {
        sans: ['Pixelify Sans', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid display scale — perfect fourth (×1.333), clamp() for smooth viewport scaling
        'hero':    ['clamp(2.8rem, 6.5vw + 1rem, 5rem)',    { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'section': ['clamp(1.85rem, 3.5vw + 0.5rem, 2.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'lead':    ['clamp(1.1rem, 1.5vw + 0.5rem, 1.3rem)',  { lineHeight: '1.5',  letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
