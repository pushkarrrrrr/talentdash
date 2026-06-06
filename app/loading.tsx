export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 relative overflow-hidden">
      {/* Decorative blurred background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Glassmorphic Loader Card */}
      <div className="glass-panel px-8 py-10 rounded-2xl flex flex-col items-center gap-6 shadow-2xl relative z-10 border border-slate-900/50 max-w-sm w-full text-center">
        {/* Animated Custom Spinner */}
        <div className="relative w-16 h-16">
          {/* Glowing track */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-900"></div>
          {/* Rotating active sector */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin"></div>
          {/* Inner pulse */}
          <div className="absolute inset-3 rounded-full bg-sky-500/10 animate-pulse"></div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-slate-100 tracking-wide">
            Retrieving Compensation Data
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Please wait while we fetch and compile the latest verified tech offers...
          </p>
        </div>
      </div>
    </div>
  );
}
