import { SalaryRecord, Company, Level } from '../types';

export const COMPANIES: Company[] = [
  {
    slug: 'google',
    name: 'Google India',
    industry: 'Technology & Cloud',
    foundingYear: 2004,
    headcountRange: '10,000+',
    headquarters: 'Mountain View, CA'
  },
  {
    slug: 'amazon',
    name: 'Amazon India',
    industry: 'E-commerce & AWS',
    foundingYear: 2004,
    headcountRange: '50,000+',
    headquarters: 'Seattle, WA'
  },
  {
    slug: 'microsoft',
    name: 'Microsoft India',
    industry: 'Software & Enterprise',
    foundingYear: 1990,
    headcountRange: '20,000+',
    headquarters: 'Redmond, WA'
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    industry: 'E-commerce',
    foundingYear: 2007,
    headcountRange: '10,000+',
    headquarters: 'Bengaluru, India'
  },
  {
    slug: 'swiggy',
    name: 'Swiggy',
    industry: 'Food Delivery & Quick Commerce',
    foundingYear: 2014,
    headcountRange: '5,000-10,000',
    headquarters: 'Bengaluru, India'
  },
  {
    slug: 'zomato',
    name: 'Zomato',
    industry: 'Foodtech & Hyperlocal Delivery',
    foundingYear: 2008,
    headcountRange: '5,000-10,000',
    headquarters: 'Gurugram, India'
  },
  {
    slug: 'razorpay',
    name: 'Razorpay',
    industry: 'Payments & Fintech',
    foundingYear: 2014,
    headcountRange: '1,000-5,000',
    headquarters: 'Bengaluru, India'
  },
  {
    slug: 'tcs',
    name: 'Tata Consultancy Services',
    industry: 'IT Services & Consulting',
    foundingYear: 1968,
    headcountRange: '100,000+',
    headquarters: 'Mumbai, India'
  },
  {
    slug: 'infosys',
    name: 'Infosys',
    industry: 'IT Services & Consulting',
    foundingYear: 1981,
    headcountRange: '100,000+',
    headquarters: 'Bengaluru, India'
  },
  {
    slug: 'ibm-consulting-services-india-pvt-ltd',
    name: 'International Business Machines & Tech Consulting Services Private Limited',
    industry: 'Enterprise Software & IT Consulting',
    foundingYear: 1911,
    headcountRange: '50,000+',
    headquarters: 'Armonk, NY'
  },
  {
    slug: 'talentdash-inc',
    name: 'TalentDash Inc.',
    industry: 'HR Tech',
    foundingYear: 2024,
    headcountRange: '1-10',
    headquarters: 'Bengaluru, India'
  }
];

