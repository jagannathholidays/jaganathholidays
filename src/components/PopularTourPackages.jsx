import Link from 'next/link';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import styles from './PopularTourPackages.module.css';
import AnimatedButton from './AnimatedButton';

/* ── Data fetching ── */
async function fetchPopularPackages() {
  const dummyPackages = [
    { title: 'Golden Triangle Tour of Odisha', duration: '2N / 3D', location: 'Puri - Konark - Bhubaneswar', price: '₹4,999', rating: '4.8', badge: 'Best Seller', image: 'https://picsum.photos/400/300?random=40', slug: 'golden-triangle' },
    { title: 'Odisha Adventure Tour Packages', duration: '8N / 10D', location: 'Similipal - Satkosia', price: '₹14,499', rating: '4.9', badge: 'Adventure', image: 'https://picsum.photos/400/300?random=41', slug: 'odisha-adventure' },
    { title: 'Puri Jagannath Rath Yatra Tour', duration: '3N / 4D', location: 'Puri Jagannath Temple', price: '₹6,999', rating: '4.7', badge: 'Devotional', image: 'https://picsum.photos/400/300?random=42', slug: 'rath-yatra' },
    { title: 'Authentic Tribal Tour Packages', duration: '5N / 6D', location: 'Koraput & Rayagada', price: '₹7,999', rating: '4.8', badge: 'Cultural', image: 'https://picsum.photos/400/300?random=43', slug: 'tribal-tour' },
  ];

  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/v1/delivery/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_TOKEN}`
      },
      body: JSON.stringify({ content_type_id: 'packages', status: 'published', show_in_home: 'true' }),
      next: { revalidate: 86400 },
    });

    const result = await res.json();
    if (result.success && result.data?.data?.length > 0) {
      return result.data.data.map((item, index) => {
        const categoryTerm = item.terms?.find(t => t.taxonomy?.slug === 'category');
        return {
          title: item.title,
          duration: item.data.tour_duration || 'N/A',
          location: item.data.starting_point
            ? (item.data.end_point ? `${item.data.starting_point} - ${item.data.end_point}` : item.data.starting_point)
            : 'Odisha',
          price: 'On Request',
          rating: '4.8',
          badge: categoryTerm?.name || 'Popular',
          image: item.data.cover_image?.file_path
            ? `${process.env.CMS_MEDIA_URL}/${item.data.cover_image.file_path}`
            : `https://picsum.photos/400/300?random=${index + 40}`,
          slug: item.slug || item.data.slug,
        };
      });
    }
  } catch (err) {
    console.error('Error fetching popular packages:', err);
  }
  return dummyPackages;
}

/* ── Sub-components ── */

function SectionHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.titleArea}>
        <span className={styles.pretitle}>Featured Offers</span>
        <h2 className={styles.heading}>Popular Tour Packages</h2>
      </div>
      <Link href="/packages">
        <AnimatedButton className={styles.viewAllBtn}>View All Packages</AnimatedButton>
      </Link>
    </div>
  );
}

function CardBadge({ badge }) {
  if (!badge) return null;
  return <span className={styles.badge}>{badge}</span>;
}

function CardMeta({ location, rating }) {
  return (
    <div className={styles.locationRow}>
      <span className={styles.location}>
        <FiMapPin className={styles.locationIcon} /> {location}
      </span>
      <span className={styles.rating}>
        <FiStar className={styles.starIcon} /> {rating}
      </span>
    </div>
  );
}

function CardFooter({ duration, slug }) {
  return (
    <div className={styles.cardFooter}>
      <span className={styles.duration}>
        <FiClock className={styles.durationIcon} /> {duration}
      </span>
      <Link href={`/package/${slug}`} className={styles.bookNowLink}>
        <AnimatedButton className={styles.bookNowBtn}>Book Now</AnimatedButton>
      </Link>
    </div>
  );
}

function TourCard({ pkg }) {
  const slug = pkg.slug || pkg.title.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} shineEffect`}>
        <img src={pkg.image} alt={pkg.title} className={styles.cardImage} />
        <div className={styles.imageOverlay} />
        <CardBadge badge={pkg.badge} />
      </div>
      <div className={styles.cardContent}>
        <CardMeta location={pkg.location} rating={pkg.rating} />
        <h3 className={styles.cardTitle}>
          <Link href={`/package/${slug}`} className={styles.titleLink}>
            {pkg.title}
          </Link>
        </h3>
        <CardFooter duration={pkg.duration} slug={slug} />
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default async function PopularTourPackages() {
  const packages = await fetchPopularPackages();
  return (
    <section className={styles.tourSection}>
      <div className={styles.container}>
        <SectionHeader />
        <div className={styles.grid}>
          {packages.map((pkg, index) => (
            <TourCard key={index} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
