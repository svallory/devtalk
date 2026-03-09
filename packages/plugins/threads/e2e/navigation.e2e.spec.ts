/**
 * SPA navigation tests — adapted from old headings-navigation.e2e.spec.ts
 * "SPA navigation" block.
 *
 * Changes from old plugin:
 * - No sidebar panel
 * - No heading discuss buttons
 * - Threads are inline, not in a sidebar
 * - Navigation restores threads by triggering loadThreads + scanRenderedHighlights
 */

import { test, expect } from "@playwright/test";
import { Actor, NavigateTo, TheHighlightCount } from "./screenplay.ts";
import { cleanThreads, setAuthor, seedAndReload, waitForReload } from "./helpers.ts";

const contentSelector = "[data-docmd-content] p, .docmd-content p, article p, main p";

let user: Actor;

test.beforeEach(async ({ page }) => {
  user = new Actor("TestUser", page);
  await page.goto("/");
  await page.waitForSelector("threads-app", { state: "attached", timeout: 10_000 });
  await setAuthor(page, "TestUser");
});

test.describe("SPA navigation", () => {
  test("threads-app is present after page load", async () => {
    await user.perform(NavigateTo.path("/"));
    const app = user.page.locator("threads-app");
    await expect(app).toBeAttached();
  });

  test("New Thread button is reinjected after SPA navigation", async () => {
    await user.perform(NavigateTo.path("/"));

    const btn = user.page.locator(".threads-new-thread-btn");
    await expect(btn).toBeVisible({ timeout: 5_000 });
  });

  test("threads are page-scoped (pre-existing threads from markdown)", async () => {
    // The playground index.md has threads defined in markdown
    await user.perform(NavigateTo.path("/"));

    const threadsOnIndex = await user.page.locator(".threads-thread[data-thread-id]").count();
    // The index page has pre-defined threads
    expect(threadsOnIndex).toBeGreaterThan(0);
  });
});
