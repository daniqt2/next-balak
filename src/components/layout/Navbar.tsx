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

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group relative bg-gray-900 text-white px-6 py-3 flex items-center gap-3 hover:bg-gray-800 transition-all duration-200"
            aria-label="Open menu"
          >
            <span className="text-sm font-medium tracking-wide">MENU</span>
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
              <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
            </div>
          </button>
        </div>
      </nav>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
