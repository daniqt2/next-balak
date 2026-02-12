'use client';

import { useEffect } from 'react';

const HOME_SCROLL_CLASS = 'home-scroll';

export default function HomeScrollRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add(HOME_SCROLL_CLASS);
    return () => {
      document.documentElement.classList.remove(HOME_SCROLL_CLASS);
    };
  }, []);

  return <>{children}</>;
}
