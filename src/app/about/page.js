import BreadcrumbBanner from '@/components/BreadcrumbBanner';
import AboutStory from '@/components/AboutStory';
import VisionMissionSection from '@/components/VisionMissionSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import LovedDestinations from '@/components/LovedDestinations';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import { getDestinationsTaxonomy, getReviewsList } from '@/lib/api';

export const metadata = {
  title: 'About Us - Tour Agency in Odisha | Jagannath Holidays',
  description: 'Looking for a genuine platform to book a custom sojourn to the popular and offbeat locations of Odisha? Count on Jagannath Holidays for tailored plans at best rates.',
};

export default async function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'About Us' }
  ];

  const [destinationsData, reviewsData] = await Promise.all([
    getDestinationsTaxonomy(),
    getReviewsList(),
  ]);

  return (
    <main>
      <BreadcrumbBanner 
        title="About Us" 
        breadcrumbs={breadcrumbs} 
        bgImage="/jaganath-banner.webp"
      />
     
      <AboutStory />
      <VisionMissionSection />
      <WhyChooseUs />
      <StatsSection />
      <LovedDestinations destinations={destinationsData} />
      <TestimonialsSection reviewsData={reviewsData} />
      <FaqSection />
    </main>
  );
}
