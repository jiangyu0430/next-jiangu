const plugin = require('tailwindcss/plugin')

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}', // App Router 页面
    './components/**/*.{js,ts,jsx,tsx,md,mdx}', // 组件目录
    './data/content/**/*.{md,mdx}', // 博客内容
  ],
  theme: {
    extend: {
      colors: {
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))',
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ApfelGrotezk',
          'system-ui',
          'PingFang SC',
          'Microsoft YaHei',
          'Instrument Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        Oswald: ['Oswald', 'sans-serif'],
        ApfelGrotezk: ['ApfelGrotezk', 'sans-serif'],
      },
      zIndex: {
        modal: '99999',
        tooltip: '999999',
      },
      animation: {
        'spin-once': 'spin 0.3s linear 1',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
        ripple: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(0.9)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: 'normal',
              fontWeight: 'normal',
              borderLeftWidth: '2px',
              paddingLeft: '1rem',
              marginBlock: '1rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },

            // 自定义间距覆盖
            p: { marginTop: '1rem', marginBottom: '1rem' },
            h2: { marginTop: '2.5rem', marginBottom: '1.5rem' },
            h3: { marginTop: '2rem', marginBottom: '1rem' },
            h4: { marginTop: '1.5rem', marginBottom: '1rem' },
            ul: { marginTop: '0.2rem', marginBottom: '0.2rem' },
            ol: { marginTop: '0.5rem', marginBottom: '0.5rem' },
          },
        },
      },

      maxWidth: {
        'screen-2xl': '1440px',
        'screen-xl': '1024px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    plugin(
      ({
        addComponents,
      }: {
        addComponents: (components: Record<string, any>) => void
      }) => {
        addComponents({
          '.prose-dark': {
            '@apply prose prose-invert': {},
          },
        })
      }
    ),
    // 如果需要 line-clamp 再解开
    // require('@tailwindcss/line-clamp'),
  ],
}
