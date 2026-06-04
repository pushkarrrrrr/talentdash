/**
 * Calculates the mathematical median of a list of numbers.
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Returns the min and max of a list of numbers.
 */
export function calculateRange(values: number[]): { min: number; max: number } {
  if (values.length === 0) return { min: 0, max: 0 };
  const sorted = [...values].sort((a, b) => a - b);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1]
  };
}

/**
 * Computes level distribution percentages for a set of level values.
 * Returns an array of objects containing level name, count, and percentage.
 */
export function calculateLevelDistribution(levels: string[]): { level: string; count: number; percentage: number }[] {
  if (levels.length === 0) return [];
  
  const counts: Record<string, number> = {};
  levels.forEach(lvl => {
    counts[lvl] = (counts[lvl] || 0) + 1;
  });
  
  const total = levels.length;
  
  // Sort levels by standard ordering: L3, L4, L5, L6, Principal
  const order = ['L3', 'L4', 'L5', 'L6', 'Principal'];
  
  return Object.entries(counts)
    .map(([level, count]) => ({
      level,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => {
      const idxA = order.indexOf(a.level);
      const idxB = order.indexOf(b.level);
      // Put unknown levels at the end
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
}
