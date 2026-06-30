import Image from 'next/image';
import Link from 'next/link';

export const DSB_LOGO_SRC = '/images/dsb-logo.png';

type Props = {
  href?: string;
  height?: number;
  /** Crop to the left mark when space is tight (e.g. collapsed sidebar). */
  iconOnly?: boolean;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
  /** White padded background for dark surfaces. */
  onDark?: boolean;
};

export default function DsbLogo({
  href,
  height = 40,
  iconOnly = false,
  priority = false,
  className = '',
  onClick,
  onDark = false,
}: Props) {
  const width = iconOnly ? height : Math.round(height * 4.5);

  const image = (
    <span
      className={`relative inline-flex shrink-0 items-center overflow-hidden rounded-md ${
        onDark ? 'bg-white p-1 shadow-sm' : ''
      } ${className}`}
      style={{ height: onDark ? height + 8 : height, width: iconOnly ? height + (onDark ? 8 : 0) : undefined, maxWidth: iconOnly ? height + (onDark ? 8 : 0) : 220 }}
    >
      <Image
        src={DSB_LOGO_SRC}
        alt="DSB Law Group"
        width={width}
        height={height}
        priority={priority}
        className={iconOnly ? 'max-w-none object-left' : 'h-auto w-auto max-w-full object-contain'}
        style={iconOnly ? { height, width: Math.round(height * 3.2) } : { height, width: 'auto', maxHeight: height }}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex min-w-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