export const SALARY_DATA: SalaryRecord[] = [
  // Google - 8 records
  {
    id: 'g-1',
    company: 'Google India',
    companySlug: 'google',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1,
    baseSalary: 1800000,
    bonus: 250000,
    stock: 800000,
    totalCompensation: 2850000
  },
  {
    id: 'g-2',
    company: 'Google India',
    companySlug: 'google',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3,
    baseSalary: 3200000,
    bonus: 400000,
    stock: 1500000,
    totalCompensation: 5100000
  },
  {
    id: 'g-3',
    company: 'Google India',
    companySlug: 'google',
    role: 'Frontend Engineer',
    level: Level.L4,
    location: 'Hyderabad',
    experienceYears: 4,
    baseSalary: 3000000,
    bonus: 350000,
    stock: 1400000,
    totalCompensation: 4750000
  },
  {
    id: 'g-4',
    company: 'Google India',
    companySlug: 'google',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 7,
    baseSalary: 5200000,
    bonus: 800000,
    stock: 3500000,
    totalCompensation: 9500000
  },
  {
    id: 'g-5',
    company: 'Google India',
    companySlug: 'google',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 10,
    baseSalary: 7500000,
    bonus: 1500000,
    stock: 6500000,
    totalCompensation: 15500000
  },
  {
    id: 'g-6',
    company: 'Google India',
    companySlug: 'google',
    role: 'Principal Engineer',
    level: Level.Principal,
    location: 'Bengaluru',
    experienceYears: 15,
    baseSalary: 15000000,
    bonus: 4000000,
    stock: 21000000,
    totalCompensation: 40000000 // ₹4 Crore (Very high salary check)
  },
  {
    id: 'g-7',
    company: 'Google India',
    companySlug: 'google',
    role: 'Software Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 6,
    baseSalary: 4800000,
    bonus: 650000,
    stock: 3000000,
    totalCompensation: 8450000
  },
  {
    id: 'g-8',
    company: 'Google India',
    companySlug: 'google',
    role: 'Frontend Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 2,
    baseSalary: 2000000,
    bonus: 200000,
    stock: 1000000,
    totalCompensation: 3200000
  },

  // Amazon - 8 records
  {
    id: 'a-1',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 0.5,
    baseSalary: 1600000,
    bonus: 300000,
    stock: 400000,
    totalCompensation: 2300000
  },
  {
    id: 'a-2',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3,
    baseSalary: 2800000,
    bonus: 400000,
    stock: 1000000,
    totalCompensation: 4200000
  },
  {
    id: 'a-3',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Hyderabad',
    experienceYears: 5,
    baseSalary: 3200000,
    bonus: 450000,
    stock: 1200000,
    totalCompensation: 4850000
  },
  {
    id: 'a-4',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Pune',
    experienceYears: 8,
    baseSalary: 4800000,
    bonus: 700000,
    stock: 2500000,
    totalCompensation: 8000000
  },
  {
    id: 'a-5',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 12,
    baseSalary: 6800000,
    bonus: 1200000,
    stock: 5000000,
    totalCompensation: 13000000
  },
  {
    id: 'a-6',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Principal Engineer',
    level: Level.Principal,
    location: 'Bengaluru',
    experienceYears: 18,
    baseSalary: 11000000,
    bonus: 2500000,
    stock: 14500000,
    totalCompensation: 28000000
  },
  {
    id: 'a-7',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Hyderabad',
    experienceYears: 4,
    baseSalary: 3000000,
    bonus: 400000,
    stock: 1100000,
    totalCompensation: 4500000
  },
  {
    id: 'a-8',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 9,
    baseSalary: 5000000,
    bonus: 800000,
    stock: 3000000,
    totalCompensation: 8800000
  },

  // Microsoft - 8 records
  {
    id: 'm-1',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Hyderabad',
    experienceYears: 1,
    baseSalary: 1500000,
    bonus: 200000,
    stock: 500000,
    totalCompensation: 2200000
  },
  {
    id: 'm-2',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3.5,
    baseSalary: 2500000,
    bonus: 300000,
    stock: 900000,
    totalCompensation: 3700000
  },
  {
    id: 'm-3',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Hyderabad',
    experienceYears: 7,
    baseSalary: 4200000,
    bonus: 600000,
    stock: 2200000,
    totalCompensation: 7000000
  },
  {
    id: 'm-4',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Noida',
    experienceYears: 6,
    baseSalary: 3800000,
    bonus: 500000,
    stock: 1800000,
    totalCompensation: 6100000
  },
  {
    id: 'm-5',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Hyderabad',
    experienceYears: 11,
    baseSalary: 6200000,
    bonus: 1000000,
    stock: 4000000,
    totalCompensation: 11200000
  },
  {
    id: 'm-6',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Principal Engineer',
    level: Level.Principal,
    location: 'Bengaluru',
    experienceYears: 14,
    baseSalary: 9500000,
    bonus: 2000000,
    stock: 11000000,
    totalCompensation: 22500000
  },
  {
    id: 'm-7',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Hyderabad',
    experienceYears: 4.5,
    baseSalary: 2700000,
    bonus: 350000,
    stock: 1100000,
    totalCompensation: 4150000
  },
  {
    id: 'm-8',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Backend Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1.5,
    baseSalary: 1650000,
    bonus: 200000,
    stock: 450000,
    totalCompensation: 2300000
  },

  // Flipkart - 6 records
  {
    id: 'f-1',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1,
    baseSalary: 1400000,
    bonus: 150000,
    stock: 300000,
    totalCompensation: 1850000
  },
  {
    id: 'f-2',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3.5,
    baseSalary: 2400000,
    bonus: 250000,
    stock: 600000,
    totalCompensation: 3250000
  },
  {
    id: 'f-3',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 6.5,
    baseSalary: 3600000,
    bonus: 400000,
    stock: 1400000,
    totalCompensation: 5400000
  },
  {
    id: 'f-4',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 10,
    baseSalary: 5500000,
    bonus: 700000,
    stock: 3000000,
    totalCompensation: 9200000
  },
  {
    id: 'f-5',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Software Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 7,
    baseSalary: 3800000,
    bonus: 450000,
    stock: 1500000,
    totalCompensation: 5750000
  },
  {
    id: 'f-6',
    company: 'Flipkart',
    companySlug: 'flipkart',
    role: 'Principal Engineer',
    level: Level.Principal,
    location: 'Bengaluru',
    experienceYears: 14,
    baseSalary: 8500000,
    bonus: 1500000,
    stock: 6000000,
    totalCompensation: 16000000
  },

  // Swiggy - 6 records
  {
    id: 'sw-1',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1.5,
    baseSalary: 1500000,
    bonus: 150000,
    stock: 300000,
    totalCompensation: 1950000
  },
  {
    id: 'sw-2',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3.5,
    baseSalary: 2300000,
    bonus: 250000,
    stock: 650000,
    totalCompensation: 3200000
  },
  {
    id: 'sw-3',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 4,
    baseSalary: 2500000,
    bonus: 250000,
    stock: 700000,
    totalCompensation: 3450000
  },
  {
    id: 'sw-4',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 7,
    baseSalary: 3800000,
    bonus: 400000,
    stock: 1200000,
    totalCompensation: 5400000
  },
  {
    id: 'sw-5',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 10,
    baseSalary: 5200000,
    bonus: 600000,
    stock: 2500000,
    totalCompensation: 8300000
  },
  {
    id: 'sw-6',
    company: 'Swiggy',
    companySlug: 'swiggy',
    role: 'Backend Engineer',
    level: Level.L3,
    location: 'Delhi NCR',
    experienceYears: 2,
    baseSalary: 1600000,
    bonus: 150000,
    stock: 300000,
    totalCompensation: 2050000
  },

  // Zomato - 6 records
  {
    id: 'zo-1',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Gurugram',
    experienceYears: 1,
    baseSalary: 1400000,
    bonus: 100000,
    stock: 200000,
    totalCompensation: 1700000
  },
  {
    id: 'zo-2',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Gurugram',
    experienceYears: 3,
    baseSalary: 2200000,
    bonus: 200000,
    stock: 500000,
    totalCompensation: 2900000
  },
  {
    id: 'zo-3',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Gurugram',
    experienceYears: 5,
    baseSalary: 2600000,
    bonus: 250000,
    stock: 750000,
    totalCompensation: 3600000
  },
  {
    id: 'zo-4',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 8,
    baseSalary: 3900000,
    bonus: 400000,
    stock: 1400000,
    totalCompensation: 5700000
  },
  {
    id: 'zo-5',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Gurugram',
    experienceYears: 11,
    baseSalary: 5500000,
    bonus: 600000,
    stock: 3000000,
    totalCompensation: 9100000
  },
  {
    id: 'zo-6',
    company: 'Zomato',
    companySlug: 'zomato',
    role: 'Software Engineer',
    level: Level.L5,
    location: 'Gurugram',
    experienceYears: 7,
    baseSalary: 3700000,
    bonus: 400000,
    stock: 1100000,
    totalCompensation: 5200000
  },

  // Razorpay - 6 records
  {
    id: 'rz-1',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1,
    baseSalary: 1400000,
    bonus: 150000,
    stock: 250000,
    totalCompensation: 1800000
  },
  {
    id: 'rz-2',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3.5,
    baseSalary: 2200000,
    bonus: 200000,
    stock: 600000,
    totalCompensation: 3000000
  },
  {
    id: 'rz-3',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 7,
    baseSalary: 3600000,
    bonus: 350000,
    stock: 1200000,
    totalCompensation: 5150000
  },
  {
    id: 'rz-4',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 4,
    baseSalary: 2400000,
    bonus: 200000,
    stock: 700000,
    totalCompensation: 3300000
  },
  {
    id: 'rz-5',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 10,
    baseSalary: 4800000,
    bonus: 500000,
    stock: 2200000,
    totalCompensation: 7500000
  },
  {
    id: 'rz-6',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Bengaluru',
    experienceYears: 8,
    baseSalary: 3500000,
    bonus: 350000,
    stock: 1000000,
    totalCompensation: 4850000
  },

  // TCS - 6 records
  {
    id: 't-1',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Mumbai',
    experienceYears: 2,
    baseSalary: 450000,
    bonus: 50000,
    stock: null, // Edge case: missing stock
    totalCompensation: 500000
  },
  {
    id: 't-2',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Chennai',
    experienceYears: 5,
    baseSalary: 800000,
    bonus: 80000,
    stock: null,
    totalCompensation: 880000
  },
  {
    id: 't-3',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Noida',
    experienceYears: 9,
    baseSalary: 1400000,
    bonus: 100000,
    stock: null,
    totalCompensation: 1500000
  },
  {
    id: 't-4',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1,
    baseSalary: 400000,
    bonus: 30000,
    stock: null,
    totalCompensation: 430000
  },
  {
    id: 't-5',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Frontend Engineer',
    level: Level.L4,
    location: 'Pune',
    experienceYears: 4,
    baseSalary: 750000,
    bonus: 60000,
    stock: null,
    totalCompensation: 810000
  },
  {
    id: 't-6',
    company: 'Tata Consultancy Services',
    companySlug: 'tcs',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Mumbai',
    experienceYears: 12,
    baseSalary: 2200000,
    bonus: 200000,
    stock: null,
    totalCompensation: 2400000
  },

  // Infosys - 6 records
  {
    id: 'inf-1',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Bengaluru',
    experienceYears: 1.5,
    baseSalary: 420000,
    bonus: 40000,
    stock: null, // Edge case: missing stock
    totalCompensation: 460000
  },
  {
    id: 'inf-2',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Pune',
    experienceYears: 4,
    baseSalary: 700000,
    bonus: 70000,
    stock: null,
    totalCompensation: 770000
  },
  {
    id: 'inf-3',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Backend Engineer',
    level: Level.L5,
    location: 'Hyderabad',
    experienceYears: 8,
    baseSalary: 1300000,
    bonus: 120000,
    stock: null,
    totalCompensation: 1420000
  },
  {
    id: 'inf-4',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Chennai',
    experienceYears: 2,
    baseSalary: 450000,
    bonus: 40000,
    stock: null,
    totalCompensation: 490000
  },
  {
    id: 'inf-5',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Frontend Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 5,
    baseSalary: 820000,
    bonus: 80000,
    stock: null,
    totalCompensation: 900000
  },
  {
    id: 'inf-6',
    company: 'Infosys',
    companySlug: 'infosys',
    role: 'Staff Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 11,
    baseSalary: 2400000,
    bonus: 200000,
    stock: null,
    totalCompensation: 2600000
  },

  // IBM Consulting - 3 records (Long company name test)
  {
    id: 'ibm-1',
    company: 'International Business Machines & Tech Consulting Services Private Limited',
    companySlug: 'ibm-consulting-services-india-pvt-ltd',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Delhi NCR',
    experienceYears: 1,
    baseSalary: 650000,
    bonus: null, // Edge case: missing bonus AND missing stock
    stock: null,
    totalCompensation: 650000 // TC = base salary exactly
  },
  {
    id: 'ibm-2',
    company: 'International Business Machines & Tech Consulting Services Private Limited',
    companySlug: 'ibm-consulting-services-india-pvt-ltd',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 4,
    baseSalary: 1200000,
    bonus: 100000,
    stock: 100000,
    totalCompensation: 1400000
  },
  {
    id: 'ibm-3',
    company: 'International Business Machines & Tech Consulting Services Private Limited',
    companySlug: 'ibm-consulting-services-india-pvt-ltd',
    role: 'Frontend Engineer',
    level: Level.L5,
    location: 'Hyderabad',
    experienceYears: 8,
    baseSalary: 2200000,
    bonus: 200000,
    stock: 200000,
    totalCompensation: 2600000
  },

  // TalentDash - 1 record (Single-record company test)
  {
    id: 'td-1',
    company: 'TalentDash Inc.',
    companySlug: 'talentdash-inc',
    role: 'Software Engineer',
    level: Level.L6,
    location: 'Bengaluru',
    experienceYears: 8,
    baseSalary: 4500000,
    bonus: 500000,
    stock: 2000000,
    totalCompensation: 7000000
  },

  // Additional diverse entries to bring count to 65
  {
    id: 'a-9',
    company: 'Amazon India',
    companySlug: 'amazon',
    role: 'Software Engineer',
    level: Level.L3,
    location: 'Delhi NCR',
    experienceYears: 2,
    baseSalary: 1750000,
    bonus: 200000,
    stock: 350000,
    totalCompensation: 2300000
  },
  {
    id: 'g-9',
    company: 'Google India',
    companySlug: 'google',
    role: 'Backend Engineer',
    level: Level.L4,
    location: 'Bengaluru',
    experienceYears: 3.5,
    baseSalary: 3100000,
    bonus: 300000,
    stock: 1400000,
    totalCompensation: 4800000
  },
  {
    id: 'm-9',
    company: 'Microsoft India',
    companySlug: 'microsoft',
    role: 'Software Engineer',
    level: Level.L4,
    location: 'Pune',
    experienceYears: 5,
    baseSalary: 2900000,
    bonus: 300000,
    stock: 1000000,
    totalCompensation: 4200000
  }
];

