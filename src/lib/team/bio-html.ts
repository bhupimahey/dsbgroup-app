function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatInline(value: string): string {
  let out = escapeHtml(value);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/_(.+?)_/g, '<em>$1</em>');
  return out;
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

/** Convert plain text (paragraphs, bullets, inline bold/italic) to HTML for rich display. */
export function textToBioHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  if (/<(?:p|ul|ol|h[1-6]|br|div|strong|em)\b/i.test(trimmed)) return trimmed;

  const blocks = trimmed.split(/\n\n+/);
  const parts: string[] = [];

  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    const isBullet = (line: string) => /^[•*\-]\s/.test(line);
    if (lines.every(isBullet)) {
      parts.push(
        `<ul>${lines
          .map((line) => `<li>${formatInline(line.replace(/^[•*\-]\s*/, ''))}</li>`)
          .join('')}</ul>`,
      );
      continue;
    }

    if (lines.length === 1 && /^[A-Z][A-Za-z0-9 &–—\-/]+$/.test(lines[0]) && lines[0].length < 80 && !lines[0].includes('.')) {
      parts.push(`<p><strong>${formatInline(lines[0])}</strong></p>`);
      continue;
    }

    if (lines.every((line) => line.startsWith('_') && line.endsWith('_'))) {
      parts.push(
        `<ul>${lines.map((line) => `<li><em>${formatInline(line.slice(1, -1))}</em></li>`).join('')}</ul>`,
      );
      continue;
    }

    parts.push(`<p>${lines.map((line) => formatInline(line)).join('<br />')}</p>`);
  }

  return parts.join('');
}

export function ensureBioHtml(bio: string): string {
  const trimmed = bio.trim();
  if (!trimmed) return '';
  return textToBioHtml(trimmed);
}
