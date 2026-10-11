import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import BookNowForm from '@/components/BookNowForm';
import PopularTourPackages from '@/components/PopularTourPackages';
import VehiclesSection from '@/components/VehiclesSection';
import AccommodationsSection from '@/components/AccommodationsSection';
import FaqSection from '@/components/FaqSection';

export const metadata = {
  title: 'Book Your Tour | Jagannath Holidays - Custom Odisha Tour Packages',
  description: 'Book your customized tour package with Jagannath Holidays. Choose from popular tour packages, premium fleet vehicles, top-rated star accommodations, and 24/7 dedicated travel support in Odisha.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function BookYourTourPage() {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Book Your Tour' },
  ];

  return (
    <main>
      <BreadcrumbBanner
        title="Book Your Tour"
        breadcrumbs={breadcrumbs}
        bgVideo="/videos/road.mp4"
      />
      <BookNowForm />
      <PopularTourPackages />
      <VehiclesSection />
      <AccommodationsSection />
      <FaqSection />
    </main>
  );
}
