import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SALARY_DATA } from '@/lib/mock-data';
import CompareContainer from '@/components/features/compare-container';

export const metadata: Metadata = {
  title: 'Compare Tech Salaries & Offer Letters | TalentDash',
  description: 'Side-by-side software engineer compensation comparison. Compare base salaries, bonus structures, and stock options to negotiate a higher offer.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare Tech Salaries & Offer Letters | TalentDash',
    description: 'Compare base salary, stock options, and total compensation side-by-side. Make data-driven decisions.',
    type: 'website',
    url: '/compare',
  },
};

export default function ComparePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-[36px] font-bold leading-[1.1] text-deep-text tracking-tight">
          Compare Compensation Offers
        </h1>
        <p className="text-sm text-muted-text max-w-2xl">
          Evaluate offer details side-by-side and calculate precise compensation deltas to power your salary negotiations.
        </p>
      </div>

      <Suspense fallback={<CompareSkeleton />}>
        <CompareContainer records={SALARY_DATA} />
      </Suspense>
    </div>
  );
}

function CompareSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col gap-8">
      <div className="h-28 bg-hover-surface border border-border-custom rounded-2xl"></div>
      <div className="h-6 w-1/3 bg-hover-surface border border-border-custom rounded-xl"></div>
      <div className="h-96 bg-hover-surface border border-border-custom rounded-2xl"></div>
    </div>
  );
}
