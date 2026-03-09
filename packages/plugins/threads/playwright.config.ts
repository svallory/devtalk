import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: "http://localhost:4175",
    headless: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "pnpm --filter @docmd/playground run dev --port 4175",
    port: 4175,
    reuseExistingServer: !process.env["CI"],
    timeout: 30_000,
    cwd: "../../../", // monorepo root
  },
});