// Centralized company metadata maps (Ratings, reviews, followers, descriptions, insights, culture rating sub-scores)
export const COMPANY_RATINGS: Record<string, number> = {
  google: 4.8,
  microsoft: 4.6,
  amazon: 4.5,
  flipkart: 4.3,
  swiggy: 4.1,
  zomato: 4.2,
  razorpay: 4.4,
  tcs: 3.3,
  infosys: 3.5,
  'ibm-consulting-services-india-pvt-ltd': 3.7,
  'talentdash-inc': 5.0,
};

export const COMPANY_REVIEWS: Record<string, number> = {
  google: 12400,
  microsoft: 8900,
  amazon: 15600,
  flipkart: 6200,
  swiggy: 4300,
  zomato: 5100,
  razorpay: 1200,
  tcs: 124000,
  infosys: 84000,
  'ibm-consulting-services-india-pvt-ltd': 34000,
  'talentdash-inc': 42,
};

export const COMPANY_FOLLOWERS: Record<string, number> = {
  google: 45000,
  microsoft: 38000,
  amazon: 52000,
  flipkart: 24000,
  swiggy: 15000,
  zomato: 18000,
  razorpay: 9500,
  tcs: 250000,
  infosys: 180000,
  'ibm-consulting-services-india-pvt-ltd': 95000,
  'talentdash-inc': 1200,
};

