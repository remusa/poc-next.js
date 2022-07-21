/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    // jsxInject: "import * as React from 'react'",
  },

  plugins: [react()],

  test: {
    globals: false, // use `describe, it, test` without importing them
    passWithNoTests: true,
    environment: 'jsdom',
    setupFiles: './tests/test-setup.ts',
    exclude: [
      ...configDefaults.exclude,
      '**/*.spec.tsx', // Component tests
      'tests/**/*', // Playwright tests
    ],
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
