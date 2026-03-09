import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Thread, Anchor } from '../../types.ts';
import * as api from '../lib/api.ts';
import { ensureAuthor, initIdentity } from '../lib/identity.ts';
import { computeAnchor, getSelectionPosition, isWithinContent } from '../lib/selection.ts';
import { initThemeBridge } from '../lib/theme.ts';

import './threads-popover.ts';
import './threads-inline-editor.ts';

import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

@customElement('threads-app')
export class ThreadsApp extends LitElement {
  override createRenderRoot() { return this; }

  @state() private threads: Thread[] = [];
  @state() private popoverActive = false;
  @state() private popoverX = 0;
  @state() private popoverY = 0;

  private pendingAnchor: Anchor | null = null;
  private pendingBlockEl: HTMLElement | null = null;
  private deleteTarget: { type: 'thread' | 'comment'; id: string; threadId?: string } | null = null;
  private inlineEditorEl: HTMLElement | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousedown', this.handleOutsidePopoverClick);
    document.removeEventListener('docmd:page-mounted', this.handlePageMounted as EventListener);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    initThemeBridge();
    initIdentity();
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousedown', this.handleOutsidePopoverClick);
    document.addEventListener('docmd:page-mounted', this.handlePageMounted as EventListener);

    this.loadThreads();
    this.injectNewThreadButton();

