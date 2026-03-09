import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  getAuthor, setAuthor,
  getEmail, setEmail,
  getGithub, setGithub,
  getAvatarUrl, setAvatarUrl,
  computeAvatarUrl,
  computeAuthorKey, setAuthorKey,
} from '../lib/identity.ts';
import { upsertAuthor } from '../lib/api.ts';

@customElement('threads-identity')
export class ThreadsIdentity extends LitElement {
  override createRenderRoot() { return this; }

  @state() private name = '';
  @state() private email = '';
  @state() private github = '';
  @state() private avatarUrl = '';
  @state() private panelOpen = false;

  private outsideClickHandler = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.panelOpen = false;
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.name = getAuthor() || '';
    this.email = getEmail() || '';
    this.github = getGithub() || '';
    this.avatarUrl = getAvatarUrl() || '';

    // If we have identity info but no avatar yet, compute one
    if (!this.avatarUrl && (this.email || this.github)) {
      this.refreshAvatar();
    }

    document.addEventListener('mousedown', this.outsideClickHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('mousedown', this.outsideClickHandler);
  }

  private togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }

  private async handleSave(): Promise<void> {
    const nameInput = this.querySelector<HTMLInputElement>('#identity-name');
    const emailInput = this.querySelector<HTMLInputElement>('#identity-email');
    const githubInput = this.querySelector<HTMLInputElement>('#identity-github');

    if (nameInput) {
      const val = nameInput.value.trim();
      this.name = val;
      if (val) setAuthor(val);
    }

    if (emailInput) {
      const val = emailInput.value.trim();
      this.email = val;
      setEmail(val);
    }

    if (githubInput) {
      const val = githubInput.value.trim().replace(/^@/, '');
      this.github = val;
      setGithub(val);
    }

    await this.refreshAvatar();

    // Compute and save author key
    const authorKey = computeAuthorKey(this.name, this.github);
    setAuthorKey(authorKey);

    // Sync to server authors.json
    try {
      await upsertAuthor(authorKey, this.name, this.avatarUrl);
    } catch {
      // Server may not be available (e.g. static site); ignore
    }

    this.panelOpen = false;
  }

  private async refreshAvatar(): Promise<void> {
    const url = await computeAvatarUrl(this.email, this.github);
    this.avatarUrl = url;
    setAvatarUrl(url);
  }

  private handleCancel(): void {
    this.panelOpen = false;
  }

  override render() {
    const initial = this.name ? this.name.charAt(0).toUpperCase() : '?';

    return html`
      <button
        class="threads-identity-btn"
        title="Discussion identity"
        @click=${this.togglePanel}
      >
        ${this.avatarUrl
          ? html`<img class="threads-identity-avatar" src=${this.avatarUrl} alt=${this.name} />`
          : html`<span class="threads-identity-initial">${initial}</span>`
        }
      </button>

      ${this.panelOpen ? html`
        <div class="threads-identity-panel">
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
            GitHub Username
            <input
              id="identity-github"
              class="threads-identity-input"
              type="text"
              .value=${this.github}
              placeholder="octocat"
            />
          </label>
          <label class="threads-identity-label">
            Gravatar Email
            <input
              id="identity-email"
              class="threads-identity-input"
              type="email"
              .value=${this.email}
              placeholder="you@example.com"
            />
          </label>
          <p class="threads-identity-hint">
            Avatar: <a href="https://gravatar.com" target="_blank" rel="noopener">Gravatar</a> &gt; GitHub &gt; random.
            Stored in your browser only.
          </p>
          <div class="threads-identity-actions">
            <button class="threads-identity-cancel" @click=${this.handleCancel}>Cancel</button>
            <button class="threads-identity-save" @click=${this.handleSave}>Save</button>
          </div>
        </div>
      ` : ''}
    `;
  }
}
