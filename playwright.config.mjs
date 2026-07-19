import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 10000 },
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined
  },
  webServer: [
    {
      command: "node e2e/mock-api-server.mjs",
      url: "http://127.0.0.1:5999/health",
      timeout: 30000,
      reuseExistingServer: !process.env.CI
    },
    {
      command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
      url: "http://127.0.0.1:3000",
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
      env: {
        API_SERVER_URL: "http://127.0.0.1:5999",
        NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3000",
        NEXT_PUBLIC_DEMO_EMAIL: "demo@example.com",
        NEXT_PUBLIC_DEMO_PASSWORD: "DemoPassword123!",
        NEXT_PUBLIC_MAX_IMAGE_SIZE_MB: "5"
      }
    }
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] }
    }
  ]
});
