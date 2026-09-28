/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A1120',
          navy: '#0F1E36',
          surface: '#152442',
          card: '#1B2C4E',
          cardBorder: '#2A3F6D',
          amber: '#F59E0B',
          gold: '#D97706',
          lightGold: '#FEF3C7',
          emerald: '#10B981',
          whatsapp: '#25D366',
          whatsappDark: '#128C7E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
