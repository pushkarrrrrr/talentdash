export default function TableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm animate-pulse">
      <div className="w-full min-w-[900px] border-collapse text-left text-sm text-slate-300">
        {/* Header row skeleton */}
        <div className="border-b border-slate-900 bg-slate-950/80 px-6 py-4 flex gap-4">
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/12"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/12"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/6"></div>
        </div>
        {/* Body rows skeleton */}
        <div className="divide-y divide-slate-900/60 bg-slate-950/20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex gap-4 items-center">
              <div className="h-5 bg-slate-800 rounded w-1/6 flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-slate-700 shrink-0"></div>
                <div className="h-4 bg-slate-800 rounded w-full"></div>
              </div>
              <div className="h-4 bg-slate-800 rounded w-1/6"></div>
              <div className="h-5 bg-slate-800 rounded-full w-1/12"></div>
              <div className="h-4 bg-slate-800 rounded w-1/6"></div>
              <div className="h-4 bg-slate-800 rounded w-1/12"></div>
              <div className="h-4 bg-slate-800 rounded w-1/6"></div>
              <div className="h-4 bg-slate-800 rounded w-1/6"></div>
              <div className="h-5 bg-slate-700 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
