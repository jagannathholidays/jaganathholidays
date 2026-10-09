import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import PackageFeatures from '@/components/PackageFeatures';
import TourPackagesSection from '@/components/TourPackagesSection';

export const metadata = {
  title: 'Book Our Affordable Tour Packages | Jagannath Holidays',
  description: 'Jagannath Holidays, the prominent family-owned and operated travel agency, since the last 7 years offers assorted range of custom tour packages in Odisha.',
};

export default async function PackagesPage({ searchParams }) {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Tour Packages' }
  ];

  return (
    <main>
      <BreadcrumbBanner 
        title="Tour Packages" 
        breadcrumbs={breadcrumbs} 
        // bgImage="/jaganath-banner.webp"
        bgVideo="/videos/road.mp4"
      />
      <TourPackagesSection searchParams={searchParams} />
      <PackageFeatures />
    </main>
  );
}

