import type { Metadata } from 'next';
import TitleDirectory from './title-directory';

export const metadata: Metadata = {
  title: 'Tech Job Titles & Roles Directory | TalentDash',
  description: 'Explore tech salaries, base pay packages, and levels by job title. Filter through roles in Distributed Systems, Machine Learning, Security, DevOps, Applications, Web, Mobile, and Data.',
  alternates: {
    canonical: '/t',
  },
  openGraph: {
    title: 'Tech Job Titles & Roles Directory | TalentDash',
    description: 'Explore tech salaries, base pay packages, and levels by job title. Filter through roles in Distributed Systems, Machine Learning, Security, DevOps, Applications, Web, Mobile, and Data.',
    url: '/t',
  }
};

export default function Page() {
  return <TitleDirectory />;
}
