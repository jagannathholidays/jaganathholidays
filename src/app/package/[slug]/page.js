import { notFound } from 'next/navigation';
import DestinationDetailsBanner from '@/components/DestinationDetailsBanner';
import DestinationDetailsContent from '@/components/DestinationDetailsContent';
import DestinationWhatToExpect from '@/components/DestinationWhatToExpect';
import DestinationItinerary from '@/components/DestinationItinerary';
import DestinationGallery from '@/components/DestinationGallery';
import DestinationRelatedTours from '@/components/DestinationRelatedTours';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import { getPackageBySlug, getPackagesList, getImageUrl, stripHtml } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const packageItem = await getPackageBySlug(slug);

  if (!packageItem) {
    return {
      title: 'Package Not Found | Jagannath Holidays',
      description: 'The requested tour package could not be found.',
    };
  }


  const details = packageItem.data || {};
  const title = details.meta_title || details.title || '';
  
  const rawDescription = details.meta_description || '';
    
  const plainDescription = stripHtml(rawDescription).slice(0, 160);
  const coverImageUrl = getImageUrl(details.cover_image?.file_path);

  // Extract destination names for keywords if available
  const destinationTerms = packageItem.terms?.filter(t => t.taxonomy?.slug === 'destinations').map(t => t.name) || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagannathholidays.com';
  const pageUrl = `${siteUrl}/package/${slug}`;

  return {
    title: `${title}`,
    description: plainDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title}`,
      description: plainDescription,
      url: pageUrl,
      siteName: 'Jagannath Holidays',
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Jagannath Holidays`,
      description: plainDescription,
      images: [coverImageUrl],
    },
  };
}

export default async function PackageDetailsPage({ params }) {
  const { slug } = await params;
  const [packageItem, allPackages] = await Promise.all([
    getPackageBySlug(slug),
    getPackagesList(6),
  ]);

  if (!packageItem) {
    notFound();
  }

  const details = packageItem.data || {};
  const title = packageItem.title || details.title || 'Tour Package';
  const coverImage = getImageUrl(details.cover_image?.file_path);
  const rating = details.rating || 4.8;
  const duration = details.tour_duration || '5 Nights, 6 Days';
  const startingPoint = details.starting_point || '';
  const endPoint = details.end_point || '';
  
  // Destination terms from taxonomies
  const destinationTerms = packageItem.terms?.filter(t => t.taxonomy?.slug === 'destinations').map(t => t.name) || [];
  const destinations = destinationTerms.length > 0 
    ? destinationTerms.join(', ') 
    : (startingPoint && endPoint ? `${startingPoint} - ${endPoint}` : startingPoint || 'Odisha');

  const itinerary = details.itenary || [];
  const priceIncludes = details.price_includes || [];
  const priceExcludes = details.price_excludes || [];
  const complementaries = details.complementaries || [];
  const termCondition = details.term_condition || [];
  const tourGallery = details.tour_gallery || [];
  const description = details.description || '';
  const whatToExpect = details.what_to_expect || packageItem.what_to_expect || [];

  // Filter out current package from related packages
  const relatedTours = (allPackages || []).filter(p => p.slug !== slug).slice(0, 3);

  // Structured Data Schema for SEO (TouristTrip & BreadcrumbList)
  const plainDescription = stripHtml(description).slice(0, 250);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagannathholidays.com';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        'name': title,
        'description': plainDescription,
        'touristType': ['Sightseeing', 'Cultural', 'Pilgrimage'],
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'url': `${siteUrl}/package/${slug}`
        },
        'itinerary': itinerary.map((item, index) => ({
          '@type': 'Day',
          'name': item.title || `Day ${item.day_number || index + 1}`,
          'description': item.description || ''
        })),
        'provider': {
          '@type': 'TravelAgency',
          'name': 'Jagannath Holidays',
          'url': siteUrl,
          'telephone': '+91 9583837770'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Tour Packages',
            'item': `${siteUrl}/packages`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': title,
            'item': `${siteUrl}/package/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <main>
      {/* Schema.org JSON-LD Structured Data for Rich Search Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DestinationDetailsBanner 
        title={title}
        coverImage={coverImage}
        rating={rating}
        duration={duration}
        destinations={destinations}
        startPoint={startingPoint}
        endPoint={endPoint}
      />

      <DestinationDetailsContent 
        description={description}
        itinerary={itinerary}
        priceIncludes={priceIncludes}
        priceExcludes={priceExcludes}
        complementaries={complementaries}
        termsConditions={termCondition}
        startingPoint={startingPoint}
        endPoint={endPoint}
        duration={duration}
        packageTitle={title}
      />

      <DestinationWhatToExpect whatToExpect={whatToExpect} />

      <DestinationGallery gallery={tourGallery} title={`${title} Gallery`} />

      <DestinationRelatedTours relatedTours={relatedTours} />

      <TestimonialsSection />

      <FaqSection />
    </main>
  );
}
