import Link from 'next/link';

type Props = {
  title: string;
  currentLabel?: string;
};

export default function ThemePageHero({ title, currentLabel }: Props) {
  return (
    <section className="theme-page-hero">
      <div className="theme-page-hero-inner">
        <h1>{title}</h1>
        <p className="theme-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <span>{currentLabel ?? title}</span>
        </p>
      </div>
    </section>
  );
}
