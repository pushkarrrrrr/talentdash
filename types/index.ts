/**
 * Enums representing the specific engineering level tiers supported by TalentDash.
 */
export enum Level {
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  L6 = 'L6',
  Principal = 'Principal',
}

/**
 * Supported currencies for compensation figures.
 */
export enum Currency {
  INR = 'INR',
  USD = 'USD',
}

/**
 * Representation of a single verified salary record in the system.
 */
export interface SalaryRecord {
  id: string;
  company: string;
  companySlug: string;
  role: string;
  level: Level;
  location: string;
  experienceYears: number; // expressed in fractional years (e.g., 3.5)
  baseSalary: number;       // base pay in INR
  bonus: number | null; // performance bonus in INR, null signifies missing/not applicable
  stock: number | null; // equity/stock grants in INR, null signifies missing/not applicable
  totalCompensation: number;  // total verified compensation in INR (calculated base + bonus + stock)
}

/**
 * Profile metadata for a tech company registered on TalentDash.
 */
export interface Company {
  slug: string;
  name: string;
  industry: string;
  foundingYear: number;
  headcountRange: string; // headcount bounds, e.g. "10,000+"
  headquarters: string;
}

/**
 * Sort fields allowable for SQL-like ordering of records on the server.
 */
export type SortField = 'totalCompensation' | 'baseSalary' | 'experienceYears';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface FilterState {
  company: string;
  role: string;
  levels: Level[];
  location: string;
  currency: Currency;
  page: number;
}

export interface CompareState {
  selectedIdA: string | null;
  selectedIdB: string | null;
  currency: Currency;
}
