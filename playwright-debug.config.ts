import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import path from 'path'
import { baseURL } from './playwright.config'

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'tests', 'e2e'),
  timeout: 0,
  expect: {
    timeout: 0,
  },
  fullyParallel: true,
  forbidOnly: false,
  maxFailures: 1,
  retries: 0,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL,
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          headless: false,
          devtools: true,
        },
        viewport: {
          width: 1920, // 1280
          height: 1080, // 720
        },
      },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
}

export default config
