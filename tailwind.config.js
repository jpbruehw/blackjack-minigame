import { heroui } from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(alert|button|card|image|input|ripple|spinner|form).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

