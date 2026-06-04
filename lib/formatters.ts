import { CONFIG } from './config';

/**
 * Formats a numeric value to currency format based on currency type (INR or USD).
 * INR uses the Indian Lakh/Crore grouping system (e.g., ₹42,00,000).
 * USD uses the standard US system (e.g., $50,400).
 */
export function formatCurrency(value: number | null | undefined, currency: 'INR' | 'USD' = 'INR'): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—'; // Em dash for missing/null values
  }

  let amount = value;
  if (currency === 'USD') {
    // Convert INR to USD
    amount = value * CONFIG.CURRENCY.INR_TO_USD;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // INR Formatting (en-IN localization preserves Lakh/Crore grouping)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats experience years.
 * e.g., 1 -> "1 yr", 3.5 -> "3.5 yrs"
 */
export function formatExperience(years: number): string {
  if (years === 0) return 'Fresh Grad';
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
}

/**
 * Computes difference between two numbers and formats with a sign (+/-).
 */
export function formatDelta(valueA: number, valueB: number, currency: 'INR' | 'USD' = 'INR'): { text: string; isPositive: boolean; isZero: boolean } {
  const delta = valueA - valueB;
  const isPositive = delta > 0;
  const isZero = delta === 0;

  let text = '';
  if (isZero) {
    text = '0';
  } else {
    // Format the absolute value of delta and prepend sign
    const formattedVal = formatCurrency(Math.abs(delta), currency);
    text = `${isPositive ? '+' : '-'}${formattedVal}`;
  }

  return {
    text,
    isPositive,
    isZero
  };
}
