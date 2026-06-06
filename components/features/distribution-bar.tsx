import { calculateLevelDistribution } from '@/lib/math';

interface LevelDistributionBarProps {
  levels: string[];
}

export default function LevelDistributionBar({ levels }: LevelDistributionBarProps) {
  const distribution = calculateLevelDistribution(levels);

  if (distribution.length === 0) return null;

  // Level color mapping
  const levelColors: Record<string, { bg: string; text: string }> = {
    L3: { bg: 'bg-muted-text', text: 'text-muted-text' },
    L4: { bg: 'bg-primary-accent', text: 'text-primary-accent' },
    L5: { bg: 'bg-warning', text: 'text-warning' },
    L6: { bg: 'bg-error', text: 'text-error' },
    Principal: { bg: 'bg-deep-text border border-border-custom', text: 'text-deep-text' },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Stacked Horizontal Bar */}
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-hover-surface border border-border-custom p-0.5" aria-hidden="true">
        {distribution.map((item) => {
          const colors = levelColors[item.level] || { bg: 'bg-muted-text/60', text: 'text-muted-text' };
          return (
            <div
              key={item.level}
              style={{ width: `${item.percentage}%` }}
              className={`${colors.bg} h-full first:rounded-l-full last:rounded-r-full transition-all duration-300`}
              title={`${item.level}: ${item.count} records (${item.percentage}%)`}
            />
          );
        })}
      </div>

      {/* Legend Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" aria-label="Level distribution legend">
        {distribution.map((item) => {
          const colors = levelColors[item.level] || { bg: 'bg-muted-text/60', text: 'text-muted-text' };
          return (
            <li
              key={item.level}
              className="flex items-center gap-2.5 bg-surface border border-border-custom rounded-xl p-3"
            >
              <span className={`h-3 w-3 rounded-full ${colors.bg}`} aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-deep-text">
                  {item.level === 'Principal' ? 'Principal' : `${item.level} / SDE`}
                </span>
                <span className="text-[10px] text-muted-text">
                  {item.count} {item.count === 1 ? 'record' : 'records'} ({item.percentage}%)
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