export const COMPANY_ABOUTS: Record<string, string> = {
  google: 'Google India operates major engineering centers in Bengaluru and Hyderabad. The engineering groups work on core search infrastructure, cloud systems, artificial intelligence models, YouTube backend engineering, and next-generation developer tooling.',
  amazon: 'Amazon India has a massive developer presence across Bengaluru, Hyderabad, Chennai, and Gurugram. The engineering groups own features for retail global platforms, AWS databases, Kindle, Prime Video backend streaming, and warehouse automation systems.',
  microsoft: 'Microsoft India Development Center (IDC) has engineering offices in Hyderabad, Bengaluru, and Noida. The teams lead development for Azure Cloud Services, Windows core architectures, Microsoft 365, and AI models within the Microsoft Copilot engineering teams.',
  tcs: 'Tata Consultancy Services (TCS) is India\'s largest IT services exporter. TCS research labs and engineering groups deliver large-scale digital transformation projects, enterprise databases, and bespoke consulting services globally.',
  infosys: 'Infosys is a pioneer in consulting, technology, outsourcing, and digital services. Infosys engineering teams deploy cloud infrastructure, enterprise software, and artificial intelligence solutions globally.',
  'talentdash-inc': 'TalentDash Inc. is a high-growth HR tech startup building next-generation compensation intelligence, salary comparison trackers, and offer negotiation assistants for engineering talent worldwide.'
};

