const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', 
  timeout: 30 * 1000, 
  retries: 2, 
  reporter: 'html', 
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // Take screenshot only on test failure
    video: 'retain-on-failure', 
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }, 
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  webServer: {
    command: 'npm run start', // Command to start your web server
    port: 3000,
    timeout: 120 * 1000, 
    reuseExistingServer: !process.env.CI, // Reuse the existing server if running locally
  },
});
