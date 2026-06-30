'use client';

import { useEffect, useState } from 'react';
import DsbLogo from '@/components/brand/DsbLogo';

const MIN_LOADER_MS = 900;

export default function InitialPageLoader() {
  const [phase, setPhase] = useState<'visible' | 'hiding'>('visible');
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let unmountTimer: ReturnType<typeof setTimeout> | null = null;

    const beginHide = () => {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_LOADER_MS - elapsed);

      hideTimer = setTimeout(() => {
        setPhase('hiding');
        unmountTimer = setTimeout(() => {
          setMounted(false);
          window.dispatchEvent(new Event('dsb:pageready'));
        }, 320);
      }, wait);
    };

    if (document.readyState === 'complete') {
      beginHide();
    } else {
      window.addEventListener('load', beginHide, { once: true });
    }

    // Safety timeout to prevent a stuck loader.
    const fallback = setTimeout(beginHide, 3000);

    return () => {
      window.removeEventListener('load', beginHide);
      clearTimeout(fallback);
      if (hideTimer) clearTimeout(hideTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="theme-preloader" data-phase={phase} aria-hidden>
      <div className="theme-preloader-ring">
        <DsbLogo iconOnly height={44} priority onDark />
      </div>
    </div>
  );
}
