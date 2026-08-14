function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Wrap document paragraphs as HTML. Does not invent headings or lists. */
export function paragraphsToBioHtml(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part)}</p>`)
    .join('');
}

export function textToBioHtml(text: string): string {
  return paragraphsToBioHtml(text);
}

export function ensureBioHtml(bio: string): string {
  const trimmed = bio.trim();
  if (!trimmed) return '';
  if (/<(?:p|ul|ol|h[1-6]|br|div|strong|em|li)\b/i.test(trimmed)) return trimmed;
  return paragraphsToBioHtml(trimmed);
}
