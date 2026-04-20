/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        'bg-dark': '#0d0f14',
        'card-bg': 'rgba(255, 255, 255, 0.03)',
        'card-border': 'rgba(255, 255, 255, 0.08)',
        accent: '#6366f1',
        'accent-hover': '#4f46e5',
        success: '#10b981',
        danger: '#ef4444',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeInDown: 'fadeInDown 0.8s ease-out',
        fadeIn: 'fadeIn 1s ease-out 0.2s both',
        slideUp: 'slideUp 0.4s ease-out backwards',
      }
    },
  },
  plugins: [],
}
