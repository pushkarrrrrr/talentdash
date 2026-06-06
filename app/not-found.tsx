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
      <div className="glass-panel rounded-2xl p-12 text-center border border-slate-900 flex flex-col items-center justify-center gap-6 max-w-2xl w-full shadow-2xl">
        <div className="relative">
          <h1 className="text-9xl font-black text-slate-900/50 absolute left-1/2 -translate-x-1/2 -top-12 z-0 select-none">404</h1>
          <span className="text-6xl relative z-10 block mb-4">🛸</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-100 mt-4">Page Not Found</h2>
        
        <p className="text-base text-slate-400 max-w-md">
          We couldn&apos;t find the page or company you&apos;re looking for. The link might be broken, or the record may have been removed.
        </p>
        
        <Link
          href="/salaries"
          className="mt-6 font-semibold text-white bg-sky-600 hover:bg-sky-500 px-8 py-4 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Return to Salaries Explorer
        </Link>
      </div>
    </div>
  );
}
