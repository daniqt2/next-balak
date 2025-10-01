'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down (but not at the very top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav 
      className={`navbar ${isVisible ? 'navbar--visible' : 'navbar--hidden'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="main-wrapper">
        {/* Logo */}
        <Link href="/" className="logo">
          BALAK <span>ride</span>
        </Link>

        {/* Links */}
        <ul className="links">
          <li><Link href="/" className="link">Inicio</Link></li>
          <li><Link href="/routes" className="link">Rutas</Link></li>
          <li><Link href="/spots" className="link">Cafés</Link></li>
          <li><Link href="/about" className="link">Nosotros</Link></li>
        </ul>
      </div>
    </nav>
  );
}
