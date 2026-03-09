import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Thread, Anchor } from '../../types.ts';
import * as api from '../lib/api.ts';
import { ensureAuthor, initIdentity, getAuthor } from '../lib/identity.ts';
import { computeAnchor, getSelectionPosition, isWithinContent } from '../lib/selection.ts';
import { reanchor, clearHighlights, applyHighlight, scrollToHighlight } from '../lib/highlights.ts';
import { initThemeBridge } from '../lib/theme.ts';

import './threads-panel.ts';
import './threads-popover.ts';
import './threads-inline-editor.ts';

import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/badge/badge.js';

@customElement('threads-app')
export class ThreadsApp extends LitElement {
  override createRenderRoot() { return this; }

  @state() private threads: Thread[] = [];
  @state() private panelOpen = false;
  @state() private focusedThreadId: string | null = null;
  @state() private composing: { anchor: Anchor } | null = null;
  @state() private composingGeneral = false;
  @state() private popoverActive = false;
  @state() private popoverX = 0;
  @state() private popoverY = 0;

  @state() private inlineEditing: { anchor: Anchor; blockEl: HTMLElement } | null = null;

  private pendingAnchor: Anchor | null = null;
  private pendingBlockEl: HTMLElement | null = null;
  private orphanIds = new Set<string>();
  private threadQuotes = new Map<string, string>();
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

    // Insert the sidebar column into the page layout
    this.insertSidebarColumn();
    // Mark body so CSS can increase max-width
    document.body.classList.add('tc-has-sidebar');

    this.loadThreads();
    this.injectHeadingButtons();

