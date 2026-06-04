import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SALARY_DATA } from '@/lib/mock-data';
import { CONFIG } from '@/lib/config';
import SalaryTable from '@/components/features/salary-table';
import FilterBar from '@/components/features/filter-bar';

interface SearchParamsProps {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  currency?: 'INR' | 'USD';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: string;
}

// Generate dynamic SEO Metadata on the Server
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const company = resolvedParams.company;
  const role = resolvedParams.role;
  const location = resolvedParams.location;

  let title = 'Software Engineer Salaries in India — L3 to L5 | TalentDash';
  let description =
    'Browse verified software engineer, frontend, and backend salaries in Bengaluru, Hyderabad, and other tech hubs. Filter by levels L3 to Principal.';

  if (company) {
    title = `Software Engineer Salaries at ${company} — L3 to Principal | TalentDash`;
    description = `Compare salary, stock, and total compensation at ${company} in India. See what levels L3, L4, L5, L6, and Principal earn.`;
  } else if (role && location) {
    title = `${role} Salaries in ${location} — Verified Tech Comp | TalentDash`;
    description = `Detailed breakdown of base salary, bonus, and stock for ${role} roles located in ${location}, India.`;
  } else if (role) {
    title = `${role} Salaries in India — Level & Comp Data | TalentDash`;
    description = `Verified tech compensation details for ${role} positions. Compare levels and find the highest paying companies.`;
  } else if (location) {
    title = `Software Engineer Salaries in ${location} — Verified Comp | TalentDash`;
    description = `Explore tech salaries in ${location}, India. Filter by company, level, and role to negotiate your next offer.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/salaries`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/salaries`,
    },
  };
}

export default async function SalariesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}) {
  const resolvedParams = await searchParams;

  // Extract filters
  const companyQuery = resolvedParams.company || '';
  const roleFilter = resolvedParams.role || '';
  const locationFilter = resolvedParams.location || '';
  const currency: 'INR' | 'USD' = resolvedParams.currency === 'USD' ? 'USD' : 'INR';
  const sortBy = resolvedParams.sortBy || 'totalCompensation';
  const sortOrder: 'asc' | 'desc' = resolvedParams.sortOrder === 'asc' ? 'asc' : 'desc';
  const page = parseInt(resolvedParams.page || '1', 10);

  // Parse levels parameter (can be array or comma-separated string)
  let levelFilter: string[] = [];
  if (resolvedParams.level) {
    levelFilter = resolvedParams.level.split(',');
  }

  // Filter records
  let filteredRecords = [...SALARY_DATA];

  if (companyQuery) {
    const query = companyQuery.toLowerCase().trim();
    filteredRecords = filteredRecords.filter((r) =>
      r.company.toLowerCase().includes(query)
    );
  }

  if (roleFilter) {
    filteredRecords = filteredRecords.filter(
      (r) => r.role.toLowerCase() === roleFilter.toLowerCase()
    );
  }

  if (locationFilter) {
    filteredRecords = filteredRecords.filter(
      (r) => r.location.toLowerCase() === locationFilter.toLowerCase()
    );
  }

  if (levelFilter.length > 0) {
    filteredRecords = filteredRecords.filter((r) => levelFilter.includes(r.level));
  }

  // Sort records
  filteredRecords.sort((a, b) => {
    let valA = 0;
    let valB = 0;

    if (sortBy === 'baseSalary') {
      valA = a.baseSalary;
      valB = b.baseSalary;
    } else if (sortBy === 'experienceYears') {
      valA = a.experienceYears;
      valB = b.experienceYears;
    } else {
      // Default / totalCompensation
      valA = a.totalCompensation;
      valB = b.totalCompensation;
    }

    if (sortOrder === 'asc') {
      return valA - valB;
    }
    return valB - valA;
  });

  // Pagination Math
  const limit = CONFIG.PAGINATION.LIMIT; // 25 rows per page
  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / limit) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const offset = (currentPage - 1) * limit;

  const paginatedRecords = filteredRecords.slice(offset, offset + limit);

  // Pagination bounds indicators
  const recordStart = totalRecords === 0 ? 0 : offset + 1;
  const recordEnd = Math.min(offset + limit, totalRecords);

  // Get dynamic unique roles and locations for dropdown options
  const uniqueRoles = Array.from(new Set(SALARY_DATA.map((r) => r.role)));
  const uniqueLocations = Array.from(new Set(SALARY_DATA.map((r) => r.location)));

  // Build JSON-LD structured data for Google Search (Dataset schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'TalentDash Software Engineering Salaries Dataset',
    description:
      'Verified software engineering salaries, base pay, stocks, and bonuses across tech companies in India.',
    url: 'https://talentdash.com/salaries',
    creator: {
      '@type': 'Organization',
      name: 'TalentDash',
    },
    variableMeasured: [
      'Base Salary',
      'Stock Compensation',
      'Total Compensation',
      'Years of Experience',
    ],
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Rich Snippet script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent sm:text-4xl">
          Software Engineer Salaries in India
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Analyze real-time compensation details from top tech companies. All metrics computed from verified records.
        </p>
      </div>

      {/* Filter panel inside a Suspense boundary to prevent build de-optimization */}
      <div className="mb-8">
        <Suspense fallback={<FilterBarSkeleton />}>
          <FilterBar
            key={`${resolvedParams.company}-${resolvedParams.role}-${resolvedParams.location}-${resolvedParams.level}-${resolvedParams.currency}`}
            roles={uniqueRoles}
            locations={uniqueLocations}
          />
        </Suspense>
      </div>

      {/* Table & Pagination Area */}
      <div className="flex flex-col gap-6">
        {totalRecords === 0 ? (
          // Empty State
          <div className="glass-panel rounded-2xl p-12 text-center border border-slate-900 flex flex-col items-center justify-center gap-4">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-semibold text-slate-200">No records found</h3>
            <p className="text-sm text-slate-400 max-w-md">
              No records found for these filters. Try removing a filter.
            </p>
            <Link
              href="/salaries"
              className="mt-2 text-xs font-semibold text-sky-400 hover:text-sky-300 border border-sky-500/20 bg-sky-500/5 px-4 py-2 rounded-lg transition-all"
            >
              Reset All Filters
            </Link>
          </div>
        ) : (
          <>
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-1">
              <div>
                Showing <span className="font-semibold text-slate-200">{recordStart}–{recordEnd}</span> of{' '}
                <span className="font-semibold text-slate-200">{totalRecords}</span> records
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Fixed conversion rate: ₹1 = $0.012 USD</span>
              </div>
            </div>

            {/* RSC Table */}
            <SalaryTable
              records={paginatedRecords}
              currency={currency}
              sortBy={sortBy}
              sortOrder={sortOrder}
              searchParams={resolvedParams as Record<string, string | string[] | undefined>}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-900 pt-6">
                <PaginationButton
                  direction="prev"
                  page={currentPage - 1}
                  disabled={currentPage === 1}
                  searchParams={resolvedParams}
                />
                
                <span className="text-xs text-slate-400 font-medium">
                  Page <span className="text-slate-200">{currentPage}</span> of {totalPages}
                </span>

                <PaginationButton
                  direction="next"
                  page={currentPage + 1}
                  disabled={currentPage === totalPages}
                  searchParams={resolvedParams}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Inline component for Pagination Links (keeps it dynamic server component)
function PaginationButton({
  direction,
  page,
  disabled,
  searchParams,
}: {
  direction: 'prev' | 'next';
  page: number;
  disabled: boolean;
  searchParams: SearchParamsProps;
}) {
  if (disabled) {
    return (
      <span className="text-xs font-semibold text-slate-600 bg-slate-950/20 border border-slate-900/50 px-4 py-2 rounded-lg cursor-not-allowed select-none">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </span>
    );
  }

  // Construct href with updated page index
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }
  });
  params.set('page', page.toString());

  return (
    <Link
      href={`/salaries?${params.toString()}`}
      className="text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 px-4 py-2 rounded-lg transition-all"
    >
      {direction === 'prev' ? '← Previous' : 'Next →'}
    </Link>
  );
}

// Skeleton fallback loader for FilterBar
function FilterBarSkeleton() {
  return (
    <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl p-6 h-48 animate-pulse flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="h-10 bg-slate-900 rounded-xl"></div>
        <div className="h-10 bg-slate-900 rounded-xl"></div>
        <div className="h-10 bg-slate-900 rounded-xl"></div>
        <div className="h-10 bg-slate-900 rounded-xl"></div>
      </div>
      <div className="h-8 bg-slate-900 rounded-xl w-3/4"></div>
    </div>
  );
}
