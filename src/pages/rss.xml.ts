import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { articleUrl, publishedWriting } from '../lib/writing';

export async function GET() {
  const entries = publishedWriting(await getCollection('writing'));
  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: site.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: articleUrl(entry),
      categories: entry.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
