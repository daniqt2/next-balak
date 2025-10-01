'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="main-wrapper">
        {/* Logo */}
        <Link href="/" className="logo">
          BALAK <span>ride</span>
        </Link>

        {/* Links */}
        <ul className="links">
          <li><Link href="/" className="link">Home</Link></li>
          <li><Link href="/routes" className="link">Routes</Link></li>
          <li><Link href="/spots" className="link">Coffee Spots</Link></li>
          <li><Link href="/about" className="link">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}
