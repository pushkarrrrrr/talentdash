# 🚀 TalentDash

TalentDash is an enterprise-grade, high-performance Salary Intelligence platform built to give candidates leverage in their compensation negotiations. It features real-time dynamic filtering, side-by-side offer comparisons, and deep company profile analytics.

**Live Demo**: [https://talentdash-nu.vercel.app](https://talentdash-nu.vercel.app)

---

## 🏗 Architecture & Tech Stack

This project was built from the ground up using modern React Server Component (RSC) patterns, prioritizing zero client-side JavaScript overhead and instantaneous loading.

* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS (with Glassmorphism UI patterns)
* **Deployment**: Vercel
* **Language**: TypeScript

## ✨ Key Features

1. **URL-Synchronized State Engine**: 
   Every filter, sort toggle, and currency switch natively syncs with the URL search parameters (`?role=x&location=y`). This allows perfect bookmarking, sharing, and deep-linking without relying on heavy client-side React state hooks.
2. **Side-by-Side Offer Comparison**:
   Calculate exact deltas across base salaries, stock options, and bonuses. Includes mathematical winner-highlighting and accurate Indian currency formatting (Lakhs/Crores).
3. **Dynamic Company Analytics**:
   Company profiles generate real-time median calculations, compensation ranges, and a custom CSS-grid Level Distribution visualization bar from raw data.
4. **Zero-JS Data Tables**:
   The core Salary Table operates entirely as a Server Component, shipping 0 bytes of client-side JavaScript for rendering, sorting, and pagination.

## ⚡ Performance Highlights (Core Web Vitals)

* **LCP < 2s**: Implemented React `<Suspense>` boundaries to unblock the main UI shell. The server instantly streams the header and navigation while asynchronously resolving URL parameters in the background.
* **CLS < 0.1**: Designed pixel-perfect `TableSkeleton` and `FilterBarSkeleton` loaders. Reserved physical layout space guarantees zero cumulative layout shift when the data finally streams in.
* **Optimized Images**: Deployed `next/image` with strict dimensional properties (`width={24} height={24}`) to safely stream external company logos without visual pop-in.

## 🔍 Enterprise SEO

* **Structured Data**: Injects `<script type="application/ld+json">` representing `schema.org/Dataset` on data-heavy pages.
* **Dynamic Metadata**: Auto-generates unique canonical links, titles, and meta descriptions based on the dynamic route (e.g. `/companies/google` resolves dynamic descriptions).
* **Open Graph & Twitter Cards**: Highly optimized for social sharing with dynamically injected OG descriptors.

## 🛠 Edge Case Handling

The system is rigorously hardened against realistic compensation data anomalies:
* **Missing Equity/Bonus Data**: Safely calculates Total Compensation using base salaries while rendering clean em dashes (`—`).
* **Single-Record Data**: Gracefully prevents division-by-zero errors in distribution bars.
* **Layout Breakage**: Strict `min-w-0 break-words line-clamp-2` enforcement prevents massive 70+ character company names from blowing out the table grid.
* **Missing Routes**: A beautifully themed Custom 404 page catches invalid company slugs gracefully.

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/pushkarrrrrr/talentdash.git
cd talentdash
npm install
```

Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the platform.
