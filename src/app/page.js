import Banner from "@/components/Banner";
import DestinationsWindows from "@/components/DestinationsWindows";
import AboutSection from "@/components/AboutSection";
import LovedDestinations from "@/components/LovedDestinations";
import HoneymoonSection from "@/components/HoneymoonSection";
import PopularTourPackages from "@/components/PopularTourPackages";
import FeaturesSection from "@/components/FeaturesSection";
import VehiclesSection from "@/components/VehiclesSection";
import AccommodationsSection from "@/components/AccommodationsSection";
import EcoRetreatSection from "@/components/EcoRetreatSection";
import NewsSection from "@/components/NewsSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getDestinationsTaxonomy, getReviewsList } from "@/lib/api";

export default async function Home() {
  const [reviewsData, destinationsData] = await Promise.all([
    getReviewsList(),
    getDestinationsTaxonomy(),
  ]);

  return (
    <main>
      <Banner />
      <DestinationsWindows />
      <AboutSection />
      <LovedDestinations destinations={destinationsData} />
      <HoneymoonSection />
      <PopularTourPackages />
      <FeaturesSection />
      <VehiclesSection />
      <AccommodationsSection />
      <EcoRetreatSection />
      <NewsSection />
      <TestimonialsSection reviewsData={reviewsData} />
      <FaqSection />
      {/* <TeamSection /> */}
    </main>
  );
}
