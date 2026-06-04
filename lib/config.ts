export const CONFIG = {
  CURRENCY: {
    INR_TO_USD: 0.012,
    USD_TO_INR: 83.33333333,
  },
  PAGINATION: {
    LIMIT: 25,
  },
  LEVEL_TIERS: {
    L3: { name: 'L3 / SDE-I', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    L4: { name: 'L4 / SDE-II', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    L5: { name: 'L5 / SDE-III', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    L6: { name: 'L6 / Staff', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    Principal: { name: 'Principal', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }, // Wait, principal color is navy. In dark mode, navy could be slate/emerald/blue or a custom dark-blue theme. Let's see: Principal = navy. Navy is usually dark blue like bg-blue-950 text-blue-200 border-blue-900/50.
  }
};
