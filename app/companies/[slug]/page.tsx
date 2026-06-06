import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANIES, SALARY_DATA, COMPANY_ABOUTS, COMPANY_INSIGHTS, COMPANY_CULTURE_RATINGS, COMPANY_STATS } from '@/lib/mock-data';
import { Company, SalaryRecord } from '@/types';
import { calculateMedian } from '@/lib/math';
import { formatCurrency } from '@/lib/formatters';
import LevelDistributionBar from '@/components/features/distribution-bar';
import SalaryTable from '@/components/features/salary-table';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sortBy?: string; sortOrder?: 'asc' | 'desc'; currency?: 'INR' | 'USD'; tab?: string }>;
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';

  return {
    title: `Software Engineer Salaries at ${company.name} | TalentDash`,
    description: `See what engineers at ${company.name} earn. Median total compensation is ${formattedMedian}. Explore base salaries, stock grants, and bonuses by level.`,
    alternates: {
      canonical: `${siteUrl}/companies/${slug}`,
    },
    openGraph: {
      title: `Software Engineer Salaries at ${company.name} | TalentDash`,
      description: `Verified compensation data for ${company.name}. Median TC: ${formattedMedian}. Compare salaries and levels.`,
      type: 'website',
      url: `${siteUrl}/companies/${slug}`,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 1200,
          alt: 'TalentDash compensation explorer',
        },
        {
          url: `https://logo.clearbit.com/${slug}.com`,
          width: 250,
          height: 250,
          alt: `${company.name} Logo`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Software Engineer Salaries at ${company.name} | TalentDash`,
      description: `Verified compensation data for ${company.name}. Median TC: ${formattedMedian}. Compare salaries and levels.`,
      images: [`/og-image.png`],
    },
  };
}

export default async function CompanyPage({ params, searchParams }: PageProps) {
  const { slug } = await params;

  // Find company profile
  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) {
    notFound();
  }

  const companyRecords = SALARY_DATA.filter((r) => r.companySlug === slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';

  // Build JSON-LD structured data for Google Search (Organization schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `${siteUrl}/companies/${slug}`,
    logo: `https://logo.clearbit.com/${slug}.com`,
    foundingDate: company.foundingYear ? String(company.foundingYear) : undefined,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: company.headcountRange,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.headquarters,
    },
    description: `Verified compensation data, base salary packages, bonuses, and stock options for software engineering positions at ${company.name}.`,
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
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-xs font-semibold text-muted-text hover:text-deep-text transition-colors"
        >
          <span aria-hidden="true">← </span>Back to Explorer
        </Link>
      </div>

      <Suspense fallback={<CompanyDynamicSkeleton />}>
        <CompanyDynamicContent 
          company={company} 
          slug={slug} 
          searchParamsPromise={searchParams} 
          companyRecords={companyRecords} 
        />
      </Suspense>
    </div>
  );
}

