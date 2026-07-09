'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/** Initializes AOS on the homepage — matches index2.html behaviour. */
export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      AOS.refreshHard();
      return;
    }

    const init = () => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 80,
      });
      AOS.refresh();
    };

    const timer = window.setTimeout(init, 1100);
    window.addEventListener('load', init);
    window.addEventListener('dsb:pageready', init);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', init);
      window.removeEventListener('dsb:pageready', init);
    };
  }, [pathname]);

  return null;
}
