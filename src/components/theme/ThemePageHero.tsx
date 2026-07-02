import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  /** @deprecated use breadcrumbs */
  currentLabel?: string;
};

export default function ThemePageHero({ title, breadcrumbs, currentLabel }: Props) {
  const trail =
    breadcrumbs ??
    (currentLabel ? [{ label: currentLabel }] : [{ label: title }]);

  return (
    <section className="theme-page-hero">
      <div className="theme-page-hero-inner">
        <h1>{title}</h1>
        <p className="theme-breadcrumb">
          <Link href="/">Home</Link>
          {trail.map((item) => (
            <span key={`${item.label}-${item.href ?? 'current'}`}>
              <span aria-hidden>›</span>
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
