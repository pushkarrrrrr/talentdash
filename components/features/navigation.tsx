'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/salaries', label: 'Salaries' },
    { href: '/compare', label: 'Compare' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/salaries" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                TalentDash
              </span>
              <span className="text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
                Beta
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-sky-400 bg-sky-500/5'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
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
              className="text-xs font-semibold text-slate-300 border border-slate-800 hover:border-slate-700 bg-slate-900/50 px-3.5 py-2 rounded-lg transition-all"
            >
              Candidates
            </Link>
            <Link
              href="/compare"
              className="text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 px-3.5 py-2 rounded-lg shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Compare Offers
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation row (visible on small screens) */}
      <div className="md:hidden border-t border-slate-800/40 bg-slate-950/80 flex justify-around py-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold py-1.5 px-6 rounded-md transition-all ${
                isActive
                  ? 'text-sky-400 bg-sky-500/5'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