export interface CompanyInsight {
  id: number;
  text: string;
  type: 'signing' | 'vesting' | 'interview' | 'salary';
}

export const COMPANY_INSIGHTS: Record<string, CompanyInsight[]> = {
  google: [
    { id: 1, text: 'Offers upfront sign-on bonus paid in the first month salary cycle.', type: 'signing' },
    { id: 2, text: 'Uniform 25% annual stock vesting schedule (no backloading).', type: 'vesting' },
    { id: 3, text: 'Interview Tip: Focus heavily on LeetCode Medium/Hard, system design, and Googliness behavioral scenarios.', type: 'interview' },
    { id: 4, text: 'Highly flexible base pay with substantial annual stock refresher grants.', type: 'salary' }
  ],
  amazon: [
    { id: 1, text: 'Typically offsets backloaded vesting with guaranteed signing bonuses in Years 1 & 2 (paid monthly).', type: 'signing' },
    { id: 2, text: 'Backloaded vesting schedule: 5% Year 1, 15% Year 2, 40% Year 3, 40% Year 4.', type: 'vesting' },
    { id: 3, text: 'Interview Tip: Prepare 2 detailed examples for each of Amazon\'s 16 Leadership Principles using the STAR method.', type: 'interview' },
    { id: 4, text: 'Base salary is generally capped around ₹40L-₹45L in India; remainder is stock/bonus.', type: 'salary' }
  ],
  microsoft: [
    { id: 1, text: 'Upfront cash signing bonuses with a standard 1-year clawback agreement.', type: 'signing' },
    { id: 2, text: '25% annual vesting schedule over 4 years.', type: 'vesting' },
    { id: 3, text: 'Interview Tip: Brush up on thread safety, low-level concurrency, system design, and algorithmic problem solving.', type: 'interview' },
    { id: 4, text: 'Moderate base packages compensated by stable performance cash bonuses and stock awards.', type: 'salary' }
  ],
  flipkart: [
    { id: 1, text: 'Offers highly competitive joining bonuses to match top product firms.', type: 'signing' },
    { id: 2, text: 'Equal 25% annual vesting timeline.', type: 'vesting' },
    { id: 3, text: 'Interview Tip: Focus on machine coding rounds, clean object-oriented architecture, and scalable system design.', type: 'interview' },
    { id: 4, text: 'Top packages are highly aligned with tier-1 MNC levels.', type: 'salary' }
  ]
};

