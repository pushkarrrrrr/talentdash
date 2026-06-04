import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANIES, SALARY_DATA } from '@/lib/mock-data';
import { calculateMedian, calculateRange } from '@/lib/math';
import { formatCurrency } from '@/lib/formatters';
import LevelDistributionBar from '@/components/features/distribution-bar';
import SalaryTable from '@/components/features/salary-table';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sortBy?: string; sortOrder?: 'asc' | 'desc'; currency?: 'INR' | 'USD' }>;
}

// Pre-generate static pages for all companies in the mock seed file
export async function generateStaticParams() {
  return COMPANIES.map((company) => ({
    slug: company.slug,
  }));
}

// Generate dynamic metadata for the Company Page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);

  if (!company) {
    return {
      title: 'Company Not Found | TalentDash',
    };
  }

  const companyRecords = SALARY_DATA.filter((r) => r.companySlug === slug);
  const totalComps = companyRecords.map((r) => r.totalCompensation);
  const medianTC = calculateMedian(totalComps);

  const formattedMedian = formatCurrency(medianTC, 'INR');

  return {
    title: `Software Engineer Salaries at ${company.name} | TalentDash`,
    description: `See what engineers at ${company.name} earn. Median total compensation is ${formattedMedian}. Explore base salaries, stock grants, and bonuses by level.`,
    alternates: {
      canonical: `/companies/${slug}`,
    },
    openGraph: {
      title: `Software Engineer Salaries at ${company.name} | TalentDash`,
      description: `Verified compensation data for ${company.name}. Median TC: ${formattedMedian}. Compare salaries and levels.`,
      type: 'website',
      url: `/companies/${slug}`,
    },
  };
}

export default async function CompanyPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Find company profile
  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) {
    notFound();
  }

  // Filter records for this company
  const companyRecords = SALARY_DATA.filter((r) => r.companySlug === slug);
  const totalComps = companyRecords.map((r) => r.totalCompensation);

  // Compute stats dynamically
  const recordCount = companyRecords.length;
  const medianTC = calculateMedian(totalComps);
  const { min: minTC, max: maxTC } = calculateRange(totalComps);

  // Sorting params for the embedded table
  const sortBy = resolvedSearchParams.sortBy || 'totalCompensation';
  const sortOrder: 'asc' | 'desc' = resolvedSearchParams.sortOrder === 'asc' ? 'asc' : 'desc';
  const currency: 'INR' | 'USD' = resolvedSearchParams.currency === 'USD' ? 'USD' : 'INR';

  // Sort company records
  const sortedRecords = [...companyRecords].sort((a, b) => {
    let valA = 0;
    let valB = 0;

    if (sortBy === 'baseSalary') {
      valA = a.baseSalary;
      valB = b.baseSalary;
    } else if (sortBy === 'experienceYears') {
      valA = a.experienceYears;
      valB = b.experienceYears;
    } else {
      valA = a.totalCompensation;
      valB = b.totalCompensation;
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  // Helper to generate currency switcher hrefs while preserving sorting
  const getCurrencyHref = (curr: 'INR' | 'USD') => {
    const params = new URLSearchParams();
    if (resolvedSearchParams.sortBy) params.set('sortBy', resolvedSearchParams.sortBy);
    if (resolvedSearchParams.sortOrder) params.set('sortOrder', resolvedSearchParams.sortOrder);
    params.set('currency', curr);
    return `/companies/${slug}?${params.toString()}`;
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/salaries"
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Back to all salaries
        </Link>
      </div>

      {/* Header Profile Section */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 border border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              {company.name}
            </h1>
            <span className="text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full capitalize">
              {company.industry}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-2 text-xs text-slate-400">
            <div>
              Headquarters:{' '}
              <span className="font-semibold text-slate-200">{company.headquarters}</span>
            </div>
            <div>
              Headcount:{' '}
              <span className="font-semibold text-slate-200">{company.headcountRange}</span>
            </div>
            <div>
              Founded:{' '}
              <span className="font-semibold text-slate-200">{company.foundingYear}</span>
            </div>
            <div>
              Total Records:{' '}
              <span className="font-semibold text-slate-200">{recordCount}</span>
            </div>
          </div>
        </div>

        {/* Compare action button */}
        <div className="flex items-center md:self-center">
          <Link
            href={`/compare?c1=${slug}`}
            className="w-full md:w-auto text-center text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 px-5 py-3 rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Compare Company Offers
          </Link>
        </div>
      </div>

      {/* Compensation Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel rounded-2xl p-6 border border-slate-900 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Median Total Comp
          </span>
          <span className="text-3xl font-extrabold text-sky-400 tracking-tight">
            {formatCurrency(medianTC, currency)}
          </span>
          <span className="text-[10px] text-slate-500">
            Calculated dynamically from {recordCount} engineering records
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-900 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Compensation Range
          </span>
          <span className="text-2xl font-bold text-slate-200 tracking-tight">
            {formatCurrency(minTC, currency)} — {formatCurrency(maxTC, currency)}
          </span>
          <span className="text-[10px] text-slate-500">
            Minimum and maximum total compensation values
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-900 flex flex-col gap-2 justify-center">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Filter Currency</span>
            <span className="font-semibold text-slate-200 capitalize">{currency}</span>
          </div>
          <div className="flex bg-slate-950 border border-slate-900 rounded-xl p-1 w-full">
            <Link
              href={getCurrencyHref('INR')}
              className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currency === 'INR' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INR (₹)
            </Link>
            <Link
              href={getCurrencyHref('USD')}
              className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currency === 'USD' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD ($)
            </Link>
          </div>
        </div>
      </div>

      {/* Level Distribution Stacked Bar */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 border border-slate-900">
        <h3 className="text-base font-bold text-slate-200 mb-4 uppercase tracking-wider text-xs">
          Level Distribution Bar
        </h3>
        <LevelDistributionBar levels={companyRecords.map((r) => r.level)} />
      </div>

      {/* Embedded filtered Salaries Table */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold text-slate-200 px-1 uppercase tracking-wider text-xs">
          Compensation Records for {company.name}
        </h3>
        <SalaryTable
          records={sortedRecords}
          currency={currency}
          sortBy={sortBy}
          sortOrder={sortOrder}
          searchParams={resolvedSearchParams as Record<string, string | string[] | undefined>}
          basePath={`/companies/${slug}`}
        />
      </div>
    </div>
  );
}
