import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | TalentDash',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-panel rounded-2xl p-12 text-center border border-border-custom flex flex-col items-center justify-center gap-6 max-w-2xl w-full shadow-md">
        <div className="relative">
          <h1 className="text-9xl font-black text-border-custom absolute left-1/2 -translate-x-1/2 -top-12 z-0 select-none">404</h1>
          <span className="text-6xl relative z-10 block mb-4">🛸</span>
        </div>
        
        <h2 className="text-[28px] font-bold text-deep-text mt-4">Page Not Found</h2>
        
        <p className="text-base text-body-text max-w-md">
          We couldn&apos;t find the page or company you&apos;re looking for. The link might be broken, or the record may have been removed.
        </p>
        
        <Link
          href="/salaries"
          className="mt-6 font-semibold text-white bg-primary-accent hover:opacity-95 px-8 py-4 rounded-xl shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Return to Salaries Explorer
        </Link>
      </div>
    </div>
  );
}