export interface CultureRatings {
  wlb: number;
  growth: number;
  culture: number;
  comp: number;
  mgmt: number;
}

export const COMPANY_CULTURE_RATINGS: Record<string, CultureRatings> = {
  google: { wlb: 4.5, growth: 4.6, culture: 4.8, comp: 4.7, mgmt: 4.4 },
  amazon: { wlb: 3.2, growth: 4.5, culture: 3.9, comp: 4.6, mgmt: 3.7 },
  microsoft: { wlb: 4.3, growth: 4.1, culture: 4.4, comp: 4.3, mgmt: 4.1 },
  flipkart: { wlb: 3.8, growth: 4.3, culture: 4.1, comp: 4.2, mgmt: 3.9 },
  tcs: { wlb: 4.0, growth: 3.1, culture: 3.5, comp: 2.8, mgmt: 3.2 },
  'talentdash-inc': { wlb: 4.8, growth: 5.0, culture: 4.9, comp: 5.0, mgmt: 4.9 }
};

export interface CompanyStats {
  recordCount: number;
  avgTotalComp: number;
  maxTotalComp: number;
  minTotalComp: number;
  medianTotalComp: number;
  levels: Level[];
}

export const COMPANY_STATS: Record<string, CompanyStats> = {};

// Precompute stats once globally on module load
COMPANIES.forEach((company) => {
  const companyRecords = SALARY_DATA.filter((r) => r.companySlug === company.slug);
  const recordCount = companyRecords.length;
  
  if (recordCount === 0) {
    COMPANY_STATS[company.slug] = {
      recordCount: 0,
      avgTotalComp: 0,
      maxTotalComp: 0,
      minTotalComp: 0,
      medianTotalComp: 0,
      levels: [],
    };
    return;
  }

  const totalComps = companyRecords.map((r) => r.totalCompensation);
  const totalCompSum = totalComps.reduce((sum, val) => sum + val, 0);
  const avgTotalComp = Math.round(totalCompSum / recordCount);
  const maxTotalComp = Math.max(...totalComps);
  const minTotalComp = Math.min(...totalComps);

  // Compute Median
  const sorted = [...totalComps].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const medianTotalComp = sorted.length % 2 !== 0 
    ? sorted[mid] 
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);

  const levels = companyRecords.map((r) => r.level);

  COMPANY_STATS[company.slug] = {
    recordCount,
    avgTotalComp,
    maxTotalComp,
    minTotalComp,
    medianTotalComp,
    levels,
  };
});


