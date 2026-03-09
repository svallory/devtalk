import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Thread } from '../../types.ts';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '@awesome.me/webawesome/dist/components/tag/tag.js';

import './threads-comment.ts';
import './threads-compose.ts';

@customElement('threads-thread')
export class ThreadsThread extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Object }) thread!: Thread;
  @property({ type: Boolean }) focused = false;
  @property({ type: Boolean }) orphan = false;
  @property({ type: String }) currentAuthor: string | null = null;
  @property({ type: String }) quote: string | null = null;

  private scrollToHighlight(): void {
    this.dispatchEvent(new CustomEvent('thread-scroll-to', {
      bubbles: true, composed: true,
      detail: { threadId: this.thread.id },
    }));
  }

  private toggleResolve(): void {
    this.dispatchEvent(new CustomEvent('thread-resolve', {
      bubbles: true, composed: true,
      detail: { threadId: this.thread.id },
    }));
  }

  private requestDelete(): void {
    this.dispatchEvent(new CustomEvent('thread-delete', {
      bubbles: true, composed: true,
      detail: { threadId: this.thread.id },
    }));
  }

  private handleReply(e: CustomEvent): void {
    this.dispatchEvent(new CustomEvent('thread-reply', {
      bubbles: true, composed: true,
      detail: { threadId: this.thread.id, body: e.detail.body },
    }));
  }

  override render() {
    const t = this.thread;
    const truncatedQuote = this.quote
      ? (this.quote.length > 100 ? this.quote.slice(0, 100) + '...' : this.quote)
      : null;

    return html`
      <div class="tc-thread ${this.focused ? 'tc-thread--focused' : ''} ${t.resolved ? 'tc-thread--resolved' : ''}">
        ${truncatedQuote ? html`
          <div class="tc-thread__quote" @click=${this.scrollToHighlight}>
            <div class="tc-thread__quote-text">${truncatedQuote}</div>
            ${this.orphan ? html`<wa-tag size="small" variant="warning" pill>orphaned</wa-tag>` : nothing}
          </div>
        ` : nothing}

        <div class="tc-thread__comments">
          ${t.comments.map(c => html`
            <threads-comment
              .comment=${c}
              .currentAuthor=${this.currentAuthor}
            ></threads-comment>
          `)}
        </div>

        <div class="tc-thread__reply">
          <threads-compose
            placeholder="Reply to this thread..."
            submit-label="Reply"
            @compose-submit=${this.handleReply}
          ></threads-compose>
        </div>

        <div class="tc-thread__footer">
          <wa-button size="small" appearance="plain" variant=${t.resolved ? 'neutral' : 'success'} @click=${this.toggleResolve}>
            ${t.resolved ? 'Unresolve' : 'Resolve'}
          </wa-button>
          <wa-button size="small" appearance="plain" variant="danger" @click=${this.requestDelete}>Delete</wa-button>
        </div>
      </div>
    `;
  }
}
