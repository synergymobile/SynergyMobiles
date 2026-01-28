/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: '#ef4444',
        accent: '#10b981',
        warning: '#f59e0b',
        dark: '#111827',
        light: '#f9fafb',
        gray: {
            800: '#1f2937',
            700: '#374151',
            600: '#4b5563',
            500: '#6b7280',
            400: '#9ca3af',
            300: '#d1d5db',
            200: '#e5e7eb',
            100: '#f3f4f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
