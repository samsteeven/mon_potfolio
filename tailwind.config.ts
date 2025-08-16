import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  content: [
    './inertia/**/*.{ts,tsx}',
    './resources/views/**/*.edge',
    './node_modules/@heroui/theme/dist/components/modal.js',
  ],
  plugins: [animate, heroui()],
} satisfies Config
