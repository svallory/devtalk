import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

@customElement('threads-popover')
export class ThreadsPopover extends LitElement {
  static override styles = css`
    :host {
      position: fixed;
      z-index: 10001;
    }
    .popover-content {
      background: var(--tc-bg, hsl(0 0% 100%));
      border: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      border-radius: var(--tc-radius, 6px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      padding: 4px;
    }
    wa-button::part(base) {
      color: var(--tc-fg, hsl(0 0% 9%));
      font-weight: 500;
      font-size: 13px;
    }
    wa-button::part(base):hover {
      background: var(--tc-accent, hsl(0 0% 96.1%));
    }
  `;

  @property({ type: Boolean }) active = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;

  private addComment(): void {
    this.dispatchEvent(new CustomEvent('add-comment', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    if (!this.active) return html``;

    return html`
      <div
        class="popover-content"
        style="position:fixed; left:${this.x}px; top:${this.y - 10}px; transform:translate(-50%, -100%);"
      >
        <wa-button size="small" appearance="plain" @click=${this.addComment}>
          <wa-icon slot="start" name="comment" variant="regular" label="Add comment"></wa-icon>
          Add comment
        </wa-button>
      </div>
    `;
  }

  show(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.active = true;
  }

  hide(): void {
    this.active = false;
  }
}
