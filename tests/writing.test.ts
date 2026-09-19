import test from 'node:test';
import assert from 'node:assert/strict';
import { articleUrl, featuredWriting, isPublished, localWriting, publishedWriting, sortWriting } from '../src/lib/writing.ts';
import type { WritingEntry } from '../src/lib/writing.ts';

const now = new Date('2026-09-19T00:00:00Z');
const entry = (id: string, overrides: Partial<WritingEntry['data']> = {}): WritingEntry => ({
  id, data: { publishedAt: new Date('2026-01-01'), draft: false, featured: false, ...overrides },
});

test('publication excludes drafts and future dates, includes the exact boundary', () => {
  assert.equal(isPublished(entry('published'), now), true);
  assert.equal(isPublished(entry('draft', { draft: true }), now), false);
  assert.equal(isPublished(entry('future', { publishedAt: new Date('2026-09-19T00:00:00.001Z') }), now), false);
  assert.equal(isPublished(entry('now', { publishedAt: now }), now), true);
  assert.equal(isPublished(entry('invalid', { publishedAt: new Date('invalid') }), now), false);
});

test('newest first, stable ID tie-breaker, no input mutation', () => {
  const entries = [entry('z'), entry('new', { publishedAt: now }), entry('a')];
  assert.deepEqual(sortWriting(entries).map((item) => item.id), ['new', 'a', 'z']);
  assert.deepEqual(entries.map((item) => item.id), ['z', 'new', 'a']);
});

test('featured selections are public, sorted, and limited to three by default', () => {
  const entries = ['d', 'c', 'b', 'a'].map((id) => entry(id, { featured: true }));
  entries.push(entry('draft', { featured: true, draft: true }), entry('future', { featured: true, publishedAt: new Date('2099-01-01') }), entry('ordinary'));
  assert.deepEqual(featuredWriting(entries, 3, now).map((item) => item.id), ['a', 'b', 'c']);
});

test('nested local links are encoded per segment and external links stay direct', () => {
  assert.equal(articleUrl(entry('systems/first note')), '/writing/systems/first%20note/');
  assert.equal(articleUrl(entry('external', { externalUrl: 'https://example.org/article?source=original' })), 'https://example.org/article?source=original');
});

test('external articles enter public lists but never generate local routes', () => {
  const entries = [entry('local'), entry('external', { externalUrl: 'https://example.org/article' }), entry('draft', { draft: true }), entry('future', { publishedAt: new Date('2099-01-01') })];
  assert.deepEqual(publishedWriting(entries, now).map((item) => item.id), ['external', 'local']);
  assert.deepEqual(localWriting(entries, false, now).map((item) => item.id), ['local']);
  assert.deepEqual(localWriting(entries, true, now).map((item) => item.id), ['future', 'draft', 'local']);
});

test('empty collections are valid everywhere', () => {
  assert.deepEqual(publishedWriting([], now), []);
  assert.deepEqual(featuredWriting([], 3, now), []);
  assert.deepEqual(localWriting([], true, now), []);
});
