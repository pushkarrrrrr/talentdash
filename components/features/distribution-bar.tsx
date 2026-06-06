import { calculateLevelDistribution } from '@/lib/math';

interface LevelDistributionBarProps {
  levels: string[];
}

export default function LevelDistributionBar({ levels }: LevelDistributionBarProps) {
  const distribution = calculateLevelDistribution(levels);

  if (distribution.length === 0) return null;

  // Level color mapping
  const levelColors: Record<string, { bg: string; text: string }> = {
    L3: { bg: 'bg-slate-500', text: 'text-slate-400' },
    L4: { bg: 'bg-blue-500', text: 'text-blue-400' },
    L5: { bg: 'bg-indigo-500', text: 'text-indigo-400' },
    L6: { bg: 'bg-purple-500', text: 'text-purple-400' },
    Principal: { bg: 'bg-[#0f1b3c] border border-sky-500/30', text: 'text-sky-300' },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Stacked Horizontal Bar */}
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800/80 p-0.5" aria-hidden="true">
        {distribution.map((item) => {
          const colors = levelColors[item.level] || { bg: 'bg-zinc-500', text: 'text-zinc-400' };
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
          const colors = levelColors[item.level] || { bg: 'bg-zinc-500', text: 'text-zinc-400' };
          return (
            <li
              key={item.level}
              className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 rounded-xl p-3"
            >
              <span className={`h-3 w-3 rounded-full ${colors.bg}`} aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  {item.level === 'Principal' ? 'Principal' : `${item.level} / SDE`}
                </span>
                <span className="text-[10px] text-slate-500">
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
