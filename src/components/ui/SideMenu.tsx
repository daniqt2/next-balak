'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="block px-4 py-3 text-lg text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/route-groups"
                onClick={onClose}
                className="block px-4 py-3 text-lg text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Rutas
              </Link>
            </li>
            {/* <li>
              <Link
                href="/route-groups"
                onClick={onClose}
                className="block px-4 py-3 text-lg text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Colecciones
              </Link>
            </li> */}
            <li>
              <Link
                href="/about-us"
                onClick={onClose}
                className="block px-4 py-3 text-lg text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Nosotros
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

