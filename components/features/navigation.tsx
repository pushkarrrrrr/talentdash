'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Companies' },
    { href: '/salaries', label: 'Salaries' },
    { href: '/compare', label: 'Compare' },
    { href: '/locations', label: 'Locations' },
    { href: '/t', label: 'Titles' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-accent to-red-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                TalentDash
              </span>
              <span className="text-[10px] font-semibold bg-primary-accent/10 text-primary-accent border border-primary-accent/20 px-2 py-0.5 rounded-full">
                Beta
              </span>
            </Link>
            <nav aria-label="Desktop Navigation" className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-primary-accent bg-primary-accent/5'
                        : 'text-muted-text hover:text-deep-text hover:bg-hover-surface'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/salaries"
              className="text-xs font-semibold text-body-text border border-border-custom hover:border-muted-text/30 bg-surface px-3.5 py-2 rounded-lg transition-all"
            >
              Candidates
            </Link>
            <Link
              href="/compare"
              className="text-xs font-semibold text-white bg-primary-accent hover:opacity-95 px-3.5 py-2 rounded-lg shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Compare Offers
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation row (visible on small screens) */}
      <nav aria-label="Mobile Navigation" className="md:hidden border-t border-border-custom bg-surface/80 flex justify-around py-2">
        {links.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold py-1.5 px-6 rounded-md transition-all ${
                isActive
                  ? 'text-primary-accent bg-primary-accent/5'
                  : 'text-muted-text hover:text-deep-text'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
