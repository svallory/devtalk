const STORAGE_KEY = 'threads_author';

export function getAuthor(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function setAuthor(name: string): void {
  localStorage.setItem(STORAGE_KEY, name);
}

export function initIdentity(): void {
  // No server identity endpoint — author set via ensureAuthor() prompt
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
