/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050706',
        panel: '#080D0A',
        panel2: '#0B1310',
        line: '#152019',
        line2: '#1E2E25',
        phos: '#00FF9C',
        phosdim: '#0B6B45',
        txt: '#B9CCC0',
        mute: '#5E7268',
        alert: '#FF5C5C',
        amber: '#FFB84D',
      },
      fontFamily: {
        display: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.28em',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.9' },
          '92%': { opacity: '0.9' },
          '94%': { opacity: '0.65' },
          '96%': { opacity: '0.95' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideup: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink: 'blink 1.05s steps(1) infinite',
        flicker: 'flicker 6s linear infinite',
        scan: 'scan 7s linear infinite',
        slideup: 'slideup 260ms ease-out both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