// The dynamic portion of the page that waits for searchParams (currency selection, sorting, tabs)
async function CompanyDynamicContent({
  company,
  slug,
  searchParamsPromise,
  companyRecords,
}: {
  company: Company;
  slug: string;
  searchParamsPromise: Promise<{ sortBy?: string; sortOrder?: 'asc' | 'desc'; currency?: 'INR' | 'USD'; tab?: string }>;
  companyRecords: SalaryRecord[];
}) {
  const resolvedSearchParams = await searchParamsPromise;

  const stats = COMPANY_STATS[slug] || {
    recordCount: 0,
    avgTotalComp: 0,
    maxTotalComp: 0,
    minTotalComp: 0,
    medianTotalComp: 0,
    levels: [],
  };
  const recordCount = stats.recordCount;
  const medianTC = stats.medianTotalComp;
  const minTC = stats.minTotalComp;
  const maxTC = stats.maxTotalComp;

  // Sorting, Currency and Tab params
  const sortBy = resolvedSearchParams.sortBy || 'totalCompensation';
  const sortOrder: 'asc' | 'desc' = resolvedSearchParams.sortOrder === 'asc' ? 'asc' : 'desc';
  const currency: 'INR' | 'USD' = resolvedSearchParams.currency === 'USD' ? 'USD' : 'INR';
  const tab = resolvedSearchParams.tab || 'overview';

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

  const getTabHref = (tabName: string) => {
    const params = new URLSearchParams();
    if (resolvedSearchParams.sortBy) params.set('sortBy', resolvedSearchParams.sortBy);
    if (resolvedSearchParams.sortOrder) params.set('sortOrder', resolvedSearchParams.sortOrder);
    if (resolvedSearchParams.currency) params.set('currency', resolvedSearchParams.currency);
    params.set('tab', tabName);
    return `/companies/${slug}?${params.toString()}`;
  };

  const getCurrencyHref = (curr: 'INR' | 'USD') => {
    const params = new URLSearchParams();
    if (resolvedSearchParams.sortBy) params.set('sortBy', resolvedSearchParams.sortBy);
    if (resolvedSearchParams.sortOrder) params.set('sortOrder', resolvedSearchParams.sortOrder);
    if (resolvedSearchParams.tab) params.set('tab', resolvedSearchParams.tab);
    params.set('currency', curr);
    return `/companies/${slug}?${params.toString()}`;
  };

  // Generate stylized logo gradient initials
  const getGradient = (companySlug: string) => {
    const gradients = [
      'from-red-500 to-orange-500',
      'from-blue-500 to-indigo-500',
      'from-emerald-500 to-teal-500',
      'from-purple-500 to-pink-500',
      'from-amber-500 to-yellow-500',
      'from-sky-500 to-blue-500',
    ];
    const code = companySlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[code % gradients.length];
  };

  // Mock highly realistic developer-focused insights per company (similar to Levels.fyi top insights)
  const getTopInsights = (companySlug: string) => {
    const defaultInsights = [
      { id: 1, text: 'Typically offers competitive joining cash bonuses to match candidate expectations.', type: 'signing' },
      { id: 2, text: 'Standard 25% annual vesting schedule for stock grants over 4 years.', type: 'vesting' },
      { id: 3, text: 'Interview Tip: Focus on core data structures, algorithms, and modular design.', type: 'interview' },
      { id: 4, text: 'Compensation is benchmarked regularly against tier-1 local product firms.', type: 'salary' }
    ];
    return COMPANY_INSIGHTS[companySlug] || defaultInsights;
  };

  // Mock About paragraphs per company
  const getAboutText = (comp: Company) => {
    return COMPANY_ABOUTS[comp.slug] || `${comp.name} is a leading organization in the ${comp.industry} industry. It operates with a headcount of ${comp.headcountRange} and has a strong technical team focusing on scalable systems, engineering operations, and modern cloud deployment architectures.`;
  };

  // Mock WLB & Culture ratings
  const getCultureRatings = (companySlug: string) => {
    const defaultRatings = { wlb: 4.0, growth: 3.8, culture: 4.0, comp: 3.9, mgmt: 3.8 };
    return COMPANY_CULTURE_RATINGS[companySlug] || defaultRatings;
  };

  // Dynamic related companies
  const relatedCompanies = COMPANIES.filter(
    (c) => c.slug !== slug && (c.industry === company.industry || c.industry.split(' ')[0] === company.industry.split(' ')[0])
  ).slice(0, 3);
  if (relatedCompanies.length < 3) {
    const extra = COMPANIES.filter((c) => c.slug !== slug && !relatedCompanies.includes(c)).slice(0, 3 - relatedCompanies.length);
    relatedCompanies.push(...extra);
  }

  // Dynamic Jobs listing
  const getFeaturedJobs = (comp: Company) => {
    const ind = comp.industry.toLowerCase();
    if (ind.includes('payments') || ind.includes('fintech')) {
      return [
        { title: 'Senior Security Engineer (Payment Gateways)', loc: 'Bengaluru', exp: '5-8 Yrs' },
        { title: 'Lead Software Engineer (Go & Microservices)', loc: 'Bengaluru', exp: '6-10 Yrs' }
      ];
    }
    if (ind.includes('e-commerce') || ind.includes('delivery')) {
      return [
        { title: 'Staff Software Engineer (High-Throughput APIs)', loc: 'Bengaluru', exp: '8-12 Yrs' },
        { title: 'Senior Machine Learning Engineer (Recommendations)', loc: 'Bengaluru', exp: '5-7 Yrs' }
      ];
    }
    return [
      { title: 'Staff Software Engineer (Distributed Systems)', loc: 'Hyderabad', exp: '7-12 Yrs' },
      { title: 'Senior Frontend Architect (Next.js & Tailwind)', loc: 'Bengaluru', exp: '6-9 Yrs' }
    ];
  };

  const insights = getTopInsights(slug);
  const ratings = getCultureRatings(slug);
  const jobs = getFeaturedJobs(company);

  return (
    <div className="space-y-8">
      {/* 1. Cover Banner & Logo Header Section */}
      <div className="relative w-full h-44 sm:h-56 bg-gradient-to-r from-red-500 via-primary-accent to-rose-600 overflow-hidden border border-border-custom rounded-2xl shadow-sm">
        {/* Abstract glowing lights */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
        
        {/* Logo overlapping the bottom */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 absolute -bottom-10 left-6 sm:left-10 rounded-2xl bg-gradient-to-br ${getGradient(slug)} border-4 border-background shadow-md overflow-hidden flex items-center justify-center`}>
          <div className="w-full h-full relative flex items-center justify-center bg-hover-surface">
            <span className="absolute text-xl sm:text-2xl font-extrabold text-white select-none uppercase z-0">
              {company.name.charAt(0)}
            </span>
            <Image
              src={`/logos/${slug}.svg`}
              alt={company.name}
              width={96}
              height={96}
              className="object-cover w-full h-full relative z-10"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* 2. Profile Details & Horizontal Navigation Tabs */}
      <div className="pt-10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-custom">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[36px] font-bold leading-[1.1] text-deep-text tracking-tight">
              {company.name}
            </h1>
            <span className="text-xs font-semibold bg-primary-accent/10 text-primary-accent border border-primary-accent/20 px-2.5 py-0.5 rounded-full capitalize">
              {company.industry}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 mt-2 text-xs text-muted-text">
            <div>
              Headquarters:{' '}
              <span className="font-semibold text-deep-text">{company.headquarters}</span>
            </div>
            <div>
              Headcount:{' '}
              <span className="font-semibold text-deep-text">{company.headcountRange}</span>
            </div>
            <div>
              Founded:{' '}
              <span className="font-semibold text-deep-text">{company.foundingYear}</span>
            </div>
            <div>
              Total Records:{' '}
              <span className="font-semibold text-deep-text">{recordCount}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs bar */}
        <div className="flex bg-hover-surface border border-border-custom rounded-xl p-1 w-full md:w-auto self-start md:self-end">
          <Link
            href={getTabHref('overview')}
            className={`flex-1 md:flex-none text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'overview' ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
            }`}
          >
            Overview
          </Link>
          <Link
            href={getTabHref('salaries')}
            className={`flex-1 md:flex-none text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'salaries' ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
            }`}
          >
            Salaries
          </Link>
          <Link
            href={getTabHref('culture')}
            className={`flex-1 md:flex-none text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'culture' ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
            }`}
          >
            Culture & Benefits
          </Link>
        </div>
      </div>

      {/* 3. Two-Column Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Panel Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {tab === 'overview' && (
            /* OVERVIEW TAB CONTENT */
            <>
              {/* Top Insights Card */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom">
                <h3 className="text-sm font-bold text-deep-text uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span aria-hidden="true">💡</span> Top Insights
                </h3>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="flex items-start gap-3 text-xs leading-relaxed text-body-text">
                      <span className="text-primary-accent mt-0.5 shrink-0 select-none">
                        {insight.type === 'signing' && '💰'}
                        {insight.type === 'vesting' && '📈'}
                        {insight.type === 'interview' && '📝'}
                        {insight.type === 'salary' && '📊'}
                      </span>
                      <span>{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Card */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom">
                <h3 className="text-sm font-bold text-deep-text uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span aria-hidden="true">🏢</span> About {company.name}
                </h3>
                <p className="text-xs text-body-text leading-relaxed font-medium">
                  {getAboutText(company)}
                </p>
              </div>

              {/* Salaries Overview Summary Card */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom space-y-6">
                <div className="flex items-center justify-between border-b border-border-custom pb-3">
                  <h3 className="text-sm font-bold text-deep-text uppercase tracking-wider flex items-center gap-2">
                    <span aria-hidden="true">📊</span> Compensation Summary
                  </h3>
                  <Link
                    href={getTabHref('salaries')}
                    className="text-[10px] font-bold text-primary-accent hover:opacity-90"
                  >
                    View All Salaries →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-hover-surface border border-border-custom p-4 rounded-xl flex flex-col justify-between h-[100px]">
                    <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Median Total Comp</span>
                    <span className="text-[32px] font-bold text-primary-accent">{formatCurrency(medianTC, currency)}</span>
                  </div>
                  <div className="bg-hover-surface border border-border-custom p-4 rounded-xl flex flex-col justify-between h-[100px]">
                    <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Compensation Range</span>
                    <span className="text-lg font-bold text-deep-text leading-snug">{formatCurrency(minTC, currency)} - {formatCurrency(maxTC, currency)}</span>
                  </div>
                </div>

                {/* Micro Level Distribution Preview */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Level Distribution Preview</span>
                  <LevelDistributionBar levels={stats.levels} />
                </div>
              </div>
            </>
          )}

          {tab === 'salaries' && (
            /* SALARIES TAB CONTENT */
            <>
              {/* Stats & Currency controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel rounded-2xl p-6 border border-border-custom flex flex-col gap-1.5 justify-center">
                  <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Median Total Comp</span>
                  <span className="text-[32px] font-bold text-primary-accent">{formatCurrency(medianTC, currency)}</span>
                  <span className="text-[9px] text-muted-text font-semibold">From {recordCount} engineering records</span>
                </div>
                <div className="glass-panel rounded-2xl p-6 border border-border-custom flex flex-col gap-1.5 justify-center">
                  <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Compensation Range</span>
                  <span className="text-xl font-bold text-deep-text">{formatCurrency(minTC, currency)} - {formatCurrency(maxTC, currency)}</span>
                  <span className="text-[9px] text-muted-text font-semibold">Min and max verified values</span>
                </div>
                <div className="glass-panel rounded-2xl p-4 border border-border-custom flex flex-col gap-2 justify-center">
                  <div className="flex items-center justify-between text-[10px] text-muted-text px-1 font-bold">
                    <span>Currency</span>
                    <span className="text-primary-accent capitalize">{currency}</span>
                  </div>
                  <div className="flex bg-hover-surface border border-border-custom rounded-xl p-1 w-full">
                    <Link
                      href={getCurrencyHref('INR')}
                      className={`flex-1 text-center py-1 text-xs font-semibold rounded-lg transition-all ${
                        currency === 'INR' ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
                      }`}
                    >
                      INR (₹)
                    </Link>
                    <Link
                      href={getCurrencyHref('USD')}
                      className={`flex-1 text-center py-1 text-xs font-semibold rounded-lg transition-all ${
                        currency === 'USD' ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
                      }`}
                    >
                      USD ($)
                    </Link>
                  </div>
                </div>
              </div>

              {/* Level Distribution Stacked Bar */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom">
                <h3 className="text-xs font-bold text-muted-text uppercase tracking-wider mb-4">
                  Level Distribution Stacked Bar
                </h3>
                <LevelDistributionBar levels={stats.levels} />
              </div>

              {/* Interactive Salaries Table */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-deep-text px-1 uppercase tracking-wider">
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
            </>
          )}

          {tab === 'culture' && (
            /* CULTURE & BENEFITS TAB CONTENT */
            <>
              {/* Ratings Scores Card */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom space-y-6">
                <h3 className="text-sm font-bold text-deep-text uppercase tracking-wider border-b border-border-custom pb-3 flex items-center gap-2">
                  <span aria-hidden="true">⭐</span> Work Culture & Satisfaction
                </h3>

                <div className="space-y-4">
                  {/* Rating items */}
                  {[
                    { label: 'Work-Life Balance', score: ratings.wlb },
                    { label: 'Career Growth', score: ratings.growth },
                    { label: 'Culture & Values', score: ratings.culture },
                    { label: 'Compensation & Benefits', score: ratings.comp },
                    { label: 'Management & Leadership', score: ratings.mgmt }
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-body-text">
                        <span>{item.label}</span>
                        <span className="text-primary-accent">{item.score.toFixed(1)} / 5.0</span>
                      </div>
                      <div 
                        role="progressbar" 
                        aria-valuenow={item.score} 
                        aria-valuemin={0} 
                        aria-valuemax={5} 
                        aria-label={item.label}
                        className="w-full bg-hover-surface rounded-full h-2 overflow-hidden border border-border-custom"
                      >
                        <div
                          className="bg-primary-accent h-2 rounded-full"
                          style={{ width: `${(item.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks Grid */}
              <div className="glass-panel rounded-2xl p-6 border border-border-custom space-y-4">
                <h3 className="text-sm font-bold text-deep-text uppercase tracking-wider border-b border-border-custom pb-3 flex items-center gap-2">
                  <span aria-hidden="true">🎁</span> Perks & Benefits
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-body-text">
                  <div className="p-3 bg-hover-surface border border-border-custom rounded-xl flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-lg">🩺</span>
                    <div>
                      <div className="text-deep-text">Comprehensive Health Insurance</div>
                      <div className="text-[10px] text-muted-text font-medium mt-0.5">Fully covered medical plan for employee and dependents.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-hover-surface border border-border-custom rounded-xl flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-lg">🍲</span>
                    <div>
                      <div className="text-deep-text">Gourmet Cafeteria & Meals</div>
                      <div className="text-[10px] text-muted-text font-medium mt-0.5">Free catered lunches, micro-kitchens with healthy snacks.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-hover-surface border border-border-custom rounded-xl flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-lg">🏡</span>
                    <div>
                      <div className="text-deep-text">Flexible Hybrid Model</div>
                      <div className="text-[10px] text-muted-text font-medium mt-0.5">3 days in-office, home-office equipment stipend.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-hover-surface border border-border-custom rounded-xl flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-lg">📚</span>
                    <div>
                      <div className="text-deep-text">Learning & Dev Allowance</div>
                      <div className="text-[10px] text-muted-text font-medium mt-0.5">Annual education allowance for courses, books, and certs.</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Right Sidebar Column (1/3 width, persistent on all tabs) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          
          {/* Featured Jobs */}
          <div className="glass-panel border border-border-custom rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-muted-text uppercase tracking-wider flex items-center justify-between border-b border-border-custom pb-2">
              <span>Featured Jobs</span>
              <span className="text-[9px] bg-primary-accent/10 text-primary-accent border border-primary-accent/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider select-none animate-pulse">Hiring</span>
            </h3>
            
            <div className="space-y-3.5">
              {jobs.map((job, idx) => (
                <div key={idx} className="p-3 bg-hover-surface hover:bg-surface border border-border-custom rounded-xl transition-colors space-y-1.5">
                  <h4 className="text-xs font-bold text-deep-text leading-snug hover:text-primary-accent cursor-pointer transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-muted-text font-semibold uppercase">
                    <span>📍 {job.loc}</span>
                    <span>⏱️ {job.exp}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              href="/"
              className="block w-full text-center text-xs font-bold text-body-text bg-surface hover:bg-hover-surface border border-border-custom hover:border-muted-text/30 py-2.5 rounded-xl transition-all"
            >
              Search All Openings
            </Link>
          </div>

          {/* Related Companies */}
          <div className="glass-panel border border-border-custom rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-muted-text uppercase tracking-wider border-b border-border-custom pb-2">
              Related Companies
            </h3>

            <div className="space-y-3">
              {relatedCompanies.map((rel) => {
                const relRecords = SALARY_DATA.filter((r) => r.companySlug === rel.slug);
                const relRate = rel.slug === 'google' ? 4.8 : rel.slug === 'microsoft' ? 4.6 : rel.slug === 'amazon' ? 4.5 : 4.0;
                return (
                  <Link
                    key={rel.slug}
                    href={`/companies/${rel.slug}`}
                    className="flex items-center justify-between p-2.5 hover:bg-hover-surface/60 border border-transparent hover:border-border-custom rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-hover-surface border border-border-custom shadow-xs shrink-0 overflow-hidden relative flex items-center justify-center">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(rel.slug)} flex items-center justify-center font-bold text-xs text-white uppercase z-0`}>
                          {rel.name.charAt(0)}
                        </div>
                        <Image
                          src={`/logos/${rel.slug}.svg`}
                          alt={rel.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full relative z-10"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-body-text group-hover:text-primary-accent transition-colors truncate">
                          {rel.name}
                        </div>
                        <div className="text-[9px] text-muted-text font-medium">
                          ★ {relRate.toFixed(1)} • {relRecords.length} Salary records
                        </div>
                      </div>
                    </div>
                    <span className="text-muted-text group-hover:text-primary-accent transition-colors text-xs">→</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Negotiate offer CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-500/10 via-primary-accent/5 to-surface border border-primary-accent/20 hover:border-primary-accent/30 transition-all flex flex-col gap-3 shadow-xs">
            <h4 className="text-xs font-bold text-deep-text uppercase tracking-wider flex items-center gap-1.5">
              <span aria-hidden="true">💼</span> Competing Offer?
            </h4>
            <p className="text-[11px] text-body-text leading-relaxed font-semibold">
              Vetted offer evaluations suggest candidates with competing offers at {company.name} negotiate up to <span className="text-success font-bold">18% higher base salaries</span>.
            </p>
            <Link
              href="/compare"
              className="w-full text-center text-xs font-bold text-white bg-primary-accent hover:opacity-95 px-4 py-2.5 rounded-xl shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Negotiate Offer Package
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// Dynamic Skeletons for tab content & profile details loading states
function CompanyDynamicSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Cover skeleton */}
      <div className="w-full h-44 sm:h-56 bg-hover-surface border border-border-custom rounded-2xl"></div>

      {/* Header text skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-custom pb-6">
        <div className="space-y-3 w-1/3">
          <div className="h-6 bg-hover-surface rounded w-full"></div>
          <div className="h-4 bg-hover-surface rounded w-1/2"></div>
        </div>
        <div className="h-10 bg-hover-surface rounded w-1/4"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-32 bg-surface rounded-2xl border border-border-custom"></div>
          <div className="h-44 bg-surface rounded-2xl border border-border-custom"></div>
        </div>
        <div className="lg:col-span-1 h-64 bg-surface rounded-2xl border border-border-custom"></div>
      </div>
    </div>
  );
}
