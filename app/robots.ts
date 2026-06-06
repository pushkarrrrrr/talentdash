import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/*?*q=',
        '/*?*sort=',
        '/*?*sortBy=',
        '/*?*sortOrder=',
        '/*?*page=',
        '/compare?',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
