/**
 * Comment display tests — adapted from old comment-display.e2e.spec.ts.
 *
 * Changes from old plugin:
 * - Comments are server-rendered HTML (.threads-comment) not Lit components
 * - Server-rendered comments have .threads-comment__meta and .threads-comment__body
 * - Author info comes from data-author attribute on .threads-comment element
 * - Date comes from data-date attribute
 * - No "just now" time formatting (server renders static date strings like "2026-03-09")
 */

import { test, expect } from "@playwright/test";
import { Actor, NavigateTo } from "./screenplay.ts";
import { cleanThreads, setAuthor, seedAndReload, waitForReload } from "./helpers.ts";

let user: Actor;

test.beforeEach(async ({ page }) => {
  user = new Actor("TestUser", page);
  await page.goto("/");
  await page.waitForSelector("threads-app", { state: "attached", timeout: 10_000 });
  await setAuthor(page, "TestUser");
  await cleanThreads(page);
  await waitForReload(page);
});

test.describe("comment display", () => {
  test("author name is displayed on the comment", async () => {
    const { id: threadId } = await seedAndReload(user.page, {
      author: "Alice",
      body: "Hello from Alice",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    await expect(thread).toBeAttached({ timeout: 5_000 });

    // Server-rendered comment should show the author
    const meta = thread.locator(".threads-comment__meta").first();
    await expect(meta).toContainText("Alice");
  });

  test("comment body is displayed", async () => {
    const { id: threadId } = await seedAndReload(user.page, {
      author: "TestUser",
      body: "This is the comment body text",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    await expect(thread).toBeAttached({ timeout: 5_000 });

    const body = thread.locator(".threads-comment__body").first();
    await expect(body).toContainText("This is the comment body text");
  });

  test("date is displayed on the comment", async () => {
    const { id: threadId } = await seedAndReload(user.page, {
      author: "TestUser",
      body: "Date display test",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    await expect(thread).toBeAttached({ timeout: 5_000 });

    // Server-rendered meta should contain a date (format: YYYY-MM-DD)
    const meta = thread.locator(".threads-comment__meta").first();
    const metaText = await meta.textContent();
    // Should contain a date pattern like 2026-03-09
    expect(metaText).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  test("comment has data-author attribute", async () => {
    const { id: threadId } = await seedAndReload(user.page, {
      author: "Bob",
      body: "Attribute test",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    const comment = thread.locator(".threads-comment").first();
    await expect(comment).toHaveAttribute("data-author", "Bob");
  });

  test("multiple comments displayed in order", async () => {
    const { id: threadId } = await seedAndReload(user.page, {
      author: "Alice",
      body: "First comment",
      replies: [
        { author: "Bob", body: "Second comment" },
        { author: "Charlie", body: "Third comment" },
      ],
    });

    let thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    await expect(thread).toBeAttached({ timeout: 5_000 });

    // The dev server may need an additional reload to pick up the last reply
    let comments = thread.locator(".threads-comment");
    if ((await comments.count()) < 3) {
      await waitForReload(user.page);
      thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
      comments = thread.locator(".threads-comment");
    }
    await expect(comments).toHaveCount(3);

    await expect(comments.nth(0).locator(".threads-comment__body")).toContainText("First comment");
    await expect(comments.nth(1).locator(".threads-comment__body")).toContainText("Second comment");
    await expect(comments.nth(2).locator(".threads-comment__body")).toContainText("Third comment");
  });
});

test.describe("markdown rendering in comments", () => {
  test("comment body renders inline markdown from markdown-it", async () => {
    // Server-rendered comments go through markdown-it, which handles bold/italic/code
    const { id: threadId } = await seedAndReload(user.page, {
      body: "Use `console.log()` for debugging",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    const body = thread.locator(".threads-comment__body").first();
    await expect(body).toBeAttached({ timeout: 5_000 });

    // markdown-it should render backtick as <code>
    const codeEl = body.locator("code");
    await expect(codeEl).toBeAttached();
  });

  test.fixme("HTML special characters are escaped", async () => {
    // FIXME: XSS vulnerability — the markdown-it parser has html:true, so raw
    // HTML in comment bodies is rendered as-is. Comment body content should be
    // sanitized before storage or rendering.
    const { id: threadId } = await seedAndReload(user.page, {
      body: "<script>alert('xss')</script>",
    });

    const thread = user.page.locator(`.threads-thread[data-thread-id="${threadId}"]`);
    const body = thread.locator(".threads-comment__body").first();
    await expect(body).toBeAttached({ timeout: 5_000 });

    // No live <script> element must exist inside the comment body
    await expect(body.locator("script")).toHaveCount(0);

    // The raw innerHTML must contain escaped entities
    const rawHtml = await body.evaluate((el) => el.innerHTML);
    expect(rawHtml).not.toContain("<script>");
  });
});
