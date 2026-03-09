import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

@customElement('threads-compose')
export class ThreadsCompose extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) placeholder = 'Add a comment...';
  @property({ type: String }) quote: string | null = null;
  @property({ type: String, attribute: 'submit-label' }) submitLabel = 'Comment';
  @property({ type: Boolean }) cancellable = false;

  private submit(): void {
    const textarea = this.querySelector<HTMLElement & { value: string }>('wa-textarea');
    const value = textarea?.value?.trim();
    if (!value) return;
    this.dispatchEvent(new CustomEvent('compose-submit', {
      bubbles: true, composed: true,
      detail: { body: value },
    }));
    if (textarea) textarea.value = '';
  }

  private cancel(): void {
    this.dispatchEvent(new CustomEvent('compose-cancel', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <div class="tc-compose">
        ${this.quote ? html`
          <div class="tc-compose__quote">${this.quote}</div>
        ` : nothing}
        <wa-textarea
          placeholder=${this.placeholder}
          rows="2"
          resize="vertical"
          size="small"
        ></wa-textarea>
        <div class="tc-compose__actions">
          ${this.cancellable ? html`
            <wa-button size="small" appearance="plain" @click=${this.cancel}>Cancel</wa-button>
          ` : nothing}
          <wa-button size="small" variant="brand" @click=${this.submit}>${this.submitLabel}</wa-button>
        </div>
      </div>
    `;
  }
}