    // Register afterReload handler for post-mutation continuity
    if (typeof docmd !== 'undefined' && docmd.afterReload) {
      docmd.afterReload('threads', () => {
        this.loadThreads();
        this.injectNewThreadButton();
      });
    }
  }

  /**
   * Find the content area of the page.
   */
  private getContentArea(): Element | null {
    return document.querySelector('[data-docmd-content]')
      || document.querySelector('.docmd-content')
      || document.querySelector('article')
      || document.querySelector('main');
  }

  /**
   * Find the insertion point for a new top-level thread.
   * If the first or second child of the content area is a heading, insert after it.
   * Otherwise insert at the very top.
   */
  private findNewThreadInsertionPoint(): { mode: 'after'; el: Element } | { mode: 'prepend'; el: Element } | null {
    const contentArea = this.getContentArea();
    if (!contentArea) return null;

    // Get the direct children that are elements (skip text nodes, whitespace)
    const children = Array.from(contentArea.children);
    if (children.length === 0) return { mode: 'prepend', el: contentArea };

    const HEADING_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

    // Check first two elements for a heading
    for (let i = 0; i < Math.min(2, children.length); i++) {
      if (HEADING_TAGS.has(children[i].tagName)) {
        return { mode: 'after', el: children[i] };
      }
    }

    return { mode: 'prepend', el: contentArea };
  }

  /**
   * Inject a "New Thread" button at the top of the content area.
   */
  private injectNewThreadButton(): void {
    // Remove existing button if present (e.g. after reload)
    document.querySelector('.threads-new-thread-btn')?.remove();

    const insertionPoint = this.findNewThreadInsertionPoint();
    if (!insertionPoint) return;

    const btn = document.createElement('button');
    btn.className = 'threads-new-thread-btn';
    btn.innerHTML = `<wa-icon name="plus" style="font-size:14px;"></wa-icon> New Thread`;
    btn.title = 'Start a new discussion thread';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.startNewThread();
    });

    if (insertionPoint.mode === 'after') {
      insertionPoint.el.insertAdjacentElement('afterend', btn);
    } else {
      insertionPoint.el.insertBefore(btn, insertionPoint.el.firstChild);
    }
  }

  /**
   * Start a new top-level thread by opening an inline editor at the insertion point.
   */
  private startNewThread(): void {
    this.removeInlineEditor();

    const insertionPoint = this.findNewThreadInsertionPoint();
    if (!insertionPoint) return;

    const editor = document.createElement('threads-inline-editor') as any;
    editor.quote = '';

    editor.addEventListener('inline-submit', async (e: CustomEvent) => {
      const author = ensureAuthor();
      try {
        await api.createThread({
          anchor: null,
          author,
          body: e.detail.body,
        });
        this.removeInlineEditor();
        if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
          docmd.scheduleReload('threads');
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error('[threads] Failed to create thread:', err);
        editor.submitting = false;
      }
    });

    editor.addEventListener('inline-cancel', () => this.removeInlineEditor());

    if (insertionPoint.mode === 'after') {
      insertionPoint.el.insertAdjacentElement('afterend', editor);
    } else {
      insertionPoint.el.insertBefore(editor, insertionPoint.el.firstChild);
    }
    this.inlineEditorEl = editor;
  }

  // ─── Selection popover ────────────────────────────────────────────

  private handleMouseUp = (e: MouseEvent): void => {
    const popover = this.querySelector('threads-popover');
    if (popover?.contains(e.target as Node)) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      this.popoverActive = false;
      return;
    }

    if (!selection.anchorNode || !isWithinContent(selection.anchorNode)) return;

    const anchor = computeAnchor(selection);
    if (!anchor) return;

    const pos = getSelectionPosition(selection);
    if (!pos) return;

    // Find the enclosing block element for inline editor insertion
    const BLOCK_TAGS = new Set(["P", "DIV", "LI", "BLOCKQUOTE", "PRE", "H1", "H2", "H3", "H4", "H5", "H6"]);
    let blockEl: HTMLElement | null = null;
    let node: Node | null = selection.getRangeAt(0).startContainer;
    while (node && node !== document.body) {
      if (node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName)) {
        blockEl = node;
        break;
      }
      node = node.parentNode;
    }

    this.pendingAnchor = anchor;
    this.pendingBlockEl = blockEl;
    this.popoverX = pos.x;
    this.popoverY = pos.y;
    this.popoverActive = true;
  };

  private handleOutsidePopoverClick = (e: MouseEvent): void => {
    const popover = this.querySelector('threads-popover');
    if (popover && !e.composedPath().includes(popover)) {
      this.popoverActive = false;
    }
  };

  /**
   * Handle popover "add comment" — open inline editor after the block.
   */
  private handleAddComment(): void {
    if (!this.pendingAnchor || !this.pendingBlockEl) return;

    this.removeInlineEditor();
    this.popoverActive = false;

    const anchor = this.pendingAnchor;
    const blockEl = this.pendingBlockEl;
    this.pendingAnchor = null;
    this.pendingBlockEl = null;
    window.getSelection()?.removeAllRanges();

    const editor = document.createElement('threads-inline-editor') as any;
    editor.quote = anchor.quote || '';

    editor.addEventListener('inline-submit', async (e: CustomEvent) => {
      const author = ensureAuthor();
      try {
        await api.createThread({
          anchor,
          author,
          body: e.detail.body,
        });
        this.removeInlineEditor();
        if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
          docmd.scheduleReload('threads');
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error('[threads] Failed to create thread:', err);
        editor.submitting = false;
      }
    });

    editor.addEventListener('inline-cancel', () => this.removeInlineEditor());

    blockEl.insertAdjacentElement('afterend', editor);
    this.inlineEditorEl = editor;
  }

  // ─── Page lifecycle ───────────────────────────────────────────────

  private handlePageMounted = (_e: CustomEvent): void => {
    this.popoverActive = false;
    this.loadThreads();
    this.injectNewThreadButton();
  };

  private async loadThreads(): Promise<void> {
    try {
      this.threads = await api.fetchThreads();
    } catch (err) {
      console.error('[threads] Failed to load threads:', err);
      this.threads = [];
    }
    this.scanRenderedHighlights();
  }

  // Color palette for highlights — cycles through these
  private static HIGHLIGHT_COLORS = [
    'threads-hl-yellow',
    'threads-hl-blue',
    'threads-hl-green',
    'threads-hl-pink',
    'threads-hl-purple',
    'threads-hl-orange',
  ];

  /**
   * Scan the DOM for <mark class="threads-highlight" data-thread-id="..."> elements.
   * Assigns cycling highlight colors, moves thread cards inline after the block
   * containing the highlight, and attaches click handlers.
   */
  private scanRenderedHighlights(): void {
    const marks = document.querySelectorAll<HTMLElement>('mark.threads-highlight[data-thread-id]');
    const BLOCK_TAGS = new Set(['P', 'DIV', 'LI', 'BLOCKQUOTE', 'PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'TABLE']);
    let colorIndex = 0;

    for (const mark of marks) {
      const threadId = mark.dataset.threadId;
      if (!threadId) continue;

      // 1. Assign cycling highlight color
      const colorClass = ThreadsApp.HIGHLIGHT_COLORS[colorIndex % ThreadsApp.HIGHLIGHT_COLORS.length];
      mark.classList.add(colorClass);
      colorIndex++;

      // 2. Move thread card from the bottom threads-sidebar to after the enclosing block
      const threadEl = document.querySelector<HTMLElement>(`.threads-thread[data-thread-id="${threadId}"]`);
      if (threadEl) {
        // Apply matching border color
        threadEl.classList.add(colorClass.replace('threads-hl-', 'threads-border-'));

        // Find the enclosing block element of the highlight
        let blockEl: Element | null = mark;
        while (blockEl && blockEl !== document.body) {
          if (blockEl instanceof HTMLElement && BLOCK_TAGS.has(blockEl.tagName)) {
            break;
          }
          blockEl = blockEl.parentElement;
        }

        if (blockEl && blockEl !== document.body) {
          blockEl.insertAdjacentElement('afterend', threadEl);
        }
      }

      // 3. Click handler: scroll to thread and flash
      mark.style.cursor = 'pointer';
      mark.addEventListener('click', () => {
        const el = document.querySelector(`.threads-thread[data-thread-id="${threadId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('threads-thread--flash');
          setTimeout(() => el.classList.remove('threads-thread--flash'), 2000);
        }
      });
    }

    // 4. Inject reply buttons into all thread cards
    this.injectReplyButtons();

    // Hide the now-empty threads-sidebar wrapper
    const sidebar = document.querySelector('.threads-sidebar');
    if (sidebar instanceof HTMLElement) {
      sidebar.style.display = 'none';
    }
  }

  /**
   * Add a "Reply" button to the bottom of each .threads-thread card.
   */
  private injectReplyButtons(): void {
    const threads = document.querySelectorAll<HTMLElement>('.threads-thread[data-thread-id]');
    for (const threadEl of threads) {
      // Skip if already has a reply button
      if (threadEl.querySelector('.threads-reply-btn')) continue;

      const threadId = threadEl.dataset.threadId;
      if (!threadId) continue;

      const footer = document.createElement('div');
      footer.className = 'threads-thread__footer';

      const btn = document.createElement('button');
      btn.className = 'threads-reply-btn';
      btn.innerHTML = `<wa-icon name="reply" style="font-size:13px;"></wa-icon> Reply`;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openReplyEditor(threadEl, threadId);
      });

      footer.appendChild(btn);
      threadEl.appendChild(footer);
    }
  }

  /**
   * Open an inline editor at the bottom of a thread card for replying.
   */
  private openReplyEditor(threadEl: HTMLElement, threadId: string): void {
    this.removeInlineEditor();

    const editor = document.createElement('threads-inline-editor') as any;
    editor.quote = '';

    editor.addEventListener('inline-submit', async (e: CustomEvent) => {
      const author = ensureAuthor();
      try {
        await api.addComment(threadId, {
          author,
          body: e.detail.body,
        });
        this.removeInlineEditor();
        if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
          docmd.scheduleReload('threads');
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error('[threads] Failed to add reply:', err);
        editor.submitting = false;
      }
    });

    editor.addEventListener('inline-cancel', () => this.removeInlineEditor());

    // Insert editor before the footer (reply button)
    const footer = threadEl.querySelector('.threads-thread__footer');
    if (footer) {
      threadEl.insertBefore(editor, footer);
    } else {
      threadEl.appendChild(editor);
    }
    this.inlineEditorEl = editor;
  }

  // ─── Inline editor helpers ────────────────────────────────────────

  private removeInlineEditor(): void {
    this.inlineEditorEl?.remove();
    this.inlineEditorEl = null;
  }

  // ─── Delete confirmation ──────────────────────────────────────────

  private handleDeleteRequest(e: CustomEvent, type: 'thread' | 'comment'): void {
    const id = type === 'thread' ? e.detail.threadId : e.detail.commentId;
    const threadId = type === 'comment' ? e.detail.threadId : undefined;
    this.deleteTarget = { type, id, threadId };
    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#delete-dialog');
    if (dialog) dialog.open = true;
  }

  private async confirmDelete(): Promise<void> {
    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#delete-dialog');
    if (dialog) dialog.open = false;

    if (!this.deleteTarget) return;
    if (this.deleteTarget.type === 'thread') {
      await api.deleteThread(this.deleteTarget.id);
    } else {
      await api.deleteComment(this.deleteTarget.threadId!, this.deleteTarget.id);
    }
    this.deleteTarget = null;
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

  private cancelDelete(): void {
    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#delete-dialog');
    if (dialog) dialog.open = false;
    this.deleteTarget = null;
  }

  override render() {
    return html`
      <threads-popover
        ?active=${this.popoverActive}
        .x=${this.popoverX}
        .y=${this.popoverY}
        @add-comment=${this.handleAddComment}
      ></threads-popover>

      <wa-dialog id="delete-dialog" label="Confirm Delete" light-dismiss>
        Are you sure you want to delete this ${this.deleteTarget?.type ?? 'item'}?
        <wa-button slot="footer" appearance="outlined" @click=${this.cancelDelete}>Cancel</wa-button>
        <wa-button slot="footer" variant="danger" @click=${this.confirmDelete}>Delete</wa-button>
      </wa-dialog>
    `;
  }
}
