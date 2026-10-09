import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import DestinationsList from '@/components/DestinationsList';

export const metadata = {
  title: 'Top 10 Destinations to Visit in Odisha - Holiday Vacations with Jagannath Holidays',
  description: 'Discover the enchanting spots of Puri, Konark, Bhubaneswar, Chilika, and much more with custom tours offered at feasible rates from Jagannath Holidays.',
};

export default async function DestinationsPage({ searchParams }) {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Destinations' }
  ];

  return (
    <main>
      <BreadcrumbBanner 
        title="Our Destinations" 
        breadcrumbs={breadcrumbs} 
        bgImage="/loved-destination-1.png"
      />
      <DestinationsList searchParams={searchParams} />
    </main>
  );
}
