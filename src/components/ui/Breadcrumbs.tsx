'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const NAV_DIRECTION_KEY = 'nav-direction';

export function setBackNavigation() {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(NAV_DIRECTION_KEY, 'back');
  }
}

export function getAndClearBackNavigation(): boolean {
  if (typeof window === 'undefined') return false;
  const value = window.sessionStorage.getItem(NAV_DIRECTION_KEY);
  if (value === 'back') {
    window.sessionStorage.removeItem(NAV_DIRECTION_KEY);
    return true;
  }
  return false;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** If set, show the back arrow. Clicking it goes back in history (like browser back). */
  backHref?: string;
  /** Use "light" on dark hero backgrounds so text is visible. */
  variant?: 'default' | 'light';
}

export default function Breadcrumbs({
  items,
  backHref,
  variant = 'default',
}: BreadcrumbsProps) {
  const router = useRouter();
  const isLight = variant === 'light';

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setBackNavigation();
    router.back();
  };

  const linkClass = isLight
    ? 'text-white/80 hover:text-white transition-colors'
    : 'text-charcoal-500 hover:text-charcoal-900 transition-colors';
  const mutedClass = isLight ? 'text-white/80' : 'text-charcoal-500';
  const currentClass = isLight
    ? 'font-medium text-white'
    : 'font-medium text-charcoal-900';
  const sepClass = isLight
    ? 'text-white/60 shrink-0'
    : 'text-charcoal-400 shrink-0';
  const wrapperClass = isLight
    ? 'flex items-center gap-2 text-sm text-white/80'
    : 'flex items-center gap-2 text-sm text-charcoal-500';

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full pl-4 pr-4 py-2 sm:py-3 flex justify-start"
    >
      <div className={wrapperClass}>
        {backHref != null && (
          <a
            href="#"
            onClick={handleBackClick}
            className={`inline-flex items-center gap-1.5 ${linkClass}`}
            aria-label="Volver"
          >
            <ArrowLeft size={24} className="shrink-0" />
          </a>
        )}
        {backHref != null && items.length > 0 && (
          <ChevronRight size={20} className={sepClass} />
        )}
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-2 text-lg">
              {i > 0 && <ChevronRight size={20} className={sepClass} />}
              {isLast ? (
                <span className={currentClass} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span className={mutedClass}>{item.label}</span>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
