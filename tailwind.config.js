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
      screens: {
        'xxl': "2000px"
      },
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
        },
        bgSwoosh: {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(1.05)',
            filter: 'blur(2px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        expandHeight: {
          '0%': { height: '70%' },
          '100%': { height: '100%' },
        },
        shrinkHeight: {
          '0%': { height: '100%' },
          '100%': { height: '70%' },
        }
      },
      animation: {
        gradient: 'gradient 6s linear infinite',
        winShake: 'winShake 0.8s ease-in-out',
        pushShake: 'pushShake 0.8s ease-in-out',
        lossShake: 'winShake 0.15s ease-in-out infinite',
        bgSwoosh: 'bgSwoosh 1s ease-in-out',
        fadeIn: "fadeIn 1.5s ease-in forwards",
        fadeOut: "fadeOut 1.5s ease-out forwards",
        slideUp: "slideUp 0.75s ease-in forwards",
        slideDown: "slideDown 0.5s ease-in forwards",
        slideIn: 'slideIn 0.3s ease-in forwards',
        fastFadeOut: "fadeOut 0.5s ease-in forwards",
        expandHeight: 'expandHeight 0.35s ease-in forwards',
        shrinkHeight: 'shrinkHeight 0.35s ease-in forwards'
      },
    },
  },
  plugins: [heroui()],
}