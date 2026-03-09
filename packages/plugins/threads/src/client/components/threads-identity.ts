import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getAuthor, setAuthor, getEmail, setEmail, getAvatarUrl, setAvatarUrl } from '../lib/identity.ts';

import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

@customElement('threads-identity')
export class ThreadsIdentity extends LitElement {
  override createRenderRoot() { return this; }

  @state() private name = '';
  @state() private email = '';
  @state() private avatarUrl = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.name = getAuthor() || '';
    this.email = getEmail() || '';
    this.avatarUrl = getAvatarUrl() || '';
  }

  private openSettings(): void {
    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#identity-dialog');
    if (dialog) dialog.open = true;
  }

  private handleSave(): void {
    const nameInput = this.querySelector<HTMLInputElement>('#identity-name');
    const emailInput = this.querySelector<HTMLInputElement>('#identity-email');

    if (nameInput) {
      const val = nameInput.value.trim();
      if (val) {
        this.name = val;
        setAuthor(val);
      }
    }

    if (emailInput) {
      const val = emailInput.value.trim();
      this.email = val;
      setEmail(val);
      // Recompute gravatar from new email
      if (val) {
        this.computeGravatar(val);
      } else {
        this.avatarUrl = '';
        setAvatarUrl('');
      }
    }

    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#identity-dialog');
    if (dialog) dialog.open = false;
  }

  private handleCancel(): void {
    const dialog = this.querySelector<HTMLElement & { open: boolean }>('#identity-dialog');
    if (dialog) dialog.open = false;
  }

  private async computeGravatar(email: string): Promise<void> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(email.toLowerCase().trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      // Gravatar supports SHA-256 hashes as well as MD5
      const url = `https://gravatar.com/avatar/${hashHex}?s=80&d=mp`;
      this.avatarUrl = url;
      setAvatarUrl(url);
    } catch {
      // Fallback: just clear it
      this.avatarUrl = '';
      setAvatarUrl('');
    }
  }

  override render() {
    const initial = this.name ? this.name.charAt(0).toUpperCase() : '?';

    return html`
      <button
        class="threads-identity-btn"
        title="Discussion identity settings"
        @click=${this.openSettings}
      >
        ${this.avatarUrl
          ? html`<img class="threads-identity-avatar" src=${this.avatarUrl} alt=${this.name} />`
          : html`<span class="threads-identity-initial">${initial}</span>`
        }
      </button>

      <wa-dialog id="identity-dialog" label="Discussion Identity" light-dismiss>
        <div class="threads-identity-form">
          <div class="threads-identity-preview">
            ${this.avatarUrl
              ? html`<img class="threads-identity-preview-img" src=${this.avatarUrl} alt=${this.name} />`
              : html`<div class="threads-identity-preview-placeholder">${initial}</div>`
            }
          </div>
          <label class="threads-identity-label">
            Display Name
            <input
              id="identity-name"
              class="threads-identity-input"
              type="text"
              .value=${this.name}
              placeholder="Your name"
            />
          </label>
          <label class="threads-identity-label">
            Email (for Gravatar avatar)
            <input
              id="identity-email"
              class="threads-identity-input"
              type="email"
              .value=${this.email}
              placeholder="you@example.com"
            />
          </label>
          <p class="threads-identity-hint">
            Avatar loaded from <a href="https://gravatar.com" target="_blank" rel="noopener">Gravatar</a>.
            Stored in your browser only.
          </p>
        </div>
        <wa-button slot="footer" appearance="outlined" @click=${this.handleCancel}>Cancel</wa-button>
        <wa-button slot="footer" variant="brand" @click=${this.handleSave}>Save</wa-button>
      </wa-dialog>
    `;
  }
}
