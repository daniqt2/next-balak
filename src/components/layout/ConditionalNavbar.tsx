'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Hide navbar on home page
  if (isHomePage) {
    return null;
  }

  return <Navbar />;
}

