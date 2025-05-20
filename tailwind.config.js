import { heroui } from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(alert|button|card|image|input|ripple|spinner|form).js"
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(5px)' },
          '75%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        wiggle: 'wiggle 0.6s ease-in-out'
      },
    },
  },
  plugins: [heroui()],
}

