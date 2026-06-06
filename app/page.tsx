import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANIES, SALARY_DATA, COMPANY_RATINGS } from '@/lib/mock-data';
import CompanyCard from '@/components/features/company-card';
import SearchCompanyBar from '@/components/features/search-company-bar';
import SortSelector from '@/components/features/sort-selector';
import FloatingCompareHelper from '@/components/features/compare-helper';
import ShareButton from '@/components/features/share-button';

export const metadata: Metadata = {
  title: 'TalentDash — Tech Salary Explorer & Compensation Database',
  description: 'Explore verified tech salaries, stock options, and total compensation packages for software developers across companies in India.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TalentDash — Tech Salary Explorer & Compensation Database',
    description: 'Explore verified tech salaries, stock options, and total compensation packages for software developers across companies in India.',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 1200,
        alt: 'TalentDash compensation explorer',
      }
    ],
  },
  twitter: {
    title: 'TalentDash — Tech Salary Explorer & Compensation Database',
    description: 'Explore verified tech salaries, stock options, and total compensation packages for software developers across companies in India.',
    images: ['/og-image.png'],
  }
};

interface SearchParamsProps {
  q?: string;
  location?: string;
  industry?: string;
  sort?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}) {
  const resolvedParams = await searchParams;
  const q = (resolvedParams.q || '').toLowerCase().trim();
  const locationFilter = (resolvedParams.location || '').toLowerCase().trim();
  const industryFilter = (resolvedParams.industry || '').toLowerCase().trim();
  const sort = resolvedParams.sort || 'popular';

  // 1. Filter Companies
  let filteredCompanies = [...COMPANIES];

  if (q) {
    filteredCompanies = filteredCompanies.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(q);
      const industryMatch = c.industry.toLowerCase().includes(q);
      const hqMatch = c.headquarters.toLowerCase().includes(q);

      // Designation/Role match check against salary records for this company
      const hasMatchingRole = SALARY_DATA.some(
        (r) => r.companySlug === c.slug && r.role.toLowerCase().includes(q)
      );

      return nameMatch || industryMatch || hqMatch || hasMatchingRole;
    });
  }

  if (locationFilter) {
    filteredCompanies = filteredCompanies.filter(
      (c) =>
        c.headquarters.toLowerCase().includes(locationFilter) ||
        SALARY_DATA.some(
          (r) =>
            r.companySlug === c.slug &&
            r.location.toLowerCase().includes(locationFilter)
        )
    );
  }

  if (industryFilter) {
    filteredCompanies = filteredCompanies.filter((c) =>
      c.industry.toLowerCase().includes(industryFilter)
    );
  }

  // 2. Sort Companies
  filteredCompanies.sort((a, b) => {
    if (sort === 'rating') {
      const rateA = COMPANY_RATINGS[a.slug] || 4.0;
      const rateB = COMPANY_RATINGS[b.slug] || 4.0;
      return rateB - rateA;
    }

    if (sort === 'salary') {
      const recordsA = SALARY_DATA.filter((r) => r.companySlug === a.slug);
      const avgA =
        recordsA.length > 0
          ? recordsA.reduce((sum, r) => sum + r.totalCompensation, 0) /
            recordsA.length
          : 0;
      const recordsB = SALARY_DATA.filter((r) => r.companySlug === b.slug);
      const avgB =
        recordsB.length > 0
          ? recordsB.reduce((sum, r) => sum + r.totalCompensation, 0) /
            recordsB.length
          : 0;
      return avgB - avgA;
    }

    if (sort === 'year') {
      return b.foundingYear - a.foundingYear;
    }

    // Default / popular: sort by verified records count
    const countA = SALARY_DATA.filter((r) => r.companySlug === a.slug).length;
    const countB = SALARY_DATA.filter((r) => r.companySlug === b.slug).length;
    return countB - countA;
  });

  // Helper to build a filter query string
  const getFilterUrl = (key: string, val: string | null) => {
    const params = new URLSearchParams();
    if (resolvedParams.q) params.set('q', resolvedParams.q);
    if (resolvedParams.location) params.set('location', resolvedParams.location);
    if (resolvedParams.industry) params.set('industry', resolvedParams.industry);
    if (resolvedParams.sort) params.set('sort', resolvedParams.sort);

    if (val === null) {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex gap-8 items-start">
      {/* 1. Left Sticky Navigation Sidebar (Desktop Only) */}
      <aside aria-label="Sidebar Navigation & Utilities" className="hidden lg:block w-60 shrink-0 sticky top-24 space-y-7 self-start max-h-[85vh] overflow-y-auto pr-2">
        {/* Navigation list */}
        <nav aria-label="Sidebar Menu">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl text-primary-accent bg-primary-accent/5 border border-primary-accent/10 shadow-xs"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Explore Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/salaries"
                className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text hover:text-deep-text hover:bg-hover-surface transition-all"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 20h4a2 2 0 002-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Salaries</span>
              </Link>
            </li>
            <li>
              <Link
                href="/compare"
                className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text hover:text-deep-text hover:bg-hover-surface transition-all"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                <span>Compare Offers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/locations"
                className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text hover:text-deep-text hover:bg-hover-surface transition-all"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Locations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/t"
                className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text hover:text-deep-text hover:bg-hover-surface transition-all"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.333 0 4 1 4 2v1H5v-1c0-1 2.667-2 4-2z" />
                </svg>
                <span>Titles</span>
              </Link>
            </li>
            <li className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text/40 cursor-not-allowed select-none">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Reviews <span className="text-[9px] bg-hover-surface border border-border-custom text-muted-text px-1.5 py-0.5 rounded ml-1 font-bold tracking-wider uppercase">Soon</span></span>
            </li>
            <li className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl text-muted-text/40 cursor-not-allowed select-none">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Jobs <span className="text-[9px] bg-hover-surface border border-border-custom text-muted-text px-1.5 py-0.5 rounded ml-1 font-bold tracking-wider uppercase">Soon</span></span>
            </li>
          </ul>
        </nav>

        {/* Communities section */}
        <nav aria-label="Local Tech Hubs" className="space-y-2.5">
          <h4 className="text-[10px] font-bold text-muted-text uppercase tracking-wider px-3">
            Local Tech Hubs
          </h4>
          <ul className="space-y-0.5">
            <li>
              <Link href="/?location=bengaluru" className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${locationFilter === 'bengaluru' ? 'text-primary-accent bg-primary-accent/5 font-bold' : 'text-muted-text hover:text-deep-text hover:bg-hover-surface'}`}>
                <span><span aria-hidden="true">💻 </span>Silicon Valley (Bengaluru)</span>
              </Link>
            </li>
            <li>
              <Link href="/?location=hyderabad" className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${locationFilter === 'hyderabad' ? 'text-primary-accent bg-primary-accent/5 font-bold' : 'text-muted-text hover:text-deep-text hover:bg-hover-surface'}`}>
                <span><span aria-hidden="true">🚀 </span>Cyber City (Hyderabad)</span>
              </Link>
            </li>
            <li>
              <Link href="/?location=gurugram" className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${locationFilter === 'gurugram' ? 'text-primary-accent bg-primary-accent/5 font-bold' : 'text-muted-text hover:text-deep-text hover:bg-hover-surface'}`}>
                <span><span aria-hidden="true">🏢 </span>Millennial Hub (Gurugram)</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Tools Section */}
        <nav aria-label="Salary Utilities" className="space-y-2.5">
          <h4 className="text-[10px] font-bold text-muted-text uppercase tracking-wider px-3">
            Salary Utilities
          </h4>
          <ul className="space-y-0.5">
            <li>
              <Link href="/compare" className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-muted-text hover:text-deep-text hover:bg-hover-surface rounded-lg transition-colors">
                <span><span aria-hidden="true">📊 </span>Salary Offer Calculator</span>
              </Link>
            </li>
            <li>
              <Link href="/salaries" className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-muted-text hover:text-deep-text hover:bg-hover-surface rounded-lg transition-colors">
                <span><span aria-hidden="true">💰 </span>Am I Paid Fairly? (Search)</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Anonymous App Widget */}
        <div className="glass-panel border border-border-custom rounded-2xl p-4 space-y-3">
          <div className="text-[10px] text-deep-text font-bold uppercase tracking-wider leading-relaxed">
            Talk Career.<br />Stay Anonymous.
          </div>
          <div className="flex items-center gap-3">
            {/* Visual QR Outline Placeholder */}
            <div className="h-12 w-12 bg-hover-surface border border-border-custom rounded-lg p-1.5 flex flex-wrap gap-0.5 flex-shrink-0 select-none">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`h-2.5 w-2.5 border border-border-custom rounded-[1px] ${i % 2 === 0 ? 'bg-primary-accent/30' : ''}`} />
              ))}
            </div>
            <div className="text-[9px] text-muted-text font-medium leading-normal">
              Scan to share verified comp details securely.
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Dashboard */}
      <div className="flex-1 min-w-0">
        {/* Explore Sub-navigation Tabs */}
        <div className="flex items-center justify-between border-b border-border-custom pb-3 mb-6">
          <div className="flex gap-6 text-sm font-semibold">
            <Link href="/" className="text-primary-accent border-b-2 border-primary-accent pb-3 -mb-[14px]">
              Explore Companies
            </Link>
            <Link href="/compare" className="text-muted-text hover:text-deep-text pb-3">
              Compare Compensation
            </Link>
          </div>
          <ShareButton />
        </div>

        {/* Dynamic Graphic Explorer Header */}
        <div className="text-center py-6 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center select-none">
            <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-deep-text uppercase">
              Dream Company
            </h1>
            {/* Cursive italic script feel for "explorer..." */}
            <span className="text-lg text-primary-accent/90 font-serif italic tracking-wide -mt-1 font-medium pl-20 bg-gradient-to-r from-primary-accent to-red-500 bg-clip-text text-transparent">
              explorer...
            </span>
          </div>
          
          <div className="w-full max-w-lg mt-2">
            <Suspense fallback={<div className="h-10 bg-surface rounded-xl animate-pulse w-full border border-border-custom"></div>}>
              <SearchCompanyBar />
            </Suspense>
          </div>

          {/* Active Filter Chips Row */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-3 w-full">
            {/* Clear Filters Chip */}
            {(resolvedParams.q || resolvedParams.location || resolvedParams.industry) && (
              <Link
                href="/"
                className="text-[10px] font-bold text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-3 py-1.5 rounded-full hover:bg-primary-accent/20 transition-all flex items-center gap-1"
              >
                <span>✕</span>
                <span>Reset Filters</span>
              </Link>
            )}

            {/* Keyword Chip */}
            {resolvedParams.q && (
              <span className="text-[10px] font-bold text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span>Keyword: &quot;{resolvedParams.q}&quot;</span>
                <Link href={getFilterUrl('q', null)} className="text-primary-accent hover:opacity-85 font-extrabold ml-1">✕</Link>
              </span>
            )}

            {/* Location Chip */}
            {resolvedParams.location && (
              <span className="text-[10px] font-bold text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span>📍 {resolvedParams.location}</span>
                <Link href={getFilterUrl('location', null)} className="text-primary-accent hover:opacity-85 font-extrabold ml-1">✕</Link>
              </span>
            )}

            {/* Industry Chip */}
            {resolvedParams.industry && (
              <span className="text-[10px] font-bold text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span>🏢 {resolvedParams.industry}</span>
                <Link href={getFilterUrl('industry', null)} className="text-primary-accent hover:opacity-85 font-extrabold ml-1">✕</Link>
              </span>
            )}

            {/* Default display filters if none is set */}
            {!resolvedParams.q && !resolvedParams.location && !resolvedParams.industry && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                <span className="text-[10px] font-semibold text-muted-text bg-hover-surface border border-border-custom px-3 py-1 rounded-full cursor-default select-none">All Filters</span>
                <Link href="/?location=Bengaluru" className="text-[10px] font-bold text-body-text hover:text-deep-text bg-surface hover:bg-hover-surface border border-border-custom px-3 py-1 rounded-full transition-colors">Bengaluru</Link>
                <Link href="/?location=Mumbai" className="text-[10px] font-bold text-body-text hover:text-deep-text bg-surface hover:bg-hover-surface border border-border-custom px-3 py-1 rounded-full transition-colors">Mumbai</Link>
                <Link href="/?q=Software+Engineer" className="text-[10px] font-bold text-body-text hover:text-deep-text bg-surface hover:bg-hover-surface border border-border-custom px-3 py-1 rounded-full transition-colors">SDE Roles</Link>
                <Link href="/?industry=E-commerce" className="text-[10px] font-bold text-body-text hover:text-deep-text bg-surface hover:bg-hover-surface border border-border-custom px-3 py-1 rounded-full transition-colors">E-commerce</Link>
                <Link href="/?sort=salary" className="text-[10px] font-bold text-body-text hover:text-deep-text bg-surface hover:bg-hover-surface border border-border-custom px-3 py-1 rounded-full transition-colors">₹ High Compensations</Link>
              </div>
            )}
          </div>
        </div>

        {/* 3. Red/Coral Brand India Curated Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-banner-start via-primary-accent to-banner-end border border-primary-accent/10 p-6 shadow-xl mb-10 text-white">
          {/* Subtle Decorative dome visuals */}
          <div className="absolute -right-12 -bottom-20 opacity-15 w-80 h-80 rounded-full border-8 border-white pointer-events-none" />
          <div className="absolute -right-6 -bottom-10 opacity-10 w-48 h-48 rounded-full border-4 border-white pointer-events-none" />
          
          <div className="relative flex flex-col gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-banner-text">Featured Curations</span>
              <h3 className="text-[22px] font-semibold tracking-tight">Top Companies in India</h3>
              <p className="text-xs text-banner-text/90 font-medium">Browse dynamic categories matching salaries and headquarters, curated by TalentDash</p>
            </div>

            {/* Grid for Curated Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Category 1: By Industry */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-banner-text uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span aria-hidden="true">🏢</span>
                    <span>By Industries</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] font-bold text-white">
                    <li>
                      <Link href="/?industry=IT+Services" className="hover:text-banner-text-hover transition-colors">
                        IT Services & Consulting
                      </Link>
                    </li>
                    <li>
                      <Link href="/?industry=E-commerce" className="hover:text-banner-text-hover transition-colors">
                        E-commerce & Foodtech
                      </Link>
                    </li>
                    <li>
                      <Link href="/?q=Technology" className="hover:text-banner-text-hover transition-colors">
                        Software & Cloud Tech
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link href="/salaries" className="text-[9px] font-bold text-white hover:underline pt-1 block border-t border-white/5 mt-2">
                  View all categories <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Category 2: By Location */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-banner-text uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span aria-hidden="true">📍</span>
                    <span>By Locations</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] font-bold text-white">
                    <li>
                      <Link href="/?location=Bengaluru" className="hover:text-banner-text-hover transition-colors">
                        Bengaluru (Bangalore)
                      </Link>
                    </li>
                    <li>
                      <Link href="/?location=Hyderabad" className="hover:text-banner-text-hover transition-colors">
                        Hyderabad (Hitech)
                      </Link>
                    </li>
                    <li>
                      <Link href="/?location=Gurugram" className="hover:text-banner-text-hover transition-colors">
                        Gurugram & Delhi NCR
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link href="/salaries" className="text-[9px] font-bold text-white hover:underline pt-1 block border-t border-white/5 mt-2">
                  View all locations <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Category 3: By Designation */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-banner-text uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span aria-hidden="true">👥</span>
                    <span>By Designation</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] font-bold text-white">
                    <li>
                      <Link href="/?q=Software+Engineer" className="hover:text-banner-text-hover transition-colors">
                        Software Engineer
                      </Link>
                    </li>
                    <li>
                      <Link href="/?q=Backend" className="hover:text-banner-text-hover transition-colors">
                        Backend Developer
                      </Link>
                    </li>
                    <li>
                      <Link href="/?q=Frontend" className="hover:text-banner-text-hover transition-colors">
                        Frontend Engineer
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link href="/salaries" className="text-[9px] font-bold text-white hover:underline pt-1 block border-t border-white/5 mt-2">
                  View all roles <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Category 4: Known For */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-banner-text uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span aria-hidden="true">✨</span>
                    <span>Known For</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] font-bold text-white">
                    <li>
                      <Link href="/?sort=salary" className="hover:text-banner-text-hover transition-colors">
                        High Salaries
                      </Link>
                    </li>
                    <li>
                      <Link href="/?q=google" className="hover:text-banner-text-hover transition-colors">
                        Stock Compensation
                      </Link>
                    </li>
                    <li>
                      <Link href="/?q=tcs" className="hover:text-banner-text-hover transition-colors">
                        Job Security & Stability
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link href="/compare" className="text-[9px] font-bold text-white hover:underline pt-1 block border-t border-white/5 mt-2">
                  Compare metrics <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Company Listings Feed */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-custom pb-4">
            <div>
              <h3 className="text-[22px] font-semibold text-deep-text">
                Companies in India
              </h3>
              <p className="text-xs text-muted-text mt-1">
                Showing {filteredCompanies.length} companies matched against active filters.
              </p>
            </div>

            <Suspense fallback={<div className="h-9 w-32 bg-surface rounded-xl animate-pulse border border-border-custom"></div>}>
              <SortSelector />
            </Suspense>
          </div>

          {filteredCompanies.length === 0 ? (
            /* Empty State */
            <div className="glass-panel rounded-2xl p-12 text-center border border-border-custom flex flex-col items-center justify-center gap-4">
              <span className="text-4xl select-none">🔍</span>
              <h3 className="text-[22px] font-semibold text-deep-text">No matching companies</h3>
              <p className="text-xs text-body-text max-w-sm">
                We couldn&apos;t find any companies matching your search filters. Try clearing some query tags or resetting filters.
              </p>
              <Link
                href="/"
                className="mt-2 text-xs font-semibold text-primary-accent hover:opacity-90 border border-primary-accent/20 bg-primary-accent/5 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Reset Search
              </Link>
            </div>
          ) : (
            /* Company Listings Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.slug}
                  company={company}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Sticky Floating Comparison Invite Widget (Dismissible Client Component) */}
      <FloatingCompareHelper />
    </div>
  );
}
