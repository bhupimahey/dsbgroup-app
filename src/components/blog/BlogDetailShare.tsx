'use client';

type BlogDetailShareProps = {
  url: string;
  title: string;
};

export default function BlogDetailShare({ url, title }: BlogDetailShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: 'f', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: 'in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  return (
    <div className="blogmiddle-share">
      <ul>
        <li>
          <span className="blogmiddle-share-label">Social Share:</span>
        </li>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.label}`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
