import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts so lab tests don't load the Start/React plugins.
export default defineConfig({
  test: {
    include: ['labs/**/*.test.ts', 'src/**/*.test.ts'],
  },
})
