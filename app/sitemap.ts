import { MetadataRoute } from 'next';
import { COMPANIES } from '@/lib/mock-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';

  // Core Static routes
  const staticRoutes = [
    '',
    '/salaries',
    '/compare',
    '/locations',
    '/t',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic company detail routes
  const companyRoutes = COMPANIES.map((company) => ({
    url: `${siteUrl}/companies/${company.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...companyRoutes];
}