    // Register afterReload handler for post-mutation continuity
    if (typeof docmd !== 'undefined' && docmd.afterReload) {
      docmd.afterReload('threads', () => {
        this.loadThreads();
        this.injectHeadingButtons();
      });
    }
  }

  private sidebarColumn: HTMLElement | null = null;

  private insertSidebarColumn(): void {
    this.sidebarColumn = document.createElement('div');
    this.sidebarColumn.className = 'tc-sidebar-column';
    document.body.appendChild(this.sidebarColumn);
    this.updateSidebarColumn();
  }

  private updateSidebarColumn(): void {
    if (!this.sidebarColumn) return;

    // Toggle body class for layout shift
    document.body.classList.toggle('tc-panel-open', this.panelOpen);

    // Move threads-panel into the sidebar column if it's not there yet
    const panel = this.querySelector('threads-panel');
    if (panel && panel.parentElement !== this.sidebarColumn) {
      this.sidebarColumn.appendChild(panel);
    }

    // Ensure toggle button exists
    let toggle = this.sidebarColumn.querySelector('.tc-sidebar-toggle') as HTMLElement;
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'tc-sidebar-toggle';
      toggle.title = 'Toggle comments';
      toggle.innerHTML = `<wa-icon name="comments" variant="regular" style="font-size:20px;"></wa-icon>`;
      toggle.addEventListener('click', () => this.handleTogglePanel());
      this.sidebarColumn.insertBefore(toggle, this.sidebarColumn.firstChild);
    }

    // Update badge on toggle
    const openCount = this.threads.filter(t => !t.resolved).length;
    let badge = toggle.querySelector('wa-badge') as HTMLElement;
    if (openCount > 0) {
      if (!badge) {
        badge = document.createElement('wa-badge');
        badge.setAttribute('variant', 'neutral');
        badge.setAttribute('pill', '');
        badge.style.cssText = 'position:absolute; top:6px; left:2px; font-size:10px;';
        toggle.appendChild(badge);
      }
      badge.textContent = String(openCount);
    } else if (badge) {
      badge.remove();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('panelOpen') || changed.has('threads')) {
      this.updateSidebarColumn();
    }
  }

  private handleMouseUp = (e: MouseEvent): void => {
    const panel = this.sidebarColumn?.querySelector('.tc-panel');
    const popover = this.querySelector('threads-popover');
    if (panel?.contains(e.target as Node) || popover?.contains(e.target as Node)) return;
    if (this.sidebarColumn?.contains(e.target as Node)) return;

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

    // Save the block element for inline editing — must capture now before selection is cleared
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

  private handlePageMounted = (_e: CustomEvent): void => {
    clearHighlights();
    this.popoverActive = false;
    this.loadThreads();
    this.injectHeadingButtons();
  };

  private async loadThreads(): Promise<void> {
    try {
      this.threads = await api.fetchThreads();
    } catch (err) {
      console.error('[threads] Failed to load threads:', err);
      this.threads = [];
    }
    this.applyAllHighlights();
  }

  private applyAllHighlights(): void {
    clearHighlights();
    this.orphanIds.clear();
    this.threadQuotes.clear();
    for (const thread of this.threads) {
      // The new Thread type doesn't have an anchor field directly.
      // Anchors are stored via ==text=={thread-id} highlight syntax in the markdown.
      // The highlights.ts reanchor function expects thread.anchor — we skip threads
      // that don't have anchors (which is the normal case now).
      const threadWithAnchor = thread as Thread & { anchor?: Anchor };
      if (!threadWithAnchor.anchor) continue;
      const result = reanchor(threadWithAnchor as any);
      if (result.range) {
        this.threadQuotes.set(thread.id, threadWithAnchor.anchor.quote);
        applyHighlight(thread.id, result.range, thread.resolved, (id) => {
          this.focusedThreadId = id;
          this.panelOpen = true;
        });
      }
      if (result.orphan) {
        this.orphanIds.add(thread.id);
      }
    }
  }

  private handleTogglePanel(): void {
    this.panelOpen = !this.panelOpen;
    if (!this.panelOpen) {
      this.composing = null;
      this.composingGeneral = false;
      this.focusedThreadId = null;
    }
  }

  private handlePanelClose(): void {
    this.panelOpen = false;
    this.composing = null;
    this.composingGeneral = false;
    this.focusedThreadId = null;
  }

  private handleAddComment(): void {
    if (this.pendingAnchor) {
      this.composing = { anchor: this.pendingAnchor };
      this.composingGeneral = false;
      this.pendingAnchor = null;
      this.panelOpen = true;
      this.popoverActive = false;
      window.getSelection()?.removeAllRanges();
    }
  }

  private handleGeneralComment(): void {
    this.composingGeneral = true;
    this.composing = null;
    this.panelOpen = true;
  }

  private async handleComposeNewThread(e: CustomEvent): Promise<void> {
    const author = ensureAuthor();
    const anchor = this.composing?.anchor ?? null;
    await api.createThread({
      anchor,
      author,
      body: e.detail.body,
    });
    this.composing = null;
    this.composingGeneral = false;
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

  private handleCancelCompose(): void {
    this.composing = null;
    this.composingGeneral = false;
  }

  private handleScrollToHighlight(e: CustomEvent): void {
    scrollToHighlight(e.detail.threadId);
  }

  private async handleResolve(e: CustomEvent): Promise<void> {
    const author = ensureAuthor();
    await api.resolveThread(e.detail.threadId, { resolved_by: author });
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

  private async handleReply(e: CustomEvent): Promise<void> {
    const author = ensureAuthor();
    await api.addComment(e.detail.threadId, { author, body: e.detail.body });
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

  private async handleCommentEdit(e: CustomEvent): Promise<void> {
    await api.editComment(e.detail.threadId, e.detail.commentId, { body: e.detail.body });
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

  private async handleReaction(e: CustomEvent): Promise<void> {
    const author = ensureAuthor();
    await api.toggleReaction(e.detail.threadId, e.detail.commentId, { emoji: e.detail.emoji, author });
    if (typeof docmd !== 'undefined' && docmd.scheduleReload) {
      docmd.scheduleReload('threads');
    } else {
      await this.loadThreads();
    }
  }

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

  private insertInlineEditor(afterEl: HTMLElement): void {
    this.removeInlineEditor();

    const editor = document.createElement('threads-inline-editor') as any;
    editor.quote = this.inlineEditing?.anchor.quote ?? '';

    editor.addEventListener('inline-submit', (e: CustomEvent) => this.handleInlineSubmit(e));
    editor.addEventListener('inline-cancel', () => this.removeInlineEditor());

    afterEl.insertAdjacentElement('afterend', editor);
    this.inlineEditorEl = editor;
  }

  private removeInlineEditor(): void {
    this.inlineEditorEl?.remove();
    this.inlineEditorEl = null;
    this.inlineEditing = null;
  }

  private async handleInlineSubmit(e: CustomEvent): Promise<void> {
    if (!this.inlineEditing) return;

    const { anchor } = this.inlineEditing;
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
      const editor = this.inlineEditorEl as any;
      if (editor) editor.submitting = false;
    }
  }

  private injectHeadingButtons(): void {
    const contentArea = document.querySelector('[data-docmd-content]')
      || document.querySelector('.docmd-content')
      || document.querySelector('article')
      || document.querySelector('main');

    if (!contentArea) return;

    const headings = contentArea.querySelectorAll('h2, h3, h4, h5, h6');

    headings.forEach(heading => {
      if ((heading as HTMLElement).dataset['threadsEnhanced']) return;
      (heading as HTMLElement).dataset['threadsEnhanced'] = 'true';

      const btn = document.createElement('button');
      btn.className = 'threads-heading-discuss';
      btn.textContent = 'Discuss';
      btn.title = 'Start a discussion about this section';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startHeadingDiscussion(heading as HTMLElement);
      });
      heading.appendChild(btn);
    });
  }

  private startHeadingDiscussion(heading: HTMLElement): void {
    this.removeInlineEditor();

    const headingText = heading.textContent?.replace('Discuss', '').trim() || '';

    const editor = document.createElement('threads-inline-editor') as any;
    editor.quote = '';

    editor.addEventListener('inline-submit', async (e: CustomEvent) => {
      const author = ensureAuthor();
      try {
        const anchor: Anchor = {
          quote: headingText,
          prefix: null,
          suffix: null,
          selector: null,
          offset: null,
          blockText: headingText,
        };
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

    heading.insertAdjacentElement('afterend', editor);
    this.inlineEditorEl = editor;
  }

  override render() {
    return html`
      <threads-popover
        ?active=${this.popoverActive}
        .x=${this.popoverX}
        .y=${this.popoverY}
        @add-comment=${this.handleAddComment}
      ></threads-popover>

      <threads-panel
        ?open=${this.panelOpen}
        .threads=${this.threads}
        .focusedThreadId=${this.focusedThreadId}
        .composing=${this.composing || (this.composingGeneral ? {} : null)}
        .currentAuthor=${getAuthor()}
        .orphanIds=${this.orphanIds}
        .threadQuotes=${this.threadQuotes}
        @panel-close=${this.handlePanelClose}
        @compose-new-thread=${this.handleComposeNewThread}
        @compose-cancel-new=${this.handleCancelCompose}
        @compose-general-comment=${this.handleGeneralComment}
        @thread-scroll-to=${this.handleScrollToHighlight}
        @thread-resolve=${this.handleResolve}
        @thread-reply=${this.handleReply}
        @thread-delete=${(e: CustomEvent) => this.handleDeleteRequest(e, 'thread')}
        @comment-edit=${this.handleCommentEdit}
        @comment-delete=${(e: CustomEvent) => this.handleDeleteRequest(e, 'comment')}
        @comment-reaction=${this.handleReaction}
      ></threads-panel>

      <wa-dialog id="delete-dialog" label="Confirm Delete" light-dismiss>
        Are you sure you want to delete this ${this.deleteTarget?.type ?? 'item'}?
        <wa-button slot="footer" appearance="outlined" @click=${this.cancelDelete}>Cancel</wa-button>
        <wa-button slot="footer" variant="danger" @click=${this.confirmDelete}>Delete</wa-button>
      </wa-dialog>
    `;
  }
}
