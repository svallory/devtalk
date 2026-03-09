const STORAGE_KEY_NAME = 'threads_author';
const STORAGE_KEY_EMAIL = 'threads_email';
const STORAGE_KEY_AVATAR = 'threads_avatar_url';

declare global {
  interface Window {
    __docmd_dev?: {
      name: string;
      email: string;
      gravatarUrl: string;
    };
  }
}

export function getAuthor(): string | null {
  return localStorage.getItem(STORAGE_KEY_NAME);
}

export function setAuthor(name: string): void {
  localStorage.setItem(STORAGE_KEY_NAME, name);
}

export function getEmail(): string | null {
  return localStorage.getItem(STORAGE_KEY_EMAIL);
}

export function setEmail(email: string): void {
  localStorage.setItem(STORAGE_KEY_EMAIL, email);
}

export function getAvatarUrl(): string | null {
  return localStorage.getItem(STORAGE_KEY_AVATAR);
}

export function setAvatarUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY_AVATAR, url);
}

/**
 * On first load, seed identity from git config if available
 * and nothing is stored yet.
 */
export function initIdentity(): void {
  const devInfo = window.__docmd_dev;
  if (!devInfo) return;

  if (!getAuthor() && devInfo.name) {
    setAuthor(devInfo.name);
  }
  if (!getEmail() && devInfo.email) {
    setEmail(devInfo.email);
  }
  if (!getAvatarUrl() && devInfo.gravatarUrl) {
    setAvatarUrl(devInfo.gravatarUrl);
  }
}

export function ensureAuthor(): string {
  let author = getAuthor();
  if (!author) {
    author = prompt('Enter your display name for discussions:');
    if (!author || !author.trim()) {
      author = 'Anonymous';
    }
    setAuthor(author.trim());
  }
  return author;
}
