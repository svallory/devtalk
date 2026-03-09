---
title: "docmd _playground"
description: "A testing ground for docmd core engine features."
---

This playground is used to verify core engine changes in real-time. Use this to ensure your modifications to the Markdown parser or UI components behave as expected.

::: callout tip "How to work here"
To test your changes, keep the dev server running (`pnpm run dev`). Any change you make to `packages/core` or `packages/parser` will trigger a hot-reload here instantly.
:::

## Component Verification

Test your UI components and parser rules here to ensure visual consistency:

::: card "Container Test"
    Test nested callouts and containers.

    ::: callout warning "Warning"
    Ensure nested items render correctly.
    :::
:::

::: tabs
== tab "Feature A"
### Feature A
Verification content.
== tab "Feature B"
### Feature B
Verification content.
:::

## 🔗 Useful Links

- [Official Documentation](https://docs.docmd.io)
- [GitHub Repository](https://github.com/docmd-io/docmd)
- [Report an Issue](https://github.com/docmd-io/docmd/issues)

## ==🧪 Developer Checklist=={t-5e1ab9a0}
- [ ] **Parser:** Does the Markdown output match the HTML in `packages/parser/src/html-renderer.js`?
- [ ] **UI:** Does the theme CSS apply to this page correctly?
- [ ] **SPA:** Does navigation between pages work without a hard refresh?

## Threads Plugin Test

This section tests the ==inline discussion threads=={t-test001} plugin. You can highlight text and start discussions.

Here is another paragraph with a ==different highlight=={t-test002} to test multiple threads.

::: threads
  ::: thread t-test001
    ::: comment c-aabb0001 "alice" "2026-03-08"
      This is a test comment on the highlighted text above. The threads plugin should render this in the sidebar.
    :::

    ::: comment c-aabb0002 "bob" "2026-03-09"
      I agree, this is looking great!

      ::: reactions
        - 👍 alice
        - 🎉 charlie
      :::
    :::
  :::
  ::: thread t-test002
    ::: comment c-ccdd0001 "charlie" "2026-03-09"
      Another thread on a different highlight.
    :::
  :::
  ::: thread t-5e1ab9a0
    ::: comment c-e673d2c7 "Saulo" "2026-03-09"
      Oh, hello!
    :::
  :::
:::