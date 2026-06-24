/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#080808',
        surface: '#111111',
        border: '#1f1f1f',
        muted: '#444444',
        subtle: '#888888',
        text: '#e8e8e8',
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': theme('colors.amber[400]'),
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-code': theme('colors.amber[400]'),
            '--tw-prose-quotes': theme('colors.subtle'),
            '--tw-prose-hr': theme('colors.border'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
