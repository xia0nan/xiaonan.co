/** Pure helpers shared by listings, static routes, RSS, and Node tests. */
export interface WritingEntry {
  id: string;
  data: {
    publishedAt: Date;
    draft: boolean;
    featured: boolean;
    externalUrl?: string;
  };
}

export function isPublished(entry: WritingEntry, now = new Date()): boolean {
  return !entry.data.draft && entry.data.publishedAt.getTime() <= now.getTime();
}

export function sortWriting<T extends WritingEntry>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) =>
    b.data.publishedAt.getTime() - a.data.publishedAt.getTime() ||
    (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
  );
}

export function publishedWriting<T extends WritingEntry>(entries: readonly T[], now = new Date()): T[] {
  return sortWriting(entries.filter((entry) => isPublished(entry, now)));
}

export function featuredWriting<T extends WritingEntry>(entries: readonly T[], limit = 3, now = new Date()): T[] {
  return publishedWriting(entries, now).filter((entry) => entry.data.featured).slice(0, limit);
}

export function localWriting<T extends WritingEntry>(entries: readonly T[], development = false, now = new Date()): T[] {
  return sortWriting(entries.filter((entry) => !entry.data.externalUrl && (development || isPublished(entry, now))));
}

export function articleUrl(entry: WritingEntry): string {
  return entry.data.externalUrl ?? `/writing/${entry.id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}
