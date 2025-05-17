import { heroui } from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|image|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

