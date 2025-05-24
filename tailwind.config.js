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
        winShake: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, 5px) rotate(5deg)' },
          '50%': { transform: 'translate(0, 0) rotate(0deg)' },
          '75%': { transform: 'translate(-5px, 5px) rotate(-5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        pushShake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        gradient: 'gradient 6s linear infinite',
        winShake: 'winShake 0.8s ease-in-out',
        pushShake: 'pushShake 0.8s ease-in-out',
        lossShake: 'winshake 0.15s ease-in-out infinite'
      },
    },
  },
  plugins: [heroui()],
}