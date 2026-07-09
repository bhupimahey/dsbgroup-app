const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function extractYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (YOUTUBE_ID_PATTERN.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return YOUTUBE_ID_PATTERN.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery && YOUTUBE_ID_PATTERN.test(fromQuery)) return fromQuery;

      const embedMatch = url.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch && YOUTUBE_ID_PATTERN.test(embedMatch[1])) return embedMatch[1];

      const shortsMatch = url.pathname.match(/\/shorts\/([^/?]+)/);
      if (shortsMatch && YOUTUBE_ID_PATTERN.test(shortsMatch[1])) return shortsMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeYoutubeEmbedUrl(input: string): string {
  const videoId = extractYoutubeVideoId(input);
  if (!videoId) {
    throw new Error('Enter a valid YouTube URL or 11-character video ID.');
  }
  return `https://www.youtube.com/embed/${videoId}`;
}
