import { Outfit } from 'next/font/google';
import '@/styles/admin-zynix.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-zynix',
});

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`admin-zynix ${outfit.variable} ${outfit.className}`}>{children}</div>;
}
