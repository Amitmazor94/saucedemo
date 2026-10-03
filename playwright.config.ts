import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers:1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    launchOptions: {
      slowMo: 500,
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
  ],
});
