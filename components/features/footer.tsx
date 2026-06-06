export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-custom bg-surface py-8 text-center text-xs text-muted-text">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-deep-text">TalentDash India</span>
            <span>Real-time, verified engineering compensation metrics.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-deep-text transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-deep-text transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-deep-text transition-colors">Contact Support</a>
          </div>
        </div>
        <div className="mt-8 border-t border-border-custom/80 pt-8 text-[11px] text-muted-text">
          &copy; {new Date().getFullYear()} TalentDash. All rights reserved. Indian Rupee conversion is benchmarked at a fixed rate of ₹1 = $0.012.
        </div>
      </div>
    </footer>
  );
}
