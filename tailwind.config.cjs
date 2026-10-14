/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dstore: {
          primary: '#b4572f',
          'primary-content': '#ffffff',
          secondary: '#2f4a3a',
          'secondary-content': '#ffffff',
          accent: '#d9a441',
          'accent-content': '#1c1917',
          neutral: '#1c1917',
          'neutral-content': '#f5f0e8',
          'base-100': '#ffffff',
          'base-200': '#f7f3ec',
          'base-300': '#e9e1d4',
          'base-content': '#1c1917',
          info: '#3b82f6',
          success: '#16a34a',
          warning: '#f59e0b',
          error: '#dc2626',
          '--rounded-box': '1.25rem',
          '--rounded-btn': '9999px',
          '--rounded-badge': '9999px',
          '--btn-focus-scale': '0.97',
        },
      },
    ],
  },
};
