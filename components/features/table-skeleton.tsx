export default function TableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface animate-pulse">
      <div className="w-full min-w-[900px] border-collapse text-left text-sm text-body-text">
        {/* Header row skeleton */}
        <div className="border-b border-border-custom bg-hover-surface/85 px-6 py-4 flex gap-4">
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
          <div className="h-4 bg-border-custom rounded w-1/12"></div>
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
          <div className="h-4 bg-border-custom rounded w-1/12"></div>
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
          <div className="h-4 bg-border-custom rounded w-1/6"></div>
        </div>
        {/* Body rows skeleton */}
        <div className="divide-y divide-border-custom bg-surface">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex gap-4 items-center">
              <div className="h-5 bg-hover-surface rounded w-1/6 flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-border-custom shrink-0"></div>
                <div className="h-4 bg-border-custom rounded w-full"></div>
              </div>
              <div className="h-4 bg-hover-surface rounded w-1/6"></div>
              <div className="h-5 bg-hover-surface rounded-full w-1/12"></div>
              <div className="h-4 bg-hover-surface rounded w-1/6"></div>
              <div className="h-4 bg-hover-surface rounded w-1/12"></div>
              <div className="h-4 bg-hover-surface rounded w-1/6"></div>
              <div className="h-4 bg-hover-surface rounded w-1/6"></div>
              <div className="h-5 bg-hover-surface rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
