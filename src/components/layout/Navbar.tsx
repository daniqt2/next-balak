'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SideMenu from '@/components/ui/SideMenu';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      <nav
        className={`navbar ${isVisible ? 'navbar--visible' : 'navbar--hidden'}`}
      >
        <div className="main-wrapper">
          {/* Logo */}
          <Link href="/" className="logo">
            BALAK <span>ride</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {/* <Link href="/routes" className="text-white/90 hover:text-white transition text-sm font-medium tracking-wide">Rutas</Link> */}
            <Link href="/rutas" className="navbar_menu-option">
              Rutas
            </Link>
            <Link href="/puertos" className="navbar_menu-option">
              Puertos
            </Link>
            <Link href="/coffee-spots" className="navbar_menu-option">
              Paradas
            </Link>
            <Link href="/about-us" className="navbar_menu-option">
              Sobre Nosotros
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="navbar__menu-button"
            aria-label="Open menu"
          >
            <span className="navbar__menu-text">MENU</span>
            <div className="navbar__menu-icon">
              <span className="navbar__menu-line" />
              <span className="navbar__menu-line" />
            </div>
          </button>
        </div>
      </nav>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
