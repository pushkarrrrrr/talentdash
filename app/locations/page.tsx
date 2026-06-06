import type { Metadata } from 'next';
import LocationDirectory from './location-directory';

export const metadata: Metadata = {
  title: 'Global Tech Salary Locations Directory | TalentDash',
  description: 'Find software engineer, developer, and data scientist salaries across global tech hubs like Bengaluru, Mumbai, Hyderabad, London, Dublin, and San Francisco.',
  alternates: {
    canonical: '/locations',
  },
  openGraph: {
    title: 'Global Tech Salary Locations Directory | TalentDash',
    description: 'Find software engineer, developer, and data scientist salaries across global tech hubs like Bengaluru, Mumbai, Hyderabad, London, Dublin, and San Francisco.',
    url: '/locations',
  }
};

export default function Page() {
  return <LocationDirectory />;
}
