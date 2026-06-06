export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-slate-400">TalentDash India</span>
            <span>Real-time, verified engineering compensation metrics.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Contact Support</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-900/60 pt-8 text-[11px] text-slate-600">
          &copy; {new Date().getFullYear()} TalentDash. All rights reserved. Indian Rupee conversion is benchmarked at a fixed rate of ₹1 = $0.012.
        </div>
      </div>
    </footer>
  );
}
