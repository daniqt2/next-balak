'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideMenu from '@/components/ui/SideMenu';

/**
 * `match` lists the path prefixes that light up a link, so detail routes keep
 * their section active (e.g. /puerto/xxx highlights Puertos).
 */
const NAV_ITEMS = [
  {
    href: '/rutas',
    label: 'Rutas',
    match: ['/rutas', '/ruta', '/route', '/route-groups', '/coleccion-rutas'],
  },
  { href: '/puertos', label: 'Puertos', match: ['/puertos', '/puerto'] },
  { href: '/coffee-spots', label: 'Paradas', match: ['/coffee-spots', '/coffee'] },
  { href: '/about-us', label: 'Sobre Nosotros', match: ['/about-us'] },
  { href: '/colaboradores', label: 'Colaboradores', match: ['/colaboradores'] },
];

function isActive(pathname: string, match: string[]) {
  return match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function Navbar() {
  const pathname = usePathname();
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
            {NAV_ITEMS.map(({ href, label, match }) => {
              const active = isActive(pathname, match);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`navbar_menu-option${active ? ' is-active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Menu button (all widths) */}
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
