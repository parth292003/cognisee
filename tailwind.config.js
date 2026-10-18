/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F6F5EB',
          bgTop: '#FBF9EF',
          bgBottom: '#EEF2E4',
          text: '#1C2922',
          heading: '#142019',
          accent: '#286F61',
          green: '#577F67',
          amber: '#9D6619',
          line: 'rgba(28, 41, 34, 0.08)',
          lineStrong: 'rgba(28, 41, 34, 0.2)',
          darkBg: '#091A11',
          darkSurface: '#13231A'
        }
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        widest: '0.15em',
        ultra: '0.25em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
