import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

@customElement('threads-inline-editor')
export class ThreadsInlineEditor extends LitElement {
  static override styles = css`
    :host {
      display: block;
      margin: 16px 0;
    }
    .editor {
      border: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      border-radius: var(--tc-radius, 6px);
      overflow: hidden;
      font-size: 14px;
      background: var(--tc-card, hsl(0 0% 100%));
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    .editor-body {
      padding: 12px;
    }
    .editor-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-top: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      background: var(--wa-color-surface-raised, hsl(0 0% 96.1%));
    }
    .hint {
      font-size: 12px;
      color: var(--tc-muted-fg, hsl(0 0% 45.1%));
    }
    .actions {
      display: flex;
      gap: 6px;
    }
  `;

  @property({ type: String }) quote = '';
  @state() private value = '';
  @state() private submitting = false;

  private _innerTextarea: HTMLTextAreaElement | null = null;
  private _nativeInputListener = (e: Event) => {
    this.value = (e.target as HTMLTextAreaElement).value;
  };

  private _attachNativeListener(): void {
    const waTextarea = this.shadowRoot?.querySelector('wa-textarea');
    if (!waTextarea) return;
    const inner = (waTextarea as Element).shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (inner && inner !== this._innerTextarea) {
      if (this._innerTextarea) {
        this._innerTextarea.removeEventListener('input', this._nativeInputListener);
      }
      this._innerTextarea = inner;
      inner.addEventListener('input', this._nativeInputListener);
    }
  }

  override firstUpdated() {
    // Attach native input listener and focus after wa-textarea upgrades its internal DOM.
    requestAnimationFrame(() => {
      this._attachNativeListener();
      const inner = this._innerTextarea;
      if (inner) {
        inner.focus();
      } else {
        const waTextarea = this.shadowRoot?.querySelector('wa-textarea');
        (waTextarea as unknown as HTMLElement)?.focus();
      }
    });
  }

  override updated() {
    this._attachNativeListener();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._innerTextarea) {
      this._innerTextarea.removeEventListener('input', this._nativeInputListener);
      this._innerTextarea = null;
    }
  }

  private handleInput(e: Event) {
    this.value = (e.target as any).value ?? '';
  }

  private getTextareaValue(): string {
    // Read from native textarea as source of truth (handles Playwright fill())
    if (this._innerTextarea) return this._innerTextarea.value;
    const waTextarea = this.shadowRoot?.querySelector('wa-textarea') as any;
    if (waTextarea?.value !== undefined) return String(waTextarea.value);
    return this.value;
  }

  private submit() {
    const body = this.getTextareaValue().trim();
    if (!body || this.submitting) return;
    this.value = body; // sync state
    this.submitting = true;
    this.dispatchEvent(new CustomEvent('inline-submit', {
      bubbles: true, composed: true,
      detail: { body },
    }));
  }

  private cancel() {
    this.dispatchEvent(new CustomEvent('inline-cancel', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <div class="editor">
        <div class="editor-body">
          <wa-textarea
            placeholder="Write your comment..."
            .value=${this.value}
            rows="3"
            resize="vertical"
            size="small"
            @wa-input=${this.handleInput}
            @input=${this.handleInput}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) this.submit();
              if (e.key === 'Escape') this.cancel();
            }}
          ></wa-textarea>
        </div>
        <div class="editor-footer">
          <span class="hint">Cmd+Enter to submit</span>
          <div class="actions">
            <wa-button size="small" appearance="outlined" @click=${this.cancel}>Cancel</wa-button>
            <wa-button
              size="small"
              variant="brand"
              ?disabled=${!this.value.trim() || this.submitting}
              @click=${this.submit}
            >${this.submitting ? 'Saving...' : 'Submit'}</wa-button>
          </div>
        </div>
      </div>
    `;
  }
}
