import { XMLParser } from 'fast-xml-parser';

export type WxrItem = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  postType: string;
  link: string;
  pubDate?: string;
};

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object' && value !== null && '#text' in value) {
    return String((value as { '#text': unknown })['#text'] ?? '');
  }
  return '';
}

function getMeta(item: Record<string, unknown>, key: string): string {
  const postmeta = asArray(item['wp:postmeta'] as Record<string, unknown> | Record<string, unknown>[]);
  for (const meta of postmeta) {
    if (text(meta['wp:meta_key']) === key) {
      return text(meta['wp:meta_value']);
    }
  }
  return '';
}

export function parseWxr(xml: string): WxrItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
    isArray: (name) => ['item', 'wp:postmeta', 'category'].includes(name),
  });

  const doc = parser.parse(xml);
  const channel = doc?.rss?.channel;
  const items = asArray(channel?.item as Record<string, unknown> | Record<string, unknown>[]);

  return items
    .map((item) => {
      const postType = text(item['wp:post_type']) || 'post';
      const status = text(item['wp:status']) || 'draft';
      const slug = getMeta(item, '_wp_old_slug') || text(item['wp:post_name']);
      const title = text(item.title);
      const content = text(item['content:encoded']);
      const excerpt = text(item['excerpt:encoded']);
      const link = text(item.link);

      return {
        title,
        slug,
        content,
        excerpt,
        status,
        postType,
        link,
        pubDate: text(item.pubDate) || undefined,
      };
    })
    .filter((item) => item.title && item.slug);
}

export function isPublished(item: WxrItem): boolean {
  return item.status === 'publish';
}

export function isPage(item: WxrItem): boolean {
  return item.postType === 'page';
}

export function isPost(item: WxrItem): boolean {
  return item.postType === 'post';
}
