'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/** `desktop: true` keeps an item visible at lg+, where the top bar takes over. */
const MENU_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/rutas', label: 'Rutas' },
  {
    href: 'https://gpx.balakride.com/',
    label: 'Editor GPX',
    external: true,
    desktop: true,
  },
  { href: '/coffee-spots', label: 'Paradas' },
  { href: '/puertos', label: 'Puertos' },
  { href: '/about-us', label: 'Sobre Nosotros' },
  { href: '/colaboradores', label: 'Colaboradores' },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay visibility to allow animation
      setTimeout(() => setIsVisible(true), 10);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-charcoal-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-charcoal-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Menu Items. Everything except the GPX editor also lives in the top
            bar, which is hidden below lg — so those are mobile-only here. */}
        <nav className="p-6">
          <ul className="space-y-1">
            {MENU_ITEMS.map(({ href, label, external, desktop }) => {
              const className = `block px-4 py-3 text-lg text-white hover:bg-charcoal-800 rounded-lg transition-colors${
                desktop ? '' : ' lg:hidden'
              }`;

              return (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className={className}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link href={href} onClick={onClose} className={className}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
