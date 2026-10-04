import styles from './AccommodationsSection.module.css';
import AccommodationsSectionClient from './AccommodationsSectionClient';
import { getImageUrl } from '@/lib/api';

async function fetchAccommodations() {
  const candidateSlugs = ["home-page-hotels"];

  for (const slug of candidateSlugs) {
    try {
      const payload = {
        slug,
        content_type: "hotel"
      };

      const res = await fetch(`${process.env.CMS_API_URL || 'https://cmsapi.one9ty.com'}/api/v1/delivery/contents/show`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CMS_TOKEN || '141|PLIcQEisrq76oVJH35rTn3CqkZWZ6xaCSwNDWCiw2ea64d79'}`
        },
        body: JSON.stringify(payload),
        next: { revalidate: 86400 }
      });

      if (!res.ok) continue;

      const result = await res.json();
      const items = result?.data?.data?.items;

      if (Array.isArray(items) && items.length > 0) {
        return items.map((item, index) => {
          let photosList = [];

          if (Array.isArray(item.photos) && item.photos.length > 0) {
            photosList = item.photos
              .map((p) => getImageUrl(p?.file_path || p?.url || p))
              .filter(Boolean);
          } else if (item.image) {
            const singleImg = getImageUrl(item.image?.file_path || item.image);
            if (singleImg) photosList.push(singleImg);
          }

          if (photosList.length === 0) {
            photosList = [`https://picsum.photos/600/400?random=${index + 70}`];
          }

          return {
            id: item.id || index,
            name: item.name || 'Accommodation',
            image: photosList[0],
            images: photosList,
            photos: photosList,
            location: item.location || '',
            star_rating: item.star_rating || item.starRating || null
          };
        });
      }
    } catch (error) {
      console.error(`Error fetching accommodations for slug "${slug}":`, error);
    }
  }

  return [];
}

/* ── Sub-components ── */
function AccommodationHeader() {
  return (
    <div className={styles.headingArea}>
      <h4 className={styles.subheading}>RELAX IN TOP-RATED HOTELS</h4>
      <h2 className={styles.heading}>Accommodations With Star Hotels</h2>
    </div>
  );
}

/* ── Main Component ── */
export default async function AccommodationsSection() {
  const accommodationsData = await fetchAccommodations();

  return (
    <section className={styles.accommodationsSection}>
      <div className={styles.container}>
        <AccommodationHeader />
        {accommodationsData.length > 0 ? (
          <AccommodationsSectionClient accommodationsData={accommodationsData} />
        ) : (
          <div className={styles.noResult}>No accommodations available</div>
        )}
      </div>
    </section>
  );
}
